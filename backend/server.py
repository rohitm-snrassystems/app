from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import httpx
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Email config (Emergent-managed Resend proxy)
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "Commercion Exim")
NOTIFY_EMAIL = os.environ.get("NOTIFY_EMAIL", "info@commercionexim.com")

# Create the main app without a prefix
app = FastAPI(title="Commercion Exim API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class LeadCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(default=None, max_length=32)
    company: Optional[str] = Field(default=None, max_length=160)
    country: Optional[str] = Field(default=None, max_length=80)
    product_interest: Optional[str] = Field(default=None, max_length=120)
    message: str = Field(min_length=5, max_length=4000)


class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    country: Optional[str] = None
    product_interest: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ---------- Helpers ----------
def build_lead_email_html(lead: Lead) -> str:
    def row(k: str, v):
        return (
            f'<tr><td style="padding:8px 14px;background:#f8fafc;border:1px solid #e2e8f0;'
            f'font-family:Arial,sans-serif;font-size:13px;color:#64748b;width:180px;">{k}</td>'
            f'<td style="padding:8px 14px;border:1px solid #e2e8f0;font-family:Arial,sans-serif;'
            f'font-size:14px;color:#0f172a;">{v or "-"}</td></tr>'
        )
    return f"""
    <div style="background:#f1f5f9;padding:24px;font-family:Arial,sans-serif;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
        <tr>
          <td style="background:#0f172a;padding:24px 28px;color:#ffffff;">
            <div style="font-size:12px;letter-spacing:2px;color:#c2410c;text-transform:uppercase;">New Lead</div>
            <div style="font-size:22px;font-weight:700;margin-top:6px;">Commercion Exim — Enquiry Received</div>
          </td>
        </tr>
        <tr><td style="padding:24px 28px;">
          <p style="margin:0 0 16px 0;font-size:14px;color:#334155;">A new B2B enquiry has been submitted via the website contact form.</p>
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
            {row("Name", lead.name)}
            {row("Email", lead.email)}
            {row("Phone", lead.phone)}
            {row("Company", lead.company)}
            {row("Country", lead.country)}
            {row("Product Interest", lead.product_interest)}
            <tr><td style="padding:8px 14px;background:#f8fafc;border:1px solid #e2e8f0;font-family:Arial,sans-serif;font-size:13px;color:#64748b;vertical-align:top;">Message</td>
                <td style="padding:8px 14px;border:1px solid #e2e8f0;font-family:Arial,sans-serif;font-size:14px;color:#0f172a;white-space:pre-wrap;">{lead.message}</td></tr>
            {row("Received", lead.created_at.strftime("%d %b %Y, %H:%M UTC"))}
            {row("Lead ID", lead.id)}
          </table>
        </td></tr>
        <tr><td style="background:#0f172a;color:#94a3b8;padding:16px 28px;font-size:12px;">
          Commercion Exim Pvt Ltd · Global Export & Import Trading
        </td></tr>
      </table>
    </div>
    """


async def send_lead_notification(lead: Lead) -> bool:
    if not EMAIL_KEY:
        logger.warning("EMERGENT_EMAIL_KEY missing — skipping email notification.")
        return False
    payload = {
        "to": [NOTIFY_EMAIL],
        "subject": f"New Lead: {lead.name} — {lead.product_interest or 'General Enquiry'}",
        "html": build_lead_email_html(lead),
        "from_name": EMAIL_FROM_NAME,
        "contact_email": lead.email,
    }
    try:
        async with httpx.AsyncClient(timeout=30) as hc:
            resp = await hc.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return True
    except httpx.HTTPStatusError as e:
        logger.error(f"Email send failed: {e.response.status_code} {e.response.text}")
        return False
    except Exception as e:
        logger.error(f"Email send error: {e}")
        return False


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Commercion Exim API is live."}


@api_router.get("/health")
async def health():
    return {"status": "ok", "time": datetime.now(timezone.utc).isoformat()}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    rows = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for r in rows:
        if isinstance(r.get('timestamp'), str):
            r['timestamp'] = datetime.fromisoformat(r['timestamp'])
    return rows


@api_router.post("/leads", status_code=201)
async def create_lead(payload: LeadCreate):
    lead = Lead(**payload.model_dump())
    doc = lead.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    try:
        await db.leads.insert_one(doc)
    except Exception as e:
        logger.error(f"Mongo insert failed: {e}")
        raise HTTPException(status_code=500, detail="Could not save your enquiry.")

    email_sent = await send_lead_notification(lead)
    return {
        "status": "success",
        "message": "Thank you — our trade team will contact you within 24 hours.",
        "lead_id": lead.id,
        "email_notification_sent": email_sent,
    }


@api_router.get("/leads", response_model=List[Lead])
async def list_leads(limit: int = 100):
    rows = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    for r in rows:
        if isinstance(r.get('created_at'), str):
            r['created_at'] = datetime.fromisoformat(r['created_at'])
    return rows


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

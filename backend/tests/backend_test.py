"""Backend API tests for Commercion Exim."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://commerce-connect-189.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health ----------
def test_health(client):
    r = client.get(f"{API}/health", timeout=30)
    assert r.status_code == 200
    d = r.json()
    assert d["status"] == "ok"
    assert "time" in d


# ---------- Leads: create + persistence ----------
def test_create_lead_valid(client):
    payload = {
        "name": "TEST_Buyer",
        "email": "test_buyer@example.com",
        "phone": "+911234567890",
        "company": "TEST Corp",
        "country": "India",
        "product_interest": "engineering",
        "message": "Interested in bulk industrial valves purchase.",
    }
    r = client.post(f"{API}/leads", json=payload, timeout=60)
    assert r.status_code == 201, r.text
    d = r.json()
    assert d["status"] == "success"
    assert "lead_id" in d and isinstance(d["lead_id"], str)
    assert "email_notification_sent" in d
    assert isinstance(d["email_notification_sent"], bool)
    pytest.lead_id = d["lead_id"]


def test_list_leads_and_persistence(client):
    r = client.get(f"{API}/leads", timeout=30)
    assert r.status_code == 200
    rows = r.json()
    assert isinstance(rows, list)
    # No _id leakage
    for row in rows:
        assert "_id" not in row
    # Contains our created lead
    ids = [row["id"] for row in rows]
    assert getattr(pytest, "lead_id", None) in ids
    # Sorted desc by created_at
    if len(rows) >= 2:
        assert rows[0]["created_at"] >= rows[1]["created_at"]


# ---------- Validation ----------
def test_create_lead_invalid_email(client):
    payload = {"name": "TEST_x", "email": "not-an-email", "message": "hello world"}
    r = client.post(f"{API}/leads", json=payload, timeout=30)
    assert r.status_code == 422


def test_create_lead_short_message(client):
    payload = {"name": "TEST_x", "email": "ok@example.com", "message": "hi"}
    r = client.post(f"{API}/leads", json=payload, timeout=30)
    assert r.status_code == 422

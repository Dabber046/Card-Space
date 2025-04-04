
import pytest
from app import app, db, users
from bson.objectid import ObjectId

@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

def test_register_login_profile(client):
    email = "testuser@example.com"
    password = "testpass123"
    
    # Clean up any previous test user
    users.delete_many({"email": email})

    # Register
    res = client.post("/api/register", json={"email": email, "password": password})
    assert res.status_code == 200
    user_id = res.get_json()["id"]
    assert ObjectId.is_valid(user_id)

    # Login
    res = client.post("/api/login", json={"email": email, "password": password})
    assert res.status_code == 200
    token = res.get_json()["token"]
    assert token

    # Access profile
    res = client.get("/api/profile", headers={"Authorization": f"Bearer {token}"})
    assert res.status_code == 200
    data = res.get_json()
    assert data["email"] == email

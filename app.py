from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
import jwt
import bcrypt
import datetime
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__, static_folder="client/dist", static_url_path="")
CORS(app)

# MongoDB setup
client = MongoClient(os.getenv("MONGO_URI"))
db = client.pokemon_tracker
users = db.users
cards = db.cards

SECRET = os.getenv("JWT_SECRET", "devsecret")

# JWT decorator
def token_required(f):
    def wrap(*args, **kwargs):
        token = request.headers.get("Authorization", "").replace("Bearer ", "")
        try:
            data = jwt.decode(token, SECRET, algorithms=["HS256"])
            user = users.find_one({"_id": ObjectId(data["id"])})
            if not user:
                return jsonify({"message": "Invalid user"}), 403
            request.user = user
            return f(*args, **kwargs)
        except:
            return jsonify({"message": "Token error"}), 403
    wrap.__name__ = f.__name__
    return wrap

# Authentication Routes
@app.route("/api/register", methods=["POST"])
def register():
    data = request.json
    hashed = bcrypt.hashpw(data["password"].encode(), bcrypt.gensalt())
    if users.find_one({"email": data["email"]}):
        return jsonify({"message": "User already exists"}), 409
    user = users.insert_one({"email": data["email"], "password": hashed})
    return jsonify({"id": str(user.inserted_id)})

@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    user = users.find_one({"email": data["email"]})
    if user and bcrypt.checkpw(data["password"].encode(), user["password"]):
        token = jwt.encode({
            "id": str(user["_id"]),
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, SECRET)
        return jsonify({"token": token})
    return jsonify({"message": "Invalid credentials"}), 401

# Card Routes
@app.route("/api/cards", methods=["POST"])
@token_required
def save_card():
    data = request.json
    card = {
        "user_id": request.user["_id"],
        "name": data["name"],
        "image": data["image"],
        "price": data.get("price", 0),
        "favorite": False
    }
    result = cards.insert_one(card)
    return jsonify({"message": "Card saved", "id": str(result.inserted_id)}), 201

@app.route("/api/cards", methods=["GET"])
@token_required
def get_cards():
    user_cards = list(cards.find({"user_id": request.user["_id"]}))
    for card in user_cards:
        card["_id"] = str(card["_id"])
        card["user_id"] = str(card["user_id"])
    return jsonify(user_cards)

@app.route("/api/cards/<card_id>/favorite", methods=["PATCH"])
@token_required
def toggle_favorite(card_id):
    card = cards.find_one({"_id": ObjectId(card_id), "user_id": request.user["_id"]})
    if not card:
        return jsonify({"message": "Card not found"}), 404
    new_favorite_status = not card.get("favorite", False)
    cards.update_one({"_id": ObjectId(card_id)}, {"$set": {"favorite": new_favorite_status}})
    return jsonify({"favorite": new_favorite_status})

# Profile Route
@app.route("/api/profile", methods=["GET"])
@token_required
def get_profile():
    user = request.user
    return jsonify({
        "id": str(user["_id"]),
        "email": user["email"]
    })

# Price endpoint (mock)
@app.route("/api/price/<name>")
def get_price(name):
    import random
    return jsonify({"price": round(random.uniform(1, 300), 2)})

# Serve React App
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_vue(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")

# For local testing
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))

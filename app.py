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

app = Flask(__name__)
CORS(app)

client = MongoClient(os.getenv("MONGO_URI"))
db = client.pokemon_tracker
users = db.users
cards = db.cards
SECRET = os.getenv("JWT_SECRET", "devsecret")

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
        token = jwt.encode({"id": str(user["_id"]), "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)}, SECRET)
        return jsonify({"token": token})
    return jsonify({"message": "Invalid credentials"}), 401

@app.route("/api/cards", methods=["GET"])
@token_required
def get_cards():
    user_id = str(request.user["_id"])
    user_cards = list(cards.find({"userId": user_id}))
    for c in user_cards:
        c["id"] = str(c["_id"])
        del c["_id"]
    return jsonify(user_cards)

@app.route("/api/cards", methods=["POST"])
@token_required
def add_card():
    data = request.json
    card = {"name": data["name"], "userId": str(request.user["_id"])}
    result = cards.insert_one(card)
    return jsonify({"id": str(result.inserted_id)})

@app.route("/api/price/<name>")
def get_price(name):
    import random
    return jsonify({"price": round(random.uniform(1, 300), 2)})

# Serve React frontend build
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../client/dist"))
    if path != "" and os.path.exists(os.path.join(root_dir, path)):
        return send_from_directory(root_dir, path)
    else:
        return send_from_directory(root_dir, "index.html")

if __name__ == "__main__":
    app.run(debug=True)

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

@app.route("/api/profile", methods=["GET"])
@token_required
def get_profile():
    user = request.user
    return jsonify({
        "id": str(user["_id"]),
        "email": user["email"]
    })

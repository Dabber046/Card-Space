# 🔥 Pokémon Card Tracker (Full Stack)

This project includes both the frontend (React + Tailwind) and the backend (Flask + MongoDB).

## 🧱 Stack

- **Frontend**: React, Tailwind CSS, React Router
- **Backend**: Flask, MongoDB (local), JWT Auth
- **Extras**: Dark Mode, Charizard Glow, Favorites, Responsive UI

## 🚀 Getting Started

### Backend Setup
1. Navigate to `/server`
2. Create a `.env` from `.env.example`
3. Start MongoDB locally
4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   python app.py
   ```

### Frontend Setup
1. Navigate to `/client`
2. Install dependencies:
   ```bash
   npm install
   npm run dev
   ```

## 👨‍💻 Author
**Jared Mindock**

---

## 🚀 Deploy to Render

1. Push this project to a new GitHub repo
2. Go to [https://dashboard.render.com](https://dashboard.render.com)
3. Click "New Web Service" → Connect your GitHub repo
4. Render will auto-detect `render.yaml` and set everything up
5. Add your environment variables when prompted:
   - `MONGO_URI`
   - `JWT_SECRET`
6. Click deploy and your app will be live!

You can edit `render.yaml` or `.env.example` for future changes.

This is a work in progress so this will be updated as i go along. 

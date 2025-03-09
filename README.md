# Spirit11 - The Ultimate Inter-University Fantasy Cricket Game

## 🚀 Project Overview
MoraSpirit brings cricket fans an exciting opportunity to engage with the **Inter-University Cricket Tournament** like never before! 

Introducing **Spirit11**, a fantasy cricket league where users can:
- Build their own dream teams from real university players.
- Analyze player statistics.
- Compete with others for the top spot on the leaderboard.
- Get AI-powered assistance from the **Spiriter Chatbot** for smart team selections.

### 🎯 Key Features
- **Admin Panel:** Manage players, their statistics, and system logic.
- **User Interface:** Authenticated users can build & manage their fantasy teams.
- **AI Chatbot (Spiriter):** Provides assistance with team selection and player insights.

## ⚙️ Tech Stack
- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB
- **AI Chatbot:** Python (FastAPI)

---

## 🏗️ Project Setup & Installation

### 🔹 Backend Setup
#### 1. Clone the Repository
```sh
git clone https://github.com/MoraByteSquad/SpiritX_ByteSquad_02.git
cd backend
```

#### 2. Set Up Environment Variables
Create a **.env** file in the **backend** directory and add the following:
```
#PORT
PORT=8000

#DATABASE
DB_URI="mongodb_url"
DB_NAME="SpiritX_ByteSquad_02"

#JWT
JWT_SECRET="your_secret"
JWT_EXPIRES_IN="day"

#API_KEYS
GEMINI_API_KEY="your_api_key"
```

#### 3. Install Dependencies
```sh
npm install
```

#### 4. Start the Backend Server
```sh
npm start
```

### 🔹 Frontend Setup
#### 1. Navigate to the Frontend Directory
```sh
cd frontend
```

#### 2. Install Dependencies
```sh
npm install
```

#### 3. Start the Frontend Server
```sh
npm run dev
```

---

## 🤖 AI Chatbot Setup
The AI-powered chatbot **Spiriter** helps users with team selection.

#### 1. Navigate to the Chatbot Directory
```sh
cd chatbotbackend
```

#### 2. Create a Virtual Environment
```sh
python -m venv venv
```

#### 3. Activate the Virtual Environment
- **Windows:**
```sh
venv\Scripts\activate
```
- **Mac/Linux:**
```sh
source venv/bin/activate
```

#### 4. Install Dependencies
```sh
pip install -r requirements.txt
```

#### 5. Run the Chatbot
```sh
python main.py
```

---

## 📂 Project Structure
```
Spirit11/
│── backend/
│   │── chatbotbackend/
│         │──main.py
│         │──requirements.txt
│         ├── venv/
│        
│   ├── models/
│   ├── utils/
│   └── README.md
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   ├── utils/
│   ├── index.js
│   ├── .env
│   ├── package.json
│   └── README.md
│
│── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── styles.css
│   ├── public/
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── README.md
│

```

---

## 🏆 Game Rules
1. Users start with an initial budget of **Rs.9,000,000**.
2. Users create a fantasy team from the provided dataset.
3. Teams earn points based on their real-life performance.
4. Users can view leaderboards to track progress.
5. The **Spiriter AI Chatbot** helps users make informed selections.

---

## 🛠️ CRUD Operations
- **Admins** can perform CRUD operations on players and stats.
- **Users** can only select teams using the given dataset.

---

## 🏅 Leaderboard & Points System
Players accumulate points based on real-world match performances. Users with the highest scores rank at the top of the leaderboard!

---

## 🚀 Deployment
To deploy the application:
1. Use **MongoDB Atlas** for the database.
2. Deploy the **backend** using a cloud provider like **Render, Vercel, or AWS**.
3. Deploy the **frontend** using **Vercel or Netlify**.
4. Use **Docker** for containerization (optional).

---

## 📌 Contribution Guidelines
1. Fork the repository.
2. Create a new branch (`feature-xyz`).
3. Commit changes with meaningful messages.
4. Push the branch & create a pull request.

---

## 📧 Contact
For queries, reach out to the development team.

🎯 **Let’s build the ultimate fantasy cricket experience together!** 🏏🔥

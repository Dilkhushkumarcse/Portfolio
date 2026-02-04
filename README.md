# Personal Portfolio – Flask

A modern, responsive **personal portfolio website** built using **Flask**, designed to showcase my **projects, skills, achievements, certifications**, and provide a **secure contact system** with CAPTCHA protection, database storage, email, and WhatsApp alerts.

This portfolio reflects my journey as a **Data Scientist / Data Analyst / AI & ML Engineer**.

---

## Live Features

- Modern dark UI with animations
- Fully responsive (desktop & mobile)
- Role-based project filtering
- Multiple resumes (View & Download)
- Achievements & certifications with fullscreen preview
- Secure contact form with:
  - Custom **character-based CAPTCHA**
  - Database storage (SQLite)
  - Email notification (Gmail SMTP)
  - WhatsApp alert (Twilio)
- Data privacy & confidentiality notice
- Smooth page transitions & navigation

---

## Tech Stack

### Frontend
- HTML5
- CSS3 (Custom styling, animations)
- JavaScript (filters, typing effect, CAPTCHA refresh)

### Backend
- Python
- Flask
- Flask-SQLAlchemy
- Flask-Mail

### Database
- SQLite (`messages.db`)

### Integrations
- Gmail SMTP (Email alerts)
- Twilio WhatsApp API
- Custom CAPTCHA (A–Z, 0–9)

---

## Project Structure

```

portfolio/
│
├── app.py
├── messages.db
├── requirements.txt
│
├── templates/
│   ├── base.html
│   ├── index.html
│   ├── projects.html
│   ├── experience.html
│
├── static/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   ├── resumes/
│   ├── certificates/
│
└── README.md

````

---

## Featured Projects

- **RAG-Based AI Teaching Assistant**
- **California House Price Prediction (Flask + ML)**
- **Chronic Kidney Disease Prediction (Streamlit)**
- **Excel Sales Dashboard (Data Analytics)**

Each project includes:
- Description
- Tech stack
- GitHub link
- Role-based filtering

---

## Resume Section

Multiple resumes tailored for:
- Data Scientist
- Data Analyst
- AI / ML Engineer

Options:
- View Resume
- Download Resume

---

## Achievements & Certifications

- Hackathon – 3rd Place
- International Conference on AI & ML (ICAML-2025)
- Python Certification (IIT Bombay)
- AI, ML, Data Science courses
- Internship certificates

Certificates can be viewed **fullscreen (image / PDF)**.

---

## Contact System (Secure)

### Features
- Custom CAPTCHA (no Google dependency)
- CAPTCHA refresh button
- Stores messages in database
- Email alert to owner
- WhatsApp alert to phone
- Flash success/error messages

### CAPTCHA Rules
- Only **Capital Letters (A–Z)** and **Numbers (0–9)**
- Case-insensitive validation
- Session-based security

---

## Database Model

```python
class ContactMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(120))
    message = db.Column(db.Text)
    created_at = db.Column(db.DateTime)
````

---

## Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio
```

### 2️⃣ Create Virtual Environment

```bash
python -m venv venv
venv\Scripts\activate
```

### 3️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

### 4️⃣ Configure Credentials

Update in `app.py`:

* Gmail App Password
* Twilio SID & Auth Token
* WhatsApp phone number

---

### 5️⃣ Run Application

```bash
python app.py
```

Open browser:

```
http://127.0.0.1:5000
```

---

## View Stored Messages (Optional)

```python
from app import db, ContactMessage
messages = ContactMessage.query.all()

for m in messages:
    print(m.name, m.email, m.message)
```

---

## Privacy & Security

* No third-party CAPTCHA tracking
* Messages stored securely
* User data never shared
* Session-based CAPTCHA validation

---

## 👨‍💻 Author

**Dilkhush Kumar**
B.Tech – Computer Science & Engineering
Data Scientist | AI/ML Engineer | Data Analyst

* Email: [dilkhush4kr@gmail.com](mailto:dilkhush4kr@gmail.com)
* LinkedIn: [https://www.linkedin.com/in/dilkhush-kumar-b58664273/](https://www.linkedin.com/in/dilkhush-kumar-b58664273/)
* GitHub: [https://github.com/Dilkhushkumarcse](https://github.com/Dilkhushkumarcse)

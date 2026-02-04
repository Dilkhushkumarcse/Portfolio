from flask import Flask, render_template, request, redirect, flash, session, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message
from datetime import datetime
import random
import string

# APP CONFIG
app = Flask(__name__)
app.secret_key = "portfolio_secret_key"

# DATABASE CONFIG
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///messages.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# EMAIL CONFIG
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'dilkhush4kr@gmail.com'
app.config['MAIL_PASSWORD'] = 'YOUR_APP_PASSWORD'
mail = Mail(app)

# DATABASE MODEL
class ContactMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(120))
    message = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# CAPTCHA (A–Z + 0–9)
def generate_captcha():
    chars = string.ascii_uppercase + string.digits
    captcha = ''.join(random.choices(chars, k=5))
    session['captcha'] = captcha
    return captcha

# ROUTES
@app.route("/")
def home():
    captcha = generate_captcha()
    return render_template("index.html", captcha=captcha)

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/projects")
def projects():
    return render_template("projects.html")

@app.route("/experience")
def experience():
    return render_template("experience.html")

# NO contact.html — POST ONLY
@app.route("/contact", methods=["POST"])
def contact():
    name = request.form.get("name")
    email = request.form.get("email")
    message = request.form.get("message")
    user_captcha = request.form.get("captcha")

    if not all([name, email, message, user_captcha]):
        flash("All fields including CAPTCHA are required.", "error")
        return redirect(url_for("home") + "#contact")

    if user_captcha.upper() != session.get("captcha"):
        flash("Invalid CAPTCHA. Please try again.", "error")
        return redirect(url_for("home") + "#contact")

    # Save to DB
    new_msg = ContactMessage(name=name, email=email, message=message)
    db.session.add(new_msg)
    db.session.commit()

    # Email alert
    try:
        email_msg = Message(
            subject="New Portfolio Contact Message",
            sender=app.config['MAIL_USERNAME'],
            recipients=["dilkhush4kr@gmail.com"],
            body=f"""
Name: {name}
Email: {email}

Message:
{message}
"""
        )
        mail.send(email_msg)
    except Exception as e:
        print("Email error:", e)

    # WhatsApp alert
    try:
        send_whatsapp_alert(name, email, message)
    except Exception as e:
        print("WhatsApp error:", e)

    flash("Message sent successfully! I’ll get back to you soon.", "success")
    return redirect(url_for("home") + "#contact")

@app.route("/refresh-captcha")
def refresh_captcha():
    captcha = generate_captcha()
    return {"captcha": captcha}

# MAIN
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)

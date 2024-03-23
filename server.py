from flask import Flask
from flask import request
from flask import redirect
from flask import render_template
import mysql.connector
import pyrebase
app = Flask(__name__)


# firebase credentials
config = {
    'apiKey': "AIzaSyAMd6Tw1a0k6F1CG4al43Vk6CRLCFlpy_4",
    'authDomain': "trial-b8c5a.firebaseapp.com",
    'databaseURL': "https://trial-b8c5a-default-rtdb.firebaseio.com",
    'projectId': "trial-b8c5a",
    'storageBucket': "-b8trialc5a.appspot.com",
    'messagingSenderId': "287460725639",
    'appId': "1:287460725639:web:b55cd1b4ca7b08babdf922",
    'measurementId': "G-YH3Y5QKY95"
}
# initialize firebase
firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
db = firebase.database()

# Initialze person as dictionary
person = {"is_logged_in": False, "username": "", "email": "", "uid": ""}


@app.route('/')
def login_page():
    if person["is_logged_in"] == True:
        return render_template('./index.html')
    else:
        return render_template('./login.html')


@app.route("/result", methods=["POST", "GET"])
# If someone clicks on login, they are redirected to /result
def result():
    if request.method == "POST":  # Only if data has been posted
        result = request.form  # Get the data
        email = result["email"]
        password = result["password"]
        try:
            # Try signing in the user with the given information
            user = auth.sign_in_with_email_and_password(email, password)
            # Insert the user data in the global person
            global person
            person["is_logged_in"] = True
            person["email"] = user["email"]
            person["uid"] = user["localId"]
            # Get the name of the user
            data = db.child("users").get()
            person["username"] = data.val()[person["uid"]]["username"]
            # Redirect to home page
            return redirect('./index.html')

        except Exception as e:
            print(e)
            # If there is any error, redirect back to login
            return redirect('./login.html')
    else:
        if person["is_logged_in"] == True:
            return redirect('./index.html')

        else:
            return redirect('./login.html')


@app.route("/register", methods=["POST", "GET"])
# If someone clicks on signup, they are redirected to /register
def register():
    if request.method == "POST":  # Only listen to POST
        result = request.form.to_dict()  # Get the data submitted
        email = result["email"]
        password = result["password"]
        name = result["username"]
        try:
            # Try creating the user account using the provided data
            auth.create_user_with_email_and_password(email, password)
            # Login the user
            user = auth.sign_in_with_email_and_password(email, password)
            # Add data to global person
            global person
            person["is_logged_in"] = True
            person["email"] = user["email"]
            person["uid"] = user["localId"]
            person["username"] = name
            # Append data to the firebase realtime database
            data = {"username": name, "email": email}
            db.child("users").child(person["uid"]).set(data)
            # Go to welcome page
            return redirect('./index.html')
        except Exception as e:
            print(e)
            # If there is any error, redirect to register
            return redirect('./login.html')


@app.route('/submit_form', methods=['POST', 'GET'])
def accept_form():
    if request.method == 'POST':
        data = request.form.to_dict()
        project_name = data['project_name']
        property_type = data['property_type']
        area_in_sqft = data['area_in_sqft']
        developer_name = data['developer_name']
        bedrooms = data['bedrooms']
        bathrooms = data['bathrooms']
        location = data['location']
        project_status = data['project_status']
        print(project_name, property_type, area_in_sqft, developer_name,
              bedrooms, bathrooms, location, project_status)
        properties = properties = {
            "project_name": project_name,
            "property_type": property_type,
            "area_in_sqft": area_in_sqft,
            "developer_name": developer_name,
            "bedrooms": bedrooms,
            "bathrooms": bathrooms,
            "location": location,
            "project_status": project_status
        }

        if person["username"]:
            db.child("users").child(person["uid"]).child(
                person["username"]).push(properties)

        # db_entry(mydb, email, subject, message)

        return redirect('./thankyou.html')
    else:
        'get request'


@app.route('/signup.html')
def signup_page():
    return render_template('./signup.html')


@app.route('/<string:page_name>')
def route_pages(page_name):
    if person["is_logged_in"] == True:
        return render_template(page_name)
    else:
        print('bug')
        return render_template('./login.html')

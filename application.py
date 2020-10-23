#---------------------------------- Libraries to Load --------------------------------------------------------------
import os

import datetime

from flask import Flask, flash, redirect, render_template, request, session, json
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.exceptions import default_exceptions
from werkzeug.security import check_password_hash, generate_password_hash

from models import users_db, exercises_db, sessions_db, workouts_db, widgets_db, SQL, sqlite3
from helpers import login_required, get_time, apology

#-------------------------------- Configuration --------------------------------------------------------------------
# Configure application
app = Flask(__name__)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Ensure responses aren't cached
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///workout_tracker.db")

#------------------------------ Landing Page -----------------------------------------------------------------------
@app.route("/", methods=["GET", "POST"])
@login_required
def index():
    with sqlite3.connect('workout_tracker.db') as conn:

        #extracting username and number of workouts for header
        u_db = users_db(session["user_id"], conn)
        username = u_db.get_username()
        num_workouts = u_db.get_num_workouts()

        #extracting distinct exercises and muscle groups for widget definition
        exc_db = exercises_db(conn)
        exercises = exc_db.get_exercises()
        muscle_groups = exc_db.get_muscle_groups()
        muscle_groups.sort(key=lambda r: r[0])

        #extraction selection array for grouping exercises by muscle group in widget selector
        selection_array = exc_db.get_selections(muscle_groups)
        selection_array.sort(key=lambda r: r[0])

        for selection in selection_array:
            selection[1].sort(key=lambda r: r[0])

        #generating session history array for session history widget
        widg_db = widgets_db(session["user_id"], conn)
        sessions = widg_db.get_sessions()
        hist_sessions = widg_db.gen_hist_sessions(sessions)

        hist_sessions.sort(key=lambda r: r[0])

        workouts_week_data = widg_db.get_workouts_week(sessions)

        #generating list of widgets to display
        user_widgets = widg_db.get_user_widgets()
        user_widget_data = widg_db.gen_user_widget_data(user_widgets, sessions)

        #handling widget addition and removal
        if request.method == "POST":
            exercise_check = request.form.get("exc_select")
            muscle_group_check = request.form.get("mg_select")

            for exercise in exercises:
                if request.form.get("widget_remover_" + exercise[0]) is not None:
                    widget_remover = exercise[0]

            for muscle_group in muscle_groups:
                if request.form.get("widget_remover_" + muscle_group[0]) is not None:
                    widget_remover = muscle_group[0]

            if exercise_check is not None:
                widg_db.add_user_widgets(exercise_check)
            elif muscle_group_check is not None:
                widg_db.add_user_widgets(muscle_group_check)
            else:
                widg_db.remove_user_widget(widget_remover)

            return redirect('/')

        return render_template("landing.html", username=username, num_workouts=num_workouts, exercises=exercises, muscle_groups=muscle_groups, hist_sessions=hist_sessions, workouts_week_data=workouts_week_data, user_widget_data=user_widget_data, selection_array=selection_array)

#------------------------------  Workout ---------------------------------------------------------------------------
@app.route("/workout", methods=["GET", "POST"])
@login_required
def workout():
    with sqlite3.connect('workout_tracker.db') as conn:
        if request.method == "POST":
            u_db = users_db(session["user_id"], conn)
            exc_db = exercises_db(conn)

            cardio_array = exc_db.get_cardio_array()

            key_array = []
            j = 0
            for key, value in request.form.items():
                j += 1
                key_array.append([key, value])
            last_index = int(key_array[j-2][0][-1:])        #each exercise row has an associated set of keys (forms) with an index for each row. last_index is the index of the highest row submitted
            workout_array = [None] * (last_index + 1)

            for y in range(last_index + 1):
                workout_array[y] = []

            for x in range(j-1):          #loop through all keys but the date key, empty or not
                if key_array[x][1]:        #if not empty
                    workout_index = int(key_array[x][0][-1:])
                    workout_array[workout_index].append(key_array[x])

            workout_id_array = [None] * 15
            workout_index = 0

            for workout in workout_array:                              #for each workout row (date_selector, exercise_selector, new_exc_name, new_exc_mg_selector, sets, repetitions, resistance, miles, hours, minutes, seconds)
                #get exercise_id, add exc if necessary
                if workout[0][1] == 'Add new...':
                    exc_id = u_db.add_exercise(workout[1][1], workout[2][1])
                else:
                    exc_id = u_db.get_exercise_id(workout[0][1])

                #handle hours, minutes, seconds if cardio
                duration = None
                duration_test = False
                for element in cardio_array:
                    new_add_cardio = False
                    if len(workout) >= 3:
                        if workout[2][1] == element:
                            new_add_cardio = True

                    if ((workout[0][1] == element) or (new_add_cardio)):
                        hour = "00"
                        minute = "00"
                        second = "00"
                        for element in workout:
                            if "hours" in element[0]:
                                if len(element[1]) == 1:
                                    hour = "0" + element[1]
                                else:
                                    hour = element[1]
                                duration_test = True
                            if "minutes" in element[0]:
                                if len(element[1]) == 1:
                                    minute = "0" + element[1]
                                else:
                                    minute = element[1]
                                duration_test = True
                            if "seconds" in element[0]:
                                if len(element[1]) == 1:
                                    second = "0" + element[1]
                                else:
                                    second = element[1]
                                duration_test = True
                        if duration_test:
                            duration = hour + ":" + minute + ":" + second

                sets = None
                reps = None
                resistance = None
                distance = None
                for element in workout:
                    if "sets" in element[0]:
                        sets = element[1]
                    if "reps" in element[0]:
                        reps = element[1]
                    if "resistance" in element[0]:
                        resistance = element[1]
                    if "miles" in element[0]:
                        distance = element[1]

                workout_id = u_db.add_workout(exc_id, sets, reps, resistance, distance, duration)
                workout_id_array[workout_index] = workout_id
                workout_index += 1
            if (key_array[j-1][1] == ''):
                now = datetime.datetime.now()
                date_time_str = now.strftime("%m/%d/%Y | %I:%M:%S %p ")
            else:
                date_time_str = key_array[j-1][1]
                date_time_obj = datetime.datetime.strptime(date_time_str, "%Y-%m-%d")
                date_time_str = date_time_obj.strftime("%m/%d/%Y | %I:%M:%S %p ")

            workout_string = ""
            x = 0
            for workout in workout_id_array:
                workout_string += ("workout_" + str(x) +", ")
                x += 1

            workout_string = workout_string[:-2]

            workout_id_string = ""
            x = 0
            for workout in workout_id_array:
                workout_id_string += (str(workout) + ", ")
                x += 1

            workout_id_string = workout_id_string[:-2]

            u_db.add_session(date_time_str, workout_id_array)

            return redirect("/")

        u_db = users_db(session["user_id"], conn)
        username = u_db.get_username()
        num_workouts = u_db.get_num_workouts()

        exc_db = exercises_db(conn)
        muscle_groups = exc_db.get_muscle_groups()
        selection_array = exc_db.get_selections(muscle_groups)

        muscle_groups.sort(key=lambda r: r[0])
        selection_array.sort(key=lambda r: r[0])

        for selection in selection_array:
            selection[1].sort(key=lambda r: r[0])

        lift_array = exc_db.get_lift_array()
        cardio_array = exc_db.get_cardio_array()

        widg_db = widgets_db(session["user_id"], conn)
        user_workout_hist = widg_db.get_user_workout_hist()
        last_workout_array = widg_db.get_last_workout_array()

        return render_template("workout.html", username=username, num_workouts=num_workouts, user_widget_data=[], workouts_week_data=[], muscle_groups=muscle_groups, selection_array=selection_array, lift_array=lift_array, cardio_array=cardio_array, user_workout_hist=user_workout_hist, last_workout_array=last_workout_array)

#------------------------------ Login -------------------------------------------------------------------------------
@app.route("/login", methods=["GET", "POST"])
def login():

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":

        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("must provide username", 403)

        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("must provide password", 403)

        # Query database for username
        rows = db.execute("SELECT * FROM users WHERE username = :username",
                      username=request.form.get("username"))

    # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(rows[0]["hash"], request.form.get("password")):
            return apology("invalid username and/or password", 403)

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]
        session["username"] = rows[0]["username"]

        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html", user_widget_data=[], workouts_week_data=[])

#------------------------------ Register ----------------------------------------------------------------------------
@app.route("/register", methods=["GET", "POST"])
def register():

    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        confirmation = request.form.get('confirmation')

        print(password)
        print(confirmation)

        if username is '':
            return apology('Username can not be left blank')

        if password != confirmation:
            return apology('Password and confirmation must match')

        # store new user in users table
        with sqlite3.connect("workout_tracker.db") as conn:
            # access users model
            u_db = users_db("", conn)

            # insert new user
            # once user is registered this method returns the newly created user_id
            user_id = u_db.register(username, generate_password_hash(password))

            # set session id to new user id
            session['user_id'] = user_id

            # redirect to homepage
            return redirect('/')

    return render_template("register.html", user_widget_data=[], workouts_week_data=[])

#------------------------------ Logout ----------------------------------------------------------------------------
@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")

#------------------------------- Error handling ------------------------------------------------------------------
def errorhandler(e):
    """Handle error"""
    return apology(e.name, e.code)

# listen for errors
for code in default_exceptions:
    app.errorhandler(code)(errorhandler)
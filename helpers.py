#--------------------------------------------- libraries to import ---------------------------------------
import requests
import urllib.parse
from datetime import datetime

from flask import redirect, render_template, request, session
from functools import wraps

def login_required(f):
    """
    Decorate routes to require login.
    http://flask.pocoo.org/docs/0.12/patterns/viewdecorators/
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("user_id") is None:
            return redirect("/lift_logger/login")
        return f(*args, **kwargs)
    return decorated_function

def get_time():
    now = datetime.now()
    #12-hour format
    return now.strftime('%m/%d/%Y | %I:%M:%S %p UTC')

def apology(message, code=400):
    """Render message as an apology to user."""
    def escape(s):
        """
        Escape special characters.
        https://github.com/jacebrowning/memegen#special-characters
        """
        for old, new in [("-", "--"), (" ", "-"), ("_", "__"), ("?", "~q"),
                         ("%", "~p"), ("#", "~h"), ("/", "~s"), ("\"", "''")]:
            s = s.replace(old, new)
        return s
    return render_template("apology.html", top=code, bottom=escape(message), user_widget_data=[], workouts_week_data=[]), code
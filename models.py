from cs50 import SQL
import sqlite3
import datetime

class users_db:
    def __init__(self, user_id, conn):
        self.id = user_id
        self.conn = conn
        self.c = conn.cursor()

    def register(self, username, hash):
        row = self.c.execute('INSERT INTO users (username, hash) VALUES (?, ?)', (username, hash))
        self.conn.commit()
        return self.c.lastrowid

    def set_id(self, id):
        self.id = id

    def get_username(self):
        row = self.c.execute('SELECT username FROM users WHERE id=?', (self.id,))
        return self.c.fetchone()[0]

    def get_num_workouts(self):
        rows = self.c.execute('SELECT * FROM sessions WHERE user_id=?', (self.id,))
        records = rows.fetchall()

        num_workouts = 0

        for row in records:
            num_workouts += 1

        return num_workouts

    def add_exercise(self, name, muscle_group):
        row = self.c.execute('INSERT INTO exercises (name, muscle_group) VALUES (?, ?)', (name, muscle_group))
        self.conn.commit()
        lastrowid = self.c.lastrowid
        return lastrowid

    def get_exercise_id(self, name):
        row = self.c.execute('SELECT exercise_id FROM exercises WHERE name=?', (name,))
        data = self.c.fetchall()
        return data[0][0]

    def add_workout(self, exercise_id, sets, reps, resistance, distance, duration):
        self.c.execute('INSERT INTO workouts (exercise_id, sets, repetitions, resistance, distance, duration) VALUES(?, ?, ?, ?, ?, ?)', (exercise_id, sets, reps, resistance, distance, duration))
        self.conn.commit()
        lastrowid = self.c.lastrowid
        return lastrowid

    def add_session(self, date_time_str, workout_id_array):
        self.c.execute('INSERT INTO sessions (user_id, date_time, workout_1, workout_2, workout_3, workout_4, workout_5, workout_6, workout_7, workout_8, workout_9, workout_10, workout_11, workout_12, workout_13, workout_14, workout_15) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', (self.id, date_time_str, workout_id_array[0], workout_id_array[1], workout_id_array[2], workout_id_array[3], workout_id_array[4], workout_id_array[5], workout_id_array[6], workout_id_array[7], workout_id_array[8], workout_id_array[9], workout_id_array[10], workout_id_array[11], workout_id_array[12], workout_id_array[13], workout_id_array[14]))
        self.conn.commit()
        lastrowid = self.c.lastrowid
        return lastrowid

class exercises_db:
    def __init__(self, conn):
        self.conn = conn
        self.c = conn.cursor()

    def get_exercises(self):
        row = self.c.execute('SELECT DISTINCT name FROM exercises')
        return self.c.fetchall()

    def get_muscle_groups(self):
        row = self.c.execute('SELECT DISTINCT muscle_group FROM exercises')
        return self.c.fetchall()

    def get_selections(self, muscle_groups):
        selection_array = [None] * len(muscle_groups)

        for i in range(len(muscle_groups)):
            selection_array[i] = [None] * 2
            selection_array[i][0] = muscle_groups[i][0]

            row = self.c.execute('SELECT name FROM exercises WHERE muscle_group=?', muscle_groups[i])
            rows = self.c.fetchall()

            exc_array = [None] * len(rows)
            selection_array[i][1] = [None] * len(exc_array)
            for j in range(len(exc_array)):
                exc_array[j] = rows[j][0]
                selection_array[i][1][j] = rows[j][0]

        return selection_array

    def get_lift_array(self):
        query = self.c.execute('SELECT name FROM exercises WHERE NOT muscle_group="Cardio"')
        data = self.c.fetchall()

        rows = [None] * len(data)
        for i in range(len(rows)):
            rows[i] = data[i][0]

        return rows

    def get_cardio_array(self):
        query = self.c.execute('SELECT name FROM exercises WHERE muscle_group="Cardio"')
        data = self.c.fetchall()

        rows = [None] * len(data)
        for i in range(len(rows)):
            rows[i] = data[i][0]

        return rows

class workouts_db:
    def __init__(self, conn):
        self.conn = conn
        self.c = conn.cursor()

    def get_workouts(self):
        workouts = self.c.execute('SELECT * FROM workouts')
        return self.c.fetchall()

class sessions_db:
    def __init__(self, user_id, conn):
        self.id = user_id
        self.conn = conn
        self.c = conn.cursor()

    def get_sessions(self):
        sessions = self.c.execute('SELECT * FROM sessions WHERE user_id=?', (self.id,))
        return self.c.fetchall()

class widgets_db:
    def __init__(self, user_id, conn):
        self.id = user_id
        self.conn = conn
        self.c = conn.cursor()

    def get_sessions(self):
        sessions = self.c.execute('SELECT * FROM sessions WHERE user_id=?', (self.id,))
        return self.c.fetchall()

    def get_last_workout_array(self):
        exc_query = self.c.execute('SELECT exercise_id, name FROM exercises')
        exercise_array = self.c.fetchall()

        user_hist_array = [None] * len(exercise_array)

        sess_query = self.c.execute('SELECT * FROM sessions WHERE user_id=?', (self.id,))
        sessions = self.c.fetchall()

        i = 0
        for exercise in exercise_array:
            user_hist_array[i] = [None] * 3
            user_hist_array[i][0] = exercise[0]
            user_hist_array[i][1] = exercise[1]

            workout_query = self.c.execute('SELECT * FROM workouts WHERE exercise_id=?', (exercise[0],))
            workouts = self.c.fetchall()

            latest_workout = [datetime.datetime(1900, 1, 1), None, None, None]
            for workout in workouts:         #for each workout of this exercise type
                for session in sessions:     #iterate through all sessions
                    for x in range(3, 18):   #iterate through each workout in that session
                        if session[x] == workout[0]:     #and if that sessions workout is this one, increment j
                            session_date = datetime.datetime.strptime(session[2], "%m/%d/%Y | %I:%M:%S %p ")
                            if session_date > latest_workout[0]:
                                latest_workout = [session_date, workout[4], workout[3], workout[2]]
                                if latest_workout[1] is None:
                                    latest_workout[1] = 0
                                if latest_workout[2] is None:
                                    latest_workout[2] = 0
                                if latest_workout[3] is None:
                                    latest_workout[3] = 0
            user_hist_array[i][2] = [None] * 3
            user_hist_array[i][2][0] = latest_workout[1]
            user_hist_array[i][2][1] = latest_workout[2]
            user_hist_array[i][2][2] = latest_workout[3]

            #filling out user_hist_array for new users who don't yet have a workout of a given exercise type
            for k in range(3):
                if user_hist_array[i][2][k] is None:
                    user_hist_array[i][2][k] = '0'
            i += 1

        return user_hist_array

    def get_user_workout_hist(self):
        exc_query = self.c.execute('SELECT exercise_id, name FROM exercises')
        exercise_array = self.c.fetchall()

        user_hist_array = [None] * len(exercise_array)

        sess_query = self.c.execute('SELECT * FROM sessions WHERE user_id=?', (self.id,))
        sessions = self.c.fetchall()

        i = 0
        for exercise in exercise_array:

            user_hist_array[i] = [None] * 3
            user_hist_array[i][0] = exercise[0]
            user_hist_array[i][1] = exercise[1]

            workout_query = self.c.execute('SELECT * FROM workouts WHERE exercise_id=?', (exercise[0],))
            workouts = self.c.fetchall()

            j = 0
            for workout in workouts:         #for each workout of this exercise type
                for session in sessions:     #iterate through all sessions
                    for x in range(3, 18):   #iterate through each workout in that session
                        if session[x] == workout[0]:     #and if that sessions workout is this one, increment j
                            j += 1

            user_hist_array[i][2] = [None] * (j)

            for x in range(j):
                user_hist_array[i][2][x] = [None] * 6

            k = 0
            for workout in workouts:
                for session in sessions:
                    datetime_str = session[2]
                    datetime_object = datetime.datetime.strptime(datetime_str, '%m/%d/%Y | %H:%M:%S %p ')
                    date_object=datetime.datetime.date(datetime_object)

                    for x in range(3,18):
                        if session[x] == workout[0]:
                            user_hist_array[i][2][k][0] = date_object.strftime("%Y-%m-%d")  ######
                            user_hist_array[i][2][k][1] = workout[4]
                            user_hist_array[i][2][k][2] = workout[3]
                            user_hist_array[i][2][k][3] = workout[2]
                            user_hist_array[i][2][k][4] = workout[5]
                            user_hist_array[i][2][k][5] = workout[6]

                            for q in range(1,6):
                                user_hist_array[i][2][k][q] = str(user_hist_array[i][2][k][q])

                            k += 1
            i += 1

        return user_hist_array

    def gen_hist_sessions(self, sessions):
        hist_sessions = [None] * len(sessions)
        i = 0

        for session in sessions:
            hist_sessions[i] = [None] * 3
            datetime_str = session[2]
            datetime_object = datetime.datetime.strptime(datetime_str, '%m/%d/%Y | %H:%M:%S %p ')
            date_object=datetime.datetime.date(datetime_object)
            hist_sessions[i][0] = date_object

            workout_ids = []

            workout_counter = 0
            for x in range(3,18):
                if session[x] is not None:
                    workout_ids.append(session[x])
                    workout_counter += 1

            hist_sessions[i][2] = workout_counter
            exercise_ids = []

            for x in range(len(workout_ids)):
                rows = self.c.execute('SELECT exercise_id FROM workouts WHERE workout_id=?', [workout_ids[x]])
                exc_id = self.c.fetchone()
                exercise_ids.append(exc_id[0])

            muscle_groups = []

            for x in range(len(exercise_ids)):
                rows = self.c.execute('SELECT muscle_group FROM exercises WHERE exercise_id=?', [exercise_ids[x]])
                msc_g = str(self.c.fetchone())

                muscle_group_test = False
                for y in range(len(muscle_groups)):
                    if msc_g[2:-3] in muscle_groups[y]:
                        muscle_group_test = True

                if not muscle_group_test:
                    muscle_groups.append(msc_g[2:-3])

            hist_sessions[i][1] = muscle_groups
            i += 1

        return hist_sessions

    def get_workouts_week(self, sessions):
        workouts_week_data = [None] * 5
        for x in range(5):
            workouts_week_data[x] = [[], []]

        early_date_extractor = self.c.execute('SELECT min(date_time) FROM sessions WHERE user_id=?', (self.id,))
        date_obj = self.c.fetchone()

        if (date_obj[0] is None):
            return workouts_week_data

        earliest_date = datetime.datetime.strptime(date_obj[0], '%m/%d/%Y | %H:%M:%S %p ')
        running_day = datetime.date.today()
        last_Monday = running_day - datetime.timedelta(days=running_day.weekday(), weeks = 0)

        running_counter = 0

        while (running_day >= earliest_date.date()):
            days_in_week = int((running_day-last_Monday).days)

            for day in range(days_in_week + 1):
                for session in sessions:
                    datetime_str = session[2]
                    datetime_object = datetime.datetime.strptime(datetime_str, '%m/%d/%Y | %H:%M:%S %p ')
                    date_object=datetime.datetime.date(datetime_object)
                    if (running_day == date_object):
                        running_counter += 1


                running_day = running_day - datetime.timedelta(days=1)

            if (running_day > datetime.date.today() - datetime.timedelta(days=30.42)):
                workouts_week_data[0][0].insert(0, last_Monday.strftime("%m/%d/%Y"))
                workouts_week_data[0][1].insert(0, running_counter)
            if (running_day > datetime.date.today() - datetime.timedelta(days=3*30.42)):
                workouts_week_data[1][0].insert(0, last_Monday.strftime("%m/%d/%Y"))
                workouts_week_data[1][1].insert(0, running_counter)
            if (running_day > datetime.date.today() - datetime.timedelta(days=6*30.42)):
                workouts_week_data[2][0].insert(0, last_Monday.strftime("%m/%d/%Y"))
                workouts_week_data[2][1].insert(0, running_counter)
            if (running_day > datetime.date.today() - datetime.timedelta(days=365)):
                workouts_week_data[3][0].insert(0, last_Monday.strftime("%m/%d/%Y"))
                workouts_week_data[3][1].insert(0, running_counter)

            workouts_week_data[4][0].insert(0, last_Monday.strftime("%m/%d/%Y"))
            workouts_week_data[4][1].insert(0, running_counter)

            running_counter = 0
            last_Monday = last_Monday - datetime.timedelta(days=7)

        return workouts_week_data

    def get_user_widgets(self):
        row = self.c.execute('SELECT * FROM user_widgets WHERE user_id=?', (self.id,))
        return self.c.fetchall()

    def gen_user_widget_data(self, widgets, sessions):
        user_widget_data = [None] * len(widgets)
        i = 0

        for widget in widgets:
            user_widget_data[i] = [None] * 4
            user_widget_data[i][0] = widget[0]
            user_widget_data[i][1] = widget[1]

            exc_id_extractor = self.c.execute('SELECT exercise_id FROM exercises WHERE name=?', (widget[1],))
            exc_id = self.c.fetchone()

            if exc_id != None:
                workouts_extractor = self.c.execute('SELECT workout_id, resistance, repetitions, sets, distance, duration FROM workouts WHERE exercise_id=?', exc_id)
                workouts = self.c.fetchall()

                j = 0
                for workout in workouts:
                    for session in sessions:
                        for x in range(3,18):
                            if session[x] == workout[0]:
                                j += 1

                user_widget_data[i][2] = [None] * j

                for x in range(j):
                    user_widget_data[i][2][x] = [None] * 6

                k = 0
                for workout in workouts:
                    for session in sessions:
                        datetime_str = session[2]
                        datetime_object = datetime.datetime.strptime(datetime_str, '%m/%d/%Y | %H:%M:%S %p ')
                        date_object=datetime.datetime.date(datetime_object)


                        for x in range(3,18):
                            if session[x] == workout[0]:
                                user_widget_data[i][2][k][0] = date_object
                                user_widget_data[i][2][k][1] = workout[3]
                                user_widget_data[i][2][k][2] = workout[2]
                                user_widget_data[i][2][k][3] = workout[1]
                                user_widget_data[i][2][k][4] = workout[4]
                                user_widget_data[i][2][k][5] = workout[5]
                                k += 1
            else:
                user_widget_data[i][3] = [None] * 5
                for x in range(5):
                    user_widget_data[i][3][x] = [[], []]

                exc_id_extractor = self.c.execute('SELECT exercise_id FROM exercises WHERE muscle_group==?', (widget[1],))
                exc_id = self.c.fetchall()

                early_date_extractor = self.c.execute('SELECT min(date_time) FROM sessions WHERE user_id=?', (self.id,))
                date_obj = self.c.fetchone()

                if (date_obj[0] is None):
                    return user_widget_data

                earliest_date = datetime.datetime.strptime(date_obj[0], '%m/%d/%Y | %H:%M:%S %p ')

                exercise_array = []
                for exercise in exc_id:
                    workout_query = self.c.execute('SELECT workout_id FROM workouts WHERE exercise_id=?', exercise)
                    workouts = self.c.fetchall()
                    for workout in workouts:
                        exercise_array.append((str(workout)[1:-2]))

                running_day = datetime.date.today()
                last_Monday = running_day - datetime.timedelta(days=running_day.weekday(), weeks = 0)

                running_counter = 0

                while (running_day >= earliest_date.date()):
                    days_in_week = int((running_day-last_Monday).days)

                    for q in range(days_in_week + 1):
                        for session in sessions:
                            datetime_str = session[2]
                            datetime_object = datetime.datetime.strptime(datetime_str, '%m/%d/%Y | %H:%M:%S %p ')
                            date_object=datetime.datetime.date(datetime_object)
                            if (running_day == date_object):
                                for x in range(3,18):
                                    if str(session[x]) in exercise_array:
                                        running_counter += 1

                        running_day = running_day - datetime.timedelta(days=1)

                    if (running_day > datetime.date.today() - datetime.timedelta(days=30.42)):
                        user_widget_data[i][3][0][0].insert(0, last_Monday.strftime("%m/%d/%Y"))
                        user_widget_data[i][3][0][1].insert(0, running_counter)
                    if (running_day > datetime.date.today() - datetime.timedelta(days=3*30.42)):
                        user_widget_data[i][3][1][0].insert(0, last_Monday.strftime("%m/%d/%Y"))
                        user_widget_data[i][3][1][1].insert(0, running_counter)
                    if (running_day > datetime.date.today() - datetime.timedelta(days=6*30.42)):
                        user_widget_data[i][3][2][0].insert(0, last_Monday.strftime("%m/%d/%Y"))
                        user_widget_data[i][3][2][1].insert(0, running_counter)
                    if (running_day > datetime.date.today() - datetime.timedelta(days=365)):
                        user_widget_data[i][3][3][0].insert(0, last_Monday.strftime("%m/%d/%Y"))
                        user_widget_data[i][3][3][1].insert(0, running_counter)

                    user_widget_data[i][3][4][0].insert(0, last_Monday.strftime("%m/%d/%Y"))
                    user_widget_data[i][3][4][1].insert(0, running_counter)

                    running_counter = 0
                    last_Monday = last_Monday - datetime.timedelta(days=7)

            i += 1

        for widget in user_widget_data:
            if widget[2] is not None:
                widget[2].sort(key=lambda r: r[0])

        return user_widget_data

    def add_user_widgets(self, view):
        self.c.execute('INSERT INTO user_widgets VALUES (?,?)', (self.id, view))
        self.conn.commit()

    def remove_user_widget(self, view):
        self.c.execute('DELETE FROM user_widgets WHERE user_id=? AND view=?', (self.id, view))
        self.conn.commit()




import os
from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy import Integer

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://blokandbankaandkubicz_visual_stimuli_user:1J02SdK80rDP0Q3K0gCpnjwXnqwfek8L@dpg-cgs90e8dh87qa7rv9qlg-a.frankfurt-postgres.render.com/blokandbankaandkubicz_visual_stimuli'

#postgres://blokandbankaandkubicz_visual_stimuli_user:1J02SdK80rDP0Q3K0gCpnjwXnqwfek8L@dpg-cgs90e8dh87qa7rv9qlg-a.frankfurt-postgres.render.com/blokandbankaandkubicz_visual_stimuli
db = SQLAlchemy(app)


class Data(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    gender = db.Column(db.String(200))
    age = db.Column(db.String(200))
    lifestyle = db.Column(db.String(200))
    fatigue = db.Column(db.String(200))
    stress = db.Column(db.String(200))
    health = db.Column(db.String(600))
    color = db.Column(db.String(200))
    computer = db.Column(db.String(200))
    perceptual = db.Column(db.String(200))
    computer_experience = db.Column(db.String(200))
    electronic_devices = db.Column(db.String(200))
    physical_activity = db.Column(db.String(200))
    caffeine = db.Column(db.String(200))
    sleep = db.Column(db.String(200))
    # Date of test
    date_created = db.Column(db.DateTime, default=datetime.utcnow())

    # First test
    czas = db.Column(Integer)

    # Second test
    answer_test2 = db.Column(Integer)

    # Third test
    answer_test3 = db.Column(Integer)

    def __repr__(self):
        return f'<Data{self.perceptual}>'


@app.route("/")
def index():
    return render_template('index.html')


@app.route('/1', methods=('POST', 'GET'))
def page_1():
    if request.method == 'POST':
        gender = request.form['gender']
        age = request.form['age']
        lifestyle = request.form['lifestyle']
        fatigue = request.form['fatigue']
        stress = request.form['stress']
        health = request.form['health']
        color = request.form['color']
        computer = request.form['computer']
        perceptual = request.form['perceptual']
        computer_experience = request.form['computer_experience']
        electronic_devices = request.form['electronic_devices']
        physical_activity = request.form['physical_activity']
        caffeine = request.form['caffeine']
        sleep = request.form['sleep']
        data = Data(gender=gender,
                    age=age,
                    lifestyle=lifestyle,
                    fatigue=fatigue,
                    stress=stress,
                    health=health,
                    color=color,
                    computer=computer,
                    perceptual=perceptual,
                    computer_experience=computer_experience,
                    electronic_devices=electronic_devices,
                    physical_activity=physical_activity,
                    caffeine=caffeine,
                    sleep=sleep
                    )
        db.session.add(data)
        db.session.commit()

        return redirect(url_for('page_2'))
    return render_template('survey.html')


@app.route('/2', methods=['GET', 'POST'])
def page_2():
    if request.method == 'POST':
        data = request.get_json()
        czas = data['czas']
        data.czas = czas
        db.session.commit()
        return jsonify({'success': True})
    return render_template('test1.html')


@app.route('/dodaj_czas_reakcji', methods=['POST'])
def add_czas_reakcji():
    data = request.get_json()
    czas = data['czas']
    data = Data.query.order_by(Data.id.desc()).first()
    data.czas = czas
    db.session.commit()
    return jsonify({'success': True})


@app.route('/3', methods=['GET', 'POST'])
def page_3():
    if request.method == 'POST':
        answer_test2 = request.form['answer']
        data = Data(answer_test2=answer_test2)
        db.session.add(data)
        db.session.commit()

        return redirect(url_for('page_4'))
    return render_template('test2.html')


@app.route('/4', methods=['GET', 'POST'])
def page_4():
    if request.method == 'POST':
        answer_test3 = request.form['answer']
        data = Data(answer_test3=answer_test3)
        db.session.add(data)
        db.session.commit()

        return redirect(url_for('results'))
    return render_template('test3.html')


@app.route('/5')
def results():
    return render_template('results.html')


if __name__ == '__main__':
    app.run()

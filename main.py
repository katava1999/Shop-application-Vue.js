import flask
from flask import Flask
from flask import session
from flaskext.mysql import MySQL
from flaskext.mysql import pymysql

app = Flask(__name__, static_url_path="/")
app.config["MYSQL_DATABASE_USER"] = "student"
app.config["MYSQL_DATABASE_PASSWORD"] = "student"
app.config["MYSQL_DATABASE_DB"] = "netshop"
app.secret_key = "2p3ork :DLSadkl;j 2l;wd;a sd"

mysql = MySQL(app, cursorclass=pymysql.cursors.DictCursor)

@app.route("/")
def home():
    return app.send_static_file("index.html")

@app.route("/api/login", methods=["POST"])
def login():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korisnik WHERE korisnicko_ime=%(korisnicko_ime)s AND tip_id=%(tip_id)s", flask.request.json)
    korisnik = cursor.fetchone()
    if korisnik is not None:
        session["korisnik"] = korisnik["tip_id"]
        return "", 200
    return "", 403

@app.route("/api/logout", methods=["GET"])
def logout():
    session.pop("korisnik", None)
    return "", 200

#Korisnici
@app.route("/api/korisnici")
def get_all_korisnici():
    if session.get("korisnik") is not None:
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM korisnik")
        korisnici = cursor.fetchall()
        return flask.jsonify(korisnici)
    return "", 401

@app.route("/api/korisnici/<int:korisnik_id>")
def get_korisnik(korisnik_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korisnik WHERE id=%s", (korisnik_id,))
    korisnik = cursor.fetchone()
    if korisnik is not None:
        return flask.jsonify(korisnik)
    
    return "", 404

@app.route("/api/korisnici", methods=["POST"])
def dodavanje_korisnika():
    if session.get("korisnik") is not None:
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("INSERT INTO korisnik(korisnicko_ime, lozinku, tip_id) VALUES(%(korisnicko_ime)s, %(lozinku)s, %(tip_id)s)", flask.request.json)
        db.commit()
        return flask.jsonify(flask.request.json), 201
    return "", 401
    
@app.route("/api/korisnici/<int:korisnik_id>", methods=["PUT"])
def izmeni_korisnika(korisnik_id):
    korisnik = dict(flask.request.json)
    korisnik["korisnik_id"] = korisnik_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE korisnik SET korisnicko_ime=%(korisnicko_ime)s, lozinku=%(lozinku)s, tip_id=%(tip_id)s WHERE id=%(korisnik_id)s", korisnik)
    db.commit()
    cursor.execute("SELECT * FROM korisnik WHERE id=%s", (korisnik_id,))
    korisnik = cursor.fetchone()
    return flask.jsonify(korisnik)

@app.route("/api/korisnici/<int:korisnik_id>", methods=["DELETE"])
def ukloni_korisnika(korisnik_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM korisnik WHERE id=%s", (korisnik_id, ))
    db.commit()
    return ""


# Proizvodi
@app.route("/api/proizvodi")
def get_all_proizvodi():
    if session.get("korisnik") is not None:
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM proizvod")
        proizvodi = cursor.fetchall()
        for p in proizvodi:
            p["cena"] = float(p["cena"])
        return flask.jsonify(proizvodi)
    return "", 401

@app.route("/api/proizvodi/<int:proizvod_id>")
def get_proizvod(proizvod_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM proizvod WHERE id=%s", (proizvod_id,))
    proizvod = cursor.fetchone()
    if proizvod is not None:
        proizvod["cena"] = float(proizvod["cena"])
        return flask.jsonify(proizvod)
    
    return "", 404

@app.route("/api/proizvodi", methods=["POST"])
def dodavanje_proizvoda():
    if session.get("korisnik") is not None:
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("INSERT INTO proizvod(naziv, opis, cena, dostupno) VALUES(%(naziv)s, %(opis)s, %(cena)s, %(dostupno)s)", flask.request.json)
        db.commit()
        return flask.jsonify(flask.request.json), 201
    return "", 401
    
@app.route("/api/proizvodi/<int:proizvod_id>", methods=["PUT"])
def izmeni_proizvod(proizvod_id):
    proizvod = dict(flask.request.json)
    proizvod["proizvod_id"] = proizvod_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE proizvod SET naziv=%(naziv)s, opis=%(opis)s, cena=%(cena)s, dostupno=%(dostupno)s WHERE id=%(proizvod_id)s", proizvod)
    db.commit()
    cursor.execute("SELECT * FROM proizvod WHERE id=%s", (proizvod_id,))
    proizvod = cursor.fetchone()
    proizvod["cena"] = float(proizvod["cena"])
    return flask.jsonify(proizvod)

@app.route("/api/proizvodi/<int:proizvod_id>", methods=["DELETE"])
def ukloni_proizvod(proizvod_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM proizvod WHERE id=%s", (proizvod_id, ))
    db.commit()
    return ""

#Korpa

@app.route("/api/korpa")
def get_all_korpe():
    if session.get("korisnik") is not None:
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM korpa")
        korpe = cursor.fetchall()
        return flask.jsonify(korpe)
    return "", 401
    
@app.route("/api/korpa/<int:korpa_id>")
def get_korpa(korpa_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korpa WHERE id=%s", (korpa_id,))
    korpe = cursor.fetchone()
    return flask.jsonify(korpe)
    
@app.route("/api/korpa", methods=["POST"])
def dodavanje_korpe():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO korpa(korisnik_id, proizvod_id, kolicina, datum) VALUES(%(korisnik_id)s, %(proizvod_id)s, %(kolicina)s, %(datum)s)", flask.request.json)
    db.commit()
    return flask.jsonify(flask.request.json), 201

@app.route("/api/korpa/<int:korpa_id>", methods=["PUT"])
def izmeni_korpu(korpa_id):
    korpa = dict(flask.request.json)
    korpa["korpa_id"] = korpa_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE korpa SET korisnik_id=%(korisnik_id)s, proizvod_id=%(proizvod_id)s, kolicina=%(kolicina)s, datum=%(datum)s WHERE id=%(korpa_id)s", korpa)
    db.commit()
    cursor.execute("SELECT * FROM korpa WHERE id=%s", (korpa_id,))
    korpa = cursor.fetchone()
    return flask.jsonify(korpa)

@app.route("/api/korpa/<int:korpa_id>", methods=["DELETE"])
def ukloni_korpu(korpa_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM korpa WHERE id=%s", (korpa_id, ))
    db.commit()
    return ""

#TIP
#NOVI TIP
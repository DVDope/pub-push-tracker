from flask import Flask, render_template, request, redirect, url_for, session, jsonify, send_file, Response


from src.create_database import create_database, insert_koth_match, insert_other_match


app = Flask(__name__, static_folder='static')


@app.route('/')
def index():
    """
    Standard route ('/') when entering the website. Will return the template index.html.

    :returns: html file of index
    """

    create_database()

    return render_template('index.html')


@app.route('/addEntry', methods=['POST'])
def addEntry():
    """
    Route for adding an entry into the database

    :return:
    """

    create_database()

    data = request.get_json()

    if data['gamemode'] == 'koth':
        insert_koth_match(data)
    else:
        insert_other_match(data)

    return Response({})


if __name__ == '__main__':
    app.run(debug=True)

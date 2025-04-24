from flask import Flask, render_template, request, redirect, url_for, session, jsonify, send_file, Response


app = Flask(__name__, static_folder='static')


@app.route('/')
def index():
    """
    Standard route ('/') when entering the website. Will return the template index.html.

    :returns: html file of index
    """

    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)

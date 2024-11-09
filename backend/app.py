import random

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(
    app, resources={r"/api/*": {"origins": "http://localhost:3000"}}
)  # Allow only frontend origin


@app.route("/api/greeting", methods=["GET"])
def get_greeting():
    data = {"message": "Hello from Flask!"}
    return jsonify(data)


@app.route("/api/process_form", methods=["POST"])
def process_form():
    data = request.get_json()  # Get the JSON data from the request body
    name = data.get("name")
    number = data.get("number")

    # Process the data as needed (e.g., store it in a database or perform calculations)
    print(f"Received Name: {name}, Number: {number}")

    # Example response
    response = {
        "status": "success",
        "message": f"Received name: {name} and number: {number}",
    }
    return jsonify(response), 200


@app.route("/api/random_number", methods=["GET"])
def get_random_number():
    num = random.random()
    data = {"value": num}
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)

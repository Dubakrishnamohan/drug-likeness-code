from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():

    data = request.json
    smiles = data['smiles']

    # Replace with your actual ML + RDKit logic

    result = {
        "molecular_weight": 180.16,
        "logP": 1.19,
        "hbd": 1,
        "hba": 3,
        "qed_score": 0.582,
        "drug_like": True
    }

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
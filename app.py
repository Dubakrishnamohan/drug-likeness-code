from flask import Flask, render_template, request
from rdkit import Chem
from rdkit.Chem import Descriptors
import pandas as pd

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():

    smiles = request.form['smiles']

    mol = Chem.MolFromSmiles(smiles)

    if mol is None:
        return "Invalid SMILES"

    mol_wt = Descriptors.MolWt(mol)
    logp = Descriptors.MolLogP(mol)
    hba = Descriptors.NumHAcceptors(mol)
    hbd = Descriptors.NumHDonors(mol)

    lipinski = "PASS"

    if mol_wt > 500 or logp > 5 or hba > 10 or hbd > 5:
        lipinski = "FAIL"

    return render_template(
        'index.html',
        result=True,
        smiles=smiles,
        mol_wt=round(mol_wt,2),
        logp=round(logp,2),
        hba=hba,
        hbd=hbd,
        lipinski=lipinski
    )

if __name__ == "__main__":
    app.run(debug=True)
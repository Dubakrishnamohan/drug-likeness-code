** Drug-Likeness Analysis using RDKit

**Project Description
This project analyzes chemical molecules using RDKit.  
It calculates molecular descriptors and checks drug-likeness using:

- Lipinski Rule of Five
- Veber Rule

The program reads a CSV file containing SMILES and generates a new dataset with calculated properties and drug-likeness results.

** Features
- Reads molecule data from CSV file
- Calculates molecular descriptors:
  - Molecular Weight
  - LogP
  - Hydrogen Bond Donors
  - Hydrogen Bond Acceptors
  - TPSA
  - Rotatable Bonds
- Applies Lipinski rule
- Applies Veber rule
- Saves results to a new CSV file
- Generates graphs for analysis

** Requirements
- Python
- RDKit
- pandas
- matplotlib

Install required packages:

pip install pandas matplotlib rdkit

**Input File Format
The CSV file should contain a SMILES column.

Example:

Name,SMILES
Aspirin,CC(=O)OC1=CC=CC=C1C(=O)O
Paracetamol,CC(=O)NC1=CC=C(O)C=C1
Ibuprofen,CC(C)CC1=CC=C(C=C1)C(C)C(=O)O

**Output
The program generates a CSV file with additional columns:

- Molecular Weight
- LogP
- H-bond Donors
- H-bond Acceptors
- TPSA
- Rotatable Bonds
- Lipinski Result
- Veber Result

** Example Analysis
The project also creates graphs such as:

- Molecular Weight distribution
- LogP distribution
- Lipinski Pass vs Fail

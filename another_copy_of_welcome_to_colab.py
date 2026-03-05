from rdkit import Chem
from rdkit.Chem import Draw
from rdkit.Chem import Descriptors
import pandas as pd
Smiles= input("enter your smiles formulla:")
mol=Chem.MolFromSmiles(Smiles)
if mol is None:
  print("invalid smiles")
  exit()
#------- descriptors access-------
mol_wt=Descriptors.MolWt(mol)
logP=Descriptors.MolLogP(mol)
H_Acceptors=Descriptors.NumHAcceptors(mol)
H_Donors=Descriptors.NumHDonors(mol)
#-------print descriptors-------
print("mol_wt: ",mol_wt)
print("LogP: ",logP)
print("H_Acceptors: ",H_Acceptors)
print("H_Donors",H_Donors)
fail_count= 0
if(mol_wt<=500):
    print("this molecule passes the molecular weight lipsinki rule")
else:
    print("mol_wt: fails")
    fail_count+=1
if(logP<=5):
     print("this molecule passes the logP lipsinki rule")
else:
     print("logP: fails")
     fail_count+=1
if(H_Acceptors<=10):
      print("this molecule passes the H_Acceptors lipsinki rule")
else:
      print("H_Acceptors:fails")
      fail_count+=1
if(H_Donors<=5):
      print("this molecule passes the H_Donors lipsinki rule")
else:
      print("H_Donors: fails")
      fail_count+=1
if fail_count<=1:
      print("lipsinki pass")
else:
      print("lipsinki fails")

#-------VEBER RULE-------
rot_bonds=Descriptors.NumRotatableBonds(mol)
tpsa=Descriptors.TPSA(mol)

#-------print descriptors-------
print("rot_bonds",rot_bonds)
print("tpsa",tpsa)
if rot_bonds<=10:
  print("this molecule follows vebers rule")
else:
  print("this molecule doesnot follows vebers rule")
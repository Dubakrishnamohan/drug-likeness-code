from rdkit import Chem
from rdkit.Chem import Draw
from rdkit.Chem import Descriptors
import pandas as pd
Smiles= input("enter your smiles formulla:")
mol=Chem.MolFromSmiles(Smiles)
if mol is None:
  print("invalid smiles")
  exit()
#<------- descriptors access------->
mol_wt=Descriptors.MolWt(mol)
logP=Descriptors.MolLogP(mol)
H_Acceptors=Descriptors.NumHAcceptors(mol)
H_Donors=Descriptors.NumHDonors(mol)
#<-------print descriptors------->
print("mol_wt: ",mol_wt)
print("LogP: ",logP)
print("H_Acceptors: ",H_Acceptors)
print("H_Donors",H_Donors)
Lipsinki_fail= 0
if(mol_wt<=500):
    print("lipsinki rule: pass")
else:
    print("mol_wt: fails")
    Lipsinki_fail+=1
if(logP<=5):
     print("logP: pass")
else:
     print("logP: fails")
     Lipsinki_fail+=1
if(H_Acceptors<=10):
      print("H_Acceptors: pass")
else:
      print("H_Acceptors:fails")
      Lipsinki_fail+=1
if(H_Donors<=5):
      print("H_Donors :pass")
else:
      print("H_Donors: fails")
      Lipsinki_fail+=1

print("\n checking Lipsinki rule.... \n")
if Lipsinki_fail<=1:
      print("lipsinki pass")
else:
      print("lipsinki fails")

#<-------VEBER RULE------->
rot_bonds=Descriptors.NumRotatableBonds(mol)
tpsa=Descriptors.TPSA(mol)

#<-------print descriptors------->
print("rot_bonds",rot_bonds)
print("tpsa",tpsa)
#<----checking veber rule is pass or not---->
print("\n checking veber rule.... \n")
if rot_bonds<=10:
  print("veber rule: pass")
else:
  print("veber rule :fail")
  veber_fail+=1
if tpsa<=140:
  print("veber rule: pass")
else:
  print("veber rule :fail")
  veber_fail+=1
veber_fail=0
if veber_fail<=1:
  print("veber: pass") 
else:
  print("veber:fail") 

from rdkit import Chem
from rdkit.Chem import Draw
from rdkit.Chem import Descriptors
import pandas as pd
file=input("enter csv file name: ")
df=pd.read_csv(file)
Smiles=df["SMILES"][0]
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
      lipsinki_result="Pass"
else:
      lipsinki_result="Fail"

#<-------VEBER RULE------->
rot_bonds=Descriptors.NumRotatableBonds(mol)
tpsa=Descriptors.TPSA(mol)

#<-------print descriptors------->
print("rot_bonds",rot_bonds)
print("tpsa",tpsa)
#<----checking veber rule is pass or not---->
print("\n checking veber rule.... \n")
veber_fail=0
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
    
if veber_fail==0:
  veber_result="Pass" 
else:
   veber_result="Fail" 
print("veber result=",veber_result)
df=pd.read_csv("df_selected (1).csv")
df["lipsinki_result"]=lipsinki_result
df["veber_result"]=veber_result
df["Lipsinki_fail"] =lipsinki_fail
df["veber_fail"]=veber_fail
df.to_csv("updated dataset.csv",index=False)

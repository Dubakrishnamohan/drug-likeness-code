#<-------1. Import Required Libraries------->
from rdkit import Chem
from rdkit.Chem import Draw
from rdkit.Chem import Descriptors
import pandas as pd
#<-------2. Load Dataset------->
file=input("enter csv file name: ")
df=pd.read_csv(file)
#<-------3. Initialize Result Storage------->
lipinski_result[]
veber_result[]
lipinski_fail[]
veber_fail[]
#<-------4. Process Each Molecule------->
for Smiles in range(len(df)):
Smiles=df["SMILES"][i]
#<-------4.1 Convert Smiles Into Molecules------->
mol=Chem.MolFromSmiles(Smiles)
if mol is None:
  print("invalid smiles")
  exit()
#<-------4.2 Calculate Molecular Descriptors ------->
mol_wt=Descriptors.MolWt(mol)
logP=Descriptors.MolLogP(mol)
H_Acceptors=Descriptors.NumHAcceptors(mol)
H_Donors=Descriptors.NumHDonors(mol)
#<-------5. Apply Lipinski Rule Of Five ------->

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

if Lipsinki_fail<=1:
      lipsinki_result="Pass"
else:
      lipsinki_result="Fail"

#<-------6. Apply Veber Rule------->
rot_bonds=Descriptors.NumRotatableBonds(mol)
tpsa=Descriptors.TPSA(mol)

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

#<-------7. store results------->
lipsinki_result.append(lipinski_result)
veber_result.append(veber_result)
lipsinki_fail.append(lipinski_fail)
veber_fail.append(veber_fail) 
print("veber result=",veber_result)

#<-------8. Add Results To Dataset------->
df["lipsinki_result"]=lipsinki_result
df["veber_result"]=veber_result
df["Lipsinki_fail"] =lipsinki_fail
df["veber_fail"]=veber_fail
#<-------9. Save Updated Dataset------->
df.to_csv("updated dataset.csv",index=False)

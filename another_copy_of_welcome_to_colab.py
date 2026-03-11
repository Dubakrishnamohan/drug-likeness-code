#<-------1. Import Required Libraries------->
from rdkit import Chem
from rdkit.Chem import Draw
from rdkit.Chem import Descriptors
import pandas as pd
#<-------2. Load Dataset------->
file=input("enter csv file name: ")
df=pd.read_csv(file)
#<-------4. Process Each Molecule------->
for i in range(len(df)):
  Smiles=df["SMILES"][i]
    #<-------4.1 Convert Smiles Into Molecules------->
  mol=Chem.MolFromSmiles(Smiles)
  if mol is None:
     print("invalid smiles")
     continue

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
      veber_rule :fail
  veber_fail+=1
          
  if veber_fail==0:
      veber_result="Pass" 
  else:
      veber_result="Fail"
    #<-------7. Apply PAINS Filter------->
  if lipinski_result =='Pass' and veber_result== 'Pass':
      pains_result="check"
  else:
      pains_result="reject"

      #<-------3. Initialize Result Storage------->
      lipinski_results=[]
      veber_results=[]
      lipinski_fails=[]
      veber_fails=[]
      pains_results=[]

      #<-------8. store results------->
lipinski_results.append(lipinski_result)
veber_results.append(veber_result)
lipinski_fails.append(lipinski_fail)
veber_fails.append(veber_fail)
pains_results.append(pains_result) 

    #<-------9. Add Results To Dataset------->
df["lipinski_results"]=lipinski_results
df["veber_results"]=veber_results
df["Lipinski_fails"] =lipinski_fails
df["veber_fails"]=veber_fails
df["pains_results"]=pains_results

      #<-------10. Save Updated Dataset------->
df.to_csv("updated dataset.csv",index=False)

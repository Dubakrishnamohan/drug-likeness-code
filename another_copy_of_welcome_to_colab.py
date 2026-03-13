from rdkit import Chem
from rdkit.Chem import Draw
from rdkit.Chem import Descriptors
import pandas as pd
#<-------2. Load Dataset------->
file=input("enter csv file name: ")
df=pd.read_csv(file)
#<-------3. Initialize Result Storage------->
lipinski_results=[]
veber_results=[]
lipinski_fails=[]
veber_fails=[]
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

  lipinski_fail= 0
  if(mol_wt>500):
    lipinski_fail+=1
  if(logP>5):
    lipinski_fail+=1
  if(H_Acceptors>10):
    lipinski_fail+=1
  if(H_Donors>5):
    lipinski_fail+=1
  if lipinski_fail<=1:
     lipinski_result="pass"
  else:
     lipinski_result="fail"
    #<-------6. Apply veber_rule------->
  rot_bonds=Descriptors.NumRotatableBonds(mol)
  tpsa=Descriptors.TPSA(mol)

  veber_fail=0
  if rot_bonds>10:
    veber_fail+=1
  if tpsa>140:
    veber_fail+=1    
  if veber_fail==0:
    veber_result="pass" 
  else:
    veber_result="fail"
  #<-------8. store results------->
  lipinski_results.append(lipinski_result) 
  veber_results.append(veber_result)
  lipinski_fails.append(lipinski_fail)
  veber_fails.append(veber_fail)
    #<-------9. Add Results To Dataset------->
df["lipinski_results"]=lipinski_results
df["veber_results"]=veber_results
df["lipinski_fails"] =lipinski_fails
df["veber_Fails"]=veber_fails


      #<-------10. Save Updated Dataset------->
df.to_csv("paracetmol.data.csv",index=False)
print("updated dataset saved")

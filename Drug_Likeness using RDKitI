from rdkit import Chem
from rdkit.Chem import Draw
from rdkit.Chem import rdFingerprintGenerator
from rdkit.Chem import Descriptors
import pandas as pd
#<-------2. Load Dataset------->
file=input("enter csv file name: ")
df=pd.read_csv(file)
#<-------3. Initialize Result Storage------->
molwt_list=[]
logP_list=[]
H_Acceptors_list=[]
H_Donors_list=[]
rot_bonds_list=[] 
tpsa_list=[] 
lipinski_results=[]
veber_results=[]
lipinski_fails=[]
veber_fails=[]
drug_like_results=[]
fingerprints=[]
fingerprint_Bits=[]
#<-------4. Process Each Molecule------->
for i in range(len(df)):
  Smiles=df.loc[i,"SMILES"]
    #<-------4.1 Convert Smiles Into Molecules------->
  mol=Chem.MolFromSmiles(Smiles)
 
  if mol is None:
     lipinski_results.append("invalid")
     veber_results.append("invalid")
     lipinski_fails.append(None)
     veber_fails.append(None)
     continue
  morgan_fp=rdFingerprintGenerator.GetMorganGenerator(radius=2,fpSize=2048)
  fp=morgan_fp.GetFingerprint(mol)   

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
  if lipinski_fail==0 and veber_fail==0:
    drug_like_results.append("Pass")
  else:
    drug_like_results.append("fail")  
  #<-------8. store results------->
  molwt_list.append(mol_wt)
  logP_list.append(logP)
  H_Acceptors_list.append(H_Acceptors)
  H_Donors_list.append(H_Donors)
  rot_bonds_list.append(rot_bonds)
  tpsa_list.append(tpsa)
  lipinski_results.append(lipinski_result) 
  veber_results.append(veber_result)
  lipinski_fails.append(lipinski_fail)
  veber_fails.append(veber_fail)
  fingerprints.append(fp)
  fingerprint_Bits.append(fp.ToBitString())
    #<-------9. Add Results To Dataset------->
df["mol_wt"]=molwt_list
df["logP"]=logP_list
df["H_Acceptors"]=H_Acceptors_list
df["H_Donors"]=H_Donors_list
df["rot_bonds"]=rot_bonds_list
df["TPSA"]=tpsa_list
df["lipinski_results"]=lipinski_results
df["veber_results"]=veber_results
df["lipinski_fails"] =lipinski_fails
df["veber_Fails"]=veber_fails
df["drug_like"]=drug_like_results
df["fingerprints"]=fingerprints
df["fingerprint_Bits"]=df["fingerprints"].apply(lambda x:x.ToBitString()if x is not None else None)
      #<-------10. Save Updated Dataset------->
df.to_csv("drug_analysis_results.csv",index=False)
print("updated drug analysis dataset saved")

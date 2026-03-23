from rdkit import Chem
from rdkit.Chem import rdFingerprintGenerator
from rdkit import DataStructs
from rdkit.Chem import Descriptors
import pandas as pd
#<-------2. Load Dataset------->
file=input("enter csv file name: ")
df=pd.read_csv(file)
input_smiles=input("enter your smiles: )
input_mol=Chem.MolFromSmiles(input_smiles)
if input_mol is None:
    print("invalid input smiles")
    exit() 
morgan_fp=rdFingerprintGenerator.GetMorganGenerator(radius=2,fpSize=2048)
input_fp = morgan_fp.GetFingerprint(input_mol)
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
fingerprint_Bits=[]
similarity_scores=[]
#<-------4. Process Each Molecule------->
for i in range(len(df)):
   Smiles=df.loc[i,"SMILES"]
#<-------4.1 Convert Smiles Into Molecules------->
   mol=Chem.MolFromSmiles(str(Smiles))
   if mol is None:
        molwt_list.append(None)
        logP_list.append(None)
        H_Acceptors_list.append(None)
        H_Donors_list.append(None)
        rot_bonds_list.append(None)
        tpsa_list.append(None)
        lipinski_results.append("invalid")
        veber_results.append("invalid")
        lipinski_fails.append(None)
        veber_fails.append(None)
        drug_like_results.append("invalid")
        fingerprint_Bits.append(None)
        similarity_scores.append(None)
        continue
   fp = morgan_fp.GetFingerprint(mol)
   score = DataStructs.TanimotoSimilarity(input_fp, fp)
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
    drug_like_result="pass"
   else:
    drug_like_result="fail"
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
   drug_like_results.append(drug_like_result)
   fingerprint_Bits.append(fp.ToBitString())
   similarity_scores.append(score)
#<-------9. Add Results To Dataset------->
df["mol_wt"]=[round(x,3) for x in molwt_list]
df["logP"]=[round(x,3) for x in logP_list]
df["H_Acceptors"]=H_Acceptors_list
df["H_Donors"]=H_Donors_list
df["rot_bonds"]=rot_bonds_list
df["TPSA"]=[round(x,3) for x in tpsa_list]
df["lipinski_results"]=lipinski_results
df["veber_results"]=veber_results
df["lipinski_fails"] =lipinski_fails
df["veber_fails"]=veber_fails
df["drug_like_results"]=drug_like_results
df["fingerprint_Bits"]=fingerprint_Bits
df["similarity_scores"]=similarity_scores
df=df.sort_values(by="similarity_scores",ascending=False)
filtered=df[(df["mol_wt")<500&(df["logP"]<5)]
#<-------10. Save Updated Dataset------->
df.to_csv("drug_analysis_results.csv",index=False)
print("updated drug analysis dataset saved")filtered=df[(df["mol_wt")<500&(df["logP"]<5)]

require("dotenv").config();
import express from "express";
import { burnTokens, mintTokens, sendNativeTokens } from "./mintTokens";

const app = express();

const HELIUS_RESPONSE = {nativeTransfers: [
    {
      amount: 72936000000,
      fromUserAccount: "CKs1E69a2e9TmH4mKKLrXFF8kD3ZnwKjoEuXa6sz9WqX",
      toUserAccount: "AAaTGaA3uVqikfVEwoSG7EwkCb4bBDsMEyueiVUS5CaU",
    },
    {
      amount: 2011440,
      fromUserAccount: "CKs1E69a2e9TmH4mKKLrXFF8kD3ZnwKjoEuXa6sz9WqX",
      toUserAccount: "D8TxfGwdu9MiNMoJmUoC9wQfNfNT7Lnm6DzifQHRTy6B",
    },
    {
      amount: 71856000000,
      fromUserAccount: "AAaTGaA3uVqikfVEwoSG7EwkCb4bBDsMEyueiVUS5CaU",
      toUserAccount: "5DxD5ViWjvRZEkxQEaJHZw2sBsso6xoXx3wGFNKgXUzE",
    },
    {
      amount: 1080000000,
      fromUserAccount: "AAaTGaA3uVqikfVEwoSG7EwkCb4bBDsMEyueiVUS5CaU",
      toUserAccount: "rFqFJ9g7TGBD8Ed7TPDnvGKZ5pWLPDyxLcvcH2eRCtt",
    },
    {
      amount: 2039280,
      fromUserAccount: "CKs1E69a2e9TmH4mKKLrXFF8kD3ZnwKjoEuXa6sz9WqX",
      toUserAccount: "DTYuh7gAGGZg2okM7hdFfU1yMY9LUemCiPyD5Z5GCs6Z",
    },
  ]
};




const VAULT="2nemBc9a9EgszkNFMHposiXtYn1EHnSyBjMLwZNjMmyZ"








app.post("/helius", async (req, res) => {

    const IncomingTxn= HELIUS_RESPONSE.nativeTransfers.find(x=>x.toUserAccount==VAULT)
    if(!IncomingTxn){
        res.json({message: "processsed"});
        return;
    }
  const fromAddress = IncomingTxn.fromUserAccount;
  const toAddress = VAULT;
  const amount = IncomingTxn.amount;
  const type = "received_native_sol";
  await mintTokens(fromAddress, amount);

//   if (type === "received_native_sol") {
    
//   } else {
//     await burnTokens(fromAddress, toAddress, amount);
//     await sendNativeTokens(fromAddress, toAddress, amount);
//   }

  res.send("Transaction successful");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

require("dotenv").config();
import express from "express";
import { burnTokens, mintTokens, sendNativeTokens } from "./mintTokens";

const app = express();

const HELIUS_RESPONSE = {nativeTransfers: [
    {
      amount: 10000000,
      fromUserAccount: "Dp6gstYdV9CAybKo1hrg6nuaiGU7RF3LfL9yaY5R7oRf",
      toUserAccount: "6ayDk6MGzSXT3AfD7NyEfmuM9rebWVs8L2pLAVKmgHqP",
    },
  ]
};




const VAULT="6ayDk6MGzSXT3AfD7NyEfmuM9rebWVs8L2pLAVKmgHqP"








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

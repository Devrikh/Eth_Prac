"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const mintTokens_1 = require("./mintTokens");
const app = (0, express_1.default)();
const HELIUS_RESPONSE = { nativeTransfers: [
        {
            amount: 10000000,
            fromUserAccount: "CKs1E69a2e9TmH4mKKLrXFF8kD3ZnwKjoEuXa6sz9WqX",
            toUserAccount: "DTYuh7gAGGZg2okM7hdFfU1yMY9LUemCiPyD5Z5GCs6Z",
        },
    ]
};
const VAULT = "2nemBc9a9EgszkNFMHposiXtYn1EHnSyBjMLwZNjMmyZ";
app.post("/helius", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const IncomingTxn = HELIUS_RESPONSE.nativeTransfers.find(x => x.toUserAccount == VAULT);
    if (!IncomingTxn) {
        res.json({ message: "processsed" });
        return;
    }
    const fromAddress = IncomingTxn.fromUserAccount;
    const toAddress = VAULT;
    const amount = IncomingTxn.amount;
    const type = "received_native_sol";
    yield (0, mintTokens_1.mintTokens)(fromAddress, amount);
    //   if (type === "received_native_sol") {
    //   } else {
    //     await burnTokens(fromAddress, toAddress, amount);
    //     await sendNativeTokens(fromAddress, toAddress, amount);
    //   }
    res.send("Transaction successful");
}));
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

import {mintTo} from "@solana/spl-token";
import { Connection } from "@solana/web3.js";

const connection = new Connection("https://api.devnet.solana.com");

export const mintTokens = async (fromAddress: string, amount: number) => {
    console.log("Minting tokens");
}

export const burnTokens = async (fromAddress: string, toAddress: string, amount: number) => {
    console.log("Burning tokens");
}

export const sendNativeTokens = async (fromAddress: string, toAddress: string, amount: number) => {
    console.log("Sending native tokens");
}
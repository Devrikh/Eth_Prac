import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { PRIVATE_KEY, TOKEN_MINT_ADDRESS } from "./address";
import bs58 from "bs58";

function keypairFromBase58(privateKeyBase58: string): Keypair {
  try {
    const secretKey = bs58.decode(privateKeyBase58);
    return Keypair.fromSecretKey(secretKey);
  } catch (error) {
    throw new Error("Invalid Base58 private key");
  }
}

const connection = new Connection("https://api.devnet.solana.com");
const keypair = keypairFromBase58(PRIVATE_KEY!);

export const mintTokens = async (fromAddress: string, amount: number) => {
  const reciepentTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    keypair,
    new PublicKey(TOKEN_MINT_ADDRESS!),
    new PublicKey(fromAddress!)
  );

  console.log("ATA Created");

  await mintTo(
    connection,
    keypair,
    new PublicKey(TOKEN_MINT_ADDRESS!),
    new PublicKey(reciepentTokenAccount),
    keypair,
    amount
  );

  console.log("Minting tokens");
};


export const burnTokens = async (
  fromAddress: string,
  toAddress: string,
  amount: number
) => {
  console.log("Burning tokens");
};

export const sendNativeTokens = async (
  fromAddress: string,
  toAddress: string,
  amount: number
) => {
  console.log("Sending native tokens");
};

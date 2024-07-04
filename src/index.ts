import {
    Connection,
    PublicKey,
    Transaction,
    TransactionInstruction,
    sendAndConfirmTransaction,
    clusterApiUrl, Keypair, LAMPORTS_PER_SOL
} from '@solana/web3.js';
import { airdropIfRequired } from "@solana-developers/helpers";
import * as fs from 'fs';

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
const secret = JSON.parse(fs.readFileSync('secret.json').toString()) as number[];
const secretKey = Uint8Array.from(secret);
const payer = Keypair.fromSecretKey(secretKey);

const airDrop = async () =>{
const newBalance = await airdropIfRequired(
    connection,
    payer.publicKey,
    LAMPORTS_PER_SOL,  // Desired minimum balance (1 SOL)
    LAMPORTS_PER_SOL   // Threshold for airdrop (1 SOL)
);
console.log(`Payer's new balance: ${newBalance}`);
}

const pingId = new PublicKey('ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa')
const pingDataId =  new PublicKey('Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod')

const instruction = new TransactionInstruction({
    programId: pingId,
    keys: [
        {
            pubkey: pingDataId,
            isSigner: false,
            isWritable: true,
        },
    ],
    data: Buffer.alloc(0),
});

const transaction = new Transaction().add(instruction);

async function sendTransaction() {
    try {
        // await airDrop();
        const signature = await sendAndConfirmTransaction(
            connection,
            transaction,
            [payer],
        );
        console.log(`Success! Transaction signature is: ${signature}`);
    } catch (error) {
        console.error(`Error sending transaction: ${error}`);
    }
}

sendTransaction();
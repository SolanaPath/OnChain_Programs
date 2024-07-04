"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const helpers_1 = require("@solana-developers/helpers");
const fs = __importStar(require("fs"));
const connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)('devnet'), 'confirmed');
const secret = JSON.parse(fs.readFileSync('secret.json').toString());
const secretKey = Uint8Array.from(secret);
const payer = web3_js_1.Keypair.fromSecretKey(secretKey);
const airDrop = () => __awaiter(void 0, void 0, void 0, function* () {
    const newBalance = yield (0, helpers_1.airdropIfRequired)(connection, payer.publicKey, web3_js_1.LAMPORTS_PER_SOL, // Desired minimum balance (1 SOL)
    web3_js_1.LAMPORTS_PER_SOL // Threshold for airdrop (1 SOL)
    );
    console.log(`Payer's new balance: ${newBalance}`);
});
const pingId = new web3_js_1.PublicKey('ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa');
const pingDataId = new web3_js_1.PublicKey('Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod');
const instruction = new web3_js_1.TransactionInstruction({
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
const transaction = new web3_js_1.Transaction().add(instruction);
function sendTransaction() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // await airDrop();
            const signature = yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [payer]);
            console.log(`Success! Transaction signature is: ${signature}`);
        }
        catch (error) {
            console.error(`Error sending transaction: ${error}`);
        }
    });
}
sendTransaction();

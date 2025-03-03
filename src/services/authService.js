const ethers = require("ethers");
const JWT = require("jsonwebtoken");
const User = require("../models/User");
const { PublicKey } = require('@solana/web3.js');
const nacl = require('tweetnacl');

const findUser = async (walletAddress) => {
    try {
        const user = await User.findOne({ walletAddress });
        return user;
    } catch (error) {
        console.error("authService: Error Encountered In `findUser` method", error);
    }
}

const createUser = async (walletAddress, walletType) => {
    try {
        const user = await User.create({ walletAddress, walletType });
        return user;
    } catch (error) {
        console.error("authService: Error Encountered In `createUser` method", error);
    }
}

const verifyUserSignature = async (signature, nonce, walletType, walletAddress) => {
    try {
        if (walletType === 'metamask') {
            const recoveredAddress = ethers.verifyMessage(
                `Sign this message: ${nonce}`,
                signature
            );

            if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
                return { err: "Signature verification failed!" };
            }

        } else {
            const message = new TextEncoder().encode(`Sign this message: ${nonce}`);
            const publicKey = new PublicKey(walletAddress);

            const verified = nacl.sign.detached.verify(
                message,
                Buffer.from(signature.signature),
                publicKey.toBytes()
            );
            
            if (!verified) {
                return { err: "Signature verification failed!" };
            }
        }

        // If we reach here, verification was successful
        return { err: null };

    } catch (error) {
        console.error("authService: Error Encountered In `verifyUserSignature` method", error);
        return { err: "Error verifying signature: " + error.message };
    }
}

const generateUserToken = async (walletAddress) => {
    try {
        const token = JWT.sign({ walletAddress }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });
        return token;
    } catch (error) {
        console.error("authService: Error Encountered In `generateUserToken` method", error);
    }
}

module.exports = {
    findUser,
    createUser,
    verifyUserSignature,
    generateUserToken,
}
const ethers = require("ethers");
const JWT = require("jsonwebtoken");
const User = require("../models/User");

const findUser = async (walletAddress) => {
    try {
        const user = await User.findOne({ walletAddress });
        return user;
    } catch (error) {
        console.error("authService: Error Encountered In `findUser` method", error);
    }
}

const createUser = async (walletAddress) => {
    try {
        const user = await User.create({ walletAddress });
        return user;
    } catch (error) {
        console.error("authService: Error Encountered In `createUser` method", error);
    }
}

const verifyUserSignature = async (signature, nonce) => {
    try {
        const recoveredAddress = ethers.verifyMessage(`Sign this message: ${nonce}`, signature);
        return recoveredAddress;
    } catch (error) {
        console.error("authService: Error Encountered In `verifyUserSignature` method", error);
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
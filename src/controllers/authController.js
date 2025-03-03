const { findUser, createUser, verifyUserSignature, generateUserToken } = require("../services/authService");

const generateNonce = async (req, res) => {
    try {
        const { walletAddress, walletType } = req.body;
        let user = await findUser(walletAddress);
        if (!user) {
            user = await createUser(walletAddress, walletType);
        }

        res.status(200).json({ message: "Successful", nonce: user.nonce });
    } catch (error) {
        console.error("authController: Error Occurred: ", error)
        res.status(500).json({ message: "Failed", error: error });
    }
}

const generateToken = async (req, res) => {
    try {
        const { walletAddress, signature, walletType } = req.body;
        const user = await findUser(walletAddress);
        if (!user) return res.status(400).json({ error: "User not found" });

        const {err} = await verifyUserSignature(signature, user.nonce, walletType, walletAddress);
        if (err) {
            return res.status(400).json({ error: err });
        }

        user.nonce = Math.floor(Math.random() * 1000000);
        await user.save();

        const token = await generateUserToken(walletAddress);

        res.json({ message: "Authentication Successful", token });

    } catch (error) {
        console.error("authController: Error Occurred: ", error)
        res.statusCode(500).json({ message: "Authentication Failed", error: error });
    }
}

module.exports = {
    generateNonce,
    generateToken,
}
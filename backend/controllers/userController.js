import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import nodemailer from 'nodemailer'

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid password" });
        }

        const token = createToken(user._id);
        res.json({ success: true, token })
    } catch (err) {
        res.json({ success: false, message: "Error" })
    }
}

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Password length should be more than 8 (Enter strong password)" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashed
        })

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token })
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "Error" })
    }
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) return res.json({ success: false, message: "User does not exist" });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_RESET_SECRET,
            { expiresIn: '15m' }
        );

        user.resetToken = token;
        user.resetTokenExpires = Date.now() + 15 * 60 * 1000;
        await user.save();

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS
            }
        });

        var mailOptions = {
            from: process.env.EMAIL,
            to: `${email}`,
            subject: 'Reset your password',
            text: `http://localhost:5173/reset_password/${user._id}/${token}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                return res.json({ success: true, message: "Link sent successfully!" })
            }
        });
    } catch (error) {
        console.log("Error: ", error);
        res.json({ success: false, message: "Internal Server error" });
    }
}

export const resetPassword = async (req, res) => {
    const { userId, token } = req.params;
    const { password } = req.body;

    try {
        const user = await userModel.findById(userId);
        if (!user) return res.status(400).json({ success: false, message: "Invalid link" });

        if (!user.resetToken || !user.resetTokenExpires || Date.now() > user.resetTokenExpires) {
            return res.status(400).json({ success: false, message: "Token expired or invalid" });
        }

        if (user.resetToken !== token) {
            return res.status(400).json({ success: false, message: "Invalid token" });
        }

        jwt.verify(token, process.env.JWT_RESET_SECRET);

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
        user.resetToken = ''; 
        user.resetTokenExpires = null;
        await user.save();

        return res.json({ success: true, message: "Password reset successful! You can login now" });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ success: false, message: "Invalid or expired token" });
    }
};

// export { login, register }
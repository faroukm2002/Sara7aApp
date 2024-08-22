import { userModel } from "../../../database/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../emails/nodemailer.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";

const signUp = catchAsyncError(async (req, res, next) => {
    const { name, email, password, age } = req.body;
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
        return next(new AppError("Email already exists", 400));
    }

    const hash = bcrypt.hashSync(password, parseInt(process.env.SALTROUND_KEY));
    const newUser = await userModel.create({ name, email, password: hash, age });

    const token = jwt.sign({ email: newUser.email }, process.env.JWT_KEY);
    const link = `${process.env.BASEURL}/confirmEmail/${token}`;
    await sendEmail({ email, link });

    res.json({ message: "Success, please verify your email" });
});

const signIn = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return next(new AppError("Incorrect email or password", 401));
    }

    const token = jwt.sign({ name: user.name, userId: user._id }, process.env.JWT_KEY);
    res.json({ message: "Success", token });
});

const confirmEmail = catchAsyncError(async (req, res, next) => {
    const { token } = req.params;

    jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
        if (err) {
            return next(new AppError("Invalid or expired token", 400));
        }

        const email = decoded.email;
        const user = await userModel.findOneAndUpdate({ email }, { verified: true }, { new: true });

        if (!user) {
            return next(new AppError("User not found", 404));
        }

        res.json({ message: "Email verified successfully" });
    });
});

export {
    signUp,
    signIn,
    confirmEmail
};

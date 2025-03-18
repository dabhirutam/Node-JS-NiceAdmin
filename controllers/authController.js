const authModel = require("../models/authModel");
const bcrypt = require('bcrypt');
const fs = require('fs');
const nodemailer = require('nodemailer');

const Home = async (req, res) => {
    res.render('index', { msg: req.flash('logIn')[0] });
};

const SignUp = (req, res) => res.render('signUp');

const LogIn = (req, res) => res.render('logIn');

const Register = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        bcrypt.hash(password, 10, async (err, hashPassword) => {
            if (!err) {
                const admin = await new authModel({
                    userName,
                    email,
                    password: hashPassword,
                });

                await admin.save();

                console.log("Admin is Created...");

                res.redirect('/logIn');
            }
        });
    } catch (err) {
        console.log("ERR", err);
    }
};

const SignIn = async (req, res) => {
    req.flash('logIn', `LogIn is succesfully ${req.user.userName}`);

    res.cookie('uid', req.user._id, { maxAge: 1000 * 60 * 60, expire: true, httpOnly: true });
    res.redirect('/');
};

const SignOut = (req, res) => {
    req.logOut((err) => {
        if (!err) {
            res.clearCookie('uid');
            res.redirect('/login');
        }
    })
};

const Profile = async (req, res) => {
    res.render('profile');
};

const UpdateProfile = async (req, res) => {

    let updatedAdmin;

    if (req.file) {
        fs.unlink(req.body.profile, () => console.log("Avatar is Updeting"));
        updatedAdmin = { ...req.body, avatar: req.file.path };
    } else updatedAdmin = req.body;

    await authModel.findByIdAndUpdate(req.user._id, updatedAdmin);

    res.redirect('profile');
};

const ChangePassword = (req, res) => {
    const { oldPassword, newPassword, renewPassword } = req.body;

    bcrypt.compare(oldPassword, req.user.password, (err, pass) => {
        if (!err && pass) {
            if (newPassword === renewPassword) {
                bcrypt.hash(newPassword, 10, async (err, hashPassword) => {
                    await authModel.findByIdAndUpdate(req.user._id, { password: hashPassword });
                    console.log("Pssword Changesd");

                    res.redirect('/');
                });
            }
        }
    });
};

const ForgotPassword = (req, res) => {
    res.render('passwordComponents/forgot');
}

const VerifyEmail = async (req, res) => {
    const admin = await authModel.findOne({ email: req.body.email });

    if (admin) {
        const otp = parseInt(Math.random() * 10000);
        console.log("OTP", otp);
        await authModel.findByIdAndUpdate(admin._id, { otp });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
                user: "dabhirutam34@gmail.com",
                pass: "pshvzvceqaefuohl",
            }
        });

        const mailoption = {
            from: "dabhirutam34@gmail.com", // sender address
            to: admin.email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "", // plain text body
            html: `<p>Reset password OTP :- <b>${otp}</b> </p>`, // html body
        }

        await transporter.sendMail(mailoption);

        res.render('passwordComponents/otp', { admin });
    }
}

const VerifyOTP = async (req, res) => {
    const admin = await authModel.findById(req.body._id);

    if (admin.otp == req.body.otp) {
        res.render('passwordComponents/changePassword', { admin });
    }

}

const forgotPassword = async (req, res) => {
    const admin = await authModel.findById(req.body._id);

    bcrypt.hash(req.body.password, 10, async (err, hashPassword) => {
        await authModel.findByIdAndUpdate(req.body._id, { password: hashPassword, otp: null });
        console.log("Pssword Changesd");

        res.redirect('/login');
    });
}

module.exports = { Home, SignUp, Register, LogIn, SignIn, SignOut, Profile, UpdateProfile, ChangePassword, ForgotPassword, VerifyEmail, VerifyOTP, forgotPassword }
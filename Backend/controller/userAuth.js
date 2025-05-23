import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config'
import User from '../models/userLoginModel.js';

export async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body;

        const existUser = await User.findOne({ email });

        if (existUser) {
            res.status(400).json({ message: "User Already Registered" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(200).json({ message: "User Register Successfully" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server Error" })
    }
}

export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }

        const userToken = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: 'user',
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h',
            }
        );

        res.cookie("userToken", userToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 3600000,
        })
        .send({message : "Login successfull", user : user})

    } catch (error) {
        return res
          .status(500)
          .send({ message: "user not login", errorString: error.message });
      }
}

export async function logoutUser(req, res) {
    try {
        res.clearCookie('userToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })
        res.status(200).json({ message: 'User Logged Out Successfully' })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

export async function checkUserToken(req, res, next) {
    const token = req.cookies?.userToken;

    if (!token) {
        res.status(500).json({ message: 'No Token Found' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: 'Invailid Token' })
    }
}
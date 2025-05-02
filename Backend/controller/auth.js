import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config'
import Admin from '../models/adminLoginModel.js';
// import User from '../models/userLoginModel.js';


// export async function registerAdmin(req, res) {
//     try {
//         const { name, email, password } = req.body;

//         const existingAmdin = await Admin.findOne({ email });

//         if (existingAmdin) {
//             res.status(400).json({ message: "Admin Already Registered" });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newAdmin = new Admin({
//             name,
//             email,
//             password: hashedPassword,
//         });

//         await newAdmin.save();

//         res.status(200).json({ message: "Admin Registered Successfully" });

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: 'Error In Admin Registration' })
//     }
// }

export async function loginAdmin(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const adminToken = jwt.sign(
            {
                id: admin._id,
                email: admin.email,
                role: "admin",
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.cookie("adminToken", adminToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 3600000, 
        });

        res.status(200).json({
            message: "Admin Login Successfully",
            admin: {
                id: admin._id,
                email: admin.email,
            },
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


// export async function logoutAdmin(req, res) {
//     try {
//         res.clearCookie('adminToken', {
//             httpOnly: true,
//             secure: true,
//             sameSite: 'none'
//         })
//         res.status(200).json({ message: 'Admin Logged Out Successfully' })

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//     }

// }

// export async function registerUser(req, res) {
//     try {
//         const { name, email, password } = req.body;

//         const existUser = await User.findOne({ email });

//         if (existUser) {
//             res.status(400).json({ message: "User Already Registered" })
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = new User({
//             name,
//             email,
//             password: hashedPassword
//         });

//         await newUser.save();

//         res.status(200).json({ message: "User Register Successfully" })

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "server Error" })
//     }
// }

// export async function loginUser(req, res) {
//     try {
//         const { email, password } = req.body;

//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(401).json({ message: 'Invalid Credentials' });
//         }

//         const isPasswordValid = await bcrypt.compare(password, user.password);

//         if (!isPasswordValid) {
//             return res.status(401).json({ message: 'Invalid Credentials' });
//         }

//         const userToken = jwt.sign(
//             {
//                 id: user._id,
//                 email: user.email,
//                 role: 'user',
//             },
//             process.env.JWT_SECRET,
//             {
//                 expiresIn: '1h',
//             }
//         );

//         res.cookie("userToken", userToken, {
//             httpOnly: true,
//             secure: true,
//             sameSite: 'none',
//         });

//         res.status(200).json({
//             message: 'User Login Successfully',
//             token: userToken,
//             user: {
//                 id: user._id,
//                 email: user.email,
//             },
//         });

//     } catch (error) {
//         console.log("Login Error:", error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// }


// export async function logoutUser(req, res) {
//     try {
//         res.clearCookie('userToken', {
//             httpOnly: true,
//             secure: true,
//             sameSite: 'none'
//         })
//         res.status(200).json({ message: 'User Logged Out Successfully' })

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//     }
// }

// export async function checkAdminToken(req, res, next) {
//     const token = req.cookies?.adminToken;
//     // console.log(token)

//     if (!token) {
//         res.status(500).json({ message: 'No Token Found' })
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.admin = decoded;
//         next()

//     } catch (error) {
//         console.log(error)
//         return res.status(401).json({ message: 'Invailid Token' })
//     }
// }

// export async function checkUserToken(req, res, next) {
//     const token = req.cookies?.userToken;

//     if (!token) {
//         res.status(500).json({ message: 'No Token Found' })
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next()

//     } catch (error) {
//         console.log(error)
//         return res.status(401).json({ message: 'Invailid Token' })
//     }
// }
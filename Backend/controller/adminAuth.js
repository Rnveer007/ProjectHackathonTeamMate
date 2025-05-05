import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config'
import Admin from '../models/adminLoginModel.js';

export async function registerAdmin(req, res) {
    try {
        const { name, email, password } = req.body;

        const existingAmdin = await Admin.findOne({ email });

        if (existingAmdin) {
            res.status(400).json({ message: "Admin Already Registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({
            name,
            email,
            password: hashedPassword,
        });

        await newAdmin.save();

        res.status(200).json({ message: "Admin Registered Successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error In Admin Registration' })
    }
}

export async function loginAdmin(req, res) {
    try {
      const { email, password } = req.body;
  
      const admin = await Admin.findOne({ email });
      if (!admin) return res.status(404).send({ message: "Email not found" });
  
      const passwordMatches = await bcrypt.compare(password, admin.password);
      if (!passwordMatches)
        return res.status(404).send({ message: "Invalid Crendentials" });
  
      const adminToken = jwt.sign(
        { id: admin._id, email: admin.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
  
      res
        .cookie("adminToken", adminToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 3600000,
        })
        .send({ message: "Login Successfull", admin: admin });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "admin not login", errorString: error.message });
    }
  }

export async function logoutAdmin(req, res) {
    try {
        res.clearCookie('adminToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })
        res.status(200).json({ message: 'Admin Logged Out Successfully' })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }

}

export async function checkAdminToken(req, res, next) {
    const token = req.cookies?.adminToken;
    // console.log(token)

    if (!token) {
        res.status(500).json({ message: 'No Token Found' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded;
        next()

    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: 'Invailid Token' })
    }
}
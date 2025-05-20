import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    try {
        const {fullName, email, phone, password, role} = req.body;

        if (!fullName || !email || !phone || !password || !role){
            return res.status(400).json({
                message: "Something is Missing",
                success: false
            });
        };

        const user = await User.findOne({email});
        if (user){
            return res.status(400).json({
                message: 'User already exist with this email.',
                success: false,
            })
        }
        const hashPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullName,
            email,
            phone,
            password: hashPassword,
            role,
        });

        return res.status(201).json({
            message: "Account created successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
    try {
        const {email, password, role} = req.body;
        if (!email || !password || !role) { 
            return res.status(400).json({
                message: "Something is Misssing",
                success: false
            });
        };
        let user = await User.findOne({email});
        if (!user){
            return res.status(400).json({
                message: "Incorrect email or passworrd",
                success: false,
            })
        }

        const isPasswordMarch = await bcrypt.compare(password, user.password);
        if (!isPasswordMarch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };
        //check role is correct or not 
        if (role != user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role",
                success: false
            })
        };

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            role: user.role,
            profile: user.profile
        }
        return res.status(200).cookie("token", token, { maxAge: 1*24*60*60*1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullName}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullName, email, phone, bio, vehicleName, vehicleType, vehicleNumber, licenseNumber, vehicleCapacity, route } = req.body;

        const userId = req.id; //middleware authentication
        let user = await User.findById(userId);

        if (!user){
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        }
        
        //updating data
        if(fullName) user.fullName = fullName
        if(email) user.email = email
        if(phone) user.phone = phone
        if(bio) user.profile.bio = bio
        if(vehicleName) user.profile.vehicleName = vehicleName
        if(vehicleType) user.profile.vehicleType = vehicleType
        if(vehicleNumber) user.profile.vehicleNumber = vehicleNumber
        if(licenseNumber) user.profile.licenseNumber = licenseNumber
        if(vehicleCapacity) user.profile.vehicleCapacity = vehicleCapacity
        if(route) user.profile.route = route


        await user.save();

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
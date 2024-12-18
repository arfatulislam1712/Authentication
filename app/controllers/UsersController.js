import UserModel from "../models/UserModel.js"; 


  export const Registration= async (req, res) => {
    try {
        let reqBody= req.body;


        // Create User
        let newUser = await UserModel.create(reqBody );

        return res.status(201).json({ status: "Success", data: newUser });
    } catch (err) {
        return res.status(500).json({ status: "Fail", message: err.message });
    }
};




import jwt from "jsonwebtoken"; // JWT ব্যবহারের জন্য নিশ্চিত করুন

export const Login = async (req, res) => {
    try {
        let reqBody = req.body; // লগইন রিকোয়েস্টের ডাটা
        let data = await UserModel.findOne(reqBody); // ডাটাবেস থেকে ব্যবহারকারী খোঁজা

        if (data === null) {
            return res.status(401).json({
                login: "error",
                message: "User login not found",
                status: "401 OK",
            });
        } else {
            // JWT টোকেন তৈরি করা
            let token = jwt.sign(
                { _id: data["_id"], NIDNumber: data["NIDNumber"], phoneNumber: data["phoneNumber"] }, 
                "YOUR_SECRET_KEY", // গোপন চাবি (সিক্রেট কী)
                { expiresIn: "7d" } // টোকেনের মেয়াদ
            );

            // টোকেন কুকিতে সেট করা
            res.cookie("authToken", token, {
                httpOnly: true,
                secure: false, // Development এর জন্য HTTPS ছাড়া কাজ করবে
                sameSite: "Strict",
                maxAge: 7 * 24 * 60 * 60 * 1000, // ৭ দিনের জন্য বৈধ
            });

            // সফল লগইন রেসপন্স
            return res.status(200).json({
                login: "success",
                message: "User login successful",
                token: token,
                status: "200 OK",
            });
        }
    } catch (err) {
        return res.status(500).json({
            login: "error",
            message: "Login failed",
            error: err.toString(),
        });
    }
};
// Single Profile Read 
export const SingleProfileRead = async (req, res) => {
    try {
let user = await UserModel.findById(req.user._id,{password:0}); 
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "No users found",
            });
        }

        // সফল হলে JSON রেসপন্স
        return res.status(200).json({
            status: "success",
            message: "All user profiles fetched successfully",
            users: user, // ব্যবহারকারীদের তালিকা
        });
    } catch (err) {
        // ত্রুটি থাকলে JSON রেসপন্স
        return res.status(500).json({
            status: "error",
            message: "Failed to fetch user profiles",
            error: err.toString(),
        });
    }
};
// All User Profile Read
export const AllUserProfileRead = async (req, res) => {
    try {
let user = await UserModel.find(); 
        if (user === null) {
            return res.status(404).json({
                status: "error",
                message: "No users found",
            });
        }

        // সফল হলে JSON রেসপন্স
        return res.status(200).json({
            status: "success",
            message: "All user profiles fetched successfully",
            users: user, // ব্যবহারকারীদের তালিকা
        });
    } catch (err) {
        // ত্রুটি থাকলে JSON রেসপন্স
        return res.status(500).json({
            status: "error",
            message: "Failed to fetch user profiles",
            error: err.toString(),
        });
    }
};
// Single User profile update
export const SingleUserprofileupdate = async (req, res) => {
    try {
       let reqBody = req.body; 
        let user_id = req.params.id;
        const data = await UserModel.findByIdAndUpdate(user_id, reqBody, { new: true });

        if (data === null) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
            });
        }

        return res.status(200).json({
            status: "success",
            message: "User profile updated successfully",
            user: data,
        });
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: "Failed to update user profile",
            error: err.toString(),
        });
    }
};
export const DeleteSingleUser = async (req, res) => {
    try {
        let user_id = req.params.id; 
        let data = await UserModel.findByIdAndDelete(user_id);

        if (data === null) {
            return res.status(404).json({
                status: "error",
                message: "User not found for Delete",
            });
        } else {
            return res.status(200).json({
                status: "success",
                message: "Single User profile deleted successfully",
                user: data, 
            });
        }
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: "Failed to delete user profile",
            error: err.toString(), // ত্রুটির বিস্তারিত
        });
    }
};



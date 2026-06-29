const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerAdmin = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const exist = await Admin.findOne({ email });

        if (exist) {

            return res.status(400).json({

                success: false,

                message: "Admin already exists",

            });

        }

        const admin = await Admin.create({
            name,
            email,
            password,

        });

        const adminData = {
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            role: admin.role,
        };

        res.status(201).json({
            success: true,
            message: "Admin Registered Successfully",
            admin: adminData,
        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

const loginAdmin = async (req, res) => {

    try {

        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });

        if (!admin) {

            return res.status(404).json({

                success: false,

                message: "Admin not found",

            });

        }

        const match = await bcrypt.compare(password, admin.password);

        if (!match) {

            return res.status(401).json({

                success: false,

                message: "Invalid Password",

            });

        }

        const token = jwt.sign(

            {

                id: admin._id,

            },

            process.env.JWT_SECRET,

            {

                expiresIn: "7d",

            }

        );

        res.json({

            success: true,

            token,

            admin,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

module.exports = {

    registerAdmin,

    loginAdmin,

};
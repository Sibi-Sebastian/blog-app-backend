import asyncHandler from 'express-async-handler';
import users from '../models/userModel.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

//@desc register user
//@api post users/register
//@access PUBLIC


export const register = asyncHandler(async(req, res) => {   
    const {name, email, password} = req.body;
        
        if(!name || !email || !password) {
            res.status(400);
            throw new Error("All fields are mandatory");
        }
        
        const existingUser = await users.findOne({email});
        if(existingUser){
            res.status(409);
            throw new Error("User Already exists");
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = await users.create({name, email, password: hashedPassword});
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email
        });
});

//@desc login user
//@api post users/login
//@access PUBLIC


export const login = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
        
        if(!email || !password) {
            res.status(400);
            throw new Error("All fields are mandatory");
        }

        const existingUser = await users.findOne({email});

        if(existingUser && (await bcrypt.compare(password, existingUser.password))){

            //creating accessToken
            const accessToken = jwt.sign({
                user: {
                    id: existingUser._id,
                    name: existingUser.name,
                    email: existingUser.email
                }
            }, process.env.SECRET_KEY, {expiresIn: process.env.EXPIRY})

            return res.status(200).json({accessToken, user: {_id: existingUser._id, name: existingUser.name, email: existingUser.email}});
        }
        else{
        res.status(401);
        throw new Error("Invalid email or password");
        }
});

//@desc Get current user
//@api get users/
//@access PRIVATE

export const current = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

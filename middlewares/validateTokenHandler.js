import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const validateTokenHandler = asyncHandler(async(req, res, next) => {
    const authHeader = req.headers.Authorization || req.headers.authorization;
    
    if(!authHeader || !authHeader.startsWith("Bearer")){
        res.status(401);
        throw new Error("Access token is missing or invalid");
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401);
        throw new Error("Invalid or expired token");
    }
});
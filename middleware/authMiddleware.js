const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
   // verify user is authenticated
   const token = req.cookies.jwt; // Read JWT from the 'jwt' cookie

   if (!token) {
       return res.status(401).json({ error: "Authorization token required" });
   }

   try {
       const { _id } = jwt.verify(token, process.env.SECRET);

       req.user = await User.findOne({ _id }).select("_id");
       next();
   } catch (error) {
       console.log(error);
       res.status(401).json({ error: "Request is not authorized" });
   }
};
module.export = authMiddleware;
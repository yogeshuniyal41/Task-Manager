import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.mjs'
import { refreshToken } from '../models/index.mjs';

const userController = {
    async login(req, res) {
        
        try {
            
            const { user, password } = req.body;
            const foundUser = await User.findOne({ user });
            if (!foundUser) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const passwordMatch = await bcrypt.compare(password, foundUser.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Create a JWT token
            const access_token = jwt.sign({ id: foundUser._id }, process.env.ACCESS_SECRET, { expiresIn: '60s' });
            const refresh_token = jwt.sign({ id: foundUser._id }, process.env.REFRESH_SECRET, { expiresIn: '10h' });

            await refreshToken.create({token:refresh_token})

            // Send the token in the response
            res.status(200).json({ success: true, access_token, refresh_token, "id":user });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async signup(req, res) {
        try {
            const { user, password, name } = req.body;
            

            const existingUser = await User.findOne({ user });
            if (existingUser) {
                
                return res.status(409).json({ error: 'User already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user
            const newUser = new User({ user, password: hashedPassword, name });
            await newUser.save();

            res.status(201).json({ success: true, msg: 'User created successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },


    async logout(req,res){
        try {
            
            if(!token)
                {
                    res.status(401).error('Unauthorized');
                }
          await  refreshToken.findOneAndDelete({token:token});
            res.status(200).json({msg: "logged out"})

        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

export default userController;

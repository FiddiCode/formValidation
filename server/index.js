import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

//Route imports
import registrationRoute from './routes/registration.route.js';
import cityRoute from './routes/city.route.js'
import stateRoute from './routes/state.route.js';
import countryRoute from './routes/country.route.js'

dotenv.config()

const app = express(); 
 
// Middleware
app.use(cors());
app.use(express.json()); 

// MongoDB connection
const mongodb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};


app.get("/",(req,res)=>{
    res.send("Welcome to form validation server")
})

app.use('/api/v1',registrationRoute);
app.use('/api/v1',countryRoute);
app.use('/api/v1',stateRoute);
app.use('/api/v1',cityRoute);
app.all('*',(req,res)=>{
    res.send("Route not available")
})

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
    await mongodb(); // Connect to MongoDB when the server starts
    console.log("Server is running on port", PORT);
});
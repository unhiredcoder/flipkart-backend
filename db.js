import mongoose from "mongoose";

const Connection= async (username,password)=> {
    const DB_URI=`mongodb+srv://${username}:${password}@cluster0.vda15sn.mongodb.net/flipkart?retryWrites=true&w=majority` 
    try {
      await mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Connected to MongoDB Atlas');
    } catch (error) {
      console.error('Error connecting to MongoDB Atlas:', error);
    }
  }
  
  export default Connection
import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config();
const myConnection = () => {
    const dbHost = process.env.DB_HOST;
    if (!dbHost) {
      console.error('DB_HOST environment variable is not defined');
      return;
    }
  
    mongoose.connect(dbHost)
      .then(() => {
        console.log('connected successfully with database');
      })
      .catch((error) => {
        console.error('failed to connect with database', error);
      });
  }
  export default myConnection;
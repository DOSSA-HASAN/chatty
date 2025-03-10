import mongoose from "mongoose";

export const connnectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_KEY);
        console.log(`Connection established : ${conn.connection.host}`);
    } catch (error) {
        console.log(`Could not establish connection with database: ${error.stack}`);
    }
}
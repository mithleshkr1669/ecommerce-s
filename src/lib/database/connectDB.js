import mongoose from "mongoose";
export default async function dbConnection() {
  return mongoose.connect(process.env.MONGODB_URI);
}

// Function to disconnect Mongoose
export const disconnectDB = async () => {
  if (mongoose.connection.readyState !== 0) {
    try {
      await mongoose.disconnect();
      console.log("Mongoose connection successfully disconnected.");
    } catch (error) {
      console.error("Error disconnecting Mongoose:", error);
    }
  } else {
    console.log("No active Mongoose connection to disconnect.");
  }
};

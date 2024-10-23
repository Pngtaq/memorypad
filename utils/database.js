import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  // Setting strictQuery to true to avoid warnings related to deprecated query features.
  mongoose.set("strictQuery", true);

  // Check if we are already connected to avoid multiple connections.
  if (isConnected) {
    console.log("MongoDB is already connected");
    return; // Early return to avoid re-connecting.
  }

  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI, {
      dbName: "MemoryPad",
      useNewUrlParser: true,
    });

    isConnected = true; // Update connection state
    console.log("MongoDB is connected");
  } catch (err) {
    console.error("MongoDB connection failed", err); // Use console.error for errors
    throw err; // Optional: rethrow the error if you want to handle it at a higher level
  }
};

import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
      console.log("MongoDB ga ulanish muvaffaqiyatli amalga oshirildi!");
    });
  } catch (error) {
    console.error(
      "MongoDB ga ulanish muvaffaqiyatsiz amalga oshirildi!",
      error.message
    );
  }
};

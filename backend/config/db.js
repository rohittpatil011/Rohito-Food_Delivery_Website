import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://rohittpatil:9156735383@cluster0.equwkyr.mongodb.net/food-del"
    )
    .then(() => console.log("DB Connected"));
};

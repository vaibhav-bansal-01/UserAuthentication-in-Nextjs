import mongoose from "mongoose";

export async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log("Connected database:", mongoose.connection.name);
    console.log("Mongo URL:", process.env.MONGO_URL);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Connected to the database");
    });
    connection.on("error", (error) => {
      console.log("Error while connecting to the database");
      console.log(error);
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong while connecting to the database");
    console.log(error);
  }
}

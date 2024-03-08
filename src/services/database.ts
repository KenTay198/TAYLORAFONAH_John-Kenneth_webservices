import mongoose from "mongoose";

const mongo_uri = process.env.MONGO_URI;

const databaseConnect = () => {
  if (!mongo_uri) return console.log("No MongoDB URI provided");

  mongoose
    .connect(mongo_uri)
    .then(() => {
      return console.log("MongoDB connection success.");
    })
    .catch((error) => {
      console.error("Error connecting to database: ", error);
      return process.exit(1);
    });

  mongoose.connection.on("disconnected", databaseConnect);
};

export default databaseConnect;

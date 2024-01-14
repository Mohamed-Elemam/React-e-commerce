import mongoose from "mongoose";

export const dbConnection = async () => {
  await mongoose
    .connect(process.env.DB_CONNECTION_ONLINE)
    // .connect(process.env.DB_CONNECTION_LOCAL)
    .then(() => {
      console.log("connected successfully to database");
    })
    .catch((err) => {
      console.log("database connection failed", err);
    });
};

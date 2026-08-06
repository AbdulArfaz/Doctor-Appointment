import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import dns from "node:dns"
import { Admin } from "../models/admin.model.js";
import { register } from "node:module";
dns.setDefaultResultOrder("ipv4first")
dns.setServers(["8.8.8.8" , "8.8.4.4"])


const registerFirstAdmin = async () => {
  try {
    const adminCount = await Admin.countDocuments();
    
    if (adminCount === 0) {
      await Admin.create({
        name: "Super Admin",
        email: process.env.INITIAL_ADMIN_EMAIL,
        password: process.env.INITIAL_ADMIN_PASSWORD,
        role: "admin"
      });
      console.log("Default admin created: admin@docslot.com");
    }
  } catch (error) {
    console.error("Failed to add first admin:", error.message);
  }
};

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`,
    );

    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`,
    );
    registerFirstAdmin()
  } catch (error) {
    console.log("MONGODB Connection error ", error);
    process.exit(1);
  }
};

export default connectDB;

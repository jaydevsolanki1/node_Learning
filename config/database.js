/* =====================================================
                    IMPORT MODULES
===================================================== */

import mongoose from "mongoose";
import Contact from "../models/contact.models.js";

/* =====================================================
                  CONNECT MONGODB
===================================================== */

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Contact_data");

    console.log("✅ MongoDB Connected Successfully");

    await insertSampleContact();
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error.message);
    process.exit(1);
  }
};

/* =====================================================
              INSERT SAMPLE CONTACT DATA
===================================================== */

const insertSampleContact = async () => {
  try {
    const count = await Contact.countDocuments();

    if (count === 0) {
      await Contact.create({
        first: "Jay",
        last: "Patel",
        email: "jay@example.com",
        phone: "9876543210",
      });

      console.log("✅ Sample Contact Inserted");
    }
  } catch (error) {
    console.error("❌ Sample Contact Insert Error");
    console.error(error.message);
  }
};

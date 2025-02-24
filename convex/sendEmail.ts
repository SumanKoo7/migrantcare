"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import * as nodemailer from "nodemailer";

export default action({
  args: { description: v.string(), email: v.string() },
  handler: async (ctx, { description, email }) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: "migrantcareservices@gmail.com",
      subject: "New Complaint from Migrant Care",
      text: `Complaint: ${description}\nFrom: ${email}`,
    });
  },
});
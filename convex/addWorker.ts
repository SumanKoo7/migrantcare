import { mutation } from "./_generated/server";
import { v } from "convex/values";

export default mutation({
  args: {
    userId: v.id("users"),
    name: v.string(),
    contact: v.string(),
    skills: v.string(),
    location: v.object({ lat: v.number(), lng: v.number(), lastUpdated: v.number() }),
  },
  handler: async ({ db }, { userId, name, contact, skills, location }) => {
    await db.insert("workers", { userId, name, contact, skills, location });
  },
});
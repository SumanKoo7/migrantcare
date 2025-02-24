import { mutation } from "./_generated/server";
import { v } from "convex/values";

export default mutation({
  args: { userId: v.id("users"), description: v.string() },
  handler: async ({ db }, { userId, description }) => {
    await db.insert("complaints", { userId, description, createdAt: Date.now() });
  },
});

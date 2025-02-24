import { mutation } from "./_generated/server";
import { v } from "convex/values";

function generateUniqueId(): string {
  return Math.floor(100000000000 + Math.random() * 900000000000).toString();
}

export default mutation({
  args: { googleId: v.string(), email: v.string() },
  handler: async ({ db }, { googleId, email }) => {
    const existingUser = await db
      .query("users")
      .withIndex("by_googleId", (q) => q.eq("googleId", googleId))
      .first();
    if (!existingUser) {
      const uniqueId = generateUniqueId();
      const userId = await db.insert("users", { googleId, email, uniqueId });
      return { userId, uniqueId };
    }
    return { userId: existingUser._id, uniqueId: existingUser.uniqueId };
  },
});
import { query } from "./_generated/server";
import { v } from "convex/values";

export default query({
  args: { userId: v.id("users") },
  handler: async ({ db }, { userId }) => {
    return await db
      .query("workers")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();
  },
});
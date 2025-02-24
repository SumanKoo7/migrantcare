import { query } from "./_generated/server";
import { v } from "convex/values";

export default query({
  args: { userId: v.id("users") },
  handler: async ({ db }, { userId }) => {
    return await db
      .query("complaints")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    googleId: v.string(),
    email: v.string(),
    uniqueId: v.string(),
  }).index("by_googleId", ["googleId"]),
  workers: defineTable({
    userId: v.id("users"),
    name: v.string(),
    contact: v.string(),
    skills: v.string(),
    location: v.object({
      lat: v.number(),
      lng: v.number(),
      lastUpdated: v.number(),
    }),
  }).index("by_userId", ["userId"]),
  complaints: defineTable({
    userId: v.id("users"),
    description: v.string(),
    createdAt: v.number(),
  }).index("by_userId", ["userId"]),
});
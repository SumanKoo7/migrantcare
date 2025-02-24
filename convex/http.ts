import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

http.route({
  path: "/sendEmail",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const { description, email } = await request.json();
    await ctx.runAction(api.sendEmail.default, { description, email });
    return new Response("Email sent", { status: 200 });
  }),
});

export default http;
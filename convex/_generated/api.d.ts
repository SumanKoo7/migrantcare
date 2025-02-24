/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as addComplaint from "../addComplaint.js";
import type * as addWorker from "../addWorker.js";
import type * as getAllComplaints from "../getAllComplaints.js";
import type * as getAllWorkers from "../getAllWorkers.js";
import type * as getComplaints from "../getComplaints.js";
import type * as getWorkers from "../getWorkers.js";
import type * as http from "../http.js";
import type * as registerUser from "../registerUser.js";
import type * as sendEmail from "../sendEmail.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  addComplaint: typeof addComplaint;
  addWorker: typeof addWorker;
  getAllComplaints: typeof getAllComplaints;
  getAllWorkers: typeof getAllWorkers;
  getComplaints: typeof getComplaints;
  getWorkers: typeof getWorkers;
  http: typeof http;
  registerUser: typeof registerUser;
  sendEmail: typeof sendEmail;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

import { Router } from "express";
import { redirectingUrl, shorten } from "./cont.js";
const route=Router();

route.route("/shorten").post(shorten);
route.route("/:backShort").get(redirectingUrl);

export {route};
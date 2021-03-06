import { authMiddleware, verifyBody } from "./middleware";
import { createMiddleware } from "../createMiddleware";
import { Router } from "../Router";

const r = new Router();

export const get = r.get((req) => {
  return {
    name: "yoo",
    age: 19,
  };
});

export const getMid = r
  .middleware([
    authMiddleware,
    verifyBody,
    createMiddleware((req) => {
      return { newField: 123456789 };
    }),
  ])
  .get((req, fields) => {
    fields.session;
    fields.verifiedBody;
    fields.newField;

    return {
      something: "yes",
    };
  });

r.get((req) => {
  return {};
});

const rooter = new Router().globalMiddleware([authMiddleware]);

rooter
  .middleware([
    createMiddleware(() => {
      return { newField: "stringval" };
    }),
  ])
  .get((req, { session, newField }) => {
    return {};
  });

rooter.get((req, { session }) => {
  return {
    session,
  };
});

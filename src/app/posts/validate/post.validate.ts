import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

export default class PostValidator {
  static async CreatePost(req: Request, res: Response, next: NextFunction) {
    const { title, body, author, tags } = req.body;
    let errors = [];
    if (title === undefined) { errors.push({ msg: "title is required" }); }
    if (body === undefined) { errors.push({ msg: "body is required" }); }
    if (author === undefined) { errors.push({ msg: "author is required" }); }
    if (tags === undefined) { errors.push({ msg: "tags are required" }); }
    check(title, "title is required").isEmpty();
    check(body, "body is required").isEmpty();
    check(author, "author is required").isEmpty();
    check(tags, "tags is required").isEmpty();
    const err = validationResult(req);
    console.log(err);
    errors.length > 0
      ? res.status(404).json({ error: { message: errors } })
      : next();
  }

  static async GetAll(req: Request, res: Response, next: NextFunction) {
    const { from } = req.query;
    from === undefined
      ? res.status(404).json({ error: { message: "from not found" } })
      : next();
  }

  static async UpdateOne(req: Request, res: Response, next: NextFunction) {
    const { title, tags, body } = req.body;
    let errors = [];
    if (title === undefined) {
      errors.push({ msg: "title is required" });
    }
    if (tags === undefined) {
      errors.push({ msg: "tags are required" });
    }
    if (body === undefined) {
      errors.push({ msg: "body is required" });
    }
    errors.length > 0
      ? res.status(404).json({ error: { message: errors } })
      : next();
  }
}

import { Request, Response, NextFunction } from "express";
import PostsServices from "../services/posts.services";
import HandleError from "../../../util/HandleError";
import { validationResult } from "express-validator";

class PostsController {
  static async CreateOne(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req).isEmpty();
    console.log(errors);
    await PostsServices.Create(req.body)
      .then(data => res.status(200).json({ data }))
      .catch((err) => next(HandleError(404)));
  }

  static async Get(req: Request, res: Response, next: NextFunction) {
    await PostsServices.GetAll(req.query.from)
      .then((data) => res.status(200).json({ data }))
      .catch((err) => next(HandleError(404)));
  }

  static async GetOne(req: Request, res: Response, next: NextFunction) {
    await PostsServices.Get(req.params.id)
      .then((data) => res.status(200).json({ data }))
      .catch((err) => next(HandleError(404)));
  }

  static async UpdataOne(req: Request, res: Response, next: NextFunction) {
    await PostsServices.UpdateOne(req.params.id, req.body)
      .then((data) => res.status(200).json({ data }))
      .catch((err) => next(HandleError(err)));
  }

  static async CatagoriesFilter(req: Request, res: Response, next: NextFunction) {
    if (req.query.tags !== undefined) {
      await PostsServices.Catagories(req.query.tags)
        .then((data) => res.status(200).json({ data }))
        .catch((err) => next(HandleError(err)));
    }
  }

  static async PostCount(req: Request, res: Response, next: NextFunction) {
    await PostsServices.TotalCount()
      .then((data) => res.status(200).json({ data }))
      .catch((err) => next(HandleError(err)))
  }

  static async DeleteOne(req: Request, res: Response, next: NextFunction) {
    await PostsServices.DeleteOne(req.params.id)
      .then(data => res.status(200).json({ data }))
      .catch(err => next(HandleError(err)))
  }
}

export default PostsController;

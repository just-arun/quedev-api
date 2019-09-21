import { Request, Response, NextFunction } from "express";
import PostsServices from "../services/posts.services";
import HandleError from "../../../util/HandleError";
import { validationResult } from "express-validator";

class PostsController {
  static async CreateOne(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req).isEmpty();
      console.log(errors);
      const data = await PostsServices.Create(req.body);
      res.status(200).json({ data });
    } catch (error) {
      next(HandleError(500,error))
    }
  }

  static async Get(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await PostsServices.GetAll(req.query.from);
      res.status(200).json({data});
    } catch (error) {
      next(HandleError(404,error))
    }
  }

  static async GetOne(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await PostsServices.Get(req.params.id);
      res.status(200).json({ data });
    } catch (error) {
      next(HandleError(404,error))
    }
  }

  static async UpdataOne(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await PostsServices.UpdateOne(req.params.id, req.body);
      res.status(200).json({ data })
    } catch (error) {
      next(HandleError(500,error))
    }
  }

  static async CatagoriesFilter(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.query.tags !== undefined) {
        const data = await PostsServices.Catagories(req.query.tags)
        res.status(200).json({ data });
      }
    } catch (error) {
      next(HandleError(500,error));
    }
  }

  static async PostCount(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await PostsServices.TotalCount()
      res.status(200).json({ data });
    } catch (error) {
      next(HandleError(500,error))
    }
  }

  static async DeleteOne(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await PostsServices.DeleteOne(req.params.id);
      res.status(200).json({ data });
    } catch (error) {
      next(HandleError(500,error))
    }
  }
}

export default PostsController;

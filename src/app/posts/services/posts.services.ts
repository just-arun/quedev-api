import PostInterface from "../interface/posts.interface";
import PostModel from "../models/post.models";
import { ObjectId } from "bson";
import UpdatePostInterface from "../interface/updatePostInterface";
import { check, validationResult }  from 'express-validator';

class PostsServices {
  static async Create(post: PostInterface) {
    return new Promise<string>(async (resolve, rejects) => {
      try {
        const { title, tags, body, author } = post;
        const description = body.slice(0,599);
        check(title).isEmpty();
        await PostModel.insertMany({ title, tags, description, body, author });
        return resolve("post created");
      } catch (error) {
        return rejects(error);
      }
    });
  }

  static async GetAll(from: number) {
      return new Promise(async (resolve, rejects) => {
        try {
          const data = await PostModel
            .find({})
            .skip(from)
            .limit(10)
            .sort({created_at:-1});
          return resolve(data);
        } catch (error) {
            return rejects(error);
        }
      });
  }

  static async Get(id: string) {
    return new Promise(async (resolve, rejects) => {
      try {
        const _id = new ObjectId(id);
        const data = await PostModel.findOne({_id})
          return resolve(data);
      } catch (error) {
        return rejects(error);
      }
    });
  }

  static async UpdateOne(id: string, post: UpdatePostInterface) {
    return new Promise(async (resolve, rejects) => {
      try {
        const _id = new ObjectId(id);
        const { title, tags, body } = post;
        const description = body.slice(0,599);
        const data = await PostModel.updateOne({ _id }, { $set: { title, description, tags, body } });
        return resolve(data);
      } catch (error) {
        return rejects(error);
      }
    });
  }
  
  static async Catagories(tags: string) {
    return new Promise(async (resolve, rejects) => {
      try {
        const data = await PostModel.find({ tags })
        .sort({created_at:-1})
        return resolve(data);
      } catch (error) {
        return rejects(error);
      }
    });
  }

  static async SearchFunc(keyWords: string) {
    return new Promise(async (resolve, rejects) => {
      try {
        const data = await PostModel.find({ name: { $regex: keyWords, $options: "gi" }})
        return resolve(data);
      } catch (error) {
        return rejects(error);
      }
    })
  }

  static async TotalCount() {
    return new Promise(async (resolve, rejects) => {
      try {
        const data = await PostModel.find({}).count()
        return resolve(data);
      } catch (error) {
        return rejects(error);
      }
    })
  }

  static async DeleteOne(id: string) {
    const _id = new ObjectId(id)
    return new Promise(async (resolve, rejects) => {
      try {
        const data = await PostModel.deleteOne({ _id })
        return resolve(data);
      } catch (error) {
        return rejects(error)
      }
    })
  }
}

export default PostsServices;

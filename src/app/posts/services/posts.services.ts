import PostInterface from "../interface/posts.interface";
import PostModel from "../models/post.models";
import { ObjectId } from "bson";
import UpdatePostInterface from "../interface/updatePostInterface";
import { check, validationResult }  from 'express-validator';

class PostsServices {
  static async Create(post: PostInterface) {
    return new Promise<string>((resolve, rejects) => {
      try {
        let error = false;
        const { title, tags, body, author } = post;
        const description = body.slice(0,599);
        check(title).isEmpty();
        PostModel.insertMany({ title, tags, description, body, author });
        return resolve("post created");
      } catch (error) {
        return rejects(error);
      }
    });
  }

  static async GetAll(from: number) {
      return new Promise((resolve, rejects) => {
        try {
          PostModel
            .find({})
            .skip(from)
            .limit(10)
            .sort({created_at:-1})
            .then((data) => resolve(data) )
            .catch((err) => { throw err; })
        } catch (error) {
            return rejects(error);
        }
      });
  }

  static async Get(id: string) {
    return new Promise((resolve, rejects) => {
      try {
        const _id = new ObjectId(id);
        PostModel.findOne({_id: _id})
          .then((data) => resolve(data) )
          .catch((err) => { throw err; });
      } catch (error) {
        return rejects(error);
      }
    });
  }

  static async UpdateOne(id: string, post: UpdatePostInterface) {
    return new Promise((resolve, rejects) => {
      try {
        const _id = new ObjectId(id);
        const { title, tags, body } = post;
        const description = body.slice(0,599);
        PostModel.updateOne({ _id }, { $set: { title, description, tags, body } })
          .then((data) =>  resolve(data) )
          .catch((err) => { throw err; })
      } catch (error) {
        return rejects(error);
      }
    });
  }
  
  static async Catagories(tags: string) {
    return new Promise((resolve, rejects) => {
      try {
        PostModel.find({ tags })
        .sort({created_at:-1})
        .then((data) => resolve(data))
        .catch((err) => { throw err; });
      } catch (error) {
        return rejects(error);
      }
    });
  }

  static async SearchFunc(keyWords: string) {
    return new Promise((resolve, rejects) => {
      try {
        PostModel.find({ name: { $regex: keyWords, $options: "gi" }})
          .then((data) => resolve(data))
          .catch((err) => { throw err })
      } catch (error) {
        return rejects(error);
      }
    })
  }

  static async TotalCount() {
    return new Promise((resolve, rejects) => {
      try {
        PostModel.find({}).count()
          .then((data) => resolve(data))
          .catch(err => { throw err })
      } catch (error) {
        return rejects(error);
      }
    })
  }

  static async DeleteOne(id: string) {
    const _id = new ObjectId(id)
    return new Promise((resolve, rejects) => {
      try {
        PostModel.deleteOne({ _id })
          .then(data => resolve(data))
          .catch(err => { throw err });
      } catch (error) {
        return rejects(error)
      }
    })
  }
}

export default PostsServices;

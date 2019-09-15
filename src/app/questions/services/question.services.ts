import { ObjectID } from 'bson';
import CreateQuestionInterface from "../interface/createQuestion.interface";
import QuestionModel from "../models/Questions.models";
import UpdateQuestionInterface from "../interface/QuestionUpdateInterface";

export default class QuestionService {
  static async CreateOne(bodyitem: CreateQuestionInterface) {
    const { title, body, author } = bodyitem;
    return new Promise((resolve, rejects) => {
      try {
        const query = { title, body, author };
        QuestionModel.insertMany(query)
          .then(data => resolve(data))
          .catch(err => { throw err; });
      } catch (error) {
        return rejects(error);
      }
    });
  }

  static async UpdateOne(id:string, bodyItem: UpdateQuestionInterface) {
    const { title, body } = bodyItem;
    const _id = new ObjectID(id);
    return new Promise((resolve, rejects) => {
      try {
        const query = { $set: { title, body } };
        QuestionModel.updateOne({_id}, query)
          .then((data) => resolve(data))
          .catch((err) => { throw err })
      } catch (error) {
        return rejects(error);
      }
    })
  }

  static async GetOne(id: string) {
    const _id = new ObjectID(id);
    return new Promise((resolve, rejects) => {
      try {
        QuestionModel.findOne(_id)
          .then((data) => resolve(data))
          .catch((err) => { throw err; })
      } catch (error) {
        return rejects(error);
      }
    })
  }

  static async GetAll(from: number) {
    return new Promise((resolve, rejects) => {
      try {
        QuestionModel.find({})
        .skip(from)
        .sort({created_at:-1})
        .then((data) => resolve(data))
        .catch(err => { throw err; })
      } catch (error) {
        return rejects(error);
      }
    });
  }

}

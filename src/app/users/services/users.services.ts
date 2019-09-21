import UsersModel from "../models/users.models";
import { ObjectId } from "bson";
import UserInterface from "../interface/User.interface";
import { compare, genSalt, hash } from "bcryptjs";

export default class UsersServices {

  static async CreateOne(person: UserInterface) {
    return new Promise(async (resolve, rejects) => {
      try {
        const { fname, lname, uname, email, pwd, goodin } = person;
        genSalt(10, (err, salt) => {
          if (err) {
            throw err;
          }
          hash(pwd, salt, (err, hash) => {
            if (err) {
              throw err;
            }
            const query = { fname, lname, uname, email, pwd: hash, goodin };
            UsersModel.insertMany(query)
              .then(data => resolve(data))
              .catch(err => {
                throw err;
              });
          });
        });
      } catch (error) {
        return rejects(error);
      }
    });
  }

  static async UpdateOne(id: string, person: UserInterface) {
    const { fname, lname, uname, email, goodin } = person;
    return new Promise(async (resolve, rejects) => {
      try {
        const _id = new ObjectId(id);
        const query = { fname, lname, uname, email, goodin };
        const data =  await UsersModel.updateOne({ _id }, query)
        return resolve(data);
      } catch (error) {
        return rejects(error);
      }
    });
  }

  static async GetOne(id) {
    return new Promise(async (resolve, rejects) => {
      try {
        const _id = new ObjectId(id);
        const data = await UsersModel.findOne({_id});
        return resolve(data);
      } catch (error) {
        return rejects(error);
      }
    });
  }

}

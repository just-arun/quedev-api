import UsersModel from "../models/users.models";
import { ObjectId } from "bson";
import UserInterface from "../interface/User.interface";
import { compare, genSalt, hash } from "bcryptjs";

export default class UsersServices {

  static async CreateOne(person: UserInterface) {
    return new Promise(async (resolve, rejects) => {
      try {
        const { fname, lname, uname, email, pwd, goodin } = person;
        genSalt(10, function(err, salt) {
          if (err) {
            throw err;
          }
          hash(pwd, salt, function(err, hash) {
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
    return new Promise((resolve, rejects) => {
      try {
        const _id = new ObjectId(id);
        const query = { fname, lname, uname, email, goodin };
        UsersModel.updateOne({ _id }, query)
          .then(data => resolve(data))
          .catch(err => {
            rejects(err);
          });
      } catch (error) {
        return resolve(error);
      }
    });
  }

  static async GetOne() {

  }

}

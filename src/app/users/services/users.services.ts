import UsersModel from "../models/users.models";
import { ObjectId } from "bson";
import UserInterface from "../interface/User.interface";
import { compare, genSalt, hash } from "bcryptjs";

export default class UsersServices {
  static async CreateOne(person: UserInterface) {
    const { fname, lname, uname, email, pwd, goodin } = person;
    return new Promise((resolve, rejects) => {
      try {
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

  // static async ResetPwd(id: string, oldPwd: string, newPwd: string) {
  //   return new Promise((resolve, rejects) => {
  //     try {
  //       const _id = new ObjectId(id);
  //       UsersModel.findOne({ _id })
  //         .then(data => {
  //           const { pwd } = data;
  //           console.log(pwd);
  //           compare(oldPwd, pwd, (err, res) => {
  //             if (err) {
  //               throw err;
  //             }
  //             if (!res) {
  //               throw "passwor dosent match";
  //             } else {
  //               genSalt(10, function(err, salt) {
  //                 if (err) {
  //                   throw err;
  //                 }
  //                 hash(newPwd, salt, function(err, hash) {
  //                   if (err) {
  //                     throw err;
  //                   }
  //                   UsersModel.updateOne({ _id }, { pwd: hash })
  //                     .then(data => resolve(data))
  //                     .catch(err => {
  //                       throw err;
  //                     });
  //                 });
  //               });
  //             }
  //           });
  //         })
  //         .catch(err => {
  //           throw err;
  //         });
  //     } catch (error) {
  //       rejects(error);
  //     }
  //   });
  // }
}

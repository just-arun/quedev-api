 
import { connect } from 'mongoose';
import Keys from './Keys';

export default class DataBase {
    static Connect() {
        const mongooseOptions = { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, autoReconnect: true }
        connect(Keys.mongodbURI(), mongooseOptions)
        .then(()=>console.log("connected to db..."))
        .catch((err)=>console.log(err));
    }
}


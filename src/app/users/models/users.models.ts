import { Schema, model } from 'mongoose';

const UsersSchema = new Schema(
{
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    uname: {
        type: String,
        required: true
    },
    goodin: {
        type: Array,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    pwd: {
        type: String,
        required: true
    }
},
{ timestamps: { createdAt: 'created_at' } }
);

const UsersModel = model('Users', UsersSchema);

export default UsersModel;



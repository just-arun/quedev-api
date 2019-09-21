import { Schema, model } from 'mongoose';

const ProfileSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const ProfileModel = model("Profile", ProfileSchema);

export default ProfileModel;

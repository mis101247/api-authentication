import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const facebookSchema = new Schema({
    uid: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    }
});

const FacebookModel = mongoose.model('facebook', facebookSchema);

export default FacebookModel;

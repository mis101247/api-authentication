import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const facebookSchema = new Schema({
    uid: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: Array,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
});

const FacebookModel = mongoose.model('facebook', facebookSchema);

export default FacebookModel;

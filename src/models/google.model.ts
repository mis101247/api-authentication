import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const googleSchema = new Schema({
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

const GoogleModel = mongoose.model('google', googleSchema);

export default GoogleModel;

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const googleSchema = new Schema({
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

const GoogleModel = mongoose.model('google', googleSchema);

export default GoogleModel;

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    account: {
        type: String,
        required: true,
        trim: true,
        default: 'inactive'
    },
    token: {
        type: String,
        trim: true
    },
    sessionToken: {
        type: String,
        trim: true
    },
    activationToken: {
        type: String,
        trim: true
    }

})

export const User = mongoose.model('User', userSchema);
import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    currentOwner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        min: 6,
    },
    type: {
        type: String,
        enum: ['beach', 'mountain', 'village'],
        required: true
    },
    desc: {
        type: String,
        required: true,
        min: 50,
    },
    img: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sqmeters: {
        type: Number,
        required: true,
        min: 15
    },
    continent: {
        type: String,
        required: true
    },
    beds: {
        type: Number,
        required: true,
        min: 1
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

export default mongoose.model('Property', propertySchema);

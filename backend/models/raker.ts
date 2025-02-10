import mongoose from "mongoose";

const rakerSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    wilayah: {
        type: String, 
        enum: ["SUMSEL1", "SUMSEL2", "BENGKULU1"], 
        required: true 
    },
    serpo: {
        type: String,
        required: true
    },
    nama: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    realisasi: {
        type: Date,
    }
});

export default mongoose.model('Raker', rakerSchema);
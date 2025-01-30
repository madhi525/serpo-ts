import mongoose from 'mongoose';

const pmlinkSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    segment: { 
        type: String, 
        required: true
    },
    traveltiket: { 
        type: Number, 
        required: true 
    },
    tanggalpm: {
        type: Date, 
        required: true
    },
    tikorawal: {
        type: {
            lat: Number,
            lon: Number
        }, 
        required: true 
    },
    tikorakhir: {
        type: {
            lat: Number,
            lon: Number
        }, 
        required: true 
    },
    fototikorawal: {
        type: String, 
        required: true 
    },
    fototikorakhir: {
        type: String, 
        required: true
    },
    fotoproses: {
        type: [String], 
        required: true 
    },
    wilayah: {
        type: String, 
        enum: ["SUMSEL1", "SUMSEL2", "BENGKULU1"], 
        required: true 
    },
    rute: {
        type: [{
            lat: Number,
            lon: Number
        }],
        required: true
    },
    jarak: {
        type: Number,
        required: true
    }
});

export default mongoose.model('PmLink', pmlinkSchema);

import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    path:String,
    status:{
        type: String,
        enum: ["DONE", "REVISI", "BELUM"]
    },
    qty:Number
})

const boqSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    serpo: {
        type: String,
        required: true
    },
    wilayah: {
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ["DONE", "REVISI", "BELUM"],
        required: true
    },
    item: {
        leader: itemSchema,
        team: itemSchema,  
        splicer: itemSchema,  
        otdr: itemSchema,  
        opm: itemSchema,
        cyberkey: itemSchema,
        genset_5_kva: itemSchema,
        ofi: itemSchema,
        laser: itemSchema,
        bertest: itemSchema,
        gps: itemSchema,
        laptop: itemSchema,
        kabel_console: itemSchema,
        printer: itemSchema,
        printer_label: itemSchema,
        tali_panjat: itemSchema,
        trackel: itemSchema,
        ht: itemSchema,
        tang_crimping : itemSchema,
        lan_tester: itemSchema,
        lsa: itemSchema,
        k52: itemSchema,
        tang_ampere: itemSchema,
        tangga: itemSchema,
        tropong: itemSchema,
        head_lamp: itemSchema,
        lampu_outdoor: itemSchema,
        tool_set: itemSchema,
        hp_serpo: itemSchema,
        trackel_adss: itemSchema,
        sepatu_20kv: itemSchema,
        rompi: itemSchema,
        sepatu_safety: itemSchema,
        body_harnes: itemSchema,
        helm: itemSchema,
        sarung_tangan: itemSchema,
        jas_hujan: itemSchema,
        chainsaw: itemSchema,
        inverter: itemSchema,
        kompresor_udara: itemSchema,
        basecamp: itemSchema,
        mobil: itemSchema
    }
})

export default mongoose.model('boqModel', boqSchema);
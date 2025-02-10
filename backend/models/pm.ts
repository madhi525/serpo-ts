import mongoose from 'mongoose';

const pmlinkSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    serpo: {
        type: String,
    },
    segment: { 
        type: String, 
    },
    traveltiket: { 
        type: Number, 
    },
    tanggalpm: {
        type: Date, 
    },
    tikorawal: {
        type: {
            lat: Number,
            lon: Number
        }, 
    },
    tikorakhir: {
        type: {
            lat: Number,
            lon: Number
        }, 
    },
    fototikorawal: {
        type: String, 
    },
    fototikorakhir: {
        type: String, 
    },
    fotoproses: {
        type: [String], 
    },
    wilayah: {
        type: String, 
        enum: ["SUMSEL1", "SUMSEL2", "BENGKULU1"], 
    },
    rute: {
        type: [{
            lat: Number,
            lon: Number
        }],
    },
    jarak: {
        type: Number,
    }
});

const pmpopSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    general: {
        type: [{
            idpop: String,
            tanggalpm: Date,
            traveltiket: Number,
            alamatpop: String,
            jumlahrectifier: Number,
            koordinatpop: {
                lat: Number,
                lon: Number
            },
            tipepop:{
                type: String,
                enum: ['Super Backbone', 'Backbone', 'Distribusi'],
            },
            tipebangunan: {
                type: String,
                enum: ['Shelter', 'Mini Shelter', 'ODC', 'PLC', 'Other'],
            },
            luasbangunan: {
                panjang: Number,
                lebar: Number
            },
            kondisicat: String,
            lampu: String,
            kuncipintupengaman: String,
            tandatangan: String
        }],
        required: true
    },
    kwh: {
        type: [{
            catuanutama:{
                type: String,
                enum: ['PS GI', 'Distribusi', 'Lainnya'],
                default: 'PS GI',
            },
            idpelanggan: String,
            dayakwh: String,
            jumlahpasha: Number,
            meterankwh: Number,
            rn: Number,
            sn: Number,
            tn: Number, 
            gn: Number,
            rampere: Number,
            sampere: Number,
            tampere: Number,
            arester: {
                r: {
                    status: Boolean,
                    keterangan: String
                },
                s: {
                    status: Boolean,
                    keterangan: String
                },
                t: {
                    status: Boolean,
                    keterangan: String
                },
            },
            temuan: String
        }],
        required: true
    },
    genset: {
        type: [{
            merk: String,
            serialnumber: String,
            bbm: {
                type: String,
                enum: ['Solar', 'Bensin'],
                default: 'Solar'
            },
            tipe: String,
            kapasitasbbm: Number,
            jumlahpasha: Number,
            tiperumahan: {
                type: String,
                enum: ['Kerangkeng', 'Permanen'],
                default: 'Kerangkeng'
            },
            runninghour: Number,
            model: {
                type: String,
                enum: ['Fixed', 'Mobile'],
                default: 'Fixed'
            },
            rn: Number,
            sn: Number,
            tn: Number, 
            gn: Number,
            rampere: Number,
            sampere: Number,
            tampere: Number,
            arester: {
                r: {
                    status: Boolean,
                    keterangan: String
                },
                s: {
                    status: Boolean,
                    keterangan: String
                },
                t: {
                    status: Boolean,
                    keterangan: String
                },
            },
        }],
        required: true
    },
    rectifier: [{
        jumlahMCB: Number,
        mcb:[{
            nomor: Number,
            kapasitas: String,
            arus: Number,
            peruntukan: String
        }],
        battre:[{
            merk: String,
            tipe: String,
            kapasitas: Number,
            kondisi: Boolean,
            jumlahcell: Number,
            cell:[{
                pengukuran:[{
                    waktu: Number,
                    tegangan: Number,
                }]
            }]
            
        }]
    }]
    // cover: {
    //     type: [{
    //         traveltiker: Number,
    //         tanggalpelaksanaan: Date,
    //         idpop: String,
    //         namapop: String,
    //         koordinatpop: [{
    //             lat: Number,
    //             lon: Number
    //         }],
    //         tandatangan: String
    //     }],
    // },
    // powersystem: {
    //     type: [{
    //         idpop: String,
    //         namapop: String,
    //         tanggalpelaksanaan: Date,
    //         catuanutama: {
    //             type: String,
    //             enum: ['PS GI', 'Distribusi', 'Lainnya'],
    //             default: 'PS GI',
    //             required: false
    //         },
    //         idpelanggan: Number,
    //         dayakwh: String,
    //         jumlahpasha: Number,
    //         tanggalpengukurankwh: Date,
            
    //     }]
    // }
});

export default mongoose.model('PmLink', pmlinkSchema);

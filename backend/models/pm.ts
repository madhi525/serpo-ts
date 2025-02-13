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

const popSchema = new mongoose.Schema({
    id_server: String,
    lokasi: {
        alamat: String,
        koordinat: {
            lat: Number,
            lon: Number
        },
        serpo: String
    },
    tipe_jaringan: {
        type: String,
        enum: ['Super Backbone', 'Backbone', 'Distribusi']
    },
    tipe_bagunan: {
        type: String,
        enum: ['Shelter', 'Mini Shelter', 'ODC', 'PLC', 'Other']
    },
    catuan_daya: {
        type: String,
        enum: ['PS GI', 'Distribusi', 'Lainnya'],
        default: 'PS GI'
    },
    jumlah_ac: Number,
    travel_tiket_report:[String],
})

const reportSchema = new mongoose.Schema({
    timeStamp: {
        type: Date, default: Date.now
    },
    tanggal_pm: Date,
    travel_tiket: Number,
    tandatangan_petugas: String,
    bangunan: {
        daftar_perangkat: [String],
        luas_bangunan: {
            panjang: Number,
            lebar: Number
        },
        kondisi_cat: String,
        lampu: String,
        kunci_pengaman: String,
        jumlah_rectifier: Number,
        jumlah_ac: Number,
        jumlah_perangkat: Number
    },
    kwh: {
        id_pelanggan: String,
        dayakwh: String,
        jumlah_pasha: Number,
        meter_kwh_terkini: Number,
        voltase: {
            r_n: Number,
            s_n: Number,
            t_n: Number,
            g_n: Number
        },
        ampere: {
            r: Number,
            s: Number,
            t: Number,
            g: Number,
            n: Number
        },
        arrester: [{
            no: Number,
            status: Boolean,
            keterangan: String
        }],
        temuan: String
    },
    genset: {
        merk: String,
        serial_number: String,
        bbm: {
            type: String,
            enum: ['Solar', 'Bensin'],
            default: 'Solar'
        },
        tipe: String,
        kapasitas_bbm: Number,
        jumlah_pasha: Number,
        tipe_rumahan: {
            type: String,
            enum: ['Kerangkeng', 'Permanen'],
            default: 'Kerangkeng'
        },
        runing_hour: Number,
        model: {
            type: String,
            enum: ['Fixed', 'Mobile'],
            default: 'Fixed'
        },
        voltase: {
            r_n: Number,
            s_n: Number,
            t_n: Number,
            g_n: Number
        },
        ampere: {
            r: Number,
            s: Number,
            t: Number,
            g: Number,
            n: Number
        },
        arrester: [{
            no: Number,
            status: Boolean,
            keterangan: String
        }],
        temuan: String
    },
    rectifier: [{
        no: Number,
        jumlah_mcb: Number,
        merk: String,
        tipe: String,
        kapasitas_slot_modul: Number,
        jumlah_modul_terpasang: Number,
        tipe_modul: String,
        kapasitas_modul: Number,
        arus_beban: Number,
        tegangan_input: Number,
        utilitas: Number,
        mcb: [{
            no: Number,
            kapasitas: String,
            arus: Number,
            peruntukan: String
        }],
        battre: [{
            no:Number,
            merk: String,
            tipe: String,
            kapasitas: Number,
            kondisi: Boolean,
            jenis_battre: {
                type: String,
                enum: ['Seri', 'Bank'],
                default: 'Bank'
            },
            pengukuran: [{
                no_cell: Number,
                waktu: Number,
                tegangan: Number,
            }],
            arrester: [{
                no: Number,
                status: Boolean,
                keterangan: String
            }],
            keterangan: String
        }],
        keterangan: String
    }],
    acpdb: {
        jumlah_mcb: Number,
        mcb: [{
            no: Number,
            pasha: String,
            kapasitas: Number,
            arus: Number,
            merk: String,
            peruntukan: String
        }]
    },
    dcpdb: [{
        jumlah_mcb: Number,
        mcb: [{
            no: Number,
            pasha: String,
            kapasitas: Number,
            arus: Number
        }]
    }],
    ac: [{
        no: Number,
        merk: String,
        Status: Boolean,
        pk: Number,
        arus_maksimal: Number,
        arus_pengukuran: Number,
        kondisi_indoor_ac: Boolean,
        kondisi_pipa: Boolean,
        auto_restart: Boolean,
        switch_kontaktor: Boolean,
        seting_suhu: Number,
        keterangan: String
    }]

    
})

// const pmpopSchema = new mongoose.Schema({
//     timestamp: {
//         type: Date,
//         default: Date.now
//     },
//     general: {
//         type: [{
//             idpop: String,
//             tanggalpm: Date,
//             traveltiket: Number,
//             alamatpop: String,
//             jumlahrectifier: Number,
//             koordinatpop: {
//                 lat: Number,
//                 lon: Number
//             },
//             tipepop:{
//                 type: String,
//                 enum: ['Super Backbone', 'Backbone', 'Distribusi'],
//             },
//             tipebangunan: {
//                 type: String,
//                 enum: ['Shelter', 'Mini Shelter', 'ODC', 'PLC', 'Other'],
//             },
//             luasbangunan: {
//                 panjang: Number,
//                 lebar: Number
//             },
//             kondisicat: String,
//             lampu: String,
//             kuncipintupengaman: String,
//             tandatangan: String
//         }],
//         required: true
//     },
//     kwh: {
//         type: [{
//             catuanutama:{
//                 type: String,
//                 enum: ['PS GI', 'Distribusi', 'Lainnya'],
//                 default: 'PS GI',
//             },
//             idpelanggan: String,
//             dayakwh: String,
//             jumlahpasha: Number,
//             meterankwh: Number,
//             rn: Number,
//             sn: Number,
//             tn: Number, 
//             gn: Number,
//             rampere: Number,
//             sampere: Number,
//             tampere: Number,
//             arester: {
//                 r: {
//                     status: Boolean,
//                     keterangan: String
//                 },
//                 s: {
//                     status: Boolean,
//                     keterangan: String
//                 },
//                 t: {
//                     status: Boolean,
//                     keterangan: String
//                 },
//             },
//             temuan: String
//         }],
//         required: true
//     },
//     genset: {
//         type: [{
//             merk: String,
//             serialnumber: String,
//             bbm: {
//                 type: String,
//                 enum: ['Solar', 'Bensin'],
//                 default: 'Solar'
//             },
//             tipe: String,
//             kapasitasbbm: Number,
//             jumlahpasha: Number,
//             tiperumahan: {
//                 type: String,
//                 enum: ['Kerangkeng', 'Permanen'],
//                 default: 'Kerangkeng'
//             },
//             runninghour: Number,
//             model: {
//                 type: String,
//                 enum: ['Fixed', 'Mobile'],
//                 default: 'Fixed'
//             },
//             rn: Number,
//             sn: Number,
//             tn: Number, 
//             gn: Number,
//             rampere: Number,
//             sampere: Number,
//             tampere: Number,
//             arester: {
//                 r: {
//                     status: Boolean,
//                     keterangan: String
//                 },
//                 s: {
//                     status: Boolean,
//                     keterangan: String
//                 },
//                 t: {
//                     status: Boolean,
//                     keterangan: String
//                 },
//             },
//         }],
//         required: true
//     },
//     rectifier: [{
//         jumlahMCB: Number,
//         mcb:[{
//             nomor: Number,
//             kapasitas: String,
//             arus: Number,
//             peruntukan: String
//         }],
//         battre:[{
//             merk: String,
//             tipe: String,
//             kapasitas: Number,
//             kondisi: Boolean,
//             jumlahcell: Number,
//             cell:[{
//                 pengukuran:[{
//                     waktu: Number,
//                     tegangan: Number,
//                 }]
//             }]
            
//         }]
//     }]
    
//     // cover: {
//     //     type: [{
//     //         traveltiker: Number,
//     //         tanggalpelaksanaan: Date,
//     //         idpop: String,
//     //         namapop: String,
//     //         koordinatpop: [{
//     //             lat: Number,
//     //             lon: Number
//     //         }],
//     //         tandatangan: String
//     //     }],
//     // },
//     // powersystem: {
//     //     type: [{
//     //         idpop: String,
//     //         namapop: String,
//     //         tanggalpelaksanaan: Date,
//     //         catuanutama: {
//     //             type: String,
//     //             enum: ['PS GI', 'Distribusi', 'Lainnya'],
//     //             default: 'PS GI',
//     //             required: false
//     //         },
//     //         idpelanggan: Number,
//     //         dayakwh: String,
//     //         jumlahpasha: Number,
//     //         tanggalpengukurankwh: Date,
            
//     //     }]
//     // }
// });

export default mongoose.model('PmLink', pmlinkSchema);

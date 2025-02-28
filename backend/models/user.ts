import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: { 
      type: String, 
      enum: ['admin', 'serpo', 'koordinator', 'icon'], 
      required: true 
    },
    personel: {
      type: String,
      enum: [
        "SERPO ARGAMAKMUR",
        "SERPO MANNA",
        "SERPO MUKO",
        "SERPO PEKALONGAN",
        "SERPO SUKAMERINDU",
        "SERPO DEMANG",
        "SERPO JAKABARING",
        "SERPO MASKAREBET",
        "SERPO PALEMBANGKOTA",
        "SERPO PALEMBANGULU",
        "SERPO SUNGAILILIN",
        "SERPO BATURAJA",
        "SERPO BUKITASAM",
        "SERPO MARTAPURA",
        "SERPO PENDOPO",
        "SERPO PRABUMULIH",
        "ADMIN"
      ]
    }
  },
  { timestamps: true } // Menambahkan createdAt & updatedAt secara otomatis
);


export default mongoose.model('User', UserSchema);

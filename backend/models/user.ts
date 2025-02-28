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

// 🔒 Hash password sebelum disimpan ke database
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.model('User', UserSchema);

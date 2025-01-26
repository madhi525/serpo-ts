import mongoose from 'mongoose';

const FleetSchema = new mongoose.Schema({
  vehicleNumber: { type: String, required: true },
  status: { type: String, enum: ['available', 'on trip', 'maintenance'], required: true },
  location: { type: String, required: false },
});

export default mongoose.model('Fleet', FleetSchema);

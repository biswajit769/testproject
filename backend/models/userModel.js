import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true},
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    isHost:{ type: Boolean, default: true, required: true },
    providerid:{type: String, default: 'indiatalks', required: true},
    image: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model('User', userSchema);
export default User;

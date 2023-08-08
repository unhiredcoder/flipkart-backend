import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'First name is required.'],
    minlength: [2, 'First name should be at least 2 characters long.'],
    maxlength: [50, 'First name should not exceed 50 characters.'],
  },
  lastname: {
    type: String,
    required: [true, 'Last name is required.'],
    minlength: [2, 'Last name should be at least 2 characters long.'],
    maxlength: [50, 'Last name should not exceed 50 characters.'],
  },
  username: {
    type: String,
    required: [true, 'Username is required.'],
    minlength: [6, 'Username should be at least 6 characters long.'],
    maxlength: [20, 'Username should not exceed 20 characters.'],
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address.',
    ],
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    minlength: [6, 'Password should be at least 6 characters long.'],
  },
  phone: {
    type: Number,
    required: [true, 'Phone number is required.'],
    validate: {
      validator: function (value) {
        return /^\d{10}$/.test(value);
      },
      message: 'Please provide a valid phone number.',
    },
  },
  role:{
    type:String,
  }
});

const User = mongoose.model('User', userSchema);

export default User;

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    phone: { type: String, required: true },   
    isAdmin: { type: Boolean, required: false },
});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
})

userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userSchema);
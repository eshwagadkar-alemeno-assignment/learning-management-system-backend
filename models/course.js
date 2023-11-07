const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    name: { type: String, required: true },
    instructor: { type: String, required: true },
    description: { type: String, required: true },
    enrollmentStatus: { type: String, required: true },
    thumbnail: [{ type: String }],
    duration: { type: String, required: true },
    schedule: { type: String, required: true },
    location: { type: String, required: true },
    prerequisites: [{ type: String }],
    syllabus: [ {
        week: { type: Number, required: true },
        topic: { type: String, required: true },
        content: { type: String, required: true }
    }],
    students: [{
        id: { type: Number },
        name: { type: String },
        email: { type: String }
    }],
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

courseSchema.virtual('id').get(function () {
    return this._id.toHexString();
})

courseSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Course', courseSchema);

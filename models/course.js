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
        week: Number,
        topic: String,
        content: String
    }],
    students: [ {
        id: Number,
        name: String,
        email: String
    }],
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

courseSchema.virtual('id').get(function () {
    return this._id.toHexString();
})

courseSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Courses', courseSchema);

const mongoose = require('mongoose')
const { Schema } = mongoose

let examSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'department'
    },
    departmentname: {
        type: String
    },
    dayOff: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})
const Exam = mongoose.model('Exam', examSchema)

module.exports = Exam


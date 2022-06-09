const mongoose = require('mongoose')
const { Schema } = mongoose

let departmentSchema = new Schema({
    name: String
})

const Department = mongoose.model("Department", departmentSchema)

module.exports = Department


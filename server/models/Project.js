const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/fourth")
    .then(() => {
        console.log("Project Connected")
    })
    .catch(() => {
        console.log("Failed")
    })

const projectSchema = new mongoose.Schema({
    projectname:{
        type: String,
        required: true
    },
    proreason:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    division:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    priority:{
        type: String,
        required: true
    },
    dept:{
        type: String,
        required: true
    },
    startdate:{
        type: Date,
        required: true
    },
    enddate:{
        type: Date,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
})

const Project = mongoose.model('Project',projectSchema)

module.exports = Project

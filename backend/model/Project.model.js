const mongoose = require('mongoose');

const projectSchema  = new mongoose.Schema ({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:String,
        
    }
})
 const ProjectModel = mongoose.model('ProjectModel',projectSchema)
 module.exports = ProjectModel;
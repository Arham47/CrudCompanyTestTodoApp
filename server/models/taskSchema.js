import mongoose from "mongoose";


const TaskSchema=mongoose.Schema({
   
    task:{
        type:String,
        required:true,      
      },
    completed:{
        type: Boolean,
        default: false
       
    },
    isEditing:{
        type: Boolean,
        default: false
       
    },
    adminID:{
        
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserSchema',
        required:true,
       

  
},
 
})


const taskSchema = mongoose.model('TaskSchema',TaskSchema);
 export default taskSchema;
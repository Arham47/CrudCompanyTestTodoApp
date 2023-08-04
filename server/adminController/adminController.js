import taskSchema from "../models/taskSchema.js";
import userSchema from "../models/userSchema.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  const { email, password } = req.body;
    
  
   
  try {
    const user = await userSchema.findOne({ email });
    if (!user) {
      res.status(202).send({ message: "email" });
    } else {
      
      
      const isValid = await bcrypt.compare(password, user.password);
      console.log(isValid);
      if (isValid) {
        
        
        req.session.adminID = user._id.toString();
        
      
        res.status(202).send({adminID:user._id.toString()});
    
      } else {
        res.status(202).send({ message: "password" });
      }
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
export const signUp = async (req, res) => {
  const { email, password } = req.body;
    
 
  
   
  try {
    const user = await userSchema.create({
      email: email,
      password:await bcrypt.hash(req.body.password, 10),
    })
    user.save()
      if(!user) {
        res.status(404).json({message: "error"});
      }else{
        res.status(202).send({ message: "done" });
      }
    ;

  
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const addTask = async (req, res) => {
  const { task } = req.body;
    
 
  
   
  try {
    const tasks = await taskSchema.create({
      task,
      adminID:req.body.adminID
    
    })
    tasks.save()
      if(!tasks) {
        res.status(404).json({message: "error"});
      }else{
        res.status(202).json(tasks);
      }
    ;

  
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
export const getTodo = async (req, res) => {
 
    
 
  
   
  try {
    const tasks = await taskSchema.find({ adminID: req.body.adminID });
      if(!tasks) {
        res.status(404).json({message: "error"});
      }else{
        res.status(202).json(tasks);
      }
    ;

  
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
export const deleteTask = async (req, res) => {
  const { id } = req.body;
    
 
  
   
  try {
    const tasks = await taskSchema.findByIdAndDelete({_id:id})
    
      if(!tasks) {
        res.status(404).json({message: "error"});
      }else{
        res.status(202).json({message:"done"});
      }
    ;

  
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
export const updateTask = async (req, res) => {
  const { task,id } = req.body;
    
 
  
   
  try {
    const tasks = await taskSchema.findByIdAndUpdate({ _id: id }, {
      task:task,isEditing:false
    })
    
      if(!tasks) {
        res.status(404).json({message: "error"});
      }else{
        res.status(202).json({message:"done"});
      }
    ;

  
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
export const completeTask = async (req, res) => {
  const { id,completed } = req.body;
    
 
  
   
  try {
    const tasks = await taskSchema.findByIdAndUpdate(id, {
    completed:!completed
    })
    
      if(!tasks) {
        res.status(404).json({message: "error"});
      }else{
        res.status(202).json({message:"done"});
      }
    ;

  
  } catch (error) {
    res.status(404).json({ error: error.message,err:"this is error" });
  }
};
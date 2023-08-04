export const checkLogin =async(req,res,next)=>{
  
 
   
 
    try {
       
        if (req.session.adminID === req.body.adminID) {
            next();
          
        } else {
            res.status(404).send({ message: "user is not logged in" });
        };
           
     
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
    
    
    }
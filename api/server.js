// Initialize express app
import express from "express"
import bodyParser from "body-parser";
import {find,findById,insert,update,remove} from "./users/model.js"
const app =express()
app.use(bodyParser.json());

// GET ALL USERS
app.get("/api/user", async (req,res )=>{
    const allUsers = await find();
    res.json(allUsers);
});
// GET USER BY ID
app.get('/api/user/:id',async (req,res)=>{
    const user = await findById(req.params.id);
    if(user){
        res.json(user)
    }else{
        res.status(404).json({ status:404, message:"not found"})
    }

})
// CREATE A NEW USER
app.post("/api/user/add", async (req,res)=>{

    const newUser= await insert(req.body);
    if(newUser){
        res.json(newUser);
        console.log(newUser)

    }else{
        res.status(400).json({status:400,massege:"not create"})
    }
});

// UPDATE A USER
app.put("/api/user/update/:id", async (req,res)=>{
    const updatedUser = await update(req.params.id, req.body);
    if(updatedUser){
        res.json(updatedUser);
    }else{
        res.status(400).json({status:400, message:"not update"})
    }
});

// DELETE A USER
app.delete('api/user/delete/:id',async (req,res)=>{
    const deleteUser =await remove(req.params.id);
    // console.log(deleteUser)
    if(deleteUser){
        res.json({status:200, message:"deleted"})
    }
    else{
        res.status(400).json({status:400,message:"user was not deleted"})
    }
 
});

// export default app

app.listen(3000,()=>console.log("server running on port 3000 !!!"));

export default app;

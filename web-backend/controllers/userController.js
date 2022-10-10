const User=require('../models/userModel')

const addUser = async(req, res, next)=>{

    const {name,email,phone_number,uid}=req.body;

    try {
        const result = await User.create({
            name,
            email,
            phone_number,
            uid
        })
        return res.status(201).send(result);
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}

const getAllUsers= async(req, res, next)=>{
   const{userID}=req.query;
    const users=await User.find({userID});
    return res.status(200).send(users);
}
   


const getUser = async (req, res, next) => {
    const{userID}=req.query;
    const users=await User.findById({userID});
    return res.status(200).send(users);
}


module.exports ={
    addUser,
    getAllUsers, 
    getUser
}
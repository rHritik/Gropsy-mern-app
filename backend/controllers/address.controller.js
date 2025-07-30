import Address from "../models/address.model.js"


// add address :/api/address/add

export const addAddress = async( req,res) =>{
    try {
        const userId =req.user;
        const {address} = req.body;


        await Address.create({
            ...address,
            user: req.user,
        });
        res.status(201).json({
            message:"Address added successfully",
            success: true , 
        });
    } catch (error) {
         console.log(" Error adding adddress:" ,error);
        res.status(500).json({ message:" Internal server error"});
    }
}

// get address:/api/address/get
export const getAddress=async(req,res)=>{
    const userId=req.user;
    try {
        const addresses=await Address.find({user:req.user}).sort({createdAt: -1})
        res.status(200).json({
            success:true,
            addresses,
        })
    } catch (error) {
         console.log("Error fetching the address",error);
        res.status(500).json({ message:" Internal server error"});
    }
}
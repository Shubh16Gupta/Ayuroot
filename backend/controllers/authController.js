const bcrypt = require("bcrypt");
const User = require("../models/User")
const jwt = require("jsonwebtoken")


require("dotenv").config();

exports.signup = async (req ,res) =>{
    try{
        const {name , email , password} = req.body;

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success : false , 
                message : "User Already Exist"
            });
        }

        let hashedPassword ;
        try{
            hashedPassword = await bcrypt.hash(password ,10);

        } catch(error){
            return res.status(500).json({
                success : false ,  
                message : "error in hasing the Password"
            })
        }


        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        })

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });





    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User can't be registered, please try again later",
        });
    }
}

exports.login = async (req,res) => {
  try{
    
    const {email , password} = req.body;
    if(!email || !password){
      return res.status(400).json({
        succcess : false , 
        message : "please fill the all the details"
      })
    }

    const user = await User.findOne({email});

    if(!user) {
      return res.status(401).json({
        success : false,
        message : "User Not registered"
      })
    }

    const payload = {
      email : user.email ,
      id : user._id,

    }
    if (await bcrypt.compare(password,user.password)){
      let token = jwt.sign(payload,
                          process.env.JWT_SECRET,
                          {
                            expiresIn : "2h",
                          });
      user.token = token ;
      user.password = undefined;
      const options = {
        expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly : true  ,
      }

      res.cookie("token", token , options).status(200).json({
        success : true ,
        token , 
        user, 
        message : "User Logged in Successfully",

      })
  
    }

    else{
      return res.status(403).json({
        success: false, 
        message : "Password incorrect"
      })
    }



  }
  catch(error){
    console.log(error);
    return res.status(500).json({
      success : false , 
      message : "login Failure"
    })
    
  }
}
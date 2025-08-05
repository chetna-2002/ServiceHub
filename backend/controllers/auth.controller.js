import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'



// sign up 
export const signupUser = async (req, res) => {
  try {
    const {
      fullname,
      email,
      password,
      phone,
      location,
      bio,
      role,
      skills,
      hourlyRate,
    } = req.body;

    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashPass = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullname,
      email,
      password: hashPass,
      phone,
      location,
      role,
      bio: role === "provider" ? bio : undefined,
      hourlyRate: role === "provider" ? hourlyRate : undefined,
      skills: role === "provider" ? skills : undefined,
    });
    res.status(201).json({
      message: "user created successfully ",
    });
  } catch (error) {
    res.status(500).json({
      message: " server error ",
    });
  }
};




// login 

export const loginUser = async (req, res) => {
 try{ const { email, password } = req.body;

  const existingUser = await User.findOne({email});
  if (!existingUser) {
    return res.status(404).json({ message: " email not found " });
  } 

  const passMatch= await  bcrypt.compare(password, existingUser.password)
  if (!passMatch){
    return res.status(404).json({
        message : "invalid credentials"
    })
  }
 // generate token
  const token = jwt.sign({
      userId: existingUser._id,
    },process.env.JWT_SECRET,{ expiresIn: '7d' });
     
    res.json({
      message: 'Login successful',
      token 
    });
}

catch(error){

    res.status(500).json({
        message: " server error",
        error
    })
}
};


// logout


// getuser 

export const getUser = async (req,res)=>{
try {
  const userId= req.user.userId

  const userData= await User.findById(userId).select("-password")

  if(!userData){
     return res.status(404).json({ message: 'User not found' });
  }

   res.status(200).json({
      message: 'User fetched successfully',
      user: userData
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}




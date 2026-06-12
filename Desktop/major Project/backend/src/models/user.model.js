import mongoose ,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

// npm i bcrypt  or jsonwebtoken ye hash password me work karti hai

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true //searching karne ke liye
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true //searching karne ke liye
    },
    avatar:{
        type:String,//cloudinary url
        required:true,
    },
    coverimage:{
        type:String, //cloudinary url
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"video"
        }
    ],
    password:{
        type:String,
        required:[true,'Password is reuired'],
    },
    refreshToken:{
        type:String,
    }
},{timestamps:true})

//hooks encrytiption  password encry
userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect=async function(password){
    if (typeof password !== "string" || typeof this.password !== "string") {
        return false;
    }

    return await bcrypt.compare(password, this.password);
}

//short term lived me hata dete hai or expaire
userSchema.methods.generateAccessToken=function(){
    return jwt.sign({
        _id: this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
};

//long term lived ke liye hota
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
    {
        _id: this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname
    },
    process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
)
};

export const User=mongoose.model("User",userSchema)
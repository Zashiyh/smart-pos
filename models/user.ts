import mongoose, { Schema, Model, Document } from "mongoose";


interface IUser extends Document {

  name: string;

  email: string;

  password: string;

  role: string;

  lastPasswordChange?: Date | null;

}




const UserSchema = new Schema<IUser>(

{

name: {

type:String,

required:true,

trim:true,

},




email: {

type:String,

required:true,

unique:true,

lowercase:true,

trim:true,

},




password: {

type:String,

required:true,

},




role: {

type:String,

enum:[

"Admin",

"Manager",

"Cashier",

],

default:"Cashier",

},





lastPasswordChange: {

type:Date,

default:null,

},



},

{

timestamps:true,

}

);






const User: Model<IUser> =

mongoose.models.User ||

mongoose.model<IUser>(

"User",

UserSchema

);





export default User;
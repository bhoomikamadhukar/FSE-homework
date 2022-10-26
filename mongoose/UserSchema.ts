/**
 * @file Implements schema for users collection
 */
import mongoose from "mongoose";
/**
 * @typedef UserSchema Represents User Schema in mongoose
 * @property {string} username username of User
 * @property {string} password password of User
 * @property {string} firstName firstname of User
 * @property {string} lastName lastname of User
 * @property {string} email email address of User
 * @property {string} profilePhoto link to profile photo
 * @property {string} headerImage link to header image
 * @property {User} biography bio of User
 * @property {Date} dateOfBirth date of birth of User
 * @property {AccountType} accountType account type of User
 * @property {MaritalStatus} maritalStatus marital status of User
 * @property {Location} location Location of user which has latitude and longitude
 */
const UserSchema = new mongoose.Schema({

   username: {type: String, required: true},
   password: {type: String, required: true},
   firstName: String,
   lastName: String,
   email: String,
   profilePhoto: String,
   headerImage: String,
   accountType: {type: String, default: 'PERSONAL', enum: ['PERSONAL', 'ACADEMIC', 'PROFESSIONAL']},
   maritalStatus: {type: String, default: 'SINGLE', enum: ['MARRIED', 'SINGLE', 'WIDOWED']},
   biography: String,
   dateOfBirth: Date,
   joined: {type: Date, default: Date.now},
   location: {
     latitude: {type: Number, default: 0.0},
     longitude: {type: Number, default: 0.0},
   }
}, {collection: 'users'});
export default UserSchema;

/**
 * @file Creates a user model which represents
 * the user datatype.
 */
import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";

/**
 * @typedef User Represents Users of Tuiter
 * @property {ObjectId} _id Unique identifier of User collection
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
 * @property {Location} location Location of User
 */
export default class User {
  private id: string = '';
   private username: string = '';
   private password: string = '';
   private firstName: string | null = null;
   private lastName: string | null = null;
   private email: string = '';
   private profilePhoto: string | null = null;
   private headerImage: string | null = null;
   private accountType: AccountType = AccountType.Personal;
   private maritalStatus: MaritalStatus = MaritalStatus.Single;
   private biography: string | null = null;
   private dateOfBirth: Date | null = null;
   private joined: Date = new Date();
   private location: Location | null = null;

}

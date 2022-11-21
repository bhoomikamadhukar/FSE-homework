/**
 * @file Implements model for Dislikes.
 */


import User from "./User";
import Tuit from "./Tuit";

/**
* @typedef Dislike represents interacting of user and tuits
* @property {User} dislikedBy user who dislikes the Tuits
* @property {Tuit} tuit tuit that user dislikes
*/
export default interface Dislike {
    tuit: Tuit,
    dislikedBy: User
};

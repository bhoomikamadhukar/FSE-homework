/**
 * @file Interface that has method signatures for API for Dislikes related controller methods
 */
import {Request, Response} from "express";

export default interface DislikeControllerI {
    findAllUsersThatDislikedTuit (req: Request, res: Response): void;
    findAllTuitsDislikedByUser (req: Request, res: Response): void;
    userDislikesTuit (req: Request, res: Response): void;
    userReversesDislikedTuit (req: Request, res: Response): void;
    countHowManyDislikedTuit(req: Request, res: Response): void;
    findUserDislikesTuit(req: Request, res: Response): void;
    userTogglesTuitDislikes(req: Request, res: Response): void;

};

import { Request, Response } from "express";
import { validationResult, query } from "express-validator";

export const InitValidate = [];

class Init {
  static async home(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.json({
      success: true
    });
  }
}

export default Init;

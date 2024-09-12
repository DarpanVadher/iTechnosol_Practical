import { Request, Response, NextFunction } from 'express';
import * as Yup from 'yup';

// Validation middleware factory function
export const validateRequest = (schema: Yup.ObjectSchema<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate the request body against the schema
      await schema.validate(req.body, { abortEarly: false });
      next(); // If validation is successful, proceed to the next middleware/controller
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        // If validation fails, return 400 with error details
        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: err.errors,
        });
      }
      next(err); // If it's not a validation error, pass it to the next error handler
    }
  };
};

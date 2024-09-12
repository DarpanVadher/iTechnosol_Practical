import { Response } from 'express';

export const successResponse = (res: Response, message: string, data: any = {}) => {
  return res.status(200).json({
    status: 'success',
    message,
    data,
  });
};

export const errorResponse = (res: Response, message: string, statusCode: number = 500) => {
  return res.status(statusCode).json({
    status: 'error',
    message,
  });
};



export const successCreateResponse = (res: Response, message: string, data: any = {}) => {
    return res.status(201).json({
      status: 'success',
      message,
      data,
    });
};


/**
 * Send a 204 response with a JSON object that contains a
 * `status` property set to "success" and a `message` property
 * that contains the message to be sent to the client.
 *
 * @param {Response} res - The Express response object.
 * @param {string} message - The message to be sent to the client.
 * @returns {Response} The response object with the JSON payload.
 */
export const successDeleteResponse = (res: Response, message: string) => {
    return res.status(204).json({
      status: 'success',
      message
    });
};
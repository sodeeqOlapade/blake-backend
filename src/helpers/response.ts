/**
 * @param {Number} statusCode - status code of the response
 * @param {string} message - message identify the code
 * @param {{}} payload - response object
 * @param {Error} error - error message
 * @param {Token} token - jwt token
 * @returns {{}}
 */

function sendResponse(
  statusCode: number,
  message: string,
  error: string | null,
  token: string | null,
): object {
  return {
    statusCode,
    message,
    error,
    token,
  };
}


export default sendResponse;
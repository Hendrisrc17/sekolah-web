export function errorHandler(error, _req, res, _next) {
  console.error(`[api] ${error.message}`);
  const status = error.status || 500;
  res.status(status).json({ success: false, error: { code: error.code || 'INTERNAL_ERROR', message: status === 500 ? 'Terjadi kesalahan pada server.' : error.message } });
}
export function httpError(status, message, code = 'REQUEST_ERROR') { const error = new Error(message); error.status = status; error.code = code; return error; }

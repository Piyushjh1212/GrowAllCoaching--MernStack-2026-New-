// Middleware/customSanitize.js
import sanitizeHtml from "sanitize-html";

/**
 * Custom sanitize middleware
 * Sanitizes req.body, req.query, req.params
 */
export const customSanitize = (req, res, next) => {
  // Helper function to recursively sanitize objects
  const sanitizeObject = (obj) => {
    if (!obj || typeof obj !== "object") return obj;
    const sanitized = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
      if (typeof obj[key] === "object") {
        sanitized[key] = sanitizeObject(obj[key]);
      } else if (typeof obj[key] === "string") {
        sanitized[key] = sanitizeHtml(obj[key].trim());
      } else {
        sanitized[key] = obj[key];
      }
    }
    return sanitized;
  };

  // Body
  if (req.body) req.sanitizedBody = sanitizeObject(req.body);

  // Query
  if (req.query) req.sanitizedQuery = sanitizeObject(req.query);

  // Params
  if (req.params) req.sanitizedParams = sanitizeObject(req.params);


  next();
};
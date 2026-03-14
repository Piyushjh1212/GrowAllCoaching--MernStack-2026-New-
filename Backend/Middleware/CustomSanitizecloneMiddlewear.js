<<<<<<< HEAD
import sanitizeHtml from "sanitize-html";

export const customSanitize = (req, res, next) => {

  const sanitizeObject = (obj) => {
    if (!obj || typeof obj !== "object") return obj;

    const sanitized = Array.isArray(obj) ? [] : {};

    for (const key in obj) {

      // 🚨 MongoDB injection protection
      if (key.startsWith("$") || key.includes(".")) {
        continue;
      }

      if (typeof obj[key] === "object") {

        sanitized[key] = sanitizeObject(obj[key]);

      } else if (typeof obj[key] === "string") {

        sanitized[key] = sanitizeHtml(obj[key].trim(), {
          allowedTags: [],        // ❌ HTML tags remove
          allowedAttributes: {}   // ❌ attributes remove
        });

      } else {

        sanitized[key] = obj[key];

      }
    }

    return sanitized;
  };

  // Body sanitize
  if (req.body) {
    req.sanitizedBody = sanitizeObject(req.body);
  }

  // Query sanitize
  if (req.query) {
    req.sanitizedQuery = sanitizeObject(req.query);
  }

  // Params sanitize
  if (req.params) {
    req.sanitizedParams = sanitizeObject(req.params);
  }
=======
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
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c

  next();
};
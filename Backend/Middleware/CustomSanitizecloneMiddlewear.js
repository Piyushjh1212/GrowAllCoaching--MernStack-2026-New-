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

  next();
};
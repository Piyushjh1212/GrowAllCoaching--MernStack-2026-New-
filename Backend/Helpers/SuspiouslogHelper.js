// Helpers/logHelper.js

import SecuritySuspiousLog from '../Modals/SecuritysuspiousModals.js'


export const logSecurityEventHelper = async ({ endpoint, method, ip, userId, type, message }) => {
  try {
    await SecuritySuspiousLog.create({
      endpoint,
      method,
      ip,
      userId: userId || null,
      type,
      message,
    });
  } catch (err) {
    console.error("Security log failed:", err);
  }
};
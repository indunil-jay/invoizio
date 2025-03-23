/**
 *  this used check when sending email reminders to client
 *  if this time is lesser than 6hr, business owner can't send email to reminder
 */

// 6 hours in milliseconds
export const COOLDOWN_PERIOD = 6 * 60 * 60 * 1000;

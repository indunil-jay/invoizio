/**
 * An array of routes that are accessible to the public
 */
export const publicRoutes: string[] = ["/auth/new-verification"];

/**
 * An array of routes that are accessible to the public and use for authentications
 * These routes will redirects logged in user to application
 */
export const authRoutes: string[] = [
  "/auth/sign-in",
  "/auth/sign-up",
  "/auth/error",
  "/auth/forgot-password",
  "/auth/reset-password",
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * The default redirect path after loggin in
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/";

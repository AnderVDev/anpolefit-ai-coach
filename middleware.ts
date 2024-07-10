import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isRootRoute = createRouteMatcher(["/"]);
// const isDashboardRoute = createRouteMatcher(["/(.*)"]);
// const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);
export default clerkMiddleware((auth, request) => {
  // Restrict dashboard routes to signed in users
  if (isRootRoute(request)) auth().protect();
  // if (isDashboardRoute(request)) auth().protect();
  // if (!isPublicRoute(request)) {
  //   auth().protect();
  // }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

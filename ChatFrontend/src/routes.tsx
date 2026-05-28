import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";

const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const UserDashboard = lazy(
  () => import("./components/user-dashboard/Dashboard"),
);
const NotFoundPage = lazy(() => import("./components/NotFound/NotFoundPage"));
const FallbackComponent= lazy(()=>import("./components/Fallback/Fallback"))

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<FallbackComponent />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<FallbackComponent />}>
        <RegisterPage />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<FallbackComponent />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <Suspense fallback={<FallbackComponent />}>
        <ForgotPassword />
      </Suspense>
    ),
  },
  {
    path: "/user/dashboard",
    element: (
      <Suspense fallback={<FallbackComponent />}>
        <UserDashboard />
      </Suspense>
    ),
  },
  {
    path: "/user/profile/:userId",
    element: (
      <Suspense fallback={<FallbackComponent />}>
        <ProfilePage />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<FallbackComponent />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
]);

export { routes };

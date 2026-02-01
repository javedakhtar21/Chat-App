import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";

const RegisterPage = lazy(() => import("./pages/RegisterPage"));
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
        <RegisterPage />
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
    path: "/user/dashboard",
    element: (
      <Suspense fallback={<FallbackComponent />}>
        <UserDashboard />
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

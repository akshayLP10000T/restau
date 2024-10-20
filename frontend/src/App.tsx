import Login from "./auth/Login";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import Register from "./auth/Register";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import VerifyEmail from "./auth/VerifyEmail";
import HeroSection from "./components/MainLayout/HeroSection";
import Profile from "./components/MainLayout/Profile";
import SearchPage from "./components/MainLayout/SearchPage";
import RestaurentDetail from "./pages/RestaurentDetail";
import Cart from "./pages/Cart";
import Restaurent from "./admin/Restaurent";
import AddMenu from "./admin/AddMenu";
import Orders from "./admin/Orders";
import Success from "./pages/Success";
import { useUserStore } from "./store/useUserStore";
import { useEffect } from "react";
import Loading from "./components/Loading";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to={"/verify-email"} replace />;
  }

  return children;
};

const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to={"/"} replace />;
  }

  return children;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();

  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  if (!user?.admin) {
    return <Navigate to={"/"} replace />;
  }

  return children;
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <MainLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/",
        element: <HeroSection />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/search/:text",
        element: <SearchPage />,
      },
      {
        path: "/restaurent/:restaurentId",
        element: <RestaurentDetail />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/admin/restaurent",
        element: (
          <AdminRoute>
            <Restaurent />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/menu",
        element: (
          <AdminRoute>
            <AddMenu />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/orders",
        element: (
          <AdminRoute>
            <Orders />
          </AdminRoute>
        ),
      },
      {
        path: "/success",
        element: <Success />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthenticatedUser>
        <Login />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/register",
    element: (
      <AuthenticatedUser>
        <Register />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <AuthenticatedUser>
        <ForgotPassword />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <AuthenticatedUser>
        <ResetPassword />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/verify-email",
    element: (
      <AuthenticatedUser>
        <VerifyEmail />
      </AuthenticatedUser>
    ),
  },
]);

const App = () => {
  const { isCheckingAuth, checkAuthentication } = useUserStore();

  useEffect(() => {
    checkAuthentication();

  }, [checkAuthentication]);
  if (isCheckingAuth) return <Loading />;

  return (
    <div className="w-full h-screen">
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  );
};

export default App;

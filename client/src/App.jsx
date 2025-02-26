import React from "react";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import Orders from "./pages/orders/Orders";
import MyGigs from "./pages/mygigs/MyGigs";
import Add from "./pages/add/Add";
import Register from "./pages/register/Register";
import Message from "./pages/message/Message";
import Messages from "./pages/messages/Messages";
import Login from "./pages/login/Login";
import Pay from "./pages/pay/Pay";
import Success from "./pages/success/Success";
import AdminDashboard from "./pages/adminDashboard/AdminDashboard";
import Users from "./pages/adminDashboard/Users";
import Services from "./pages/adminDashboard/Services";
import Settings from "./pages/adminDashboard/Settings";
import AdminLogin from "./pages/adminDashboard/adminLogin";
// ✅ Import AdminLayout

import "./app.scss";

const queryClient = new QueryClient();

const Layout = () => (
  <div className="app">
    <Navbar />
    <Outlet />
    <Footer />
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/gigs", element: <Gigs /> },
      { path: "/gig/:id", element: <Gig /> },
      { path: "/orders", element: <Orders /> },
      { path: "/mygigs", element: <MyGigs /> },
      { path: "/add", element: <Add /> },
      { path: "/messages", element: <Messages /> },
      { path: "/message/:id", element: <Message /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/pay/:id", element: <Pay /> },
      { path: "/success", element: <Success /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminDashboard  />, // ✅ Wrap admin pages with AdminLayout
    children: [
   // ✅ Default page
      { path: "users", element: <Users /> },
      { path: "services", element: <Services /> },
      { path: "settings", element: <Settings /> },
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLogin />, // ✅ Separate admin login page
  },
]);

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;

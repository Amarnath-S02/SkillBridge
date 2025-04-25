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
import MyGigs from "./pages/myGigs/MyGigs";
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
import Blog from "./pages/blog/Blog";
import BecomeSeller from "./pages/BecomeSeller/BecomeSeller";
import Profile from "./pages/profile/Profile";
import Chatbot from "./components/chatBot/Chatbot";
import ChatIcon from "./components/chatIcon/ChatIcon";
import FloatingChatbot from "./components/chatBot/FloatingChatbot";
import "./app.scss"; // styles should be after imports

const queryClient = new QueryClient();

const Layout = () => (
  <div className="app">
    <Navbar />
    <Outlet />
    <Footer />
    <FloatingChatbot />
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
      { path: "/blog", element: <Blog /> },
      { path: "/become-seller", element: <BecomeSeller /> },
      { path: "/profile/:id", element: <Profile /> },
      { path: "/chatbot", element: <Chatbot /> }, // ✅ Optional full page chatbot
    ],
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
    children: [
      { path: "users", element: <Users /> },
      { path: "services", element: <Services /> },
      { path: "settings", element: <Settings /> },
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
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

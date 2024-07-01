import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import WeatherForecast from "./pages/WeatherForecast.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

// Make sure select one of the following layouts: default.jsx, navbar.jsx, sidebar.jsx depending on your project
import SharedLayout from "./components/layouts/sidebar.jsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
          <AuthProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<SharedLayout />}>
                <Route index element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/weather" element={<PrivateRoute><WeatherForecast /></PrivateRoute>} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
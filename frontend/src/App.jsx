import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Header, LoginPage } from "./components";
import { useUserLog } from "./hooks/useUserLog";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./layouts/ProtectedRoute";
import MainPage from "./screens/MainPage";
import NotFound from "./ui/NotFound";

function App() {
  const { userIsLoggedIn } = useUserLog();

  return (
    <div className="dark:bg-black-50 text-lg text-white-50 p-2 min-h-screen">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<LoginPage />} />
          </Route>
          <Route
            path="app"
            element={
              <ProtectedRoute user={userIsLoggedIn}>
                <MainPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

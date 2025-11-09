import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import Admin from "./components/Admin";
import FeedbackPage from "./components/FeedbackPage";

function App() {
  const queryClient = new QueryClient();
  return (
    <><QueryClientProvider client={queryClient}>
          <Router>
            {/* <Navbar /> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
              <Route path=":payload" element={<FeedbackPage />} />
              {/* <Route path="/wander/active/wander" element={<ActiveWander />} />
              <Route path="/wander/invite" element={<Invite />} />
              <Route path="/wander/reports" element={<Reports />} />
              <Route path="/wander/reports/view" element={<ReportsView />} /> */}
            </Routes>
          </Router>
        
      </QueryClientProvider></>
  );
}

export default App;

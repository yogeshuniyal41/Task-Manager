import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import {   getUser } from "./redux/utils/utils";

function App() {
  const user = getUser();  // Retrieve the user from some utility function
  
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
          {/* Root path: Render Dashboard if user is not null, otherwise render Auth */}
          <Route path="/" element={ <Auth />} />
          {/* Explicit dashboard route */}
          <Route path="/dashboard" element= {<Dashboard />} />
          {/* Profile route */}
          <Route path="/profile" element={ <Profile />} />
          {/* Add other routes here as needed */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

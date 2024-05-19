

import { BrowserRouter, Routes, Route } from "react-router-dom";


import { Login} from "./pages/Login";
import Dashboard from './pages/Dashboard'
import { Signup } from "./pages/Signup";




function App() {
  
  return (
    <div className="App" >
      
     <BrowserRouter>
     
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/signup" element={<Signup/>} />
                {/* Add other routes here */}
                
            </Routes>
        
     </BrowserRouter>
     
      
      
    </div>
  );
}

export default App;

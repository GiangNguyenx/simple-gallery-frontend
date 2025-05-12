import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Albums from "./pages/Albums";
import Album from "./pages/Album";
import Users from "./pages/Users";
import User from "./pages/User";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="ml-64 flex-1 bg-gray-50 min-h-screen">
          <main className="p-6">
            <Routes>
              <Route path="/" element={<Albums />} />
              <Route path="/albums" element={<Albums />} />
              <Route path="/albums/:id" element={<Album />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<User />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}


export default App;
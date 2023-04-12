import { useState } from "react";
import AuthorizationPage from "./pages/AuthorizationPage";
import Dashboard from "./pages/Dashboard";

function App() {
   const [loggedIn, setLoggedIn] = useState(false);
   const [user, setUser] = useState({});
   return loggedIn ? <Dashboard user={user} setUser={setUser} setLoggedIn={setLoggedIn} /> : <AuthorizationPage setLoggedIn={setLoggedIn} setUser={setUser} />;
}

export default App;

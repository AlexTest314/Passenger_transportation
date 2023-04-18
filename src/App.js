import { useState } from "react";
import AdminPanel from "./pages/AdminPanel";
import AuthorizationPage from "./pages/AuthorizationPage";
import Dashboard from "./pages/Dashboard";

function App() {
  const [loggedIn, setLoggedIn] = useState();
  const [user, setUser] = useState({});

  return loggedIn ? (
    user.email === "prykhalex@gmail.com" ? (
      <AdminPanel
        user={user}
        setUser={setUser}
        setLoggedIn={setLoggedIn}
      />
    ) : (
      <Dashboard
        user={user}
        setUser={setUser}
        setLoggedIn={setLoggedIn}
      />
    )
  ) : (
    <AuthorizationPage
      setLoggedIn={setLoggedIn}
      setUser={setUser}
    />
  );
}

export default App;

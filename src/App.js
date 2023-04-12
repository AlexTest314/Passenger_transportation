import { useState } from "react";
import AuthorizationPage from "./pages/AuthorizationPage";

function App() {
   const [loggedIn, setLoggedIn] = useState(false);
   return !loggedIn ? <AuthorizationPage setLoggedIn={setLoggedIn} /> : null;
}

export default App;

import React, { useState } from "react";
import MoowitterRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return <MoowitterRouter isLoggedIn={isLoggedIn} />;
}

export default App;

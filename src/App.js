import "./App.css";
import Routers from "./routes";
import { setAuthToken } from "./helpers/setAuthToken";

function App() {
  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }

  return (
    <div className="App">
      <Routers />
    </div>
  );
}

export default App;

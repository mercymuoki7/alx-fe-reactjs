import { useEffect } from "react";
import { testApi } from "./services/api";

function App() {
  useEffect(() => {
    testApi();
  }, []);

  return (
    <div>
      <h1>GitHub User Search App</h1>
    </div>
  );
}

export default App;

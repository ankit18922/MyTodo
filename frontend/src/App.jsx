// import React from "react";
// import TodoList from "./components/TodoList";

// function App() {
//   return (
//     <div className="container" style={{ maxWidth: 500, margin: "auto", padding: "2rem" }}>
//       <h2 style={{ textAlign: "center" }}>📝 My Todo List</h2>
//       <TodoList />
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import Auth from "./Auth";
import TodoList from "./components/TodoList";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
    <>
      {!token ? (
        <Auth setToken={setToken} />
      ) : (
        <TodoList />
      )}
    </>
  );
}

export default App;


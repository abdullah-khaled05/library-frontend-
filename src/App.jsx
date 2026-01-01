// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Books from "./pages/books";
// import Members from "./pages/members";
// import Dashboard from "./pages/dashboard";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/books" element={<Books />} />
//         <Route path="/members" element={<Members />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }


import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/dashboard";
import Books from "./pages/books";
import Members from "./pages/members";
import Login from "./pages/login";
import Register from "./pages/register";
import Books2 from "./pages/books2";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/books" element={<Books />} />
//         <Route path="/members" element={<Members />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* First page */}
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Protected / app pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/books" element={<Books />} /> */}
        <Route path="/members" element={<Members />} />
        <Route path="/books" element={<Books2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// function App() {
//   return <h1>App is working</h1>;
// }

// export default App;

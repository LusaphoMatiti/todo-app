import "./output.css";
import "./App.css";
import Ops from "./Ops";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";

function App() {
  return (
    <>
      <div className="min-h-screen justify-between">
        <Header />
        <Routes>
          <Route path="/" element={<Ops />} />
          <Route path="/about" element={<About />} />
          <Route path="/home" element={<Home />} />
          <Route path="/task-form" element={<TodoForm />} />

          <Route path="/task-list" element={<TodoList />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;

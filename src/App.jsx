import { useState,useEffect } from "react";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");



  useEffect(() => {
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    setTodos(JSON.parse(storedTodos));
  }
}, []);


useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);




  const handleAdd = () => {
    if (todo.trim() === "") return;
    setTodos([...todos, { text: todo, completed: false }]);
    setTodo("");
  };

  const handleChange = (e) => setTodo(e.target.value);

  const handleDelete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditValue(todos[index].text);
  };

  const handleEditChange = (e) => setEditValue(e.target.value);

  const handleEditSubmit = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].text = editValue.trim();
    setTodos(updatedTodos);
    setEditIndex(null);
    setEditValue("");
  };

  const handleDone = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  return (
    <>
      <Navbar />
      <div className="conkabap">
        <div className="container">
          <div className="aDD">
            <h2>Add Todos</h2>
            <input type="text" onChange={handleChange} value={todo} />
            <button className="btn" onClick={handleAdd}>
              Add
            </button>
          </div>

          <h2>Your Todos</h2>
          <div className="Todos">
            {todos.map((item, index) => (
              <div key={index} className="Todo">
                {editIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={editValue}
                      onChange={handleEditChange}
                      className="edit-input"
                    />
                    <button className="btn" onClick={() => handleEditSubmit(index)}>
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <div className="text" style={{ textDecoration: item.completed ? "line-through" : "none" }}>
                      {item.text}
                    </div>
                    <div className="buttons">
                      <button className="btn" onClick={() => handleEdit(index)}>
                        Edit
                      </button>
                      <button className="btn" onClick={() => handleDelete(index)}>
                        Delete
                      </button>
                      <button className="btn" onClick={() => handleDone(index)}>
                        {item.completed ? "Undo" : "Done"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

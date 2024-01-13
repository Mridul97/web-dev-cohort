import { useEffect, useState } from 'react'
import './App.css'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'

function App() {
  const [todos, setTodos] = useState([]);

  console.log("calling fetch!");
  // Fetch function is called once, when the component mounts
  useEffect(() => {
      fetch("http://localhost:3000/todos").then(async (res) => {
      console.log("fetch completed!");
      const json = await res.json();
      setTodos(json);
    })
  }, []);  

  return (
    <div>
      <CreateTodo setTodos={setTodos} />
      <Todos todos={todos}/>
    </div>
  )
}

export default App;

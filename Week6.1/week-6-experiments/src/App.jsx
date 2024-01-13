import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// Rerendering (Section - 1)

// function App() {

//   const [title1, setTitle1] = useState("My name is Mridul");

//   return (
//     <div>
//       <button onClick={() => {setTitle1("My name is " + Math.random())}}>Update Title1</button>
//       <Header title={title1} ></Header>
//       <Header title="Mridul 2"/>
//       <Header title="Mridul 3"/>
//       <Header title="Mridul 4"/>
//       <Header title="Mridul 5"/>
//     </div>
//   )
// }

const Header = React.memo(function Header({ title }) {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
});

function HeaderWithButton() {
  const [title1, setTitle1] = useState("My name is Mridul");

  return (
    <div>
      <button
        onClick={() => {
          setTitle1("My name is " + Math.random());
        }}
      >
        Update Title1
      </button>
      <Header title={title1} />
    </div>
  );
}

// Keys in React (Section - 2)

const initialTodos = [
  {
    id: 1,
    title: "Complete Week 6",
    description: "Watch video and make notes",
  },
  {
    id: 2,
    title: "Wash clothes",
    description: "Wash all the clothes in washing machine",
  },
  {
    id: 3,
    title: "Buy Sunscreen",
    description: "Go to chemist and buy sunscreen",
  },
];

function AddTodo({ todos, setTodos }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div>
      <input
        placeholder="title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <input
        placeholder="description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <button
        onClick={() => {
          setTodos([...todos, { id: id++, title, description }]);
          setTitle("");
          setDescription("");
        }}
      >
        Add Todo
      </button>
    </div>
  );
}

let id = 4;

function rearrangeTodo(todos, setTodos) {
  const newTodos = [todos[2], todos[1], todos[0]];
  setTodos(newTodos);
}

const Todo = ({ title, description }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

// function App() {
//   const [todos, setTodos] = useState(initialTodos);
//   console.log(todos);
//   // iterate over todos array
//   return (
//     <div>
//       <AddTodo todos={todos} setTodos={setTodos} />
//       <h1>Todos List</h1>
//       {todos.map((todo) => (
//         <Todo key={todo["id"]} title={todo["title"]} description={todo["description"]} />
//       ))}
//       <button onClick={() => {rearrangeTodo(todos, setTodos)}}>Rearrange Todo</button>
//     </div>
//   );
// }

// Wrapper Components (Section - 3)

function AppInfo() {
  return <p>This app is useful for learning wrapper components</p>;
}

function AppName() {
  return <h1>Amazing App</h1>;
}

// function App() {
//   return(
//     <>
//       <CardWrapper>
//         <AppName />
//       </CardWrapper>
//       <CardWrapper>
//         <AppInfo />
//       </CardWrapper>
//     </>
//   )
// }


function CardWrapper({ children }) {
  return <div className="CardWrapper">{children}</div>;
}

// Assignment (Section - 4)

function App() {
  // create an app that polls todo server in every interval
  // and displays Todos
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setInterval(() => {
      fetch("https://sum-server.100xdevs.com/todos").then(async (res) => {
        const json = await res.json();
        setTodos(json["todos"]);
      });
    }, 10000);
  }, []);

  return (
    <div>
      {todos.map((todo) => (
        <Todo key={todo.id} title={todo.title} description={todo.description} />
      ))}
    </div>
  );
}

export default App;

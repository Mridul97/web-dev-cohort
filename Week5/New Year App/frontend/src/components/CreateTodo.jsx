import { useState } from "react";

export function CreateTodo({setTodos}) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // creates a todo in backend database
    const addTodo = async () => {
        const res = await fetch("http://localhost:3000/todo", {
            method: "POST",
            body: JSON.stringify({
                title,
                description
            }),
            headers: {
                "Content-type": "application/json"
            }
        })

        // fetch all the todos to update State
        fetch("http://localhost:3000/todos").then(async (res) => {
            const todos = await res.json();
            setTodos(todos);
        });
        setTitle("");
        setDescription("");
    }


    return (
    <div>
        <label>Title:</label>
        <input className="input-title" type="text" value={title} placeholder="title" onChange={(e) => {
            setTitle(e.target.value);
        }}/><br/>
        <label>Description:</label>
        <input className="input-description" type="text" value={description} placeholder="description" onChange={(e) => {
            setDescription(e.target.value);
        }}/><br/>

        <button className="add-todo-btn" onClick={addTodo}>Add a todo</button>
    </div>
    )
}
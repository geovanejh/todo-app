import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { getAllTodos, Todo, deleteTodo } from "../lib/db";

export const getServerSideProps: GetServerSideProps = async () => {
    const todos = await getAllTodos();
    console.log("rodou o getServerSideProps");
    console.log("todos: ", todos);

    return {
        props: {
            todos,
        },
    };
};

interface PostProps {
    todos: Todo[];
}

interface Test {
    description: string;
}

const Home = ({ todos }: PostProps) => {
    const [description, setDescription] = useState("");
    const [todoList, setTodoList] = useState<Array<Todo>>([]);

    useEffect(() => {
        setTodoList(todos);
        console.log("use effect rodou: ", todoList);
    }, []);

    const handleClick = async () => {
        await fetch("/api/todo", {
            method: "POST",
            body: JSON.stringify(description),
        })
            .then((res) => res.json())
            .then((json) =>
                setTodoList((oldArray) => [...oldArray, json.newTodo])
            );

        console.log("todoList:", todoList);
    };

    return (
        <div className="h-screen bg-gray-500">
            <nav className="flex justify-center p-4 bg-gray-600">
                <h1 className="text-white text-2xl font-bold">Todo App</h1>
            </nav>
            <div>
                <form
                    className="flex justify-center mt-10"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleClick();
                        setDescription("");
                    }}
                >
                    <div className="bg-gray-50 p-8 rounded-lg">
                        <h1 className="text-center mb-4">Write Todo List</h1>
                        <div className="flex space-x-2 p-2 bg-white rounded-md">
                            <input
                                type="text"
                                placeholder="Write here..."
                                className="w-full outline-none"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.currentTarget.value);
                                }}
                            />
                            <button
                                type="button"
                                className="bg-green-500 px-2 py-1 rounded-md text-white font-semibold"
                                onClick={() => {
                                    handleClick();
                                }}
                            >
                                send
                            </button>
                        </div>
                    </div>
                </form>
                <div>
                    {todoList?.map((item, index) => (
                        <div key={index} className="flex justify-center">
                            <div className=" relative justify-center mt-6">
                                <div className="absolute flex top-0 right-0 p-3 space-x-1">
                                    <span
                                        onClick={async () => {
                                            console.log(item);
                                            await fetch("/api/todo", {
                                                method: "DELETE",
                                                body: JSON.stringify(item.id),
                                            })
                                                .then((res) => res.json())
                                                .then((json) =>
                                                    setTodoList(todoList.filter(item => item.id !== json.deletedTodo.id))
                                                );
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                            />
                                        </svg>
                                    </span>
                                </div>
                                <span className="absolute -left-3 -top-3 bg-green-500 flex justify-center items-center rounded-full w-8 h-8 text-gray-50 font-bold">
                                    {index + 1}
                                </span>
                                <p className="bg-white px-12 py-8 rounded-lg w-80">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;

import { useEffect, useState } from "react";
import TodoTable from "./TodoTable";
import { TodoItem } from "./types";
import { Button } from "./components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "./components/ui/input";

const url = import.meta.env.VITE_BACKEND_URL;

function App() {
    const [all_todos, setAllTodos] = useState<TodoItem[]>([]);
    const [newTodo, setNewTodo] = useState("");

    useEffect(() => {
        async function fetchData() {
            await fetch(url)
                .then((data) => data.json())
                .then((res) => {
                    setAllTodos(res);
                });
        }

        fetchData();
    }, []);

    const updateTodo = async (updatedTodo: TodoItem) => {
        try {
            const response = await fetch(`${url}/update`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedTodo),
            });

            if (response.ok) {
                setAllTodos((prevTodos) =>
                    prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)),
                );
            }
        } catch (err) {
            console.log(err);
        }
    };

    const deleteTodo = async (id: number) => {
        try {
            const response = await fetch(`${url}/delete`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: id }),
            });

            if (response.ok) {
                setAllTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
            }
        } catch (error) {
            console.log(error);
        }
    };

    async function handleNewTodo(newTodo: TodoItem) {
        if (newTodo.data != "" || newTodo.data != null) {
            try {
                const response = await fetch(`${url}/new`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newTodo),
                });
                if (response.ok) {
                    setAllTodos((prevTodo) => {
                        prevTodo.push(newTodo);
                        return prevTodo;
                    });
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            alert("no");
        }
    }

    return (
        <>
            <h1 className="my-8 scroll-m-20 text-center text-3xl font-extrabold tracking-tight lg:text-4xl">
                TodoList: Using PostgreSQL and Expressjs
            </h1>
            <div className="mb-8 flex justify-center">
                <Drawer
                    onClose={() => {
                        setTimeout(() => {
                            setNewTodo("");
                        }, 100);
                    }}>
                    <DrawerTrigger>
                        <Button variant="default">Add new todo</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <div className="mx-auto w-full max-w-md">
                            <DrawerHeader>
                                <DrawerTitle>Add a new todo</DrawerTitle>
                                <DrawerDescription>Do something great today...</DrawerDescription>
                            </DrawerHeader>

                            <div className="px-4">
                                <Input
                                    value={newTodo}
                                    onChange={(e) => {
                                        setNewTodo(e.target.value);
                                    }}
                                    placeholder="Eat a pizza"
                                />
                            </div>

                            <DrawerFooter>
                                <DrawerClose asChild>
                                    <Button
                                        onClick={() =>
                                            handleNewTodo({
                                                id: all_todos.length + 1,
                                                data: newTodo,
                                                done: false,
                                            })
                                        }
                                        className="w-full"
                                        variant="default">
                                        Add Todo
                                    </Button>
                                </DrawerClose>
                                <DrawerClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
            <div className="container max-w-4xl rounded-xl border">
                <TodoTable all_todos={all_todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
            </div>
        </>
    );
}

export default App;

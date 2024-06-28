import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
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
import { Button } from "./components/ui/button";
import { TodoItem, TodoTableProps } from "./types";
import { Checkbox } from "./components/ui/checkbox";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { useState } from "react";

const placeholders = [
    "Get the groceries",
    "Pay electricity bill",
    "Hit the gym",
    "Refill laila's feeder",
    "Finish assignment",
];

export default function TodoTable({ all_todos, updateTodo, deleteTodo }: TodoTableProps) {
    function handleCheckboxChange(todo: TodoItem) {
        updateTodo({ ...todo, done: !todo.done });
    }

    function handleTodoDataChange(todo: TodoItem) {
        updateTodo({ ...todo, data: todo.data });
    }

    function handleTodoDelete(id: number) {
        deleteTodo(id);
    }

    function getRandomNum(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const [tempText, setText] = useState("");

    return (
        <>
            <Table className="box-border text-base">
                <TableCaption className="">Postgres, Express, React, Node</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-20 text-center">Id</TableHead>
                        <TableHead className="w-20 text-center">Status</TableHead>
                        <TableHead className="text-center" colSpan={2}>
                            Todo
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {all_todos.map((todo, index) => (
                        <TableRow key={index} className="hover:bg-background">
                            <TableCell className="text-center font-medium">{index + 1}</TableCell>
                            <TableCell className="">
                                <div className="m-auto w-fit">
                                    {todo.done ? (
                                        <Checkbox
                                            onCheckedChange={() => handleCheckboxChange(todo)}
                                            checked
                                        />
                                    ) : (
                                        <Checkbox
                                            onCheckedChange={() => handleCheckboxChange(todo)}
                                        />
                                    )}
                                </div>
                            </TableCell>
                            <TableCell>{todo.data}</TableCell>
                            <TableCell className="py-0 text-right">
                                <Drawer
                                    onOpenChange={(isOpen) => {
                                        if (isOpen) {
                                            setText(todo.data);
                                        }
                                    }}
                                    onClose={() => {
                                        setTimeout(() => {
                                            setText("");
                                        }, 100);
                                    }}>
                                    <DrawerTrigger>
                                        <Button variant="link" className="text-center">
                                            Edit
                                        </Button>
                                    </DrawerTrigger>
                                    <DrawerContent>
                                        <div className="mx-auto w-full max-w-md">
                                            <DrawerHeader>
                                                <DrawerTitle>Edit Todo</DrawerTitle>
                                                <DrawerDescription>
                                                    Change or Remove your todo
                                                </DrawerDescription>
                                            </DrawerHeader>
                                            <div className="px-4">
                                                <form
                                                    onSubmit={(event) => {
                                                        event.preventDefault();
                                                        handleTodoDataChange({
                                                            ...todo,
                                                            data: tempText,
                                                        });
                                                        // alert(tempText)
                                                    }}
                                                    className="flex flex-col gap-1"
                                                    action={`${import.meta.env.VITE_BACKEND_URL}/update`}
                                                    method="PATCH">
                                                    <Label
                                                        className="text-base font-semibold tracking-tight"
                                                        htmlFor="updatedTodo">
                                                        Todo:
                                                    </Label>
                                                    <Input
                                                        name="updatedTodo"
                                                        type="text"
                                                        placeholder={
                                                            placeholders[getRandomNum(0, 4)]
                                                        }
                                                        value={tempText}
                                                        maxLength={32}
                                                        onChange={(e) => {
                                                            setText(e.target.value);
                                                            // console.log(
                                                            //     event?.target.name,
                                                            //     event.target.value,
                                                            // );
                                                        }}
                                                    />
                                                    <DrawerClose>
                                                        <div className="mt-4 flex w-full justify-evenly gap-2">
                                                            <Button
                                                                variant="default"
                                                                type="submit"
                                                                className="w-full">
                                                                Submit
                                                            </Button>
                                                            <Button
                                                                variant="destructive"
                                                                type="button"
                                                                onClick={() =>
                                                                    handleTodoDelete(todo.id)
                                                                }
                                                                className="w-full bg-red-600 hover:bg-red-700">
                                                                Delete
                                                            </Button>
                                                        </div>
                                                    </DrawerClose>
                                                </form>
                                            </div>
                                            <DrawerFooter>
                                                <DrawerClose asChild>
                                                    <Button variant="outline">Cancel</Button>
                                                </DrawerClose>
                                            </DrawerFooter>
                                        </div>
                                    </DrawerContent>
                                </Drawer>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}


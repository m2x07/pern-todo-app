export type TodoItem = {
    id: number,
    data: string,
    done: boolean,
}

export type TodoTableProps = {
    all_todos: TodoItem[],
    updateTodo: (todo: TodoItem) => Promise<void>;
    deleteTodo: (id: number) => Promise<void>;
}

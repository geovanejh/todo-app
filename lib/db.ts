import { prisma } from "./prisma";

export interface Todo {
    id: number;
    description: string;
}

export async function getAllTodos() {
    const data = await prisma.todo.findMany();
    console.log("data:", data);
    return data;
}

export async function createTodo(description: string) {
    const newTodo = await prisma.todo.create({
        data: {
            description,
        },
    });
    return newTodo;
}

export async function deleteTodo(id: number) {
    const deletedTodo = await prisma.todo.delete({
        where: {
            id: id,
        },
    });
    return deletedTodo;
}

export async function updateTodo(id: number, description: string) {
    const updatedTodo = await prisma.todo.update({
        where: {
            id: id,
        },
        data: {
            description: description
        }
    });
    return updatedTodo;
}

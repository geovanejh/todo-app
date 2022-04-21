import type { NextApiRequest, NextApiResponse } from "next";
import { createTodo, deleteTodo, getAllTodos, updateTodo } from "../../lib/db";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const data = JSON.parse(req.body);
        const newTodo = await createTodo(data);
        return res.status(200).json({ newTodo });
    } else if (req.method === "DELETE") {
        const data = JSON.parse(req.body);
        const deletedTodo = await deleteTodo(data);
        return res.status(200).json({ deletedTodo });
    } else if (req.method === "GET") {
        await getAllTodos();
    }  else if (req.method === "PUT") {
        const data = JSON.parse(req.body);
        const updatedTodo = await updateTodo(data.id, data.description);
        return res.status(200).json({ updatedTodo });
    }
}

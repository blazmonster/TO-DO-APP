const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const app = express();

app.listen(3000);

app.use(express.json());

app.post("/todo", async function(req, resp) {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if (!parsedPayload.success) {
        resp.status(411).json({
            msg: "You sent the wrong input!"
        });
        return;
    }
    //put it in mongoDB
    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })
    resp.json({
        msg: "Todo DB created"
    })
})

app.get("/todos", async function(req, resp) {
    const todos = await todo.find({})
    resp.json({
        todos
    })
})

app.put("/completed", async function(req, resp) {
    const completedPayload = req.body;
    const parsedPayload = updateTodo.safeParse(completedPayload);
    if (!parsedPayload.success) {
        resp.status(411).json({
            msg: "You sent wrong inputs!"
        });
        return;
    }
    // update in MDB
    await todo.update({
        _id: req.body.id
    }, {
        completed: true
    })
    resp.json({
        msg: "Todo marked as completed"
    })
})
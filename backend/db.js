const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://admin:5WKE8kuDkZmmldBV@cluster0.ygk7cyh.mongodb.net/todos")

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const todo = mongoose.model("todos", todoSchema)

module.exports = {
    todo: todo
}
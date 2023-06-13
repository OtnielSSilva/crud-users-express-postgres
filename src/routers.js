const express = require("express")
const { listUsers, showUserById, createANewUser, userUpdate, editUser, deleteUser } = require("./controladores/users")

const routers = express()

routers.get("/users", listUsers)
routers.get("/users/:id", showUserById)
routers.post("/users", createANewUser)
routers.put("/users/:id", userUpdate)
routers.patch("/users/:id", editUser)
routers.delete("/users/:id", deleteUser)

module.exports = routers
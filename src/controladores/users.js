const users = require("../database/data")
const pool = require("../connection")

const listUsers = async (req, res) => {

    const usersList = await pool.query("select * from users")

    res.status(200).send(usersList.rows)
}

const showUserById = (req, res) => {
    const { id } = req.params

    const user = users.find(user => user.id === Number(id))
    
    if(!user) {
        res.send("Invalid ID!")
        return
    }

    console.log(user)
    res.status(200).send(user)
}

const createANewUser = async (req, res) => {
    const data = req.body

    // const newUser = {
    //     id: users.length + 1,
    //     name: data.name,
    //     email: data.email,
    //     password: data.password
    // }
    try {
        const insertInto = await pool.query(
            "INSERT INTO users (name, email, password) VALUES($1, $2, $3)", 
            [data.name, data.email, data.password])
    } catch (error) {
        console.error(error)
    }
    // users.push(newUser)

    res.status(201).send(`Data from ${data.name} succeffully inseted!`)
}

const userUpdate = (req, res) => {
    const { id } = req.params
    const { name, email, password } = req.body

    const user = users.find(user => user.id === Number(id))

    if(!user) {
        res.send("Invalid ID!")
        return
    }

    user.name = name
    user.email = email
    user.password = password

    res.status(200).send("User Modified Successfully")
}

const editUser = (req, res) => {
    const { id } = req.params
    const { name, email, password } = req.body

    const user = users.find(user => user.id === Number(id))

    if(!user) {
        res.send("Invalid ID!")
        return
    }

    if(name)
        user.name = name
    else if(email)
        user.email = email
    else if(password)
        user.password = password

    res.status(200).send(user)
}

const deleteUser = (req, res) => {
    const { id } = req.params

    const user = users.find(user => user.id === Number(id))
    // const userIndex = users.findIndex(user => user.id === Number(id))

    if(!user) {
        res.send("Invalid ID!")
        return
    }

    const userIndex = users.indexOf(user)
    users.splice(userIndex, 1)

    res.status(200).send(users)
}

module.exports = {
    listUsers,
    showUserById,
    createANewUser,
    userUpdate,
    editUser,
    deleteUser
}
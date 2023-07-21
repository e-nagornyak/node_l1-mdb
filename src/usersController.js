const {addUser, getUsers, deleteUser, updateUser, searchUsers, getUser} = require("./repository");
const express = require('express')
const router = express.Router()

router.get('/:id', async (req, res) => {
	const userId = req.params.id
	console.log(userId)
	const user = await getUser(userId);
	res.send(user ? user : 404)
})

router.get('/', async (req, res) => {
	const {search} = req.query

	if (search) {
		const searchUser = await searchUsers(search)
		res.send(searchUser)
	} else {
		const users = await getUsers();
		res.send(users)
	}

})

router.post('/', async (req, res) => {
	await addUser(req.body.name);
	const users = await getUsers()
	res.send(users)
})

router.put('/', async (req, res) => {
	const {newName, id} = req.body
	await updateUser(id, newName)
	res.send(204)
})

router.delete('/:id', async (req, res) => {
	const userId = req.params.id
	await deleteUser(userId)
	res.send(204)
})

module.exports = router




const mongoose = require("mongoose");

const USER_FILE_PATH = "./public/users.json"

const userSchema = new mongoose.Schema({
	name: String,
	banned: {type: Boolean, default: false}
})

User = mongoose.model("users", userSchema)

const getUsers = () => {
	return User.find();
	// return readJsonFromFile(USER_FILE_PATH)
};

const getUser = (id) => {
	return User.findById(id);
}

const searchUsers = (search) => {
	return User.find({name: new RegExp(search)});
}

const addUser = async (name) => {
	const newUser = new User({name})
	return await newUser.save()
	// users.push({ name, banned: false, id: users.length + 1 });
	// return writeJsonToFile(USER_FILE_PATH, users);
};

const deleteUser = async (id) => {
	const user = await User.findById(id);
	user.deleteOne()
};

const updateUser = async (id, newName) => {
	const user = await User.findById(id);
	await user.updateOne({$set: {name: newName}});
}


exports.getUsers = getUsers;
exports.getUser = getUser;
exports.searchUsers = searchUsers;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.addUser = addUser;




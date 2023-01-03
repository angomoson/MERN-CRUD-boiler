import UserAuth from "../models/userAuth.js";

export const getUser = async (req, res) => {
  try {
    const users = await UserAuth.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const newUser = new UserAuth({
    name: req.body.name,
    email: req.body.email,
  });

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    await UserAuth.deleteOne({ _id: userId });
    res.send("user deleted");
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { userId } = req.params;
  try {
    await UserAuth.updateOne(
      { _id: userId },
      { $set: { name: req.body.Name } }
    );
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

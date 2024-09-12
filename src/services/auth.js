import { UsersCollection } from "../db/models/user.js";

export const registerUser = async (payload) => {
    return await UsersCollection.create(payload);

};
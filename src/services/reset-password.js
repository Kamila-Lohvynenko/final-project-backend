import createHttpError from "http-errors";
import { UsersCollection } from "../db/models/user.js";

export const requestResetToken = async (email) => {
    const user = await UsersCollection.findOne({ email });
    if (!user) {
        throw createHttpError(404, 'User not found');
    }
};
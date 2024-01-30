import { Argon2id } from "oslo/password";
import { generateId } from "lucia";
// import { SqliteError } from "better-sqlite3";
import { db } from "../utils/drizzle";
import { userTable } from "../utils/schema";

export default eventHandler(async (event) => {
	const formData = await readFormData(event);
	const username = formData.get("username");
	if (
		typeof username !== "string" ||
		username.length < 3 ||
		username.length > 31 ||
		!/^[a-z0-9_-]+$/.test(username)
	) {
		throw createError({
			message: "Invalid username",
			statusCode: 400
		});
	}
	const password = formData.get("password");
	if (typeof password !== "string" || password.length < 6 || password.length > 255) {
		throw createError({
			message: "Invalid password",
			statusCode: 400
		});
	}

	const hashedPassword = await new Argon2id().hash(password);
	const userId = generateId(15);

	// TODO: check if username is already used
	await db.insert(userTable).values({
		id: userId,
		username: username,
		password: hashedPassword
	});

	const session = await lucia.createSession(userId, {});
	appendHeader(event, "Set-Cookie", lucia.createSessionCookie(session.id).serialize());
});

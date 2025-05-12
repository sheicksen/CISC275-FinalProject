import { User } from "../interfaces/user";
import { loggedIn } from "./login";

/**
 * @function loadUsers Loads all of the users from localStorage
 * @returns {User[]} An array of all of the users from localStorage
 */
export function loadUsers(): User[] {
    return JSON.parse(localStorage.getItem("users") || "[]");
}

/**
 * @function saveUsers Saves an array of users to localStorage, overwriting existing "users"
 * @param {User[]} users The array of users to be saved
 */
function saveUsers(users: User[]) {
    localStorage.setItem("users", JSON.stringify(users));
}

/**
 * @function loadUser Loads a specific user from localStorage, undefined if not found
 * @param {string} name The name of the user to load
 * @returns {User | undefind} The user if found, undefined otherwise
 */
export function loadUser(name: string): User | undefined {
    return loadUsers().find((v) => (v.name === name));
}

/**
 * @function saveUser Saves a specific user to localStorage, overwriting an existing user with the same name
 * @param {User} user The user to be saved
 */
export function saveUser(user: User) {
    saveUsers([user, ...loadUsers().filter((v) => (v.name !== user.name))]);
}

/**
 * @function loadCurrentUser Loads the currently logged in user, undefined if not found or not logged in
 * @returns {User | undefined} The user if found, undefined otherwise
 */
export function loadCurrentUser(): User | undefined {
    return loadUser(loggedIn() ?? "");
}

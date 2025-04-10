/**
 * @function logOut Deletes the name of the user from localStorage and reloads
 */
export function logOut() {
    localStorage.removeItem("usrnm");
    window.location.reload();
}

/**
 * @function loggedIn Gets the currently logged in user;
 * can be used to test if there are any logged in users
 * @returns {string | null} The user, null if none logged in
 */
export function loggedIn(): string | null {
    return localStorage.getItem("usrnm");
}

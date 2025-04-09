export function logOut() {
    localStorage.removeItem("usrnm");
}

export function loggedIn(): string | null {
    return localStorage.getItem("usrnm");
}
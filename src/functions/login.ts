export function logOut() {
    localStorage.removeItem("usrnm");
    window.location.reload();
}

export function loggedIn(): string | null {
    return localStorage.getItem("usrnm");
}

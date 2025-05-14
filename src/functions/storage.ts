import { Analysis } from "../interfaces/analysis";
import { QuizRun, User } from "../interfaces/user";
import { loggedIn } from "./login";
import _ from "lodash";

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

/**
 * @function removeAnalysis Removes an Analysis from an array if all careers are the same
 * @param {Analysis} analysis The Analysis to be removed
 * @param {Analysis[]} analyses The array to look in
 * @returns {Analysis[]} The array with the given analysis removed (identical if not found)
 */
export function removeAnalysis(analysis: Analysis, analyses: Analysis[]): Analysis[] {
    const out = analyses.filter((val) => (!_.isEqual(analysis.careers, val.careers)));
    return out;
}

/**
 * @function updateCurrentUserRuns Updates the runs for the current user
 * @param {QuizRun} run The quiz run to add/update
 */
export function updateCurrentUserRuns(run: QuizRun) {
    const user = loadCurrentUser();
    if (!user) {
        alert("How are you trying to update the user without being logged in???");
        return;
    }

    const sameName = user.quizzes.filter((val) => (val.responses.name === run.responses.name));
    const diffName = user.quizzes.filter((val) => (val.responses.name !== run.responses.name));
    const sameNameDiffQs = sameName.filter((val) => !_.isEqual(val.responses.questions, run.responses.questions));
    const all = [...diffName, ...sameNameDiffQs, run];
    const updatedUser: User = { ...user, quizzes: all };

    saveUser(updatedUser);
}

/**
 * @function isSaved Checks if a quiz run has been saved to the current user
 * @param {QuizRun} run The quiz run to check for
 * @returns {boolean} true if found, false if not found or not logged in
 */
export function isSaved(run: QuizRun): boolean {
    const user = loadCurrentUser();
    if (!user) return false;

    const sameName = user.quizzes.filter((val) => (val.responses.name === run.responses.name));
    const sameNameAndQs = sameName.filter((val) => _.isEqual(val.responses.questions, run.responses.questions));
    return sameNameAndQs.length > 0;
}

import React from "react";

export function preventFormSubmitReload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
}

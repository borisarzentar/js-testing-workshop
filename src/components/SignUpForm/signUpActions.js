
export const submitSignUp = (email, password, university) => () => {
    return fetch('http://localhost:4000/signup', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
            university,
        }),
    });
}

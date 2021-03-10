import { useCallback, useMemo, useState } from 'react';
import { submitSignUp } from './signUpActions'

export const useSignUpFlow = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [university, setUniversity] = useState('');

    const submit = useCallback(
        () => submitSignUp(email, password, university),
        [email, password, university]
    );

    return useMemo(() => ({
        submit,
        email,
        setEmail,
        password,
        setPassword,
        university,
        setUniversity,
    }), [email, password, submit, university]);
}

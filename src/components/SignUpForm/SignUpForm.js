import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './SignUpForm.module.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { submitSignUp } from './signUpActions';
import TypeaheadDropdown from '../TypeaheadDropdown/ReduxHookedTypeaheadDropdown';
import HookedTypeaheadDropdown from '../TypeaheadDropdown/HookedTypeaheadDropdown';
import ConnectedTypeaheadDropdown from '../TypeaheadDropdown/ConnectedTypeaheadDropdown';

function SignUpForm({
    onSubmitSuccess,
}) {
    const dispatch = useDispatch();
    const [university1Value, setUniversity1Value] = useState('');
    const [university2Value, setUniversity2Value] = useState('');
    const [university3Value, setUniversity3Value] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const handleSignUpSubmit = async (event) => {
        event.preventDefault();
        try {
            await dispatch(submitSignUp(emailValue, passwordValue, university1Value))
            onSubmitSuccess(emailValue, university1Value, university2Value, university3Value);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUniversity1Select = (university) => {
        setUniversity1Value(university ? university.label : '');
    };

    const handleUniversity2Select = (university) => {
        setUniversity2Value(university ? university.label : '');
    };

    const handleUniversity3Select = (university) => {
        setUniversity3Value(university ? university.label : '');
    };

    return (
        <form
            action="."
            onSubmit={handleSignUpSubmit}
            className={styles.signUpForm}
        >
            <div className={styles.formGroup}>
                <h1>Sign up</h1>
            </div>
            <div className={styles.formGroup}>
                <Input
                    value={emailValue}
                    placeholder="Type your email"
                    onChange={(event) => setEmailValue(event.target.value)}
                />
            </div>
            <div className={styles.formGroup}>
                <Input
                    type="password"
                    value={passwordValue}
                    placeholder="Type your password"
                    onChange={(event) => setPasswordValue(event.target.value)}
                />
            </div>
            <div className={styles.formGroup}>
                <TypeaheadDropdown
                    id="sign-up-form-university-1"
                    onSelect={handleUniversity1Select}
                    placeholder="Find your university"
                />
            </div>
            <div className={styles.formGroup}>
                <ConnectedTypeaheadDropdown
                    id="sign-up-form-university-2"
                    onSelect={handleUniversity2Select}
                    placeholder="Find your university"
                />
            </div>
            <div className={styles.formGroup}>
                <HookedTypeaheadDropdown
                    id="sign-up-form-university-3"
                    onSelect={handleUniversity3Select}
                    placeholder="Find your university"
                />
            </div>
            <div className={styles.formGroup}>
                <Button type="submit">Register</Button>
            </div>
        </form>
    );
}

export default SignUpForm;

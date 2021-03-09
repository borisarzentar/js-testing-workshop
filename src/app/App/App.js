import { useState } from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
import SignUpForm from '../../components/SignUpForm/SignUpForm';

function App() {
    const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
    const handleSignUpSuccess = (emailValue, universityValue) => {
        console.log(emailValue, universityValue);
        setIsRegistrationSuccess(true);
    };

    return (
        <div className={styles.app}>
            <header className={styles.appHeader}>
                <img src={logo} className={styles.appLogo} alt="logo" />
            </header>
            <div className={styles.appBody}>
                {
                    isRegistrationSuccess ? (
                        <p className={styles.successMessage}>You are registered!</p>
                    ): (
                        <SignUpForm onSubmitSuccess={handleSignUpSuccess} />
                    )
                }
            </div>
        </div>
    );
}

export default App;

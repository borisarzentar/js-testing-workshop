import React from 'react';
import styles from './Button.module.css';

export default function Button({
    testId,
    onClick,
    children,
    type = 'button',
    disabled = false,
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            data-test-id={testId}
            className={styles.button}
        >
            {children}
        </button>
    );
}

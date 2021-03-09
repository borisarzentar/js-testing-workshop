import React from 'react';
import styles from './ClearButton.module.css';

export default function ClearButton({
    testId,
    onClick,
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            data-test-id={testId}
            className={styles.clearButton}
        >
            <span>&#x2715;</span>
        </button>
    );
}

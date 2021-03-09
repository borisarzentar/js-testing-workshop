import styles from './Input.module.css';

export default function Input({
    type,
    value,
    onBlur,
    onFocus,
    onChange,
    testId,
    placeholder,
}) {
    return (
        <input
            type={type}
            value={value}
            onBlur={onBlur}
            onFocus={onFocus}
            onChange={onChange}
            data-test-id={testId}
            className={styles.input}
            placeholder={placeholder}
        />
    );
}

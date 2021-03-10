import { renderHook, act } from '@testing-library/react-hooks'
import { useSignUpFlow } from '../signUpHooks';

describe('useSignUpFlow hook', () => {
    it('holds the correct email value after change', () => {
        const { result } = renderHook(() => useSignUpFlow());
        expect(result.current.email).toBe('');

        act(() => {
            result.current.setEmail('email@example.com');
        });

        expect(result.current.email).toBe('email@example.com');
    });
});

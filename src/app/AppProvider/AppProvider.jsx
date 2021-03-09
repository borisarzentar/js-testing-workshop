import { useRef } from 'react';
import { Provider } from 'react-redux';
import createAppStore from './createAppStore';

export default function AppProvider({ children }) {
    const appStore = useRef(createAppStore());
    return (
        <Provider store={appStore.current}>
            {children}
        </Provider>
    );
}

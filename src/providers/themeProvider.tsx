import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';

interface ThemeState {
	theme: 'light' | 'dark';
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeState | null>(null);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useState<'light' | 'dark'>('dark');

	const toggleTheme = useCallback(() => {
		setTheme(theme === 'light' ? 'dark' : 'light');
	}, [theme]);

	const contextValue = useMemo(
		() => ({
			theme,
			toggleTheme,
		}),
		[theme, toggleTheme]
	);

	useEffect(() => {
		document.documentElement.classList.toggle('dark', theme === 'dark');
	}, [theme]);

	return <ThemeContext value={contextValue}>{children}</ThemeContext>;
};

export default ThemeProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useTheme must be used within an ThemeProvider');
	}
	return context;
};

import { Theme } from '@/interfaces/project';
import { updateTheme } from '@/services/users.service';
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
	theme: Theme;
	toggleTheme: () => void;
	getUserTheme: () => void;
}

const ThemeContext = createContext<ThemeState | null>(null);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useState<Theme>(Theme.Dark);

	const toggleTheme = useCallback(async () => {
		const newTheme = theme === Theme.Light ? Theme.Dark : Theme.Light;
		await updateTheme(newTheme);
		setTheme(newTheme);
		localStorage.setItem('theme', newTheme as Theme);
	}, [theme]);

	const getUserTheme = useCallback(async () => {
		const userTheme = localStorage.getItem('theme');
		if (userTheme) {
			setTheme(userTheme as Theme);
			localStorage.setItem('theme', userTheme as Theme);
		}
	}, [setTheme]);

	const contextValue = useMemo(
		() => ({
			theme,
			toggleTheme,
			getUserTheme,
		}),
		[theme, toggleTheme, getUserTheme]
	);

	useEffect(() => {
		document.documentElement.classList.toggle('dark', theme === Theme.Dark);
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

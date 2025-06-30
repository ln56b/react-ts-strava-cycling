import { useEffect } from 'react';
import { Button } from '../ui/button';
import MenuItems from './menuItems';

interface MenuProps {
	isMenuOpen: boolean;
	setIsMenuOpen: (isMenuOpen: boolean) => void;
}

export default function Menu({ isMenuOpen, setIsMenuOpen }: MenuProps) {
	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	useEffect(() => {
		// close menu when screen is resized to lg
		const handleResize = () => {
			if (window.innerWidth >= 1024) {
				setIsMenuOpen(false);
			}
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [setIsMenuOpen]);

	return (
		<>
			<aside className="hidden col-span-2 lg:block">
				<div className="flex flex-col gap-6 pr-2 mr-1 h-full border-r border-gray-200 lg:text-md dark:border-gray-800">
					<MenuItems />
				</div>
			</aside>

			<div className="absolute left-3 top-4">
				<div className="relative lg:hidden">
					<Button onClick={toggleMenu}>
						<i className="fa-solid fa-bars"></i>
					</Button>
					{isMenuOpen && (
						<div className="absolute top-10 w-full h-full z-10">
							<div className="flex flex-col gap-4 px-2 py-3 bg-white ring-1 ring-gray-200 shadow-sm dark:bg-gray-900 min-w-50 dark:ring-gray-900">
								<MenuItems />
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

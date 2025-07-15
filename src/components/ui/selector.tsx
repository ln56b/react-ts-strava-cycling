import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './select';

interface SelectorProps {
	options: string[];
	value: string;
	onHandleChange: (value: string) => void;
	disabled?: boolean;
}

export default function Selector({
	options,
	value,
	onHandleChange,
	disabled,
}: SelectorProps) {
	const handleChange = (value: string) => {
		onHandleChange(value);
	};

	return (
		<Select value={value} onValueChange={handleChange} disabled={disabled}>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Select a date" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{options.map((option, index) => (
						<SelectItem key={index} value={option}>
							{option}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}

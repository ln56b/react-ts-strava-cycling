'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';

interface DatePickerProps {
	handleDateChange: (date: DateRange) => void;
}

export function DatePicker({ handleDateChange }: DatePickerProps) {
	const today = new Date();
	const from = new Date(today.getFullYear(), today.getMonth(), 1);
	const to = new Date();

	const [selectedDate, setSelectedDate] = useState<DateRange>({
		from,
		to,
	});

	useEffect(() => {
		handleDateChange(selectedDate);
	}, [selectedDate, handleDateChange]);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					data-empty={!selectedDate.from && !selectedDate.to}
					className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
				>
					<CalendarIcon />
					{selectedDate.from && selectedDate.to ? (
						`${format(selectedDate.from, 'PP')} - ${format(
							selectedDate.to,
							'PP'
						)}`
					) : (
						<span>Pick a date</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="range"
					selected={selectedDate}
					onSelect={setSelectedDate}
					required
				/>
			</PopoverContent>
		</Popover>
	);
}

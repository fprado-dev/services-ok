"use client";

import ServiceForm from "@/components/service-form";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { RefreshCcwDotIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

export default function Page() {
	const [selectedHours, setSelectedHours] = useState<number[]>([]);
	const [showWorkingHours, setShowWorkingHours] = useState<boolean>(true);

	const toggleHourSelection = (hour: number) => {
		setSelectedHours((prev) =>
			prev.includes(hour) ? prev.filter((h) => h !== hour) : [...prev, hour],
		);
	};

	return (
		<Sheet modal>
			<div className="flex items-center justify-between mb-4">
				<Button onClick={() => setShowWorkingHours(!showWorkingHours)}>
					<RefreshCcwDotIcon className="w-4 h-4" />{" "}
					{showWorkingHours ? "All Hours" : "Working Hours"}
				</Button>
				{selectedHours.length > 0 && (
					<SheetTrigger asChild>
						<Button
							className="bg-green-500 text-white"
							onClick={() => console.log("Add new appointment")}
						>
							<PlusIcon className="w-4 h-4" /> Add New Appointment
						</Button>
					</SheetTrigger>
				)}
			</div>
			<div className="grid auto-rows-min gap-4 md:grid-cols-4">
				{Array.from({ length: 24 })
					.filter((_, i) => (showWorkingHours ? i >= 8 && i <= 19 : true))
					.map((_, i) => {
						const hour = i + (showWorkingHours ? 8 : 0);
						return (
							<Button
								key={hour}
								variant="ghost"
								onClick={() => toggleHourSelection(hour)}
								className={`h-24 rounded-xl bg-muted/50 flex items-center justify-center shadow shadow-black/10 ${
									selectedHours.includes(hour)
										? "border border-muted-foreground text-muted-foreground"
										: ""
								}`}
							>
								<span>{hour < 10 ? `0${hour}:00` : `${hour}:00`}</span>
							</Button>
						);
					})}
			</div>
			<SheetContent className="md:max-w-2xl">
				<SheetHeader>
					<SheetTitle>Selected Hours</SheetTitle>
					<SheetDescription>
						You have selected:{" "}
						{selectedHours.length > 0
							? selectedHours
									.map((hour) => (hour < 10 ? `0${hour}:00` : `${hour}:00`))
									.join(", ")
							: "--"}
						.
					</SheetDescription>
				</SheetHeader>
				<ServiceForm />
			</SheetContent>
		</Sheet>
	);
}

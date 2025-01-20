"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Dummy data for select options
const serviceOptions = [
	{ value: "oil_change", label: "Oil Change" },
	{ value: "tire_rotation", label: "Tire Rotation" },
	{ value: "brake_service", label: "Brake Service" },
];

const clientOptions = [
	{ value: "john_doe", label: "John Doe" },
	{ value: "jane_smith", label: "Jane Smith" },
	{ value: "bob_johnson", label: "Bob Johnson" },
];

// Form schema
const formSchema = z.object({
	serviceName: z.string().nonempty("Service name is required"),
	price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
	clientName: z.string().nonempty("Client name is required"),
	carModel: z.string().nonempty("Car model is required"),
	description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ServiceForm() {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			serviceName: "",
			price: "",
			clientName: "",
			carModel: "",
			description: "",
		},
	});

	const { watch } = form;
	const formValues = watch();

	const onSubmit = (data: FormValues) => {
		console.log(data, formValues);
		// Handle form submission here
	};

	return (
		<div className="container mx-auto mt-4">
			<h2 className="text-2xl font-bold">Service Form</h2>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="serviceName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Service Name</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a service" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{serviceOptions.map((option) => (
											<SelectItem key={option.value} value={option.value}>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="price"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Price</FormLabel>
								<FormControl>
									<Input
										type="text"
										placeholder="0.00"
										{...field}
										onChange={(e) => {
											const value = e.target.value.replace(/[^0-9.]/g, "");
											field.onChange(value);
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="clientName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Client Name</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a client" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{clientOptions.map((option) => (
											<SelectItem key={option.value} value={option.value}>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="carModel"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Car Model</FormLabel>
								<FormControl>
									<Input type="text" placeholder="Enter car model" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Enter service description"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</div>
	);
}

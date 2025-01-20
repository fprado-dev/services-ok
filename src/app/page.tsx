"use client";

import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
	const { isSignedIn } = useAuth();

	if (isSignedIn) {
		return redirect("/dashboard");
	}

	return redirect("/sign-in");
}

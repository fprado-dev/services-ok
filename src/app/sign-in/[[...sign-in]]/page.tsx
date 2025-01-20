import { SignIn } from "@clerk/nextjs";

export default function Page() {
	return (
		<div className="bg-gradient-to-r from-slate-100 to-zinc-300 h-screen flex items-center justify-center">
			<h1>Login</h1>
			<SignIn fallbackRedirectUrl="/dashboard" />
		</div>
	);
}

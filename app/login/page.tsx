import Form from "@/components/login/form";
import { LifeBuoy } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login | CBET Platform",
    description: "Login to access the CBET Platform",
};

export default function Login() {
	return (
		<div className="login-container">
			<main>
				<div id="logo-container">
					<LifeBuoy />
				</div>
				<div id="header-container">
					<h1>Login To Access Admin.</h1>
				</div>
				<div id="form-container">
					<Form />
				</div>
			</main>
		</div>
	);
}
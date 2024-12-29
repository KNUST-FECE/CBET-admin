import Form from "@/components/login/form";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Login | CBET Platform",
    description: "Login to access the CBET Platform",
};

export default function Login() {
	return (
		<div className="login-container">
			<main>
				<div id="logo-container">
					<Image src="/logo.png" alt="logo" width={80} height={80} id="the-logo" />
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
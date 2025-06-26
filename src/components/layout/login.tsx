import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { useState } from 'react';
import { Link } from 'react-router';

const loginSchema = z.object({
	email: z.string().email().min(2, {
		message: 'Email should be at least 2 characters',
	}),
	password: z.string().min(3, {
		message: 'Password should be at least 3 characters',
	}),
});

export default function Login() {
	const auth = UseAuth();

	const form = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		onSubmit: async ({ value }) => {
			console.log(value);
			auth.loginAction(value.email, value.password);
		},
		validators: {
			onChange: loginSchema,
		},
	});

	const [touched, setTouched] = useState({
		email: false,
		password: false,
	});

	const handleBlur = (fieldName: string) => {
		setTouched((prev) => ({ ...prev, [fieldName]: true }));
	};

	return (
		<div className="flex justify-center my-[100px] mx-0">
			<Card className="mt-5">
				<h2 className="mt-2 text-2xl text-center">Welcome back !</h2>
				<fieldset>
					<form.Field name="email">
						{(field) => (
							<>
								<Input
									id={field.name}
									name={field.name}
									value={field.state.value}
									type="email"
									placeholder="john.doe@email.com"
									onChange={(e) => field.handleChange(e.target.value)}
									onBlur={() => handleBlur('email')}
								/>
								{touched.email && field.state.meta.errors
									? field.state.meta.errors.map((error) => (
											<p
												key={field.name}
												className="p-2 italic text-destructive"
											>
												{error?.message}
											</p>
									  ))
									: null}
							</>
						)}
					</form.Field>
				</fieldset>

				<fieldset>
					<form.Field name="password">
						{(field) => (
							<>
								<Input
									id={field.name}
									name={field.name}
									value={field.state.value}
									type="text"
									placeholder="Enter your password"
									onChange={(e) => field.handleChange(e.target.value)}
									onBlur={() => handleBlur('password')}
								/>
								{touched.password && field.state.meta.errors
									? field.state.meta.errors.map((error) => (
											<p
												key={field.name}
												className="p-2 italic text-destructive"
											>
												{error?.message}
											</p>
									  ))
									: null}
							</>
						)}
					</form.Field>
				</fieldset>

				<Button onClick={form.handleSubmit}>Submit</Button>
				<p>
					<span className="italic"> Not registered yet ? </span>
					<Link to="/signup" className="hover:underline">
						Create an account
					</Link>
				</p>
			</Card>
		</div>
	);
}

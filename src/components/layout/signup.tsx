import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { useState } from 'react';
import { useAuth } from '@/providers/authProvider';
import { Link } from 'react-router';

const signupSchema = z.object({
	email: z.string().email().min(2, {
		message: 'Email should be at least 2 characters',
	}),
	password: z.string().min(3, {
		message: 'Password should be at least 3 characters',
	}),
	strava_id: z.number().min(5, {
		message: 'Strava ID should be at least 5 characters',
	}),
	strava_secret: z.string().min(10, {
		message: 'Strava Token should be at least 10 characters',
	}),
});

export default function Signup() {
	const auth = useAuth();

	const form = useForm({
		defaultValues: {
			email: '',
			password: '',
			strava_id: 0,
			strava_secret: '',
		},
		onSubmit: async ({ value }) => {
			auth.signupAction(
				value.email,
				value.password,
				value.strava_id,
				value.strava_secret
			);
			form.reset();
		},
		validators: {
			onChange: signupSchema,
		},
	});

	const [touched, setTouched] = useState({
		email: false,
		password: false,
		strava_id: false,
		strava_secret: false,
	});

	const handleBlur = (fieldName: string) => {
		setTouched((prev) => ({ ...prev, [fieldName]: true }));
	};

	return (
		<div className="flex flex-col items-center justify-center my-[100px] mx-0">
			<Link to="/">
				<i className="fa-solid fa-arrow-left mr-2"></i>
				Back to login
			</Link>
			<Card className="mt-5">
				<h2 className="mt-2 text-2xl text-center">Create an account</h2>
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

				<fieldset>
					<form.Field name="strava_id">
						{(field) => (
							<>
								<Input
									id={field.name}
									name={field.name}
									value={field.state.value}
									type="number"
									placeholder="Strava ID"
									onChange={(e) => field.handleChange(e.target.valueAsNumber)}
									onBlur={() => handleBlur('strava_id')}
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

				<fieldset>
					<form.Field name="strava_secret">
						{(field) => (
							<>
								<Input
									id={field.name}
									name={field.name}
									value={field.state.value}
									type="text"
									placeholder="Strava secret"
									onChange={(e) => field.handleChange(e.target.value)}
									onBlur={() => handleBlur('strava_secret')}
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
			</Card>
		</div>
	);
}

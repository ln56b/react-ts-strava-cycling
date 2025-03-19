import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { Button } from '../ui/button';

const signUpSchema = z.object({
	login: z.string().min(2, {
		message: 'Login should be at least 2 characters',
	}),
	password: z.string().min(3, {
		message: 'Password should be at least 3 characters',
	}),
	strava_id: z.string().min(1, {
		message: 'Please provide a valid Strava Id',
	}),
	strava_secret: z.string().min(1, {
		message: 'Please provide a valid Strava secret',
	}),
});

type TSignup = z.infer<typeof signUpSchema>;

export default function Signup() {
	const form = useForm({
		defaultValues: {
			login: '',
			password: '',
			strava_id: 0, // TODO fix initial state
			strava_secret: '',
		},
		onSubmit: async ({ value }) => {
			console.log(value);
		},
		validators: {
			onChange: signUpSchema,
		},
	});

	return (
		<div className="flex justify-center my-[100px] mx-0">
			<form.Field name="login">
				{(field) => (
					<>
						<label htmlFor={field.name}>Login:</label>
						<input
							id={field.name}
							name={field.name}
							value={field.state.value}
							type="text"
							onChange={(e) => field.handleChange(e.target.value)}
						/>
						{field.state.meta.errors ? (
							<em role="alert">{field.state.meta.errors.join(', ')}</em>
						) : null}
					</>
				)}
			</form.Field>

			<form.Field name="password">
				{(field) => (
					<>
						<label htmlFor={field.name}>Password:</label>
						<input
							id={field.name}
							name={field.name}
							value={field.state.value}
							type="text"
							onChange={(e) => field.handleChange(e.target.value)}
						/>
						{field.state.meta.errors ? (
							<em role="alert">{field.state.meta.errors.join(', ')}</em>
						) : null}
					</>
				)}
			</form.Field>

			<form.Field name="strava_id">
				{(field) => (
					<>
						<label htmlFor={field.name}>Strava ID:</label>
						<input
							id={field.name}
							name={field.name}
							value={field.state.value}
							type="number"
							onChange={(e) => field.handleChange(e.target.valueAsNumber)}
						/>
						{field.state.meta.errors ? (
							<em role="alert">{field.state.meta.errors.join(', ')}</em>
						) : null}
					</>
				)}
			</form.Field>

			<form.Field name="strava_secret">
				{(field) => (
					<>
						<label htmlFor={field.name}>Strava secret:</label>
						<input
							id={field.name}
							name={field.name}
							value={field.state.value}
							type="text"
							onChange={(e) => field.handleChange(e.target.value)}
						/>
						{field.state.meta.errors ? (
							<em role="alert">{field.state.meta.errors.join(', ')}</em>
						) : null}
					</>
				)}
			</form.Field>

			<Button onClick={form.handleSubmit}>Sign up</Button>
		</div>
	);
}

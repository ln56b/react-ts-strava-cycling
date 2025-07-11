export default function PageContainer({
	children,
	title,
	userId,
}: {
	children: React.ReactNode;
	title: string;
	userId: number;
}) {
	return (
		<div className="flex justify-center items-center my-2 lg:px-2">
			<main className="flex flex-col justify-center items-center">
				<div className="flex flex-col gap-4 justify-center items-center mb-10">
					<h2 className="text-3xl font-bold">{title}</h2>
					<a
						href={`https://www.strava.com/athletes/${userId}`}
						target="_blank"
						rel="noopener noreferrer"
						className=" text-[#FC5200]"
					>
						View on Strava
					</a>
				</div>

				{children}
			</main>
		</div>
	);
}

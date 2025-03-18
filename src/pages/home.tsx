import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["test"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/api/auth");
      return await response.json();
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>An error occurred: {error.message}</p>;
  return (
    <div>
      <p>Response from API: {JSON.stringify(data)}</p>
    </div>
  );
}

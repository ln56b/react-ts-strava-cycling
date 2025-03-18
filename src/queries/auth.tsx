export async function testConnection() {
  const response = await fetch("http://localhost:3000/api/auth");
  return await response.json();
}

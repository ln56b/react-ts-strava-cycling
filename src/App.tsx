import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/home";
import { Button } from "./components/ui/button";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Home />
        <p>Click on the Vite and React logos to learn more</p>

        <Button onClick={() => alert("Button clicked")} variant="default">
          Click me
        </Button>
      </QueryClientProvider>
    </>
  );
}

export default App;

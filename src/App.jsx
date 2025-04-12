import { SignedIn, SignedOut, SignIn, useAuth } from "@clerk/clerk-react";

function App() {
  const { isLoaded, isSignedIn } = useAuth();
  console.log("Clerk State:", { isLoaded, isSignedIn });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center p-4 sm:p-6">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">
        AI Notes Shortener
      </h1>
      <p>Debug: isLoaded={String(isLoaded)}, isSignedIn={String(isSignedIn)}</p>
      <SignedOut>
        <div className="flex justify-center items-center h-screen">
          <SignIn routing="path" path="/sign-in" />
        </div>
      </SignedOut>
      <SignedIn>
        <div>
          <h2>Signed In! Should see input box here.</h2>
        </div>
      </SignedIn>
    </div>
  );
}

export default App;
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GoogleSignIn from "@/components/auth/GoogleSignIn";
import { GithubSignIn } from "@/components/auth/GithubSignIn";
import CredentialsSignIn from "@/components/auth/CredentialsSignIn";

const Page = async () => {
  const session = await auth();
  if (session) redirect("/");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md mx-5 md:max-0">
        <div className="w-full max-w-sm mx-auto space-y-6">
          <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>

          <GoogleSignIn />
          <GithubSignIn />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          <CredentialsSignIn />

          <div className="text-center">
            <Button asChild variant="link">
              <Link href="/signup">Don&apos;t have an account? Sign up</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

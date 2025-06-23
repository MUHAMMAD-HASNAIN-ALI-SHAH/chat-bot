import { signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Github } from "./ui/Github";

const GithubSignIn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <Button
        className="w-full hover:bg-gray-200 transition duration-200 cursor-pointer"
        variant="outline"
      >
        <Github />
        Continue with GitHub
      </Button>
    </form>
  );
};

export { GithubSignIn };

import { signIn } from "@/lib/auth";
import { Google } from "./ui/Google";
import { Button } from "../ui/button";

const GoogleSignIn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button className="w-full hover:bg-gray-200 transition duration-200 cursor-pointer" variant="outline">
        <Google />
        Continue with Google
      </Button>
    </form>
  );
};

export default GoogleSignIn;

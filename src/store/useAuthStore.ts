import { create } from "zustand";
import { signup } from "@/lib/actions";
import { toast } from "sonner";

interface AuthStore {
  signup: (email: string, password: string) => Promise<void>;
}

const useAuthStore = create<AuthStore>((set, get) => ({
  signup: async (email, password) => {
    signup({ email, password })
      .then((res) => {
        toast("Successfuly Signup", {
          description: "You can now signin to continue",
          duration: 5000,
        });
      })
      .catch((error) => {
        console.error("Signup error:", error);
        toast("Signup failed. Please try again.", {
          description: "Something went wrong during signup.",
          duration: 5000,
        });
      });
  },
}));

export default useAuthStore;

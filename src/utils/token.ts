import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const generateToken = async (userId: any) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  (await cookies()).set("jwt", token, {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60,
    sameSite: "none",
    path: "/",
  });
};

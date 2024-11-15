import { useState } from "react";
// import { z } from "zod";
import { type User, selectUserSchema } from "backend/src/schemas/user";

// const userSchema = z.object({
//   name: z.string(),
//   email: z.string().email(),
//   id: z.string(),
//   role: z.enum(["admin", "user"]),
//   statusMessage: z.string().optional(),
// });

// export const useUser = () => {
//   const [user, setUser] = useState<z.infer<typeof userSchema> | null>(null);

//   const getUser = async () => {
//     const response = await fetch("http://localhost:4721/api/user");
//     const data = await response.json();
//     setUser(userSchema.parse(data));
//   };

//   return { user, getUser };
// };

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  const getUser = async () => {
    const response = await fetch("http://localhost:4721/api/user");
    const data = await response.json();
    setUser(selectUserSchema.parse(data));
  };

  return { user, getUser };
};

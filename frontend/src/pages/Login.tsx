import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/auth";
import { useState } from "react";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [apiError, setApiError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      return await loginUser(data);
    },
    onSuccess: (data) => {
      alert("Login successful!");
      console.log("User:", data);
    },
    onError: (error: any) => {
      setApiError(error.message || "Login failed");
    },
  });

  const isLoading = mutation.status === "pending";

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form
        onSubmit={handleSubmit((data) => mutation.mutate(data))}
        className=" font-[Plus Jakarta Sans] w-full max-w-sm space-y-4 text-center"
      >
        <h2 className="text-2xl font-semibold mb-12 text-center font-['Plus_Jakarta_Sans']">
          Welcome back!
        </h2>

        <div>
          <input
            {...register("email")}
            placeholder="UID"
            className="font-[Plus Jakarta Sans] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-12 w-[320px] mb-6 pl-5"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="font-[Plus Jakarta Sans] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-12 w-[320px] mb-6 pl-5"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {apiError && (
          <p className="text-red-600 text-sm text-center">{apiError}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#2B3A67]	text-white inline-block w-[320px] py-5 border-0 rounded-lg  text-lg"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;

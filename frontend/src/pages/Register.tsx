import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await axios.post("http://localhost:5000/api/auth/register", data);
      return res.data;
    },
    onSuccess: () => {
      alert("Registration successful!");
      navigate("/login");
    },
    onError: (error: any) => {
      alert(error?.response?.data?.message || "Registration failed");
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">

<form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto flex flex-col items-center"
    >
      <h2 className="text-2xl font-semibold mb-12 text-center font-['Plus_Jakarta_Sans']">
        Register
      </h2>
<div>
<input
        type="email"
        placeholder="Email"
        {...register("email")}
        className="h-12 w-72 mb-6 pl-5 w-80 border border-gray-300 rounded-md font-['Plus_Jakarta_Sans']"
      />
      <p className="text-red-500 text-sm -mt-4 mb-6">{errors.email?.message}</p>
</div>
   
<div>
<input
        type="password"
        placeholder="Password"
        {...register("password")}
        className="h-12 w-72 mb-6 pl-5 w-80 border border-gray-300 rounded-md font-['Plus_Jakarta_Sans']"
      />
      <p className="text-red-500 text-sm -mt-4 mb-12">{errors.password?.message}</p>
</div>
 

      <button
        type="submit"
        disabled={mutation.isPending}
        className="bg-[#2B3A67] text-white w-80 py-5 rounded-lg text-lg font-['Plus_Jakarta_Sans']"
      >
        {mutation.isPending ? "Registering..." : "Register"}
      </button>
    </form>
    </div>
  );
};

export default Register;

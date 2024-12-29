import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { showToast } from "../hooks/useToast";
import { useAuth } from "../hooks/useAuth";
import { useRef, useState } from "react";
import { Loader } from "lucide-react";
import { z } from "zod";
import { loginSchema } from "../schema/loginSchema";

function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const emailRef = useRef();
  const passwordRef = useRef();

  const validateField = (field, value) => {
    try {
      loginSchema.shape[field].parse(value);
      setErrors((prev) => ({ ...prev, [field]: "" })); // Clear the error for this field
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [field]: error.errors[0].message })); // Update the error for this field
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: emailRef.current.value.trim(),
      password: passwordRef.current.value.trim(),
    };

    try {
      // Validate form data using Zod
      loginSchema.parse(formData);

      setIsLoading(true);

      // Simulate an API call (replace with actual API logic)
      setTimeout(() => {
        setIsLoading(false);
        console.log("Logging in with:", formData);
        login(formData.email, formData.password);
        showToast("success", "Login Successful!");
        navigate("itc-smart/dashboard");
      }, 2000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors); // Update errors state with Zod's messages
      }
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col items-center gap-2 text-center">
      <h1 className="text-2xl font-bold">Login</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your details below to login.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            ref={emailRef}
            onChange={(e) => validateField("email", e.target.value)} // Real-time validation
            className={`w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div className="grid gap-2">
          <div className="flex">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            ref={passwordRef}
            onChange={(e) => validateField("password", e.target.value)} // Real-time validation
            className={`w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-primary text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader
              className="animate-spin text-white mr-2"
              width={20}
              height={20}
            />
          ) : null}
          Login
        </Button>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="underline underline-offset-4">
            Create an account
          </Link>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;

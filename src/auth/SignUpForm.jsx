import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Check, Eye, EyeOff, Loader, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { showToast } from "../hooks/useToast";
import { z } from "zod";
import { signUpSchema } from "../schema/SignUpSchema";

function SignUpForm() {
  const { createUser } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({}); // Track field-specific errors
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const checkStrength = (pass) => {
    const requirements = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[0-9]/, text: "At least 1 number" },
      { regex: /[a-z]/, text: "At least 1 lowercase letter" },
      { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
    ];

    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const strength = checkStrength(password);

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

  const getStrengthColor = (score) => {
    if (score === 0) return "bg-border";
    if (score <= 1) return "bg-red-500";
    if (score <= 2) return "bg-orange-500";
    if (score === 3) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const getStrengthText = (score) => {
    if (score === 0) return "Enter a password";
    if (score <= 2) return "Weak password";
    if (score === 3) return "Medium password";
    return "Strong password";
  };

  const handleInputChange = (e, field) => {
    // Clear the error for the specific field when the user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  
    if (field === "password") {
      setPassword(e.target.value);
    } else {
      // Handle other fields (email, name, etc.)
      // You can update the values if needed
    }
  };

  const handleSubmit = async (e) => {
   
    e.preventDefault();

    const formData = {
      name: nameRef.current.value.trim(),
      email: emailRef.current.value.trim(),
      password: passwordRef.current.value.trim(),
    };
    console.log(formData);

    try {
      // Validate form data with Zod schema
      signUpSchema.parse(formData);

      setIsLoading(true);

      // Simulate an API call
      setTimeout(() => {
        setIsLoading(false);
        console.log("Creating account with:", formData);
        createUser(formData.name, formData.email, formData.password);
        showToast("success", "User created successfully!");
        navigate("/");
      }, 2000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors); // Update the errors state with Zod's messages
        //showToast("error", "Validation failed. Please check your inputs.");
      }
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to create your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            ref={nameRef}
            placeholder="Name"
            value={nameRef.current?.value}
            onChange={(e) => handleInputChange(e, "name")}
            className={`w-full px-2 py-2 border rounded-md focus:outline-none ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            ref={emailRef}
            placeholder="Email"
            value={emailRef.current?.value}
            onChange={(e) => handleInputChange(e, "email")}
            className={`w-full px-2 py-2 border rounded-md focus:outline-none ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={isVisible ? "text" : "password"}
              placeholder="Password"
              ref={passwordRef}
              value={password}
              onChange={(e) => handleInputChange(e, "password")}
              className={`w-full px-2 py-2 border rounded-md focus:outline-none ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            <button
              type="button"
              onClick={toggleVisibility}
              className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center text-muted-foreground/80 hover:text-foreground"
              aria-label={isVisible ? "Hide password" : "Show password"}
            >
              {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
          {/* Only show the password strength UI if the password is not empty */}
          {password && (
            <>
              <div
                className="mb-4 mt-3 h-1 w-full overflow-hidden rounded-full bg-border"
                role="progressbar"
                aria-valuenow={strengthScore}
                aria-valuemin={0}
                aria-valuemax={4}
              >
                <div
                  className={`h-full ${getStrengthColor(
                    strengthScore
                  )} transition-all`}
                  style={{ width: `${(strengthScore / 4) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm">
                {getStrengthText(strengthScore)}. Must contain:
              </p>
              <ul>
                {strength.map((req, index) => (
                  <li key={index} className="flex items-center gap-2">
                    {req.met ? (
                      <Check size={16} className="text-emerald-500" />
                    ) : (
                      <X size={16} />
                    )}
                    <span>{req.text}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Loader className="animate-spin mr-2" /> : null}
          Create account
        </Button>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/" className="underline">
            Login
          </Link>
        </div>
      </div>
    </form>
  );
}

export default SignUpForm;

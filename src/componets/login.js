import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../redux/slices/authSlice";
import { loginUser, signupUser } from "../service/authService";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import InputField from "../componets/InputField";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const [isSignup, setIsSignup] = useState(false);
  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (globalError) {
      const timer = setTimeout(() => setGlobalError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [globalError]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignup && formData.password !== formData.confirmPassword) {
      setFieldErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    try {
      let resData;

      if (isSignup) {
        resData = await signupUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role,
        });
      } else {
        resData = await loginUser(formData.email, formData.password);
      }

      dispatch(
        login({
          user: resData.user,
          role: resData.user.role,
        })
      );

      navigate("/home");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Something went wrong";
      if (
        errorMsg.toLowerCase().includes("password") ||
        errorMsg.toLowerCase().includes("confirm")
      ) {
        setFieldErrors({ password: errorMsg });
      } else {
        setGlobalError(errorMsg);
      }
    }
  };

  const loginFields = [
    { name: "email", type: "email", placeholder: "Email" },
    { name: "password", type: "password", placeholder: "Password" },
  ];

  const signupFields = [
    { name: "name", type: "text", placeholder: "Name" },
    ...loginFields,
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
    },
  ];

  const currentFields = isSignup ? signupFields : loginFields;

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setGlobalError("");
    setFieldErrors({});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-md p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center">
          {isSignup ? "Create an Account" : "Login"}
        </h2>

        {globalError && (
          <div className="bg-red-500 text-white text-sm p-2 rounded text-center">
            {globalError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {currentFields.map((field) => {
            const isPasswordField = field.name === "password";
            const isConfirmField = field.name === "confirmPassword";

            return (
              <div key={field.name} className="relative">
                <InputField
                  {...field}
                  value={formData[field.name]}
                  onChange={handleChange}
                  type={
                    isPasswordField
                      ? showPassword
                        ? "text"
                        : "password"
                      : isConfirmField
                      ? showConfirmPassword
                        ? "text"
                        : "password"
                      : field.type
                  }
                />
                {(isPasswordField || isConfirmField) && (
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 text-lg"
                    onClick={() =>
                      isPasswordField
                        ? setShowPassword((prev) => !prev)
                        : setShowConfirmPassword((prev) => !prev)
                    }
                  >
                    {isPasswordField
                      ? showPassword
                        ? <FaEyeSlash />
                        : <FaEye />
                      : showConfirmPassword
                      ? <FaEyeSlash />
                      : <FaEye />}
                  </button>
                )}
                {fieldErrors[field.name] && (
                  <p className="text-red-400 text-xs mt-1">
                    {fieldErrors[field.name]}
                  </p>
                )}
              </div>
            );
          })}

          {isSignup && (
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 bg-gray-700 rounded"
            >
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
            </select>
          )}

          {!isSignup && (
            <p className="text-right text-sm text-blue-400 hover:underline cursor-pointer">
              <Link to="/forgot-password">Forgot Password?</Link>
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p
          className="text-sm text-center cursor-pointer underline"
          onClick={toggleForm}
        >
          {isSignup
            ? "Already have an account? Login"
            : "Don't have an account? Sign up"}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

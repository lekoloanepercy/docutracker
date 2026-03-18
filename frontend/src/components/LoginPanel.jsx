import { useState, useEffect, useRef } from "react";
import GlassCard from "./GlassCard";
import BrandHeader from "./ui/BrandHeader";
import PrimaryBtn from "./ui/PrimaryBtn";
import Input from "./ui/Input";
import { loginUser } from "../services/authService";
import SubmitError from "./ui/SubmitError";
import { useAuth } from "../context/AuthContext";
import DemoAccessModal from "./DemoAccessModal";
import { useNavigate } from "react-router-dom";
// ── SVG Icons ──────────────────────────────────────────────────────────────
const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const EyeOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);
const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

//"http://localhost:3000/api/auth/login"

export default function LoginPanel({ onForgot, onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [submitFail, setSubmitFail] = useState(null);

  //context
  const { login } = useAuth();
  useEffect(() => {
    setTimeout(() => setMounted(true), 60);
  }, []);

  //
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "Minimum 6 characters";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }
    setLoading(true);

    const formData = { email, password };
    const result = await loginUser(formData);

    if (!result.success) {
      setSubmitFail(result.message);
      setLoading(false);
      setTimeout(() => {
        setSubmitFail(null);
      }, 5000);
      return;
    }

    const user = result.data?.user;
    const token = result.data?.token;
    sessionStorage.setItem("username",JSON.stringify(user.fullName));
    login({ user, token });
    

    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1800);
    console.log("Logged in:", result.data);
   navigate("/auth");
  };

  return (
    <GlassCard visible={mounted}>
   
      <BrandHeader subtitle="Sign in to manage your document workflows" />
      <Input
        label="Email address"
        type="email"
        placeholder="you@company.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setErrors((p) => ({ ...p, email: "" }));
        }}
        icon={<MailIcon />}
        error={errors.email}
      />
      <Input
        label="Password"
        type={showPass ? "text" : "password"}
        placeholder="••••••••"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setErrors((p) => ({ ...p, password: "" }));
        }}
        icon={<LockIcon />}
        error={errors.password}
        rightElement={
          <button
            type="button"
            onClick={() => setShowPass((p) => !p)}
            style={{
              color: "#6c757d",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              lineHeight: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#28a745")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6c757d")}
          >
            {showPass ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        }
      />
      <div className="flex justify-end mb-5">
        <button
          type="button"
          onClick={onForgot}
          className="text-xs font-medium transition-colors duration-150"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#28a745",
            padding: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#5dd879")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#28a745")}
        >
          Forgot password?
        </button>
      </div>

      <SubmitError message={submitFail} />

      <PrimaryBtn loading={loading} onClick={handleSubmit}>
        Sign In →
      </PrimaryBtn>
      <p className="text-center text-xs mt-5" style={{ color: "#6c757d" }}>
        Protected by enterprise-grade encryption
      </p>
    </GlassCard>
  );
}

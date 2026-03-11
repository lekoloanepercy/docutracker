import { useState, useEffect, useRef } from "react";
import SuccessPanel from "../components/SuccessPanel";
import BackgroundScene from "../components/BackgroundScene";

import NewPasswordPanel from "../components/NewPasswordPanel";
import VerifyCodePanel from "../components/VerifyCodePanel";
import ForgotPasswordPanel from "../components/ForgotPasswordPanel";
import LoginPanel from "../components/LoginPanel";

export default function AuthFlow() {
  const [step, setStep] = useState("login");
  const [resetEmail, setResetEmail] = useState("");

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6" style={{ background: "#0a1628" }}>
      <BackgroundScene/>
      {/* Tagline top-left */}
      <div className="absolute top-6 left-8 hidden md:block z-10">
        <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "rgba(40,167,69,0.7)" }}>
          Document Workflow Platform
        </p>
      </div>
      {/* Version tag top-right */}
      <div className="absolute top-6 right-8 hidden md:block z-10">
        <span className="text-xs px-2 py-1 rounded-full" style={{ background: "rgba(40,167,69,0.12)", color: "#28a745", border: "1px solid rgba(40,167,69,0.2)" }}>
          v2.4.1
        </span>
      </div>

      <div className="relative z-10 w-full flex justify-center">
        {step === "login" && (
          <LoginPanel
            onForgot={() => setStep("forgotEmail")}
            onSuccess={() => setStep("loginSuccess")}
          />
        )}
        {step === "forgotEmail" && (
          <ForgotPasswordPanel
            onBack={() => setStep("login")}
            onSend={(email) => { setResetEmail(email); setStep("verifyCode"); }}
          />
        )}
        {step === "verifyCode" && (
          <VerifyCodePanel
            email={resetEmail}
            onBack={() => setStep("forgotEmail")}
            onVerify={() => setStep("newPassword")}
          />
        )}
        {step === "newPassword" && (
          <NewPasswordPanel
            onBack={() => setStep("verifyCode")}
            onReset={() => setStep("resetSuccess")}
          />
        )}
        {step === "loginSuccess" && (
          <SuccessPanel
            message={{
              title: "Welcome back!",
              body: "You've signed in successfully. Redirecting you to your workspace.",
              cta: "Go to Dashboard →"
            }}
            onContinue={() => setStep("login")}
          />
        )}
        {step === "resetSuccess" && (
          <SuccessPanel
            message={{
              title: "Password Reset!",
              body: "Your password has been updated. Sign in with your new credentials.",
              cta: "Back to Sign In →"
            }}
            onContinue={() => setStep("login")}
          />
        )}
      </div>

      {/* Bottom footer */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center z-10">
        <p className="text-xs" style={{ color: "rgba(108,117,125,0.6)" }}>
          © 2026 DocFlow Workspace · All rights reserved
        </p>
      </div>
    </div>
  );
}
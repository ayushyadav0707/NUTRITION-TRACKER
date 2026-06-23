// src/app/auth/signin/page.tsx - Sign-In Page

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AuthFlow from "@/components/AuthFlow";

export const metadata = {
  title: "Sign In - NutriAI",
  description: "Sign in to your NutriAI account",
};

export default async function SignInPage() {
  // If user is already signed in, redirect to dashboard
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div>
      <AuthFlow />
    </div>
  );
}

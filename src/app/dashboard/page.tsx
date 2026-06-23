// src/app/dashboard/page.tsx - Protected Dashboard Page

import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export const metadata = {
  title: "Dashboard - NutriAI",
  description: "Your nutrition tracking dashboard",
};

export default async function DashboardPage() {
  // Get session server-side
  const session = await auth();

  // Redirect to sign-in if not authenticated
  if (!session?.user) {
    redirect("/auth/signin");
  }

  const user = session.user;

  return (
    <div style={{ minHeight: "100vh", background: "#F9FAFB" }}>
      {/* Header */}
      <header
        style={{
          background: "white",
          borderBottom: "1px solid #E5E7EB",
          padding: "1.5rem",
          boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              fontSize: "28px",
              fontWeight: 700,
              margin: 0,
              background: "linear-gradient(135deg, #10B981, #059669)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            🥗 NutriAI Dashboard
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            {user.image && (
              <img
                src={user.image}
                alt={user.name || "User avatar"}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "2px solid #E5E7EB",
                }}
              />
            )}
            <div>
              <p style={{ margin: 0, fontWeight: 600, color: "#111827" }}>
                {user.name}
              </p>
              <p style={{ margin: "0.25rem 0 0", fontSize: "13px", color: "#6B7280" }}>
                {user.email}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2rem 1.5rem",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "12px",
            border: "1px solid #E5E7EB",
            padding: "2rem",
            marginBottom: "2rem",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              fontWeight: 700,
              margin: "0 0 1rem",
              color: "#111827",
            }}
          >
            Welcome, {user.name}! 👋
          </h2>

          <div
            style={{
              background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
              borderRadius: "12px",
              padding: "2rem",
              color: "white",
              marginBottom: "2rem",
            }}
          >
            <h3 style={{ margin: "0 0 1rem", fontSize: "20px" }}>
              🎯 You're All Set!
            </h3>
            <p style={{ margin: "0 0 0.5rem", lineHeight: 1.6 }}>
              Your authentication is working perfectly. You can now:
            </p>
            <ul style={{ margin: "1rem 0", paddingLeft: "1.5rem" }}>
              <li>Track your daily nutrition intake</li>
              <li>Search from 870+ Indian dishes</li>
              <li>Plan your weekly meals</li>
              <li>Monitor your health goals</li>
              <li>View personalized analytics</li>
            </ul>
          </div>

          {/* User Information */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            <div
              style={{
                background: "#F9FAFB",
                borderRadius: "10px",
                padding: "1.5rem",
                border: "1px solid #E5E7EB",
              }}
            >
              <p style={{ fontSize: "13px", color: "#6B7280", margin: 0 }}>
                Email Address
              </p>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  margin: "0.5rem 0 0",
                  color: "#111827",
                }}
              >
                {user.email}
              </p>
            </div>

            <div
              style={{
                background: "#F9FAFB",
                borderRadius: "10px",
                padding: "1.5rem",
                border: "1px solid #E5E7EB",
              }}
            >
              <p style={{ fontSize: "13px", color: "#6B7280", margin: 0 }}>
                Account Name
              </p>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  margin: "0.5rem 0 0",
                  color: "#111827",
                }}
              >
                {user.name || "Not provided"}
              </p>
            </div>

            <div
              style={{
                background: "#F9FAFB",
                borderRadius: "10px",
                padding: "1.5rem",
                border: "1px solid #E5E7EB",
              }}
            >
              <p style={{ fontSize: "13px", color: "#6B7280", margin: 0 }}>
                Sign-In Method
              </p>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  margin: "0.5rem 0 0",
                  color: "#111827",
                }}
              >
                {user.provider === "google" ? "🔐 Google" : user.provider}
              </p>
            </div>
          </div>

          {/* Session Details */}
          <div
            style={{
              background: "#EFF6FF",
              border: "1px solid #BFDBFE",
              borderRadius: "10px",
              padding: "1rem",
              marginBottom: "2rem",
              fontSize: "13px",
            }}
          >
            <p style={{ margin: 0, color: "#1E40AF", fontWeight: 600 }}>
              ℹ️ Session Information
            </p>
            <p style={{ margin: "0.5rem 0 0", color: "#1E40AF" }}>
              Your session is secure and will remain active for 30 days. You can
              update your profile settings in the account settings page.
            </p>
          </div>

          {/* Sign Out Button */}
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/auth/signin" });
            }}
          >
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                background: "#EF4444",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "14px",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.background = "#DC2626";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = "#EF4444";
              }}
            >
              Sign Out
            </button>
          </form>
        </div>

        {/* Next Steps */}
        <div
          style={{
            background: "white",
            borderRadius: "12px",
            border: "1px solid #E5E7EB",
            padding: "2rem",
          }}
        >
          <h3 style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 1rem" }}>
            🚀 Next Steps
          </h3>
          <ol style={{ margin: 0, paddingLeft: "1.5rem", lineHeight: 1.8 }}>
            <li style={{ marginBottom: "0.75rem" }}>
              <strong>Complete Your Profile</strong> - Add your age, height,
              weight, and fitness goals
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              <strong>Start Logging Meals</strong> - Search from 30+ Indian
              dishes and add them to your daily log
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              <strong>Set Your Goals</strong> - Define your daily calorie target
              and macro nutrients
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              <strong>Track Progress</strong> - Monitor your nutrition intake and
              health improvements
            </li>
            <li>
              <strong>Generate Meal Plans</strong> - Let AI create personalized
              meal plans for you
            </li>
          </ol>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "2rem 1.5rem",
          color: "#6B7280",
          fontSize: "13px",
          borderTop: "1px solid #E5E7EB",
          marginTop: "3rem",
        }}
      >
        <p style={{ margin: 0 }}>
          🥗 <strong>NutriAI</strong> © 2026 | Your AI-Powered Nutrition
          Companion
        </p>
      </footer>
    </div>
  );
}

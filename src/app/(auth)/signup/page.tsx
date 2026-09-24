"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { UserPlus, AlertCircle, Loader2, Lock, Mail, User, Building2 } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          company_name: companyName,
        }
      }
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // In a real app, you would create the Tenant row here using an API route or trigger
      router.push("/");
      router.refresh();
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white tracking-tight">Create Agency Account</h2>
        <p className="text-xs text-slate-400 mt-1">Set up your workspace to automate Instagram & WhatsApp.</p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-400">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="button"
        onClick={handleGoogleSignup}
        disabled={loading}
        className="w-full py-2.5 px-4 rounded-xl border border-slate-700 bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-medium text-sm flex items-center justify-center gap-3"
      >
        <span>Sign up with Google</span>
      </button>

      <div className="relative flex items-center justify-center">
        <div className="border-t border-slate-800 w-full" />
        <span className="bg-[#0f172a] px-3 text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
          Or register with email
        </span>
      </div>

      <form onSubmit={handleEmailSignup} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-sm text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Company Name</label>
          <div className="relative">
            <Building2 className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-sm text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Work Email</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-sm text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-sm text-white"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium text-sm flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
          <span>Get Started</span>
        </button>
      </form>

      <div className="text-center pt-2 border-t border-slate-800/80 text-xs text-slate-400">
        Already have an account? <Link href="/login" className="text-indigo-400">Sign In</Link>
      </div>
    </div>
  );
}

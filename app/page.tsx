"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useLanguage } from "./i18n";

export default function Home() {
  const { t, switchLanguage, language } = useLanguage();
  const router = useRouter();
  const registerUser = useMutation(api.registerUser.default);
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await registerUser({ googleId: user.uid, email: user.email || "" });
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">{t("welcome")}</h1>
      <select
        value={language}
        onChange={(e) => switchLanguage(e.target.value as any)}
        className="mb-4 border p-2 rounded"
      >
        <option value="tamil">{t("select_language")}: Tamil</option>
        <option value="telugu">{t("select_language")}: Telugu</option>
        <option value="hindi">{t("select_language")}: Hindi</option>
        <option value="kannada">{t("select_language")}: Kannada</option>
        <option value="malayalam">{t("select_language")}: Malayalam</option>
      </select>
      <button
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="bg-blue-500 text-white p-2 rounded flex items-center gap-2"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12.24 10.32V13.8h5.57c-.23 1.2-.9 2.24-1.9 3.03-1.7 1.34-4.1 1.45-5.9.25-1.8-1.2-2.5-3.4-1.7-5.5.8-2.1 3-3.4 5.2-3.1 1.2.2 2.2.9 2.9 1.9l3-2.9c-1.5-1.5-3.5-2.4-5.7-2.4-4.1 0-7.5 3.3-7.5 7.5s3.4 7.5 7.5 7.5c4.3 0 7.2-3 7.2-7.2 0-.7-.1-1.4-.2-2.1h-8.4z"
          />
        </svg>
        {loading ? "Loading..." : t("continue_with_google")}
      </button>
    </main>
  );
}
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useLanguage } from "../i18n";
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function AdminDashboard() {
  const { t, switchLanguage, language } = useLanguage();
  const router = useRouter();
  const allWorkers = useQuery(api.getAllWorkers.default) || [];
  const allComplaints = useQuery(api.getAllComplaints.default) || [];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || user.uid !== process.env.ADMIN_GOOGLE_ID) {
        router.push("/");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = () => {
    signOut(auth);
    router.push("/");
  };

  return (
    <main className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{t("admin_dashboard")}</h1>
        <button onClick={handleLogout} className="text-red-500 underline">
          {t("logout")}
        </button>
      </div>

      <select
        value={language}
        onChange={(e) => switchLanguage(e.target.value as any)}
        className="mb-4 border p-2 rounded"
      >
        <option value="tamil">Tamil</option>
        <option value="telugu">Telugu</option>
        <option value="hindi">Hindi</option>
        <option value="kannada">Kannada</option>
        <option value="malayalam">Malayalam</option>
      </select>

      <h2 className="text-xl font-semibold mb-2">{t("all_workers")}</h2>
      <ul className="mb-8">
        {allWorkers.map((worker) => (
          <li key={worker._id} className="border p-2 mb-2 rounded">
            <p><strong>{t("name")}:</strong> {worker.name}</p>
            <p><strong>{t("contact")}:</strong> {worker.contact}</p>
            <p><strong>{t("skills")}:</strong> {worker.skills}</p>
            <p>
              <strong>{t("location")}:</strong> Lat: {worker.location.lat}, Lng: {worker.location.lng}
            </p>
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mb-2">{t("all_complaints")}</h2>
      <ul>
        {allComplaints.map((complaint) => (
          <li key={complaint._id} className="border p-2 mb-2 rounded">
            <p>{complaint.description}</p>
            <p className="text-sm text-gray-500">
              {new Date(complaint.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
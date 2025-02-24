"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useLanguage } from "../i18n";
import { auth } from "../../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";

export default function Dashboard() {
  const { t, switchLanguage, language } = useLanguage();
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [skills, setSkills] = useState("");
  const [complaint, setComplaint] = useState("");
  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  const addWorker = useMutation(api.addWorker.default);
  const workers = useQuery(api.getWorkers.default, userId ? { userId } : undefined) || [];
  const addComplaint = useMutation(api.addComplaint.default);
  const complaints = useQuery(api.getComplaints.default, userId ? { userId } : undefined) || [];
  const user = useQuery(userId ? api.registerUser.default : null, userId ? { googleId: auth.currentUser?.uid || "", email: "" } : undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        router.push("/");
      } else {
        const { userId } = await convex.mutation(api.registerUser.default, {
          googleId: firebaseUser.uid,
          email: firebaseUser.email || "",
        });
        setUserId(userId);
        setEmail(firebaseUser.email || "");
      }
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }
    return () => unsubscribe();
  }, [router]);

  const handleWorkerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userId) {
      await addWorker({
        userId,
        name,
        contact,
        skills,
        location: { ...location, lastUpdated: Date.now() },
      });
      setName("");
      setContact("");
      setSkills("");
    }
  };

  const handleComplaintSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userId && complaint) {
      await addComplaint({ userId, description: complaint });
      await fetch("/api/convex/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: complaint, email }),
      });
      setComplaint("");
    }
  };

  const handleLogout = () => {
    signOut(auth);
    router.push("/");
  };

  if (!userId) return <div>Loading...</div>;

  return (
    <main className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{t("dashboard")}</h1>
        <button onClick={handleLogout} className="text-red-500 underline">
          {t("logout")}
        </button>
      </div>
      <p className="mb-4">
        {t("unique_id")}: {user?.uniqueId || "Loading..."}
      </p>

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

      <h2 className="text-xl font-semibold mb-2">{t("add_worker")}</h2>
      <form onSubmit={handleWorkerSubmit} className="mb-8">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("name")}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder={t("contact")}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder={t("skills")}
          className="border p-2 rounded w-full mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {t("add_worker")}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">{t("workers")}</h2>
      <ul className="mb-8">
        {workers.map((worker) => (
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

      <h2 className="text-xl font-semibold mb-2">{t("complaint")}</h2>
      <form onSubmit={handleComplaintSubmit} className="mb-8">
        <textarea
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          placeholder={t("complaint")}
          className="border p-2 rounded w-full mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {t("submit_complaint")}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">{t("complaints")}</h2>
      <ul>
        {complaints.map((complaint) => (
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
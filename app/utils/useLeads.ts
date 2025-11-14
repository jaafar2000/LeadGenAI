"use client";
import { useState, useCallback, FormEvent, useEffect } from "react";

// --- REMOVED NEXT.JS IMPORTS (useSearchParams, useRouter, usePathname) ---

export type Lead = {
  id: string;
  name: string;
  address: string;
  rating: string;
  reviews: string;
  phone: string;
  website: string;
};

const RESULTS_KEY = "leadgen_results_cache";

const getInitialResults = (): Lead[] => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(RESULTS_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        return Array.isArray(data) ? data : [];
      } catch (e) {
        console.error("Failed to parse cached leads:", e);
      }
    }
  }
  return [];
};

export const useLeads = () => {
  // --- STATE FOR URL & INITIAL QUERY ---
  // We cannot use Next.js hooks, so we set a client-side state for the query
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<Lead[]>([]);
  const [warning, setWarning] = useState("");
  const [loading, setLoading] = useState(false);
  const [pitchLeadId, setPitchLeadId] = useState<string | null>(null);
  const [pitch, setPitch] = useState("");
  const [showModal, setShowModal] = useState(false);

  // --- EFFECT 1: INITIAL URL READ & INITIAL RESULTS ---
  useEffect(() => {
    // Only run this code on the client side (after hydration)
    if (typeof window === "undefined") return;

    // Read initial query from the URL
    const params = new URLSearchParams(window.location.search);
    const initialQuery = params.get("q") || "";

    setSearchQuery(initialQuery);

    // Set initial results based on whether a query exists (to load the cache)
    if (initialQuery) {
        setResults(getInitialResults());
    }
  }, []); // Run once on mount

  // --- EFFECT 2: URL WRITE SYNC ---
  useEffect(() => {
    if (typeof window === "undefined") return;

    const newParams = new URLSearchParams(window.location.search);
    const currentQ = newParams.get("q") || "";

    if (searchQuery === currentQ) return;

    if (searchQuery) {
      newParams.set("q", searchQuery);
    } else {
      newParams.delete("q");
    }

    // Use history.replaceState to change the URL without a full reload
    const newUrl = `${window.location.pathname}?${newParams.toString()}`;
    window.history.replaceState(null, '', newUrl);

  }, [searchQuery]); // Run whenever searchQuery changes

  // --- EFFECT 3: LOCAL STORAGE SYNC ---
  useEffect(() => {
    if (results.length > 0 && searchQuery.length > 0) {
      localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
    } else if (results.length === 0) {
      localStorage.removeItem(RESULTS_KEY);
    }
  }, [results, searchQuery]);

  // --- Lead Search Logic ---
  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!searchQuery || loading) return;

      setLoading(true);
      setResults([]);
      setPitchLeadId(null);
      setWarning("");

      try {
        const res = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: searchQuery }),
        });

        if (!res.ok) throw new Error("Lead API failed");
        const data = await res.json();

        if (data.fromCache) {
          setWarning(
            `Heads up! We hit the API limit or an error occurred. The results below are from a pre-saved local JSON cache, not a live search for "${searchQuery}".`
          );
        } else {
          setWarning("");
        }
        setResults(data.leads || []);
      } catch (error) {
        console.error("Error fetching leads:", error);
        setWarning(
          "A network error prevented the search. Showing cached data as a fallback (if available)."
        );
      } finally {
        setLoading(false);
      }
    },
    [searchQuery, loading]
  );

  // --- Pitch Generation Logic ---
  const generatePitch = useCallback(
    async (lead: Lead) => {
      const leadId = `${lead.address} ${lead.phone}`;

      if (pitchLeadId !== null) return;

      setPitchLeadId(leadId);
      setPitch("");
      setShowModal(false);

      try {
        const res = await fetch("/api/pitch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lead }),
        });

        if (!res.ok) throw new Error("Pitch API failed");

        const data = await res.json();
        setPitch(data.pitch || "Could not generate pitch.");
        setShowModal(true);
      } catch (error) {
        console.error("Error generating pitch:", error);
        setPitch("An error occurred while generating the pitch.");
        setShowModal(true);
      } finally {
        setPitchLeadId(null);
      }
    },
    [pitchLeadId]
  );

  return {
    searchQuery,
    setSearchQuery,
    loading,
    pitchLeadId,
    results,
    pitch,
    showModal,
    setShowModal,
    handleSubmit,
    generatePitch,
    warning,
  };
};
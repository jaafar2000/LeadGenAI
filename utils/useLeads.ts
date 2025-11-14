"use client";
import { useState, useCallback, FormEvent, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [warning, setWarning] = useState("");
  const initialQuery = searchParams.get("q") || "";
  const [results, setResults] = useState<Lead[]>(
    initialQuery ? getInitialResults() : []
  );
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [pitchLeadId, setPitchLeadId] = useState<string | null>(null);
  const [pitch, setPitch] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const currentQ = searchParams.get("q") || "";
    if (searchQuery === currentQ) return;
    const newParams = new URLSearchParams(searchParams.toString());
    if (searchQuery) {
      newParams.set("q", searchQuery);
    } else {
      newParams.delete("q");
    }
    router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
  }, [searchQuery, router, pathname, searchParams]);

  useEffect(() => {
    if (results.length > 0 && searchQuery.length > 0) {
      localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
    } else if (results.length === 0) {
      localStorage.removeItem(RESULTS_KEY);
    }
  }, [results, searchQuery]);

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

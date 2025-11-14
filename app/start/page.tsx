"use client";
import { useLeads } from "@/utils/useLeads";
import { LeadCard } from "@/components/ui/LeadCard";
import { PitchModal } from "@/components/ui/PitchModal";
import { SearchForm } from "@/components/actions/SearchForm";
import { ExportButton } from "@/components/actions/ExportButton";
import { Spinner } from "@/components/ui/Spinner";
import { Brain } from "lucide-react";
export const dynamic = "force-dynamic";

export default function page() {
  const {
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
  } = useLeads();

  const totalResults = results.length;
  const showEmptyState =
    !loading && totalResults === 0 && searchQuery.length > 0;
  const showInitialState =
    !loading && totalResults === 0 && searchQuery.length === 0;

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 md:p-10 flex flex-col items-center mt-10">
      <header className="w-full max-w-3xl mb-10 pt-4">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 flex items-center gap-2">
          LeadGen AI <Brain className="w-8 h-8 text-purple-400" />
        </h1>
        <p className="text-gray-500 mt-1">
          Targeted outreach, built for speed.
        </p>{" "}
      </header>
      <SearchForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSubmit={handleSubmit}
        loading={loading}
      />
      {warning && (
        <div className="w-full max-w-3xl mb-6 p-4 rounded-lg bg-yellow-900 border border-yellow-500/50 text-yellow-100 font-medium text-sm">
          {warning}{" "}
        </div>
      )}
      <ExportButton results={results} />
      <div className="w-full max-w-3xl">
        {loading && <Spinner />}{" "}
        {showInitialState && (
          <div className="text-center p-10 bg-neutral-900 rounded-xl border border-purple-800/50">
            <h3 className="text-xl font-bold text-purple-300">
              Ready to find leads.
            </h3>
            <p className="text-gray-500 mt-2">
              Enter a business type and location above (e.g., 'gyms in London').
            </p>
          </div>
        )}
        {showEmptyState && (
          <div className="text-center p-10 bg-neutral-900 rounded-xl border border-red-800/50">
            <h3 className="text-xl font-bold text-red-400">
              No leads found for "{searchQuery}"
            </h3>
            <p className="text-gray-500 mt-2">
              Try a different search query or location.
            </p>
          </div>
        )}
        <div className="space-y-4">
          {results.map((lead, i) => (
            <LeadCard 
              key={`${lead.address} ${lead.phone}`}
              lead={lead} 
              id={`${lead.address} ${lead.phone}`}
              generatePitch={generatePitch}
              loadingLeadId={pitchLeadId}
            />
          ))}
        </div>
      </div>
      <PitchModal
        pitch={pitch}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
}

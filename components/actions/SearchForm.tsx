// /src/components/actions/SearchForm.tsx
"use client";
import { Search, Loader } from "lucide-react";
import { FormEvent } from "react";

type SearchFormProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSubmit: (e: FormEvent) => void;
  loading: boolean;
};

export const SearchForm = ({ searchQuery, setSearchQuery, handleSubmit, loading }: SearchFormProps) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl flex gap-3 mb-8"
    >
      <div className="relative flex-1">
        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="Search (ex: cafes in Dubai, salons in London)"
          // Focus border unified to purple
          className="w-full p-4 pl-10 rounded-xl border-2 border-neutral-800 bg-neutral-900 text-white outline-none focus:border-purple-500/80 transition shadow-lg"
        />
      </div>
      {/* Main action button is primary purple */}
      <button
        disabled={!searchQuery || loading}
        className="px-6 py-4 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition disabled:opacity-40 flex items-center justify-center"
      >
        {loading ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : (
          'Find Leads'
        )}
      </button>
    </form>
  );
};
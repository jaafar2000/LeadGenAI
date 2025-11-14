"use client";
import { Download } from "lucide-react";
import { Lead } from "@/app/utils/useLeads";

type ExportButtonProps = {
  results: Lead[];
};

export const ExportButton = ({ results }: ExportButtonProps) => {
  const exportCSV = (data: Lead[]) => {
    if (!data || data.length === 0) return;
    
    const headers = ["Name", "Address", "Rating", "Reviews", "Phone", "Website"];
    const escape = (value: string) => {
      if (!value) return '""';
      return `"${String(value || "").replace(/"/g, '""')}"`;
    };

    const rows = data.map((lead) => [
      escape(lead.name),
      escape(lead.address),
      escape(lead.rating),
      escape(lead.reviews),
      escape(lead.phone),
      escape(lead.website),
    ]);

    const csv =
      headers.map(escape).join(",") +
      "\n" +
      rows.map((row) => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "leads.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (results.length === 0) return null;

  return (
    <div className="flex justify-between w-full max-w-3xl mb-6">
      <p className="text-gray-400 text-sm font-medium self-center">
        Found {results.length} leads.
      </p>
      <button
        onClick={() => exportCSV(results)}
        className="bg-green-500 hover:bg-green-600 transition px-4 py-2 rounded-lg text-black font-semibold text-sm flex items-center space-x-2 shadow-md shadow-green-700/50"
      >
        <Download className="w-4 h-4" />
        <span>Export CSV</span>
      </button>
    </div>
  );
};
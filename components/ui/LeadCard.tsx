import { Loader, Phone, MessageSquare } from "lucide-react";
import { Lead } from "@/utils/useLeads";

type LeadCardProps = {
    lead: Lead;
    generatePitch: (lead: Lead) => void;
    loadingLeadId: string | null;
    id: string 
};

export const LeadCard = ({ id, lead, generatePitch, loadingLeadId }: LeadCardProps) => {
    
    const isThisCardLoading = id === loadingLeadId;
    const isDisabled = loadingLeadId !== null;

    return (
        <div className="bg-neutral-800 border border-neutral-700 p-5 rounded-xl shadow-lg transition hover:border-purple-500/50">
            <div className="flex justify-between items-start">
                <h3 className="font-extrabold text-xl text-white leading-tight">{lead.name}</h3>
                {lead.rating && (
                    <div className="flex items-center space-x-1 text-sm text-yellow-400 font-semibold">
                        <span>{lead.rating}</span>
                        <span className="text-xl">★</span>
                    </div>
                )}
            </div>

            <p className="text-gray-400 text-sm">{lead.address}</p>

            <div className="flex items-center space-x-4 text-sm text-gray-400 mt-2">
                {lead.phone && <span className="flex items-center space-x-1"><Phone className="w-3 h-3"/> <span>{lead.phone}</span></span>}
                {lead.reviews && <span className="flex items-center space-x-1"><MessageSquare className="w-3 h-3"/> <span>{lead.reviews} Reviews</span></span>}
            </div>

            <div className="mt-4 flex gap-3 items-center">
                {lead.website && (
                    <a
                        href={lead.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition text-sm font-medium"
                    >
                        Visit Website &rarr;
                    </a>
                )}

                <button
                    onClick={() => generatePitch(lead)}
                    disabled={isDisabled} 
                    className="ml-auto bg-purple-600 hover:bg-purple-700 transition px-4 py-2 rounded-full text-white text-sm font-semibold flex items-center disabled:opacity-50"
                >
                    {isThisCardLoading ? ( 
                        <Loader className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                        'Generate Pitch'
                    )}
                </button>
            </div>
        </div>
    );
};
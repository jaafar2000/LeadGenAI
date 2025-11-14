// /src/components/ui/PitchModal.tsx
"use client";
import { X, Copy, CheckCircle } from "lucide-react";
import { useState } from "react";

type PitchModalProps = {
  pitch: string;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
};

export const PitchModal = ({ pitch, showModal, setShowModal }: PitchModalProps) => {
  const [copied, setCopied] = useState(false);

  if (!showModal) return null;

  const handleCopy = () => {
    if (pitch) {
      navigator.clipboard.writeText(pitch);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Modal Border and Title Color are Purple */}
      <div className="bg-neutral-900 border border-purple-600/50 p-6 rounded-xl w-full max-w-xl relative shadow-2xl">
        
        <h2 className="font-bold text-2xl text-purple-400 mb-4">AI Outreach Message</h2>

        <div className="bg-neutral-800 p-4 rounded-lg max-h-96 overflow-y-auto border border-neutral-700">
            <p className="whitespace-pre-wrap text-gray-300 font-mono text-sm leading-relaxed">{pitch}</p>
        </div>
        

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setShowModal(false)}
            className="flex-1 bg-neutral-700 hover:bg-neutral-600 py-3 rounded-lg text-white font-semibold transition flex items-center justify-center space-x-2"
          >
            <X className="w-5 h-5" />
            <span>Close</span>
          </button>

          <button
            onClick={handleCopy}
            // Copy button uses purple as the main action color, green for success state
            className={`flex-1 py-3 rounded-lg text-white font-semibold transition flex items-center justify-center space-x-2 
              ${copied ? 'bg-green-600' : 'bg-purple-600 hover:bg-purple-700'}`}
          >
            {copied ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                <span>Copy Message</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
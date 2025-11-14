import { Loader } from "lucide-react";

export const Spinner = ({ message = "Crunching leads..." }) => (
  // Loader color unified to purple
  <div className="flex items-center justify-center space-x-2 text-purple-400 p-4">
    <Loader className="w-5 h-5 animate-spin" />
    <p>{message}</p>
  </div>
);
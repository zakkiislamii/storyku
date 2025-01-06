import { Menu } from "lucide-react";

export const ToggleButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="m-5 top-4 left-4 bg-[#ff7300] text-white p-2 rounded-full shadow-md z-50 lg:hidden"
  >
    <Menu size={24} />
  </button>
);

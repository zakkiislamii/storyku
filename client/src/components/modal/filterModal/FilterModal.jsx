import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { X } from "lucide-react";
import { useState } from "react";
import CategoryDropdown from "../../dropDown/CategoryDropdown";
import StatusDropdown from "../../dropDown/StatusDropdown";

export default function FilterModal({ open, onClose }) {
  const [selectedCategory, setSelectedCategory] = useState("Category");
  const [selectedStatus, setSelectedStatus] = useState("Status");

  const handleReset = () => {
    setSelectedCategory("Category");
    setSelectedStatus("Status");
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-10 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center">
        <div className="flex min-h-full w-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in w-full max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 border">
              <div className="flex items-center justify-between w-full">
                <DialogTitle className="text-base font-semibold text-gray-900">
                  Filter
                </DialogTitle>
                <button
                  onClick={() => onClose(false)}
                  className="items-end justify-end text-end"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="gap-2 flex flex-col justify-between w-full">
                <DialogTitle className="text-base font-semibold text-gray-900">
                  Category
                </DialogTitle>
                <CategoryDropdown
                  selected={selectedCategory}
                  setSelected={setSelectedCategory}
                />
              </div>
            </div>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="gap-2 flex flex-col justify-between w-full">
                <DialogTitle className="text-base font-semibold text-gray-900">
                  Status
                </DialogTitle>
                <StatusDropdown
                  selected={selectedStatus}
                  setSelected={setSelectedStatus}
                />
              </div>
            </div>
            <div className="bg-gray-50 gap-2 justify-between px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <div className="sm:block hidden">
                <button
                  type="button"
                  onClick={() => onClose(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => onClose(false)}
                  className="inline-flex w-full justify-center rounded-md bg-[#ff7300] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Filter
                </button>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="mt-3 inline-flex  w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:mt-0 sm:w-auto"
              >
                Reset
              </button>
              <div className="sm:hidden">
                <button
                  type="button"
                  onClick={() => onClose(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => onClose(false)}
                  className="inline-flex mt-3 w-full justify-center rounded-md bg-[#ff7300] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Filter
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

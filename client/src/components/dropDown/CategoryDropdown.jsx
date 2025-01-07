import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { ChevronUp } from "lucide-react";

export default function CategoryDropdown({ selected, setSelected }) {
  const categories = [
    { id: 1, name: "Financial" },
    { id: 2, name: "Technology" },
    { id: 3, name: "Health" },
  ];

  return (
    <Menu as="div" className="relative inline-block text-left w-full z-50">
      {({ open }) => (
        <>
          <Menu.Button className="inline-flex w-full min-w-40 justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            {selected || "Category"}
            <div className="relative w-5 h-5">
              <ChevronDownIcon
                aria-hidden="true"
                className={`size-5 text-gray-500 absolute transition-all duration-200 ${
                  open ? "opacity-0 scale-0" : "opacity-100 scale-100"
                }`}
              />
              <ChevronUp
                aria-hidden="true"
                className={`size-5 text-black absolute transition-all duration-200 ${
                  open ? "opacity-100 scale-100" : "opacity-0 scale-0"
                }`}
              />
            </div>
          </Menu.Button>

          <Menu.Items className="absolute right-0 mt-2 w-full min-w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="py-1">
              {categories.map((category) => (
                <Menu.Item key={category.id}>
                  {({ active }) => (
                    <button
                      onClick={() => setSelected(category.name)}
                      className={`block w-full px-4 py-2 text-left text-sm ${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      } ${selected === category.name ? "bg-gray-50" : ""}`}
                    >
                      {category.name}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </>
      )}
    </Menu>
  );
}

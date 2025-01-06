import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function CategoryDropdown({ selected, setSelected }) {
  const categories = [
    { id: 1, name: "Financial" },
    { id: 2, name: "Technology" },
    { id: 3, name: "Health" },
  ];

  return (
    <Menu as="div" className="relative inline-block text-left w-full">
      <div>
        <Menu.Button className="inline-flex w-full min-w-40 justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {selected}
          <ChevronDownIcon
            aria-hidden="true"
            className="size-5 text-gray-400"
          />
        </Menu.Button>
      </div>

      <Menu.Items className="absolute right-0 z-10 mt-2 w-full min-w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
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
    </Menu>
  );
}

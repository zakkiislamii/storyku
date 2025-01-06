import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function StatusDropdown({ selected, setSelected }) {
  const status = [
    { id: 1, name: "Publish" },
    { id: 2, name: "Draft" },
  ];

  return (
    <Menu as="div" className="relative inline-block text-left w-full">
      <Menu.Items className="absolute bottom-full mb-2 right-0 z-10 w-full min-w-40 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
        <div className="py-1">
          {status.map((status) => (
            <Menu.Item key={status.id}>
              {({ active }) => (
                <button
                  onClick={() => setSelected(status.name)}
                  className={`block w-full px-4 py-2 text-left text-sm ${
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                  } ${selected === status.name ? "bg-gray-50" : ""}`}
                >
                  {status.name}
                </button>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
      <div>
        <Menu.Button className="inline-flex w-full min-w-40 justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {selected}
          <ChevronDownIcon
            aria-hidden="true"
            className="size-5 text-gray-400"
          />
        </Menu.Button>
      </div>
    </Menu>
  );
}

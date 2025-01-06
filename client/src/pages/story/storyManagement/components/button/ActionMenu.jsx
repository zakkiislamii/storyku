import { Menu } from "@headlessui/react";
import { Edit, Trash } from "lucide-react";

const ActionMenu = ({ onEdit, onDelete }) => (
  <Menu as="div" className="relative">
    <Menu.Button className="font-bold text-[#2C2C2C] text-2xl">...</Menu.Button>
    <div className="relative">
      <Menu.Items className="absolute right-0 z-[100] mt-2 w-36 rounded-md bg-white shadow-lg ring-1 ring-black/5">
        <div className="py-1">
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                className={`${
                  active ? "bg-gray-100" : ""
                } flex w-full items-center px-4 py-2 text-sm text-gray-700 gap-2`}
              >
                <Edit size={16} />
                Edit
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className={`${
                  active ? "bg-gray-100" : ""
                } flex w-full items-center px-4 py-2 text-sm text-red-600 gap-2`}
              >
                <Trash size={16} />
                Delete
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </div>
  </Menu>
);

export default ActionMenu;

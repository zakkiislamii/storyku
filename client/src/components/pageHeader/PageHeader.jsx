import { MoveLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const PageHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const getBreadcrumbItems = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    let items = [];
    const baseItem = { label: "Stories Management", path: "/stories" };

    switch (pathSegments[0]) {
      case "stories":
        items.push(baseItem);
        if (pathSegments[1] === "add") {
          items.push({ label: "Add Stories", path: "/stories/add" });
        } else if (pathSegments[1] === "edit") {
          items.push({
            label: "Edit Stories",
            path: location.pathname,
          });
        }
        break;
      case "chapter":
        items.push(baseItem);
        if (pathSegments[1] === "add") {
          items.push(
            { label: "Add Stories", path: "/stories/add" },
            { label: "Add Chapter", path: "/chapter/add" }
          );
        } else if (pathSegments[1] === "edit") {
          items.push({
            label: "Edit Chapter",
            path: location.pathname,
          });
        }
        break;

      default:
        break;
    }
    return items;
  };

  const getPageTitle = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const basePath = pathSegments[0];
    const action = pathSegments[1];

    if (basePath === "stories") {
      if (action === "add") return "Add Stories";
      if (action === "edit") return "Edit Stories";
    }

    if (basePath === "chapter") {
      if (action === "add") return "Add Chapter";
      if (action === "edit") return "Edit Chapter";
    }

    return "";
  };

  return (
    <>
      <div className="text-[#7bd5e6] md:text-md text-sm">
        <div>
          {getBreadcrumbItems().map((item, index, array) => (
            <span key={item.path}>
              <button
                onClick={() => navigate(item.path)}
                className={`hover:text-[#7bc5d2] ${
                  index === array.length - 1
                    ? "cursor-default hover:text-[#7bd5e6]"
                    : ""
                }`}
                disabled={index === array.length - 1}
              >
                {item.label}
              </button>
              {index < array.length - 1 && <span className="mx-1">{">"}</span>}
            </span>
          ))}
        </div>
      </div>
      <div className="p-4 mb-10 h-full">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-[#495057] text-3xl">
            {getPageTitle()}
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="flex w-fit hover:bg-[#cacace] gap-1 rounded-xl border font-bold bg-[#efeff0] items-center px-3 py-2"
          >
            <span>
              <MoveLeft color="#000000" />
            </span>
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default PageHeader;

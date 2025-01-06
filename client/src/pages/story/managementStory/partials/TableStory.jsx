import { getStatusColor } from "../../utils/getStatusColor";

const TableStory = () => {
  const stories = [
    {
      title: "The Future of Digital Banking",
      author: "John Doe",
      category: "Financial",
      tags: ["Banking", "Digital", "Finance"],
      status: "Published",
    },
    {
      title: "Understanding AI Ethics",
      author: "Jane Smith",
      category: "Technology",
      tags: ["AI", "Ethics", "Tech", "gdsjogsio", "rgiuor"],
      status: "Draft",
    },
    {
      title: "Wellness in Remote Work",
      author: "Mike Johnson",
      category: "Health",
      tags: ["Wellness", "Remote Work", "Health"],
      status: "Published",
    },
  ];

  return (
    <div className="rounded-md w-full max-w-screen overflow-x-auto border  ">
      <table className="table-auto divide-y w-full divide-gray-200">
        <thead className="bg-gray-50 text-black font-bold">
          <tr>
            <th className="px-6 py-3 text-left text-black text-xs tracking-wider">
              No
            </th>
            <th className="px-6 py-3 text-left text-xs tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs tracking-wider">
              Author
            </th>
            <th className="px-6 py-3 text-left text-xs tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs tracking-wider">
              Keywords
            </th>
            <th className="px-6 py-3 text-left text-xs tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-center text-xs tracking-wider"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {stories.map((story, index) => (
            <tr key={index} className="hover:bg-gray-50 text-[#696969]">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {story.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {story.author}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className="px-2 py-1 rounded-full text-xs font-semibold">
                  {story.category}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <div className="flex flex-wrap gap-1">
                  {story.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span
                  className={`${getStatusColor(
                    story.status
                  )} px-2 py-2 rounded-full text-xs font-semibold`}
                >
                  {story.status}
                </span>
              </td>
              <td className="text-center px-6 py-3 font-bold text-[#2C2C2C] text-2xl cursor-pointer">
                ...
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableStory;

import { useNavigate } from "react-router-dom";
const ChapterTableDashboardDetail = ({ chapters }) => {
  const navigate = useNavigate();
  if (!chapters || chapters.length === 0) {
    return (
      <div className="text-center p-4 text-gray-500">No chapters available</div>
    );
  }

  const onChapterDetail = (chapter) => {
    navigate(`/dashboard/chapter/detail/${chapter.chapter_id}`, {
      state: {
        title: chapter.title,
        content: chapter.content,
      },
    });
  };

  return (
    <div className="rounded-md w-full min-h-[50vh] max-w-screen overflow-x-auto">
      {/* Add debug count */}
      <div className="text-sm text-gray-500 mb-2">
        Total chapters: {chapters.length}
      </div>

      <table className="table-auto border w-full divide-gray-200">
        <thead className="bg-gray-50 text-black font-bold">
          <tr>
            <th className="px-2 py-3 text-left text-xs tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs tracking-wider">
              Last Update
            </th>
            <th className="px-6 py-3 text-center text-xs tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {chapters.map((chapter) => {
            return (
              <tr
                key={chapter.chapter_id}
                className="hover:bg-gray-50 text-[#696969] border"
              >
                <td className="px-6 py-4 text-sm font-medium">
                  {chapter.title || "Untitled"}
                </td>
                <td className="px-6 py-4 text-sm">
                  {chapter.updatedAt
                    ? new Date(chapter.updatedAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })
                    : "No date"}
                </td>
                <td
                  onClick={() => onChapterDetail(chapter)}
                  className="text-center w-full justify-center items-center flex cursor-pointer hover:text-blue-600"
                >
                  Chapter Detail
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ChapterTableDashboardDetail;

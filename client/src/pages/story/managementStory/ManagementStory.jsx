import ManagementStoryHeader from "./partials/ManagementStoryHeader";
import TableStory from "./partials/TableStory";

const ManagementStory = () => {
  return (
    <div className=" ">
      <h1 className="font-bold p-4 text-3xl mb-10">Stories</h1>
      <div className="shadow-md p-5">
        <ManagementStoryHeader />
        <TableStory />
      </div>
    </div>
  );
};

export default ManagementStory;

export const getStatusColor = (status) => {
  return status === "publish"
    ? "bg-[#e1faed] text-[#5ac892]"
    : "bg-[#fff5e1] text-[#ffc148]";
};

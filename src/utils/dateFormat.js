export const formatDate = (dateToFormat) => {
  const date = new Date(dateToFormat);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${month}/${year}`;
};

export const getKSTDate = (date: Date) => {
  const kstDate = new Date(date);
  kstDate.setHours(kstDate.getHours() + 9);
  return kstDate;
};

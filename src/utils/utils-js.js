export const typeOfImageCheckValidation = (file) => {
  if (typeof file === "object") {
    return "파일";
  }
  return "string";
};

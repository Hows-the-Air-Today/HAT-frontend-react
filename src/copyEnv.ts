// eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

const submodulePath = path.resolve(__dirname, "..", "security-frontend-react");
const envFiles = [
  { submoduleFile: "ENV", targetFile: ".env" },
  {
    submoduleFile: "ENV.development.local",
    targetFile: ".env.development.local",
  },
  {
    submoduleFile: "ENV.production.local",
    targetFile: ".env.production.local",
  },
];

envFiles.forEach(({ submoduleFile, targetFile }) => {
  const src = path.join(submodulePath, submoduleFile);
  const dest = path.join(__dirname, "..", targetFile);

  console.log("src", src);
  console.log("dest", dest);

  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(
      `Copied ${submoduleFile} from submodule to application directory as ${targetFile}`
    );
  } else {
    console.error(
      `The ${submoduleFile} file is not found at the specified submodule path: ${src}`
    );
  }
});

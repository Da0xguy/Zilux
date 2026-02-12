import { generateReactHelpers } from "@uploadthing/react";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers({url: "http://localhost:4000/uploadthing"}); // matches the server route in server/index.js
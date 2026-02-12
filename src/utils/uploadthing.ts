import { generateReactHelpers } from "@uploadthing/react";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers({url: "/api/uploadthing"}); // matches the server route in server/index.js
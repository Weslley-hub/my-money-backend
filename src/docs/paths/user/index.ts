import { findUserByIdPath } from "./find-user-by-id.path";
import { createUserPath } from "./create-user.path";
import { updateUserPath } from "./update-user.path";
import { deleteUserPath } from "./delete-user.path";

export const userPaths = {
  "/users/{userId}": {
    get: findUserByIdPath,
    put: updateUserPath,
    delete: deleteUserPath,
  },
  "/users": {
    post: createUserPath,
  },
};

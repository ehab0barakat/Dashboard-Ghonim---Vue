//BASE
export const BASE_URL = ""; //ONLINE
// export const BASE_URL = ""; //LOCAL
export const PAGINATE_COUNT = 50;

//GROUPS
export const GROUP_ADMINS = "admin/";
export const GROUP_USERS = "users/";

//AUTH
export const LOGIN = BASE_URL + "login";

//USERS
export const LIST_USERS = (group) => BASE_URL + "users";
export const SHOW_USERS = (group, id) => BASE_URL + `users/${id}`;
export const ADD_USERS = (group) => BASE_URL + "users";
export const UPDATE_USERS = (group, id) => BASE_URL + `users/${id}`;
export const DELETE_USERS = (group, id) => BASE_URL + `users/${id}`;

//PERMISSIONS
export const LIST_PERMISSIONS = (group) => BASE_URL + "permissions";

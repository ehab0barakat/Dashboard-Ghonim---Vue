import {
  buildFormData,
  vDeleteRequest,
  vGetRequest,
  vPostFormRequest,
} from "@/config/api/axios-handler";
import {
  LIST_USERS,
  ADD_USERS,
  UPDATE_USERS,
  DELETE_USERS,
  LIST_PERMISSIONS,
} from "@/config/api/constants";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

const currentUser ={
  fName: null,
  lName: null,
  email: null,
  permissions: [],
  type:null,
  photo: null,
} ;

export const useUsersStore = defineStore("users", {
  state: () => ({
    currentUser: currentUser,
    totalCount: 0,
    users: [],
    permissions:[],
  }),
  getters: {},
  actions: {
    async getPermissions() {
      //GET TOKEN
      const authStore = useAuthStore();
      const { token, authGroupName } = authStore;

      const response = await vGetRequest(LIST_PERMISSIONS(authGroupName), token, {});

      const responseData = response.data.data;

      if (response.status != 200) throw new Error();

      this.permissions = responseData;
    },
    async getUserByPage(page) {
      //GET TOKEN
      const authStore = useAuthStore();
      const { token, authGroupName } = authStore;

      const response = await vGetRequest(
        LIST_USERS(authGroupName),
        token,
        {},
        {
          page: page,
        }
      );

      const responseData = response.data.data;

      if (response.status != 200) throw new Error();

      this.totalCount = responseData.total;
      this.users = responseData.data;
    },
    async sendAddUsers(payload) {
      //GET TOKEN
      const authStore = useAuthStore();
      const { token, authGroupName } = authStore;

      //BUILD FORM DATA
      const formData = buildFormData(payload);
      const response = await vPostFormRequest(
        ADD_USERS(authGroupName),
        token,
        formData
      );

      if (response.status != 200) throw new Error();

      const responseData = response.data.data;

      this.users.unshift({
        id: responseData.id,
        fName: responseData.fName,
        lName: responseData.lName,
        email: responseData.email,
        type: responseData.type,
        permissions: responseData.permissions,
        created_at: responseData.created_at,
        photo: responseData.photo,
      });

      this.currentUser = currentUser;
    },
    async sendUpdateUser(payload) {
      //GET TOKEN
      const authStore = useAuthStore();
      const { token, authGroupName } = authStore;

      //BUILD FORM DATA
      const formData = buildFormData(payload);

      const response = await vPostFormRequest(
        UPDATE_USERS(authGroupName, this.currentUser.id),
        token,
        formData
      );

      if (response.status !== 200) throw new Error();
      const responseData = response.data.data;

      if (this.users[this.currentUser.index]) {
        this.users[this.currentUser.index].fName = responseData.fName;
        this.users[this.currentUser.index].lName = responseData.lName;
        this.users[this.currentUser.index].email = responseData.email;
        this.users[this.currentUser.index].type = responseData.type;
        this.users[this.currentUser.index].permissions =
          responseData.permissions;
        this.users[this.currentUser.index].photo = responseData.photo;
      }

      this.currentUser = currentUser;
    },
    async sendDeleteUser(id, index) {
      //GET TOKEN
      const authStore = useAuthStore();
      const { token, authGroupName } = authStore;
      const response = await vDeleteRequest(
        DELETE_USERS(authGroupName, id),
        token
      );

      if (response.status != 200) throw new Error();

      if (this.users[index] && this.users[index].id == id)
        this.users.splice(index, 1);
    },
  },
});

import { vPostRequest } from "@/config/api/axios-handler";
import { GROUP_ADMINS, GROUP_USERS, LOGIN } from "@/config/api/constants";
import { defineStore } from "pinia";

//REF FOR AUTO LOGOUT TIMER
let timer = null;

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,
    expiresInSeconds: null,
    name: null,
    type: null,
    photoUrl: null,
    permissions: [],

    didAutoLogout: false,
  }),
  getters: {
    isAuthenticated: (state) => state.token != null,
    authGroupName: (state) => (state.type == 0 ? GROUP_ADMINS : GROUP_USERS),
  },
  actions: {
    async sendLogin(rememberMe, payload) {
      const response = await vPostRequest(LOGIN, null, payload);

      if (response.status != 200) throw new Error();

      const responseData = response.data.data;

      this.token = responseData.token;
      this.expiresInSeconds = responseData.expiration;
      this.name = responseData.name;
      this.type = responseData.type;
      this.photoUrl = responseData.photoUrl;
      if (this.type === "1")
        this.permissions = JSON.stringify({ ...responseData.permissions });

      //TODO PERMISSIONS

      const expiresInMillis = +this.expiresInSeconds * 1000;
      const expirationDate = new Date().getTime() + expiresInMillis;

      localStorage.clear();
      sessionStorage.clear();

      if (rememberMe) {
        localStorage.setItem("token", this.token);
        localStorage.setItem("tokenExpiration", expirationDate);
        localStorage.setItem("name", this.name);
        localStorage.setItem("type", this.type);
        localStorage.setItem("photoUrl", this.photoUrl);
        if (this.type === "1") {
          localStorage.setItem("permissions", this.permissions);
        }
      } else {
        sessionStorage.setItem("token", this.token);
        sessionStorage.setItem("tokenExpiration", expirationDate);
        sessionStorage.setItem("name", this.name);
        sessionStorage.setItem("type", this.type);
        sessionStorage.setItem("photoUrl", this.photoUrl);
        if (this.type === "1") {
          sessionStorage.setItem("permissions", this.permissions);
        }
      }

      timer = setTimeout(() => {
        this.autoLogout();
      }, expiresInMillis);
    },
    tryLogin() {
      this.token =
        sessionStorage.getItem("token") ?? localStorage.getItem("token");

      this.name =
        sessionStorage.getItem("name") ?? localStorage.getItem("name");

      this.type =
        sessionStorage.getItem("type") ?? localStorage.getItem("type");

      this.photoUrl =
        sessionStorage.getItem("photoUrl") ?? localStorage.getItem("photoUrl");

      if (this.type === "1") {
        this.permissions =
          sessionStorage.getItem("permissions") ??
          localStorage.getItem("permissions");
      }

      if (!this.token || !this.name || !this.type) return;

      const tokenExpiration =
        sessionStorage.getItem("tokenExpiration") ??
        localStorage.getItem("tokenExpiration");

      const expiresInMillis = +tokenExpiration - new Date().getTime();

      if (expiresInMillis < 0) {
        return;
      }

      timer = setTimeout(() => {
        this.autoLogout();
      }, expiresInMillis);
    },
    logout() {
      //SESSION
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("tokenExpiration");
      sessionStorage.removeItem("name");
      sessionStorage.removeItem("type");
      sessionStorage.removeItem("photoUrl");
      if (this.type === "1") {
        sessionStorage.removeItem("permissions");
      }
      //STORAGE
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
      localStorage.removeItem("name");
      localStorage.removeItem("type");
      localStorage.removeItem("photoUrl");
      if (this.type === "1") {
        localStorage.removeItem("permissions");
      }
      clearTimeout(timer);

      this.token = null;
      this.expiresInSeconds = null;
      this.name = null;
      this.type = null;
      this.photoUrl = null;
      this.permissions = [];
      //TODO PERMISSIONS
      this.didAutoLogout = false;
    },
    autoLogout() {
      this.logout();
      this.didAutoLogout = true;
    },
  },
});

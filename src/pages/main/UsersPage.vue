<template>

  <base-table-layout :is-loading="isLoading">

    <template #card>

      <v-card height="5%" width="100%" rounded="xl">
        <template v-slot:title>
          <div class="flex items-center justify-between">
          <span>
            {{ t("usersPage.title") }}
          </span>

            <add-users></add-users>
          </div>

          <v-progress-linear
            v-show="isLoading"
            indeterminate
            color="primary">
          </v-progress-linear>
        </template>
      </v-card>

    </template>

    <template #headers>

      <t-header>#</t-header>
      <t-header>{{ t("fields.photo") }}</t-header>
      <t-header>{{ t("fields.firstName") }}</t-header>
      <t-header>{{ t("fields.lastName") }}</t-header>
      <t-header>{{ t("fields.email") }}</t-header>
      <t-header v-if="false">{{ t("fields.role") }}</t-header>
      <t-header>{{ t("fields.permissions") }}</t-header>
      <t-header>{{ t("fields.createdAt") }}</t-header>
      <t-header>{{ t("fields.actions") }}</t-header>

    </template>

    <template #body>
      <tr
        v-for="(item, index) in users"
        :key="item.id"
        class="delay-300">
        <td>{{ index + 1 + (page - 1) * paginateCount }}</td>

        <td>
          <v-avatar
            class="border border-black"
            rounded="0"
            color="primary"
            :image="item.photo ? item.photo : null"
            icon="mdi-store"
            size="96"
          >
          </v-avatar>
        </td>

        <td>{{ item.fName }}</td>

        <td>{{ item.lName }}</td>

        <td>{{ item.email }}</td>

        <td v-if="false">
          <v-chip
            v-if="item.type === 'admin'"
            density="compact"
            class="ma-2"
            color="red"
            text-color="white"
          >
            {{ t("fields.admin") }}
          </v-chip>

          <v-chip
            v-if="item.type === 'user'"
            class="ma-2 p-1"
            color="green"
            text-color="white"
          >
            {{ t("fields.user") }}
          </v-chip>
        </td>

        <td>
          <v-row>
            <v-col cols="auto" v-for="p in item.permissions" :key="p.id">
              <v-chip>{{ p.name }}</v-chip>
            </v-col>
          </v-row>
        </td>

        <td>{{ dateFormat(item["created_at"]) }}</td>

        <td>
          <v-btn

            @click="editItem(item.id, index)"
            variant="text"
            color="primary"
            icon="mdi-pencil"
          ></v-btn>
          <v-btn

            @click="deleteItem(item.id, index)"
            variant="text"
            color="red"
            icon="mdi-delete"
          ></v-btn>
        </td>
      </tr>
    </template>

    <template #pagination>
      <v-pagination
        :disabled="isLoading"
        v-model="page"
        active-color="primary"
        color="dark"
        :length="pagesLength">
      </v-pagination>
    </template>

    <template #extra>
      <edit-users v-model="showEdit"></edit-users>
    </template>

  </base-table-layout>

</template>

<script>
import AddUsers from "@/components/dialogs/users/AddUsers.vue";
import EditUsers from "@/components/dialogs/users/EditUsers.vue";
import {useLocale} from "vuetify";
import {storeToRefs} from "pinia";
import {useUsersStore} from "@/store/users";
import {useAuthStore} from "@/store/auth";
import {formatDate} from "@/config/util";
import {PAGINATE_COUNT} from "@/config/api/constants";
import BaseTableLayout from "@/layouts/BaseTableLayout.vue";

export default {
  name: "super-categories-page",

  setup() {
    const {t} = useLocale();
    const usersStore = useUsersStore();
    const {totalCount, currentUser, users} = storeToRefs(usersStore);
    const {getUserByPage, sendDeleteUser, getPermissions} = usersStore;

    const authStore = useAuthStore();
    const {permissions, type} = storeToRefs(authStore);

    return {
      permissions,
      type,
      t,
      users,
      totalCount,
      currentUser,
      getUserByPage,
      sendDeleteUser,
      getPermissions,
      dateFormat: formatDate,
    };
  },

  components: {
    BaseTableLayout,
    AddUsers,
    EditUsers,
  },

  inject: ["showSnackbar", "showConfirmDialog", "hideConfirmDialog"],

  provide() {
    return {
      parentLoading: this.isLoading,
    };
  },

  async beforeMount() {
    await this.initData(true);
  },

  watch: {
    page() {
      this.isLoading = true;
      setTimeout(async () => {
        try {
          await this.getUserByPage(this.page);
          this.isLoading = false;
        } catch (e) {
          this.showSnackbar(true, this.t("messages.unexpectedError"));
        }
      }, 1000);
    },
  },

  data() {
    return {
      page: 1,
      pagesLength: null,
      paginateCount: PAGINATE_COUNT,
      isLoading: true,
      showEdit: false,
    };
  },

  methods: {
    async initData(permissions = false) {
      try {
        await this.getUserByPage(this.page);
        this.isLoading = false;
        this.pagesLength = Math.ceil(this.totalCount / this.paginateCount);
        if (permissions) await this.getPermissions();
      } catch (e) {
        this.showSnackbar(true, this.t("messages.unexpectedError"));
      }
    },

    async deleteItem(id, index) {
      this.showConfirmDialog(async () => {
        try {
          await this.sendDeleteUser(id, index);
          this.showSnackbar(false, this.t("messages.deleteSuccess"));
        } catch (e) {
          this.showSnackbar(true, this.t("messages.unexpectedError"));
        }

        this.hideConfirmDialog();
      });
    },
    async editItem(id, index) {
      if (this.users[index] && this.users[index].id == id) {
        this.currentUser = this.users[index];
        this.currentUser.index = index;
        this.showEdit = true;
      }
    },

  },
};
</script>

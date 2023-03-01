<template>
  <base-edit-dialog
    showActivator
    v-model:show="show"
    v-model:loading="isLoading"
    @onSave="onSave"
    :title="t('superCategoriesPage.edit')"
  >
    <v-row>
      <!-- photo -->
      <v-col cols="2">
        <v-avatar
          class="border border-black"
          rounded="0"
          color="primary"
          :image="url ? url : null"
          icon="mdi-store"
          size="80"
        >
        </v-avatar>
      </v-col>
      <v-col cols="10">
        <v-file-input
          show-size
          counter
          :error-messages="photoErrors"
          :disabled="isLoading"
          v-model="photo"
          id="photo"
          persistent-hint
          color="primary"
          :label="t('fields.photo')"
          :placeholder="t('placeholders.selectPhoto')"
          :hint="t('placeholders.photoMaxSize')"
        >
        </v-file-input>
      </v-col>

      <!-- firstName -->
      <v-col cols="12">
        <v-text-field
          :disabled="isLoading"
          v-model="firstName"
          id="firstName"
          color="primary"
          :label="t('fields.firstName')"
          :placeholder="t('placeholders.enterFirstName')"
          required
          :error-messages="firstNameErrors"
          @input="v$.firstName.$touch()"
          @blur="v$.firstName.$touch()"
        ></v-text-field>
      </v-col>

      <!-- lastName -->
      <v-col cols="12">
        <v-text-field
          :disabled="isLoading"
          v-model="lastName"
          id="lastName"
          color="primary"
          :label="t('fields.lastName')"
          :placeholder="t('placeholders.enterLastName')"
          required
          :error-messages="lastNameErrors"
          @input="v$.lastName.$touch()"
          @blur="v$.lastName.$touch()"
        ></v-text-field>
      </v-col>

      <!-- email -->
      <v-col cols="12">
        <v-text-field
          :disabled="isLoading"
          v-model="email"
          autocomplete="email"
          id="email"
          color="primary"
          :label="t('fields.email')"
          :placeholder="t('placeholders.enterEmail')"
          required
          :error-messages="emailErrors"
          @input="v$.email.$touch()"
          @blur="v$.email.$touch()"
        ></v-text-field>
      </v-col>
      <!-- password -->
      <v-col cols="12">
        <v-text-field
          :disabled="isLoading"
          v-model="password"
          autocomplete="new-password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          @click:append="show1 = !show1"
          id="password"
          color="primary"
          :label="t('fields.password')"
          :placeholder="t('placeholders.enterPassword')"
          required
          :error-messages="passwordErrors"
          @input="v$.password.$touch()"
          @blur="v$.password.$touch()"
        ></v-text-field>
      </v-col>
      <!-- confirm password -->
      <v-col cols="12">
        <v-text-field
          :disabled="isLoading"
          v-model="confirmPassword"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show2 ? 'text' : 'password'"
          @click:append="show2 = !show2"
          id="confirmPassword"
          color="primary"
          :label="t('fields.confirmPassword')"
          :placeholder="t('placeholders.EnterConfirmPassword')"
          required
          :error-messages="confirmPasswordErrors"
          @input="v$.confirmPassword.$touch()"
          @blur="v$.confirmPassword.$touch()"
        ></v-text-field>
      </v-col>

      <!-- permissions -->
      <v-col cols="12">
        <v-combobox
          :menu-props="{ maxHeight: 450 }"
          v-model="PermissionsId"
          :items="permissions"
          item-title="name"
          item-value="id"
          :label="t('fields.permissions')"
          multiple
        >
          <template v-slot:selection="data">
            <v-chip
              :key="JSON.stringify(data.item)"
              v-bind="data.attrs"
              :model-value="data.selected"
              :disabled="data.disabled"
              size="small"
              @click:close="data.parent.selectItem(data.item)"
            >
              <template v-slot:prepend>
                <v-avatar class="bg-accent text-uppercase" start>{{
                  data.item.title.slice(0, 1)
                }}</v-avatar>
              </template>
              {{ data.item.title }}
            </v-chip>
          </template>
        </v-combobox>
      </v-col>
    </v-row>
  </base-edit-dialog>
</template>

<script>
import { useLocale } from "vuetify";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  numeric,
  minLength,
  maxLength,
  minValue,
  sameAs,
  email,
} from "@/config/validation/validators";
import {
  validateErrorsIfExists,
  validatePhoto,
} from "@/config/validation/util";
import { useUsersStore } from "@/store/users";
import { storeToRefs } from "pinia";
import { errorMessage } from "@/config/util";

export default {
  setup() {
    const { t } = useLocale();

    const usersStore = useUsersStore();
    const { permissions, currentUser } = storeToRefs(usersStore);
    const { sendUpdateUser } = usersStore;

    return {
      t,
      permissions,
      currentUser,
      sendUpdateUser,
      v$: useVuelidate(),
      errorMessage,
    };
  },
  name: "edit-users",
  inject: ["showSnackbar"],
  props: ["modelValue"],
  emits: ["update:modelValue"],
  data() {
    return {
      isLoading: false,
      show1: false,
      show2: false,
      photo: [],
      url: this.currentUser.photo,
      firstName: this.currentUser.fName,
      lastName: this.currentUser.lName,
      email: this.currentUser.email,
      password: null,
      confirmPassword: null,
      PermissionsId: this.currentUser.permissions,
    };
  },
  watch: {
    photo() {
      if (this.photo[0]) {
        this.url = URL.createObjectURL(this.photo[0]);
      } else {
        this.url = this.currentUser.photo;
      }
    },
  },
  computed: {
    show: {
      get() {
        this.url = this.currentUser.photo;
        this.firstName = this.currentUser.fName;
        this.lastName = this.currentUser.lName;
        this.email = this.currentUser.email;
        this.PermissionsId = this.currentUser.permissions;
        return this.modelValue;
      },
      set(newValue) {
        this.$emit("update:modelValue", newValue);
      },
    },
    photoErrors() {
      return validatePhoto(this.photo);
    },
    firstNameErrors() {
      return validateErrorsIfExists(this.v$.firstName);
    },
    lastNameErrors() {
      return validateErrorsIfExists(this.v$.lastName);
    },
    emailErrors() {
      return validateErrorsIfExists(this.v$.email);
    },
    passwordErrors() {
      return validateErrorsIfExists(this.v$.password);
    },
    confirmPasswordErrors() {
      return validateErrorsIfExists(this.v$.confirmPassword);
    },
  },
  validations() {
    return {
      firstName: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(24),
      },
      lastName: { required, minLength: minLength(3), maxLength: maxLength(24) },
      email: {
        required,
        email,
        minLength: minLength(3),
        maxLength: maxLength(32),
      },
      password: {
        minLength: minLength(8),
        maxLength: maxLength(24),
      },
      confirmPassword: {
        sameAsPassword: sameAs(this.password),
      },
    };
  },
  methods: {
    async onSave() {
      this.v$.$touch();

      //TEXT INPUTS
      if (this.v$.$errors.length > 0) return;

      //PHOTO
      if (validatePhoto(this.photo).length > 0) return;

      this.isLoading = true;

      try {
        const payload = {};

        if (this.photo.length > 0) payload.photo = this.photo[0];

        if (this.firstName != this.currentUser.fName) payload.fname = this.firstName;

        if (this.lastName != this.currentUser.lName) payload.lname = this.lastName;

        if (this.email != this.currentUser.email)
          payload.email = this.email;

        if (this.password)
          payload.password = this.password;

        if (this.confirmPassword )
          payload.confirm_password = this.confirmPassword;

        for (let permission in this.PermissionsId) {
          payload["permission[" + permission + "]"] =
            this.PermissionsId[permission].id;
        }

        if (Object.keys(payload).length == 0) return (this.show = false);

        await this.sendUpdateUser(payload);

        this.showSnackbar(false, this.t("messages.updateSuccess"));

        this.isLoading = false;
        this.show = false;
        this.show1 = false;
        this.show2 = false;
        this.photo = [];
        this.PermissionsId = [];
        this.firstName = null;
        this.lastName = null;
        this.email = null;
        this.password = null;
        this.confirmPassword = null;
        this.url = null;
      } catch (e) {
        this.showSnackbar(
          true,
          this.errorMessage(e)
            ? this.errorMessage(e)
            : this.t("messages.unexpectedError")
        );
        this.show = false;
        this.isLoading = false;
      }
    },
  },
};
</script>

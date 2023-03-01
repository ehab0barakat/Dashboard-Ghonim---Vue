<template>
  <v-container>
    <v-card class="h-[8vh]" width="100%" rounded="xl">
      <template v-slot:title>
        <div class="flex items-center justify-between">
          <v-row class="flex-child justify-space-around">
            <v-col class="d-flex it pt-5" cols="3">
              <span>
                {{ t("homePage.title") }}
              </span>
            </v-col>
            <v-col class="d-flex" cols="2">
              <v-text-field
                type="date"
                :disabled="isLoading"
                id="endsAt"
                color="primary"
                :label="t('fields.from')"
                :placeholder="t('placeholders.enterEndsAt')"
              ></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="2">
              <v-text-field
                type="date"
                :disabled="isLoading"
                id="endsAt"
                color="primary"
                :label="t('fields.to')"
                :placeholder="t('placeholders.enterEndsAt')"
              ></v-text-field>
            </v-col>
          </v-row>
        </div>

        <v-progress-linear
          v-show="isLoading"
          indeterminate
          color="primary"
          class=""
        >
        </v-progress-linear>
      </template>
    </v-card>

    <div class="mt-10 xl:px-28 pt-5">
      <v-row class="pb-15 items-center">
        <v-col cols="3">
          <v-card
            color="primary"
            width="100%"
            max-width="270"
            height="100"
            border="10"
            rounded="lg"
            prepend-icon="mdi-clipboard-clock-outline"
          >
            <template v-slot:title> This is a title </template>
            <v-card-text> This is content </v-card-text>
          </v-card>
        </v-col>
        <v-col
          ><div
            class="xl:gap-3 lg:gap-2 md:gap-1 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2"
          >
            <v-card
              max-width="190"

              height="60"
              border="10"
              rounded="lg"
              v-for="i in 20"
              :key="i"
            >
              <v-card-text> This is content </v-card-text>
            </v-card>
          </div></v-col
        >
      </v-row>
      <v-row class="pb-15 items-center">
        <v-col cols="3">
          <v-card
            color="primary"
            width="100%"
            max-width="270"
            height="100"
            border="10"
            rounded="lg"
            prepend-icon="mdi-clipboard-clock-outline"
          >
            <template v-slot:title> This is a title </template>
            <v-card-text> This is content </v-card-text>
          </v-card>
        </v-col>
        <v-col
          ><div
            class="xl:gap-3 lg:gap-2 md:gap-1 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2"
          >
            <v-card
              max-width="190"

              height="60"
              border="10"
              rounded="lg"
              v-for="i in 20"
              :key="i"
            >
              <v-card-text> This is content </v-card-text>
            </v-card>
          </div></v-col
        >
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { useLocale } from "vuetify";
export default {
  name: "home-page",
  setup() {
    const { t } = useLocale();

    return {
      t,
    };
  },
  data(){
    return{
      isLoading:false,
    };
  }
};
</script>

<style></style>

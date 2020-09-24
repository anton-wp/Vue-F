<template>
  <div>
    <div class="page-title">
      <h3>{{ "ProfileTitle" | localize }}</h3>
    </div>

    <form class="form" @submit.prevent="submithHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{
            invalid:
              ($v.name.$dirty && !$v.name.required) ||
              ($v.name.$dirty && !$v.name.email)
          }"
        />
        <label for="description">{{ "Name" | localize }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.email"
          >{{ "Message_EnterName" | localize }}</small
        >
      </div>
      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocate" />
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{"Update" | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  data: () => ({
    name: "",
    isRuLocate: true
  }),
  validations: {
    name: { required }
  },
  mounted() {
    this.name = this.info.name;
    this.isRuLocate = this.info.locate === "ru-RU";
    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },
  methods: {
    ...mapActions(["updateInfo"]),
    async submithHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        await this.updateInfo({
          name: this.name,
          locate: this.isRuLocate ? "ru-RU" : "en-US"
        });
      } catch (e) {}
    }
  },
  computed: {
    ...mapGetters(["info"])
  }
};
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>

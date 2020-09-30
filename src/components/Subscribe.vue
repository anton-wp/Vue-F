<template>
  <div>
    <div v-if="uid !== name">
      <button
        v-if="info.following && info.following.includes(name)"
        class="btn blue waves-effect"
        @click="unsubscribe(name)"
      >
        {{ "Unsubscribe" | localize }}
      </button>
      <button v-else class="btn red waves-effect" @click="subscribe(name)">
        {{ "Subscribe" | localize }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    name: String
  },
  computed: {
    ...mapGetters(["info", "uid"])
  },
  methods: {
    async subscribe(id) {
      let Ndate;
      const following = this.info.following
        ? [...this.info.following, id]
        : [id];
      const userInfo = await this.$store.dispatch("getUserInfo", id);
      if (!userInfo.followers || !userInfo.followers.includes(this.uid)) {
        Ndate = userInfo.followers
          ? userInfo.followers.push(this.uid)
          : { followers: [this.uid] };
      } else {
        Ndate = userInfo.followers;
      }
      const NDate = {
        ...userInfo,
        ...Ndate
      };

      await this.$store.dispatch("updateInfoUser", { id, NDate });
      await this.$store.dispatch("updateInfo", { following });
    },
    async unsubscribe(id) {
      let Ndate;
      const following = this.info.following.filter(f => f !== id);
      const userInfo = await this.$store.dispatch("getUserInfo", id);
      if (userInfo.followers && userInfo.followers.includes(this.uid)) {
        Ndate = userInfo.followers.filter(f => f !== this.uid);
      } else {
        Ndate = userInfo.followers;
      }
      const NDate = {
        ...userInfo,
        ...{ followers: Ndate }
      };
      await this.$store.dispatch("updateInfoUser", { id, NDate });
      await this.$store.dispatch("updateInfo", { following });
    }
  },
  async mounted() {
    if (!this.uid) {
      await this.$store.dispatch("getUid");
    }
  }
};
</script>

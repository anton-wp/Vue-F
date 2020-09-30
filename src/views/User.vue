<template>
  <div>
    <Loader v-if="loading" />
    <div v-else>
      <h1>{{ data.name }}</h1>
      <subscribe :name="$route.params.id" />
      <h3>{{ "Following" | localize }}</h3>
      <follow-block v-if="following" :data="following" />
      <div v-else>{{ "No_Subscribers" | localize }}</div>
      <h3>{{ "Followers" | localize }}</h3>
      <follow-block v-if="followers" :data="followers" />
      <div v-else>{{ "No_Subscriptions" | localize }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Subscribe from "@/components/Subscribe";
import FollowBlock from "@/components/Follow/FollowBlock";

export default {
  components: {
    Subscribe,
    FollowBlock
  },
  data: () => ({
    data: {},
    loading: true,
    following: null,
    followers: null
  }),
  computed: {
    ...mapGetters(["info"])
  },
  watch: {
    $route: function() {
      this.loading = true;
      this.updatePage();
    }
  },
  methods: {
    async updatePage() {
      this.data = await this.$store.dispatch(
        "getUserById",
        this.$route.params.id
      );
      if (this.data.following) {
        this.following = await this.$store.dispatch(
          "getUsersFollow",
          this.data.following
        );
      }
      if (this.data.followers) {
        this.followers = await this.$store.dispatch(
          "getUsersFollow",
          this.data.followers
        );
      }
      this.loading = false;
    }
  },
  mounted() {
    this.updatePage();
  }
};
</script>

<style lang="scss">
.avatar-text {
  display: flex !important;
  justify-content: center;
  align-items: center;
}
</style>

<template>
  <ul class="collection">
    <li class="collection-item avatar" v-for="(f, index) in data" :key="index">
      <router-link
        :to="`/user/${f.id}`"
        tag="div"
        class="circle avatar-text cursor"
        :class="colorsAvatar[Math.floor(Math.random() * colorsAvatar.length)]"
      >
        <p>{{ f.name[0] }}</p>
      </router-link>
      <span class="title">Title</span>
      <p>
        {{ f.name }}
      </p>
      <subscribe class="secondary-content" :name="f.id" />
    </li>
  </ul>
</template>

<script>
import Subscribe from "@/components/Subscribe";
export default {
  components: {
    Subscribe
  },
  props: {
    data: Array
  },
  data: () => ({
    colorsAvatar: ["red", "blue", "green", "grey"]
  })
};
</script>

<style lang="scss">
.cursor {
  cursor: pointer;
}
</style>

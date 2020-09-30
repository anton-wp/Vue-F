<template>
  <div>
    <h1>{{ "Menu_Users" | localize }}</h1>
    <table>
      <thead>
        <tr>
          <th>{{ "Name" | localize }}</th>
          <th>{{ "Locate" | localize }}</th>
          <th>{{ "Menu_Bill" | localize }}</th>
          <th>{{ "Country" | localize }}</th>
          <th>{{ "Open" | localize }}</th>
          <th>{{ "Subscribe" | localize }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, name) in users" :key="user.info.id">
          <td>{{ user.info.name }}</td>
          <td>{{ user.info.locate }}</td>
          <td>{{ user.info.bill }}</td>
          <td>{{ user.info.country || "-" }}</td>
          <td>
            <button
              class="btn-small btn"
              @click="$router.push('/user/' + name)"
            >
              <i class="material-icons">open_in_new</i>
            </button>
          </td>
          <td>
            <subscribe :name="name" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import Subscribe from "@/components/Subscribe";
export default {
  components: {
    Subscribe
  },
  data: () => ({
    users: []
  }),
  async mounted() {
    this.users = await this.$store.dispatch("getUsers");
  }
};
</script>

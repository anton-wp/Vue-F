import firebase, { database } from "firebase/app";

export default {
  actions: {
    async getUsers({ commit }) {
      try {
        const users =
          (
            await firebase
              .database()
              .ref(`/users`)
              .once("value")
          ).val() || {};
        return users;
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async getUserById({ commit }, id) {
      try {
        const user =
          (
            await firebase
              .database()
              .ref(`/users/${id}/info`)
              .once("value")
          ).val() || {};
        return user;
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async getUsersFollow({ commit }, ids) {
      try {
        let data = [];
        await firebase
          .database()
          .ref("users")
          .once("value", snapshot => {
            snapshot.forEach(childSnapshot => {
              if (ids.includes(childSnapshot.key)) {
                let obj = childSnapshot.val().info;
                obj["id"] = childSnapshot.key;
                data.push(obj);
              }
            });
          });
        return data;
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    }
  }
};

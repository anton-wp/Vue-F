import firebase from 'firebase/app'

export default {
  actions: {
    async fetchCategories({
      commit,
      dispatch
    }) {
      try {
        const uid = await dispatch('getUid')
        const category = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}

        return Object.keys(category).map(key => ({
          ...category[key],
          id: key
        }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateCategory({
      commit,
      dispatch
    }, {
      title,
      limit,
      id
    }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({title, limit})
        
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createCategory({
      commit,
      dispatch
    }, {
      title,
      limit
    }) {
      try {
        const uid = await dispatch('getUid')
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({
          title,
          limit
        })
        return {
          title,
          limit,
          id: category.key
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}

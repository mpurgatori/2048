((() => {

  var Vuex = window.Vuex

  const Store = new Vuex.Store({
    state: {
      seeding: false,
    },

    mutations: {
      setSeeding(state, status) {
        state.seeding = status
      },
    },

    actions: {
      setSeeding(context, status) {
        context.commit("setSeeding", status)
      },

    },
  })
  window.store = Store
}))()
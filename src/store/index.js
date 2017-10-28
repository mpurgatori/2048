((() => {

  var Vuex = window.Vuex

  const Store = new Vuex.Store({
    state: {
      // TODO 1: add score key value pairing to state object
      // read: https://vuex.vuejs.org/en/state.html
      score: 0,
    },

    mutations: {
      updateScore(state, score) {
        state.score += score
      },
      // TODO 1: implement resetScore mutation
      // read: https://vuex.vuejs.org/en/mutations.html
      resetScore(state) {
        state.score = 0
      }
    },

    actions: {
      updateScore(context, score) {
        context.commit("updateScore", score)
      },
      // TODO 1: implement resetScore action
      // read: https://vuex.vuejs.org/en/actions.html
      resetScore(context) {
        context.commit("resetScore")
      }
    },
  })
  window.store = Store
}))()
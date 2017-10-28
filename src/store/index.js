((() => {

  var Vuex = window.Vuex

  const Store = new Vuex.Store({
    state: {
      score: 0,
    },

    mutations: {
      updateScore(state, score) {
        state.score += score
      },
      resetScore(state) {
        state.score = 0
      }
    },

    actions: {
      updateScore(context, score) {
        context.commit("updateScore", score)
      },
      resetScore(context) {
        context.commit("resetScore")
      }
    },
  })
  window.store = Store
}))()
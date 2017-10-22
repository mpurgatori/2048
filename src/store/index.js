((() => {

  var Vuex = window.Vuex

  const Store = new Vuex.Store({
    state: {
      boardChanged: false,
      animating: false,
      animatingEls: [],
    },

    mutations: {
      addAnimatingEl(state) {
        state.animatingEls.push({})
      },
      removeAnimatingEl(state) {
        state.animatingEls.pop()
      },
      toggleAnimation(state, isAnimating) {
        state.animating = isAnimating
      },
      toggleBoardChanged(state, boardStatus) {
        state.boardChanged = boardStatus
      },
    },

    actions: {
      addAnimatingEl(context) {
        context.commit("addAnimatingEl")
      },
      removeAnimatingEl(context) {
        context.commit("removeAnimatingEl")
      },
      toggleAnimation(context, isAnimating) {
        context.commit("toggleAnimation", isAnimating)
      },
      toggleBoardChanged(context, boardStatus) {
        context.commit("toggleBoardChanged", boardStatus)
      },
    },
  })
  window.store = Store
}))()
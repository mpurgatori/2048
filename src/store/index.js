((() => {

  var Vuex = window.Vuex

  const Store = new Vuex.Store({
    state: {
      boardChanged: false,
      animating: false,
      animationDirection: '',
      animatingEls: [],
    },

    mutations: {
      addAnimatingEl(state) {
        state.animatingEls.push({})
      },
      removeAnimatingEl(state) {
        state.animatingEls.pop()
      },
      setAnimationDirection(state, direction) {
        state.animationDirection = direction
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
      setAnimationDirection(context, direction) {
        context.commit("setAnimationDirection", direction)
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
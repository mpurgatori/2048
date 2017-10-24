((() => {

  var Vuex = window.Vuex

  const Store = new Vuex.Store({
    state: {
      boardChanged: false,
      animating: false,
      animationDirection: '',
      animatingEls: [],
      seedCoords:[],
      seedValue: 2,
    },

    mutations: {
      addSeedCoord(state, coord) {
        state.seedCoords.push(coord)
      },
      removeSeedCoord(state, coord) {
        let index = _.findIndex(state.seedCoords, function(c) { return _.isEqual(c, coord) })
        state.seedCoords.splice(index, 1)
      },
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
      addSeedCoord(context, coord) {
        context.commit("addSeedCoord", coord)
      },
      removeSeedCoord(context, coord) {
        context.commit("removeSeedCoord", coord)
      },
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
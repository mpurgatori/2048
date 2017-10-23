((() => {
  const html = `
    <div class="game">
      <div v-for="(row, y) in board" class="row">
        <tile v-for="(tile, x) in row" :tile="tile" :coords="{x: x, y: y}"></tile>
      </div>
    </div>
  `

  Vue.component("game", {
    template: html,
    mixins: [window.app.mixins.control],
    data () {
      return {
        board: [
          [{value:2, isSeed: false, animation: {}},{value:0, isSeed: false, animation: {}},{value:0, isSeed: false, animation: {}},{value:0, isSeed: false, animation: {}}],
          [{value:2, isSeed: false, animation: {}},{value:0, isSeed: false, animation: {}},{value:0, isSeed: false, animation: {}},{value:0, isSeed: false, animation: {}}],
          [{value:0, isSeed: false, animation: {}},{value:0, isSeed: false, animation: {}},{value:0, isSeed: false, animation: {}},{value:0, isSeed: false, animation: {}}],
          [{value:0, isSeed: false, animation: {}},{value:0, isSeed: false, animation: {}},{value:0, isSeed: false, animation: {}},{value:0, isSeed: false, animation: {}}],
        ],
      }
    },

    mounted() {
      this.setupBoard()
    },

    watch: {
      animatingEls(els) {
        if (els.length === 0 && this.animating && this.boardChanged) {
          this.seedTwo()
          this.$store.dispatch("toggleAnimation", false)
          this.$store.dispatch("toggleBoardChanged", false)
        }
      }
    },

    computed: {
      animatingEls() {
        return this.$store.state.animatingEls
      },

      animating() {
        return this.$store.state.animating
      },

      boardChanged() {
        return this.$store.state.boardChanged
      }
    },

    methods: {
      setupBoard() {
        // this.seedTwo()
        // this.seedTwo()
        this.registerControl()
      },

      seedTwo() {
        const self = this

        let getRandomItem = function() {
          let row = self.board[Math.floor(Math.random()*self.board.length)]
          return row[Math.floor(Math.random()*row.length)]
        }

        let randomItem = getRandomItem()

        while (randomItem.value != 0) {
          randomItem = getRandomItem()
        }

        randomItem.value = 2
        randomItem.isSeed = true
      }
    }
  })
}))()

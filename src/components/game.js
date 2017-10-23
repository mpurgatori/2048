((() => {
  const html = `
    <div class="game">
      <div v-for="(row, y) in board" :key="y" class="row">
        <tile v-for="(tile, x) in row" :key="x" :tile="tile" :coords="{x: x, y: y}" @reset-seed-value="resetSeedValue"></tile>
      </div>
    </div>
  `

  Vue.component("game", {
    template: html,
    mixins: [window.app.mixins.control],
    data () {
      return {
        board: [
          [{value:0, seedValue: 0, animation: {}},{value:0, seedValue: 0, animation: {}},{value:0, seedValue: 0, animation: {}},{value:0, seedValue: 0, animation: {}}],
          [{value:0, seedValue: 0, animation: {}},{value:0, seedValue: 0, animation: {}},{value:0, seedValue: 0, animation: {}},{value:0, seedValue: 0, animation: {}}],
          [{value:0, seedValue: 0, animation: {}},{value:0, seedValue: 0, animation: {}},{value:0, seedValue: 0, animation: {}},{value:0, seedValue: 0, animation: {}}],
          [{value:0, seedValue: 0, animation: {}},{value:0, seedValue: 0, animation: {}},{value:0, seedValue: 0, animation: {}},{value:0, seedValue: 0, animation: {}}],
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
        this.seedTwo()
        this.seedTwo()
        this.registerControl()
      },

      seedTwo() {
        let getRandomItem = () => {
          let randomRowIndex = Math.floor(Math.random() * this.board.length)
          let row = this.board[randomRowIndex]
          let randomColumnIndex = Math.floor(Math.random()*row.length)
          let item = row[Math.floor(Math.random()*row.length)]
          return item
        }

        let randomItem = getRandomItem()

        while (randomItem.value != 0) {
          randomItem = getRandomItem()
        }
        
        randomItem.value = 2
        randomItem.seedValue = 2
      },

      resetSeedValue(tileCoords) {
        this.board[tileCoords.x][tileCoords.y].seedValue = 0
      }
    }
  })
}))()

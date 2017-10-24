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
          [{value:2, seedValue: 0, animation: {}},{value:2, seedValue: 0, animation: {}},{value:0, seedValue: 0, animation: {}},{value:0, seedValue: 0, animation: {}}],
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
          console.log("seed two")
          // this.seedTwo()

          console.log("seed two complete")

          this.$store.dispatch("toggleAnimation", false)
          this.$store.dispatch("toggleBoardChanged", false)

          this.seedTwo()
        }
      },
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
        let getRandomCoords = () => {
          let randomRowIndex = Math.floor(Math.random() * this.board.length)
          let row = this.board[randomRowIndex]
          let randomColumnIndex = Math.floor(Math.random()*row.length)
          // let item = row[Math.floor(Math.random()*row.length)]


          let coords = {x: randomColumnIndex, y: randomRowIndex}

          console.log("row: "+ randomRowIndex)
          console.log("column: " + randomColumnIndex)
          // return item
          return coords
        }

        let randomCoords = getRandomCoords()

        while (this.board[randomCoords.y][randomCoords.x].value != 0) {
          randomCoords = getRandomCoords()
        }
        

        // randomItem.value = 2
        // randomItem.seedValue = 2

        this.$store.dispatch("addSeedCoord", randomCoords)
      },

      resetSeedValue(tileCoords) {
        this.board[tileCoords.x][tileCoords.y].seedValue = 0
      }
    }
  })
}))()

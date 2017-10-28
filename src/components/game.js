((() => {
  const html = `
    <div class="game">
      <div class="game-container">
        <div class="board shadow-board">
          <div v-for="n in board.length" :key="n" class="tile shadow-tile"></div>
        </div>
      </div>
    </div>
  `

  Vue.component("game", {
    template: html,
    data () {
      return {
        board: [],
      }
    },

    mounted() {
      this.setupBoard()
    },

    methods: {

      setupBoard() {
        //TODO: set the board
      },

      seedTwo() {
        let getRandomItem = () => {
          let randomIndex = Math.floor(Math.random() * this.board.length)

          return this.board[randomIndex]
        }

        let randomItem = getRandomItem()

        while (randomItem.value != 0) {
          randomItem = getRandomItem()
        }

        //TODO: set value of the randomItem to 2
      },

      newGame() {
        this.resetBoard()
      },

      resetBoard() {
        this.board = Array.apply(null, { length: 16 })
          .map(function (_, index) { 
            return {
              id: index,
              value: 0
            }
          })
      },

      resetScore() {
        this.$store.dispatch("resetScore")
      }
    }
  })
}))()

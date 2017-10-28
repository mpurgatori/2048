((() => {

  // TODO 2: register event handle
  const html = `
    <div class="game">
      <!-- TODO 2: register event handler for new-game() event -->
      <!-- read: https://vuejs.org/v2/guide/components.html#Using-v-on-with-Custom-Events -->
      <game-menu v-on:new-game="setupBoard()"></game-menu>
      <div class="game-container">
        <div class="board">
          <tile v-for="tile in board" :tile="tile" :key="tile.id"></tile>
        </div>
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
        this.newGame()
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

        randomItem.value = 2

      },

      newGame() {
        this.resetBoard()
        this.seedTwo()
        this.seedTwo()
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
    }
  })
}))()

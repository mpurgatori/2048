((() => {
  const html = `
    <div class="game">
      <game-menu @new-game="newGame()" :gameOver="gameOver"></game-menu>
      <div class="game-container">
        <transition-group name="tile" tag="div" class="board">
          <tile v-for="tile in board" :tile="tile" :key="tile.id"></tile>
        </transition-group>
        <div class="board shadow-board">
          <div v-for="n in board.length" :key="n" class="tile shadow-tile"></div>
        </div>
      </div>
    </div>
  `

  Vue.component("game", {
    template: html,
    mixins: [window.app.mixins.control],
    data () {
      return {
        board: [],
        gameOver: false,
      }
    },

    watch: {
      allTilesFull(boardFull, _) {
        if (boardFull) {
          this.checkGameState()
        }
      },
    },

    mounted() {
      this.setupBoard()
    },

    computed: {
      allTilesFull() {
        return !this.board.filter(tile => tile.value === 0).length > 0
      },
    },

    methods: {

      checkGameState() {
        this.moveUp("gamestate")
        this.moveDown("gamestate")
        this.moveLeft("gamestate")
        this.moveRight("gamestate")
        if (!this.mergeGameStateList.length > 0 || !this.slideGameStateList.length > 0) {
          this.gameOver = true
        }
        this.mergeGameStateList = []
        this.slideGameStateList = []
      },

      setupBoard() {
        this.newGame()
        this.registerControl()
      },

      seedTwo() {
        if (this.allTilesFull) { return }

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
        this.resetScore()
        this.seedTwo()
        this.seedTwo()
        this.gameOver = false
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
        // TODO 1: add dispatch call to store to resetScore
        // read: https://vuex.vuejs.org/en/actions.html
      }
    }
  })
}))()

((() => {
  const html = `
    <div class="game">
      <game-menu @new-game="newGame()"></game-menu>
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
        mergeAnimationsList: [],
        slideAnimationsList: []
      }
    },

    mounted() {
      this.setupBoard()
    },

    methods: {

      setupBoard() {
        this.newGame()
        this.registerControl()
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
      }
    }
  })
}))()

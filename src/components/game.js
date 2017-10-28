((() => {
  const html = `
    <div class="game">
      <div class="game-container">
        <!-- TODO 5 add board with v-for binding -->
        <!-- read: https://vuejs.org/v2/guide/list.html#Mapping-an-Array-to-Elements-with-v-for -->
        <div class="board">
          <tile v-for="tile in board" :tile="tile" :key="tile.id"></tile>
        </div>
        <!-- EXTRA add shadow board for UX-->
        <div class="board shadow-board">
          <div v-for="n in board.length" :key="n" class="tile shadow-tile"></div>
        </div>
      </div>
    </div>
  `

  Vue.component("game", {
    template: html,
    data () {
      // TODO 1: 
      // https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function
      return {
        board: [],
      }
    },

    mounted() {
      // TODO 3: call the method to setup board
      // read: https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram
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

        // TODO 2: set value of the randomItem to 2
        // read: https://vuejs.org/v2/guide/events.html#Methods-in-Inline-Handlers
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

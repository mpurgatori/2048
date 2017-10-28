((() => {
  const html = `
    <div class="game">
      <div class="game-container">
        <!-- TODO 5 add board with v-for binding -->
        <!-- read: https://vuejs.org/v2/guide/list.html#Mapping-an-Array-to-Elements-with-v-for -->

        <!-- EXTRA add shadow board for UX-->
        <div class='board'>
          <tile v-for="item in board" :tileData="item" :key="item.id"></tile>
        </div>
      </div>
    </div>
  `

  Vue.component("game", {
    template: html,
    data () {
      return {
        board: []
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

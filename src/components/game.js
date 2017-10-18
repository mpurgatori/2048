((() => {
  const html = `
    <div class="game">
      <div v-for="row in board" class="row">
        <tile v-for="tile in row" :tile="tile"></tile>
      </div>
    </div>
  `

  Vue.component("game", {
    template: html,
    mixins: [window.app.mixins.control],
    data () {
      return {
        board: [
          [{value:0},{value:0},{value:0},{value:0}],
          [{value:0},{value:0},{value:0},{value:0}],
          [{value:0},{value:0},{value:0},{value:0}],
          [{value:0},{value:0},{value:0},{value:0}],
        ],
        boardChanged: false
      }
    },

    mounted() {
      const self = this
      self.seedTwo()
      self.seedTwo()
      self.registerControl()
    },

    computed: {
      stringifyBoard(row) {
        const self = this
        return self.board.map(row => {
          return row.map(item => {
            return item.value
          })
        })
      },
    },

    methods: {
      seedTwo() {
        const self = this

        let getRandomItem = function() {
          let row = self.board[Math.floor(Math.random()*self.board.length)]
          return row[Math.floor(Math.random()*row.length)]
        }

        let initialRandomItem = getRandomItem()

        while (initialRandomItem.value != 0) {
          initialRandomItem = getRandomItem()
        }

        initialRandomItem.value = 2
      }
    }


  })
}))()

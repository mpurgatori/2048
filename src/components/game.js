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
          [{value:2, oldValue: 2, animations: {merge: [], slide: []}},{value:2, oldValue: 2, animations: {merge: [], slide: []}},{value:2, oldValue: 2, animations: {merge: [], slide: []}},{value:2, oldValue: 2, animations: {merge: [], slide: []}}],
          [{value:0, oldValue: 0, animations: {merge: [], slide: []}},{value:0, oldValue: 0, animations: {merge: [], slide: []}},{value:0, oldValue: 0, animations: {merge: [], slide: []}},{value:0, oldValue: 0, animations: {merge: [], slide: []}}],
          [{value:0, oldValue: 0, animations: {merge: [], slide: []}},{value:0, oldValue: 0, animations: {merge: [], slide: []}},{value:0, oldValue: 0, animations: {merge: [], slide: []}},{value:0, oldValue: 0, animations: {merge: [], slide: []}}],
          [{value:0, oldValue: 0, animations: {merge: [], slide: []}},{value:0, oldValue: 0, animations: {merge: [], slide: []}},{value:0, oldValue: 0, animations: {merge: [], slide: []}},{value:0, oldValue: 0, animations: {merge: [], slide: []}}],
        ],
        boardChanged: false
      }
    },

    mounted() {
      const self = this
      // self.seedTwo()
      // self.seedTwo()
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

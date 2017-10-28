((() => {
  const html = `
    <div class="game-menu">
      <div class="row">
        <div class="title">2048</div>
        <div class="scores space-right">
          <div class="score">
            <div class="score-title">SCORE</div>
            <div class="score-value">0000</div>
          </div>
          <div class="score">
            <div class="score-title">BEST</div>
            <div class="score-value">0000</div>
          </div>
        </div>
      </div>

      <!-- TODO 1: register click event to call newGame() -->
      <!-- read: https://vuejs.org/v2/guide/events.html#Methods-in-Inline-Handlers -->
      <a class="button space-right" @click.prevent="newGame()">New Game</a>
    </div>
  `

  Vue.component("game-menu", {
    template: html,

    methods: {
      newGame() {
        this.$emit("new-game")
        // TODO 2: emit custom event
        // https://vuejs.org/v2/guide/components.html#Using-v-on-with-Custom-Event
      }
    }
  })
}))()

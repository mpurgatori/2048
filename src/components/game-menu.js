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
      <a class="button space-right" @click="newGame()">New Game</a>
    </div>
  `

  Vue.component("game-menu", {
    template: html,

    methods: {
      newGame() {
        this.$emit("new-game")
      }
    }
  })
}))()

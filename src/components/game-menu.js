((() => {
  const html = `
    <div class="game-menu">
      <div class="row">
        <div class="title">2048</div>
        <div class="scores space-right">
          <div class="score">
            <div class="score-title">SCORE</div>
            <div class="score-value">{{ animatedScore }}</div>
            <transition-group name="points" tag="div" class="points">
              <div v-for="(pointIncrease, index) in pointsIncrease" :key="index">+ {{ pointIncrease }}</div>
            </transition-group>
          </div>
          <div class="score">
            <div class="score-title">BEST</div>
            <div class="score-value">0000</div>
          </div>
        </div>
      </div>
      <a class="button space-right" @click="newGame()">New Game</a>
      <!-- TODO 4: Add game over modal and transition -->
      <!-- read: https://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components -->
      <!-- read: https://vuejs.org/v2/guide/conditional.html#v-if -->
      <!-- Use this markup for the game over modal
      <!-- ------------------------------------------------------------------------
            <div class="modal">
              <h1>Game Over!</h1>
              <a class="button button-black" @click="newGame()">Try again</a>
            </div>
       ------------------------------------------------------------------------- -->
      <!-- implement the css for this at the bottom of the 'styles.css'
           you will see a comment there -->
      <!-- YOUR MARKUP HERE -->
    </div>
  `

  Vue.component("game-menu", {
    template: html,

    props: {
      gameOver: {
        type: Boolean,
        required: true,
      }
    },

    data() {
      return {
        animatedScore: 0,
        pointsIncrease: [],
      }
    },

    watch: {
      // EXTRA: here is the implementation for the animated score
      // read: https://vuejs.org/v2/guide/transitioning-state.html#Animating-State-with-Watchers
      score(newValue, oldValue) {
        const self = this

        if (newValue > 0) {
          // must clone deep because when mutating (NOT replacing) an Array, 
          // the old value will be the same as new value because they reference the same Array
          let oldPoints = _.cloneDeep(self.pointsIncrease)
          oldPoints.push(newValue - oldValue)
          self.pointsIncrease = oldPoints
        }

        function animate () {
          if (TWEEN.update()) {
            requestAnimationFrame(animate)
          }
        }
        new TWEEN.Tween({ tweeningNumber: oldValue })
          .easing(TWEEN.Easing.Quadratic.Out)
          .to({ tweeningNumber: newValue }, 500)
          .onUpdate(function () {
            self.animatedScore = this.tweeningNumber.toFixed(0)
          })
          .start()
        animate()
      },

      pointsIncrease(newPoints, oldPoints) {
        if (newPoints.length > oldPoints.length) {
          setTimeout(() => {
            this.pointsIncrease.pop()
          }, 200)
        }
      }
    },

    computed: {
      score() {
        return this.$store.state.score
      }
    },

    methods: {
      newGame() {
        this.$emit("new-game")
      }
    }
  })
}))()

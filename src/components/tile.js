((() => {
  const html = `
    <div class="tile">
      <div class="card" v-bind:class="{'card-empty': emptyCard}">
        {{ displayingValue }}
      </div>
    </div>
  `

  Vue.component("tile", {
    template: html,
    props: {
      tile: {
        type: Object,
        required: true
      },
      coords: {
        type: Object,
        required: true,
      }
    },

    data() {
      return {
        value: 0,
        transitionDelay: 500,
      }
    },

    // --------------------------------
    // BUSSTER --- FOR TESTING PURPOSES
    mounted() {
      this.value = this.tile.value
    },
    // --------------------------------

    watch: {
      // value(newVal, oldVal) {
      //   if (newVal > oldVal && newVal !== 0 && oldVal !== 0) {
      //     const card = this.$el.children[0]
      //     $(card).velocity({scale: 1.1, opacity: 1}, {duration: this.transitionDelay / 2, complete: () => {
      //       $(card).velocity({scale: 1}, {duration: this.transitionDelay / 2})
      //     }})
      //   }
      // },

      seedValue(s) {
        if (s) {
          new Promise((resolve) => {
            this.animateScaleIn(this.propValue, resolve)
          }).then(() => {
            this.tile.isSeed = false
          })
        }
      },

      animating(a) {
        if (a) {
          this.animateEl()
        }
      }
    },

    methods: {

      animateScaleIn(newValue, resolve) {
        const card = this.$el.children[0]
        card.style.opacity = 0

        this.value = newValue

        $(card).velocity({scale: 1.1, opacity: 1}, {duration: this.transitionDelay / 2, complete: () => {
          $(card).velocity({scale: 1}, {duration: this.transitionDelay / 2, complete: () => {
            resolve()
          }})
        }})
      },

      animateHorizontal(card, animation, direction) {
        if (!_.isEmpty(animation)) {
          this.$store.dispatch("addAnimatingEl")
          card.style.position = "absolute"
          let dist = this.endOfRowCheck(direction) ? 0 : (animation.x - this.coords.x) * 132
          $(card).velocity({marginLeft: dist}, {duration: this.transitionDelay, complete: () => {
            this.value = animation.value
            card.removeAttribute("style")
            // this.clearAnimations()
            // this.$store.dispatch("removeAnimatingEl")
          }})
        }
      },

      animateEl() {

        const card = this.$el.children[0]
        const animation = this.tile.animation
        const direction = this.animationDirection

        if (direction === "left" || direction === "right") {
          this.animateHorizontal(card, animation, direction)
        }

      },

      clearAnimationStyle(card) {
        card.removeAttribute("style")
      },

      clearAnimations() {
        this.tile.animation = {}
      },

      endOfRowCheck(direction) {
        let xPos = this.coords.x
        if (direction === "left") {
          return xPos === 0
        } else if (direction === "right") {
          return xPos === 3
        }
      }
    },

    computed: {
      displayingValue() {
        if (this.value > 0) {
          return this.value
        }

        return null
      },

      emptyCard() {
        return this.displayingValue === null
      },

      seedValue() {
        return this.tile.isSeed
      },

      propValue() {
        return this.tile.value
      },

      animating() {
        return this.$store.state.animating
      },

      animationDirection() {
        return this.$store.state.animationDirection
      },

    }
  })
}))()

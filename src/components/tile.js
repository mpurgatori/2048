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
        transitionDelay: 100,
      }
    },

    mounted() {
      this.value = this.tile.value
    },

    watch: {
      // try event bus
      // try passing coords to seed two
      // seed two puts seed coords in the store, and tile watches for that to determine if it needs to seed itself
      seedValue(val) {
        if (val > 0) {
          console.log("seed value has changed: " + val)
          const card = this.$el.children[0]
          this.value = val
          card.style.opacity = 0
          $(card).velocity({scale: 1.1, opacity: 1}, {duration: this.transitionDelay / 2, complete: () => {
            $(card).velocity({scale: 1}, {duration: this.transitionDelay / 2, complete: () => {
              this.$emit("reset-seed-value", this.coords)
            }})
          }})
        }
      },

      seedCoords(newCoords) {
        if (newCoords.filter((coord) => {return _.isEqual(this.coords, coord)}).length > 0) {
          // TODO: SEED VALUE

          // const card = this.$el.children[0]
          // this.value = val
          // card.style.opacity = 0
          // $(card).velocity({scale: 1.1, opacity: 1}, {duration: this.transitionDelay / 2, complete: () => {
          //   $(card).velocity({scale: 1}, {duration: this.transitionDelay / 2, complete: () => {
          //     this.$emit("reset-seed-value", this.coords)
          //   }})
          // }})
        }
      },

      animating(a) {
        if (a) {
          this.animateEl()
        }
      }
    },

    methods: {

      animateScale(card, opacity) {
        card.style.opacity = opacity
        return new Promise((resolve) => {
          $(card).velocity({scale: 1.1, opacity: 1}, {duration: this.transitionDelay / 2, complete: () => {
            $(card).velocity({scale: 1}, {duration: this.transitionDelay / 2, complete: () => {
              resolve()
            }})
          }})
        })
      },

      animateHorizontal(card, animation, direction) {
        let dist = this.endOfRowCheck(direction) || animation.m ? 0 : (animation.x - this.coords.x) * 132
        $(card).velocity({marginLeft: dist}, {duration: this.transitionDelay, complete: () => {
          this.animateState(card, animation)
        }})
      },

      animateVertical(card, animation, direction) {
        let dist = this.endOfColumnCheck(direction) || animation.m ? 0 : (animation.y - this.coords.y) * 132
        $(card).velocity({marginTop: dist}, {duration: this.transitionDelay, complete: () => {
          this.animateState(card, animation)
        }})
      },

      animateState(card, animation) {
        this.value = animation.value
        card.removeAttribute("style")
        if (animation.m) {
          $(card).velocity({scale: 1.1, opacity: 1}, {duration: this.transitionDelay / 2, complete: () => {
            $(card).velocity({scale: 1}, {duration: this.transitionDelay / 2, complete: () => {
              this.clearAnimation()
            }})
          }})
        } else {
          this.clearAnimation()
        }
      },

      animateEl() {

        const card = this.$el.children[0]
        const animation = this.tile.animation
        const direction = this.animationDirection

        if (!_.isEmpty(animation)) {
          this.$store.dispatch("addAnimatingEl")

          card.style.position = "absolute"

          if (direction === "left" || direction === "right") {
            this.animateHorizontal(card, animation, direction)
          } else if (direction === "up" || direction === "down") {
            this.animateVertical(card, animation, direction)
          }
        }

      },

      clearAnimationStyle(card) {
        card.removeAttribute("style")
      },

      clearAnimation() {
        this.$store.dispatch("removeAnimatingEl")
        this.tile.animation = {}
      },

      endOfRowCheck(direction) {
        let xPos = this.coords.x
        if (direction === "left") {
          return xPos === 0
        } else if (direction === "right") {
          return xPos === 3
        }
      },

      endOfColumnCheck(direction) {
        let yPos = this.coords.y
        if (direction === "up") {
          return yPos === 0
        } else if (direction === "down") {
          return yPos === 3
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
        console.log("seed value from tile")
        return this.tile.seedValue
      },

      seedCoords() {
        return this.$store.state.seedCoords
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

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
        transitionType: 'exist-transition',
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

      animateMerge(card, resolve) {
// debugger
        if (this.tile.animations.merge.some((animation) => {return animation.m})) {
debugger
          $(card).velocity({scale: 1.1}, {duration: this.transitionDelay, complete: () => {
            $(card).velocity({scale: 1}, {duration: this.transitionDelay, complete: () => {
              resolve()
            }})
          }})
        } else {
          resolve()
        }
      },

      animateSlideHorizontal(card, animations, type, resolve) {
        if (animations[type].length === 0) {
          resolve()
        } else {
          animations[type].forEach((animation) => {
            if (!animation.m) {
              card.style.position = "absolute"
              let dist = (animation.x - this.coords.x) * 132
              $(card).velocity({marginLeft: dist}, {duration: this.transitionDelay, complete: () => {
                this.value = animation.value
                this.clearAnimationStyle(card)
                resolve()
              }})
            } else {
              setTimeout(() => {
                this.value = animation.value
                resolve()
              }, this.transitionDelay)
            }
          })
        }
      },

      animateEl() {
        this.$store.dispatch("addAnimatingEl")

        const card = this.$el.children[0]
        const animations = this.tile.animations

        new Promise((resolve) => {
          this.animateSlideHorizontal(card, animations, "merge", resolve)
        }).then(() => {
          this.clearAnimationStyle(card)
          new Promise((resolve) => {
            this.animateSlideHorizontal(card, animations, "slide", resolve)
          }).then(() => {
            

            this.clearAnimationStyle(card)
            this.clearAnimations()

            this.vale = this.tile.value
            this.$store.dispatch("removeAnimatingEl")
          })
        })
      },

      clearAnimationStyle(card) {
        card.removeAttribute("style")
      },

      clearAnimations() {
        this.tile.animations = {merge: [], slide: []}
      },
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

    }
  })
}))()

((() => {
  const html = `
    <div class="tile">
      <div class="card">
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
        value: 0
      }
    },

    mounted() {
      this.value = this.tile.oldValue
    },

    created() {
      this.$bus.$on('animate', () => {
        this.animateEl()
      })
    },

    methods: {

      animateMerge(card, animations, resolve) {
        animations.merge.forEach((animation) => {
          let time = Math.abs((this.coords.x - animation.x) * 500)
          let delay = time * 0.6
          let animationTime = time - delay
          if (!animation.m) {
            card.style.position = "absolute"
            let dist = (animation.x - this.coords.x) * 180
            card.style.marginLeft = `${dist}px`
            setTimeout(() => {
              this.value = animation.value
              card.removeAttribute("style")
              resolve()
            }, 100)
          } else {
            setTimeout(() => {
              this.value = animation.value
              resolve()
            }, 100)
          }
          this.tile.animations.merge = []
        })
      },

      animateSlide(card, animations, resolve) {
        animations.slide.forEach((animation) => {
          let time = Math.abs((this.coords.x - animation.x) * 500)
          let delay = time * 0.6
          let animationTime = time - delay
          if (!animation.m) {
            card.style.position = "absolute"
            let dist = (animation.x - this.coords.x) * 180
            card.style.marginLeft = `${dist}px`
            setTimeout(() => {
              this.value = animation.value
              card.removeAttribute("style")
              resolve()
            }, 100)
          } else {
            setTimeout(() => {
              this.value = animation.value
              resolve()
            }, 100)
          }
        })
      },

      // SLIDE RIGHT ONLY
      animateEl() {
        const card = this.$el.children[0]
        const animations = this.tile.animations

        new Promise((resolve) => {
          this.animateMerge(card, animations, resolve)
        }).then(() => {
          new Promise((resolve) => {
            this.animateSlide(card, animations, resolve)
          }).then(() => {
            this.clearAnimations()
          })
        })
      },

      clearAnimations() {
        this.tile.animations = {merge: [], slide: []}
      }
    },

    computed: {
      displayingValue() {
        if (this.value > 0) {
          return this.value
        }

        return null
      },

      oldValue() {
        return this.tile.oldValue
      },

      currentValue() {
        return this.tile.value
      }

    }
  })
}))()

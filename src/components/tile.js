((() => {
  const html = `
    <div class="tile" v-bind:class="{'tile-empty': emptyTile}">
      {{ displayingValue }}
    </div>
  `

  Vue.component("tile", {
    template: html,
    props: {
      tile: {
        type: Object,
        required: true
      },
    },

    watch: {
      value(newVal, oldVal) {
        if (newVal > oldVal && this.$store.state.seeding) {
          this.$el.style.opacity = 0
          $(this.$el).velocity({scale: 1.1, opacity: 1}, {duration: 50, complete: () => {
            $(this.$el).velocity({scale: 1}, {duration: 50, complete: () => {
              this.$store.dispatch("setSeeding", false)
            }})
          }})
        } else if (oldVal !== 0 && newVal > oldVal) {
          setTimeout(() => {
            $(this.$el).velocity({scale: 1.1}, {duration: 50, complete: () => {
              $(this.$el).velocity({scale: 1}, {duration: 50})
            }})
          }, 50)
        }
      }

    },

    computed: {
      value() {
        return this.tile.value
      },

      displayingValue() {
        if (this.value > 0) {
          return this.value
        }

        return null
      },

      emptyTile() {
        return this.displayingValue === null
      },

    }
  })
}))()

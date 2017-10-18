((() => {
  const html = `
    <div class="tile">
      {{ displayingValue }}
    </div>
  `

  Vue.component("tile", {
    template: html,
    props: {
      tile: {
        type: Object,
        required: true
      }
    },

    computed: {
      displayingValue() {
        if (this.tile.value > 0) {
          return this.tile.value
        }

        return null
      }
    }
  })
}))()

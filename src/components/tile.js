((() => {
  const html = `
    <div class="tile" v-bind:style="{backgroundColor: backgroundColor}" v-bind:class="{'tile-empty': emptyTile}">
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

    data() {
      return {
        colors: [
          "",
          "#90CCC8",
          "#90C2CE",
          "#8FB2D1",
          "#8FA1D3",
          "#8F8ED6",
          "#A28DD8",
          "#B78CDB",
          "#CE8CDD",
          "#E08BD9",
          "#E28AC3",
          "#E589AC",
          "#E78792",
          "#EA9686",
          "#ECB185",
          "#EFCE84",
          "#F1ED82",
        ]
      }
    },

    watch: {
      value(newVal, oldVal) {
        if (newVal > oldVal) {
          setTimeout(() => {
            Velocity(this.$el, {scale: 1.2}, {duration: 50, complete: () => {
              Velocity(this.$el, {scale: 1}, {duration: 50})
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

      backgroundColor() {
        return this.colors[this.value.toString(2).length - 1]
      }

    }
  })
}))()

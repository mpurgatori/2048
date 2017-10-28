((() => {
  const html = `
    <div class="tile">
      {{ tile.value }}
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
  })
}))()

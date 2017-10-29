((() => {
  const html = `
    <div class="tile">
      <!-- TODO 4: add tile.value in the template -->
      <!-- read: https://vuejs.org/v2/guide/syntax.html#Text -->
      {{tileData.value}}
    </div>
  `

  Vue.component("tile", {
    template: html,
    props: {
      tileData: {
        type: Object,
        required: true
      }
    },
  
  // TODO 4: create a new Vue component
  //  - name the component "tile", with template html
  //  - padd the prop tile into the compoent
  //  - add tile.value in the template
  // read: https://v1.vuejs.org/guide/components.html
})
}))()

//changes
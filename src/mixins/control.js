((() => {
  window.app.mixins.control = {
    methods: {
      moveRight() {
        const self = this
        let board = self.board
        for (var a = 0; a < board.length; a++) {
          let i = self.board.length - 2
          let j = self.board.length - 1

          // updated all the possible merge values
          // think of i, j  pointers in the board
          // if they become separate, the pointers will try to catch up
          while (i >= 0) {
            if (board[a][i].value === 0 && board[a][j].value === 0) { // if both elements are zero
              j --
              i --
            } else if (board[a][i].value === board[a][j].value) { // if two elements have same value
              board[a][i].animation = {x: j, y: a, value: 0}
              board[a][j].animation = {m: true, x: i, y: a, value: board[a][i].value + board[a][j].value}

              board[a][j].value = board[a][i].value + board[a][j].value
              board[a][i].value = 0
              self.boardDidChange()
              j--
              i--
            } else if (board[a][j].value === 0) { // if the right most has 0
              j--
              i--
            } else if (board[a][i].value != 0 && board[a][j].value != 0 && (i + 1 == j)) { // if both are non zero and next to each other
              j--
              i--
            } else if (board[a][i].value != 0 && board[a][j].value != 0) { // if both are non zero and not next to each other
              j--
            } else if (board[a][i].value === 0) { // if the left most element is zero
              i--
            }
          }

          let k = self.board.length - 2
          let l = self.board.length - 1
          while (k >= 0) {
            if (board[a][l].value !== 0) { // if right most element is 0
              l --
              k --
            } else if (board[a][l].value !== 0 && board[a][k].value !== 0) { // if right most and left most elements are not 0
              l --
              k --
            } else if (board[a][l].value === 0 && board[a][k].value === 0) { // if right most and left most elements are 0
              k --
            } else if (board[a][l].value === 0 && board[a][k].value !== 0) { // if right most element is 0 and left most element is not 0
              
              if (!_.isEmpty(board[a][k].animation)) {
                let animation = board[a][k].animation
                board[animation.y][animation.x].animation = {x: l, y: a, value: 0}
                board[a][k].animation = {x: l, y: a, value: 0}
                if (!_.isEmpty(board[a][l].animation)) {
                  board[a][l].animation.value = board[a][k].value + board[a][l].value
                  board[a][l].animation = Object.assign(animation, board[a][l].animation)
                } else {
                  board[a][l].animation = Object.assign(animation, {x: k, y: a, value: board[a][k].value + board[a][l].value})
                }

              } else if (!_.isEmpty(board[a][l].animation)) {
                board[a][k].animation = {x: l, y: a, value: 0}
                board[a][l].animation.value = board[a][k].value + board[a][l].value
              } else {
                board[a][k].animation = {x: l, y: a, value: 0}
                board[a][l].animation = {x: k, y: a, value: board[a][k].value + board[a][l].value}
              }

              board[a][l].value = board[a][k].value + board[a][l].value
              board[a][k].value = 0
              self.boardDidChange()
              l --
              k --
            }
          }

        }
        this.animate("right")
      },



      moveLeft() {
        const self = this
        let board = self.board
        for (var a = 0; a < board.length; a++) {
          let i = 1
          let j = 0

          while (i < board.length) {
            if (board[a][i].value === 0 && board[a][j].value === 0) {
              j++
              i++
            } else if (board[a][i].value === board[a][j].value) { // if two elements have same value
              board[a][i].animation = {x: j, y: a, value: 0}
              board[a][j].animation = {m: true, x: i, y: a, value: board[a][i].value + board[a][j].value}

              board[a][j].value = board[a][i].value + board[a][j].value
              board[a][i].value = 0
              self.boardDidChange()
              j++
              i++
            } else if (board[a][j].value === 0) { // if the left most ele has 0
              j++
              i++
            } else if (board[a][i].value != 0 && board[a][j].value != 0 && (i - 1 == j)) { // if both are non zero and next to each other
              j++
              i++
            } else if (board[a][i].value != 0 && board[a][j].value != 0) { // if both are non zero and not next to each other
              j++
            } else if (board[a][i].value === 0) { // if the right most ele has 0
              i++
            }
          }


          let k = 1
          let l = 0
          while (k < board.length) {
            if (board[a][l].value !== 0) { // if left most element is 0
              l ++
              k ++
            } else if (board[a][l].value !== 0 && board[a][k].value !== 0) { // if left most and right most elements are not 0
              l ++
              k ++
            } else if (board[a][l].value === 0 && board[a][k].value === 0) { // if left most and right most elements are 0
              k ++
            } else if (board[a][l].value === 0 && board[a][k].value !== 0) { // if left most element is 0 and right most element is not 0

              if (!_.isEmpty(board[a][k].animation)) {
                let animation = board[a][k].animation
                board[animation.y][animation.x].animation = {x: l, y: a, value: 0}
                board[a][k].animation = {x: l, y: a, value: 0}
                if (!_.isEmpty(board[a][l].animation)) {
                  board[a][l].animation.value = board[a][k].value + board[a][l].value
                  board[a][l].animation = Object.assign(animation, board[a][l].animation)
                } else {
                  board[a][l].animation = Object.assign(animation, {x: k, y: a, value: board[a][k].value + board[a][l].value})
                }

              } else if (!_.isEmpty(board[a][l].animation)) {
                board[a][k].animation = {x: l, y: a, value: 0}
                board[a][l].animation.value = board[a][k].value + board[a][l].value
              } else {
                board[a][k].animation = {x: l, y: a, value: 0}
                board[a][l].animation = {x: k, y: a, value: board[a][k].value + board[a][l].value}
              }


              board[a][l].value = board[a][k].value + board[a][l].value
              board[a][k].value = 0
              self.boardDidChange()
              l ++
              k ++
            }
          }
        }
        this.animate("left")
      },

      moveDown() {
        const self = this
        let board = self.board
        for (var a = 0; a < board.length; a++) {
          let i = self.board.length - 2
          let j = self.board.length - 1

          while (i >= 0) {
            if (board[i][a].value === 0 && board[j][a].value === 0) {
              j--
              i--
            } else if (board[i][a].value === board[j][a].value) {
              board[i][a].animation = {x: a, y: j, value: 0}
              board[j][a].animation = {m: true, x: a, y: i, value: board[i][a].value + board[j][a].value}

              board[j][a].value = board[i][a].value + board[j][a].value
              board[i][a].value = 0
              self.boardDidChange()
              j--
              i--
            } else if (board[j][a].value === 0) {
              j--
              i--
            } else if (board[i][a].value != 0 && board[j][a].value != 0 && (i + 1 == j)) {
              j--
              i--
            } else if (board[i][a].value != 0 && board[j][a].value != 0) {
              j--
            } else if (board[i][a].value === 0) {
              i--
            }
          }

          let k = self.board.length - 2
          let l = self.board.length - 1
          while (k >= 0) {
            if (board[l][a].value !== 0) { // if bottom most element is 0
              l --
              k --
            } else if (board[l][a].value !== 0 && board[k][a].value !== 0) { // if bottom most and top most elements are not 0
              l --
              k --
            } else if (board[l][a].value === 0 && board[k][a].value === 0) { // if bottom most and top most elements are 0
              k --
            } else if (board[l][a].value === 0 && board[k][a].value !== 0) { // if bottom most element is 0 and top most element is not 0

              if (!_.isEmpty(board[k][a].animation)) {
                let animation = board[k][a].animation
                board[animation.y][animation.x].animation = {x: a, y: l, value: 0}
                board[k][a].animation = {x: a, y: l, value: 0}
                if (!_.isEmpty(board[l][a].animation)) {
                  board[l][a].animation.value = board[k][a].value + board[l][a].value
                  board[l][a].animation = Object.assign(animation, board[l][a].animation)
                } else {
                  board[l][a].animation = Object.assign(animation, {x: a, y: k, value: board[k][a].value + board[l][a].value})
                }

              } else if (!_.isEmpty(board[l][a].animation)) {
                board[k][a].animation = {x: a, y: l, value: 0}
                board[l][a].animation.value = board[k][a].value + board[l][a].value
              } else {
                board[k][a].animation = {x: a, y: l, value: 0}
                board[l][a].animation = {x: a, y: k, value: board[k][a].value + board[l][a].value}
              }


              board[l][a].value = board[k][a].value + board[l][a].value
              board[k][a].value = 0
              self.boardDidChange()
              l --
              k --
            }
          }
        }
        this.animate("down")
      },

      moveUp() {
        const self = this
        let board = self.board
        for (var a = 0; a < board.length; a++) {
          let i = 1
          let j = 0

          while (i < board.length) {
            if (board[i][a].value === 0 && board[j][a].value === 0) {
              j++
              i++
            } else if (board[i][a].value === board[j][a].value) {
              board[i][a].animation = {x: a, y: j, value: 0}
              board[j][a].animation = {m: true, x: a, y: i, value: board[i][a].value + board[j][a].value}

              board[j][a].value = board[i][a].value + board[j][a].value
              board[i][a].value = 0
              self.boardDidChange()
              j++
              i++
            } else if (board[j][a].value === 0) {
              j++
              i++
            } else if (board[i][a].value != 0 && board[j][a].value != 0 && (i - 1 == j)) {
              j++
              i++
            } else if (board[i][a].value != 0 && board[j][a].value != 0) {
              j++
            } else if (board[i][a].value === 0) {
              i++
            }
          }

          let k = 1
          let l = 0
          while (k < board.length) {
            if (board[l][a].value !== 0) { // if top most element is 0
              l ++
              k ++
            } else if (board[l][a].value !== 0 && board[k][a].value !== 0) { // if top most and bottom most elements are not 0
              l ++
              k ++
            } else if (board[l][a].value === 0 && board[k][a].value === 0) { // if top most and bottom most elements are 0
              k ++
            } else if (board[l][a].value === 0 && board[k][a].value !== 0) { // if top most element is 0 and bottom most element is not 0

              if (!_.isEmpty(board[k][a].animation)) {
                let animation = board[k][a].animation
                board[animation.y][animation.x].animation = {x: a, y: l, value: 0}
                board[k][a].animation = {x: a, y: l, value: 0}
                if (!_.isEmpty(board[l][a].animation)) {
                  board[l][a].animation.value = board[k][a].value + board[l][a].value
                  board[l][a].animation = Object.assign(animation, board[l][a].animation)
                } else {
                  board[l][a].animation = Object.assign(animation, {x: a, y: k, value: board[k][a].value + board[l][a].value})
                }

              } else if (!_.isEmpty(board[l][a].animation)) {
                board[k][a].animation = {x: a, y: l, value: 0}
                board[l][a].animation.value = board[k][a].value + board[l][a].value
              } else {
                board[k][a].animation = {x: a, y: l, value: 0}
                board[l][a].animation = {x: a, y: k, value: board[k][a].value + board[l][a].value}
              }


              board[l][a].value = board[k][a].value + board[l][a].value
              board[k][a].value = 0
              self.boardDidChange()
              l ++
              k ++
            }
          }
        }
        this.animate("up")
      },

      boardDidChange() {
        this.$store.dispatch("toggleBoardChanged", true)
      },

      animate(direction) {
        if (this.boardChanged) {
          this.$store.dispatch("toggleAnimation", true)
          this.$store.dispatch("setAnimationDirection", direction)
        }
      },

      registerControl() {
        const self = this
        document.addEventListener("keydown", function(event) {
          if (event.which === 39) {
            // right
            self.moveRight()
          } else if (event.which === 37) {
            // left
            self.moveLeft()
          } else if (event.which === 38) {
            // up
            self.moveUp()
          } else if (event.which === 40) {
            // down
            self.moveDown()
          } else {
            return // do nothing
          }
        })
      }
    }
  }
}))()

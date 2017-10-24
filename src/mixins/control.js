((() => {
  window.app.mixins.control = {
    methods: {
      animate() {
        let boardDidChange = this.mergeAnimationsList.length > 0 || this.slideAnimationsList.length > 0

        if (boardDidChange) {
          while (this.mergeAnimationsList.length > 0) {
            let animation = this.mergeAnimationsList.splice(0, 1)[0]
            this.animateTiles(animation)
          }
          while (this.slideAnimationsList.length > 0) {
            let animation = this.slideAnimationsList.splice(0, 1)[0]
            this.animateTiles(animation)
          }
          setTimeout(() => {
            this.$store.dispatch("setSeeding", true)
            this.seedTwo()
          }, 100)
        }

      },
      animateTiles(animation) {
        let { to, from } = animation

        let a = this.board[to]
        let b = this.board[from]
        a.value = a.value + b.value
        b.value = 0

        this.board.splice(to, 1)
        this.board.splice(to, 0, b)
        
        this.board.splice(from, 1)
        this.board.splice(from, 0, a)
      },

      moveRight() {
        let board = _.cloneDeep(_.chunk(this.board, 4).slice())
        for (var a = 0; a < board.length; a++) {
          this.mergeRight(board, a)
          this.slideRight(board, a)
        }
        this.animate()
      },

      mergeRight(board, a) {
        let i = board.length - 2
        let j = board.length - 1

        // updated all the possible merge values
        // think of i, j  pointers in the board
        // if they become separate, the pointers will try to catch up
        while (i >= 0) {
          if (board[a][i].value === 0 && board[a][j].value === 0) { // if both elements are zero
            j --
            i --
          } else if (board[a][i].value === board[a][j].value) { // if two elements have same value

            this.mergeAnimationsList.push({to: (a * 4 + i), from: (a * 4 + j)})

            board[a][j].value = board[a][i].value + board[a][j].value
            board[a][i].value = 0
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
      },

      slideRight(board, a) {
        let k = board.length - 2
        let l = board.length - 1
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

            this.slideAnimationsList.push({to: (a * 4 + k), from: (a * 4 + l)})

            board[a][l].value = board[a][k].value + board[a][l].value
            board[a][k].value = 0
            l --
            k --
          }
        }
      },

      moveLeft() {
        let board = _.cloneDeep(_.chunk(this.board, 4).slice())
        for (var a = 0; a < board.length; a++) {
          this.mergeLeft(board, a)
          this.slideLeft(board, a)
        }
        this.animate()
      },

      mergeLeft(board, a) {
        let i = 1
        let j = 0

        while (i < board.length) {
          if (board[a][i].value === 0 && board[a][j].value === 0) {
            j++
            i++
          } else if (board[a][i].value === board[a][j].value) { // if two elements have same value

            this.mergeAnimationsList.push({to: (a * 4 + i), from: (a * 4 + j)})

            board[a][j].value = board[a][i].value + board[a][j].value
            board[a][i].value = 0
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
      },

      slideLeft(board, a) {
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

            this.slideAnimationsList.push({to: (a * 4 + k), from: (a * 4 + l)})

            board[a][l].value = board[a][k].value + board[a][l].value
            board[a][k].value = 0
            l ++
            k ++
          }
        }
      },

      moveDown() {
        let board = _.cloneDeep(_.chunk(this.board, 4).slice())
        for (var a = 0; a < board.length; a++) {
          this.mergeDown(board, a)
          this.slideDown(board, a)
        }
        this.animate()
      },

      mergeDown(board, a) {
        let i = board.length - 2
        let j = board.length - 1

        while (i >= 0) {
          if (board[i][a].value === 0 && board[j][a].value === 0) {
            j--
            i--
          } else if (board[i][a].value === board[j][a].value) {

            this.mergeAnimationsList.push({to: (i * 4 + a), from: (j * 4 + a)})

            board[j][a].value = board[i][a].value + board[j][a].value
            board[i][a].value = 0
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
      },

      slideDown(board, a) {
        let k = board.length - 2
        let l = board.length - 1
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

            this.slideAnimationsList.push({to: (k * 4 + a), from: (l * 4 + a)})

            board[l][a].value = board[k][a].value + board[l][a].value
            board[k][a].value = 0
            l --
            k --
          }
        }
      },

      moveUp() {
        let board = _.cloneDeep(_.chunk(this.board, 4).slice())
        for (var a = 0; a < board.length; a++) {
          this.mergeUp(board, a)
          this.slideUp(board, a)
        }
        this.animate()
      },

      mergeUp(board, a) {
        let i = 1
        let j = 0
        while (i < board.length) {
          if (board[i][a].value === 0 && board[j][a].value === 0) {
            j++
            i++
          } else if (board[i][a].value === board[j][a].value) {

            this.mergeAnimationsList.push({to: (i * 4 + a), from: (j * 4 + a)}) // add animation data

            board[j][a].value = board[i][a].value + board[j][a].value
            board[i][a].value = 0
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
      },

      slideUp(board, a) {
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

            this.slideAnimationsList.push({to: (k * 4 + a), from: (l * 4 + a)}) // add animation data

            board[l][a].value = board[k][a].value + board[l][a].value
            board[k][a].value = 0
            l ++
            k ++
          }
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

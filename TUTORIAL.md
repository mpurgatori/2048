# Build 2048 with Vue.js

2048 is a popular game for a single player. The game has a 4 by 4 grid for tiles. Each **tile** can either be empty or has a **card** with value. As a player, you can control LEFT, RIGHT, UP and DOWN. As cards get merged, the numbers on the cards change as well. The goal is to get number on the card as high as possible. A traditional game looks like below:

![example](/images/2048_example.gif)

We tweaked some layout and our version looks like below:

![our_final_product]()

Let's see how we can build this game using Vue.js!

## Get started with project scaffold

First, we need to set up a project scaffold to build a Vue project. We are going to use plain javascript so that we can understand what is going on. Let's start by cloing the [plain javascript Vue scaffold](https://github.com/babystep-io/PlainJS-Vue-scaffold). The scaffold provides several directories for us:

  - **assets**. This is where we put all third party javascript library, stylesheets, and images.
  - **components**. __PLACEHOLDER__
  - **mixins**. __PLACEHOLDER__
  - **store**. __PLACEHOLDER__
  - **main.js**. __PLACEHOLDER__

## Step 1. define components

First we have a `Game` component that is in charge of a **board**. A **Board** has many **tiles**, and each **tile** has a **value** that defaults to 0. We can start by registering the component `game`:

**src/omponents/game.js**

```javascript
((() => {
  const html = `
    <div class="game">
    </div>
  `

  Vue.component("game", {
    template: html,
    data () {
      return {
        board: [
          [{value:0},{value:0},{value:0},{value:0}],
          [{value:0},{value:0},{value:0},{value:0}],
          [{value:0},{value:0},{value:0},{value:0}],
          [{value:0},{value:0},{value:0},{value:0}],
        ],
      }
    },
  })
}))()
```
On the Vue component `game`, we have a data property `board` that holds a 4 by 4 grid, represented as arrays of arrays. Next we need to present the board with the number in the middle of each tile. We then modify the **template** specified in `html` (note that the CSS has already been defined inside `assets/`)

**src/omponents/game.js**

```javascript
((() => {
  const html = `
    <div class="game">
      <div v-for="row in board" class="row">
        <div class="tile">
          {{ row.value }}
        </div>
      </div>
    </div>
  `
  ...
}))()
```

Now when you open `index.html`, it should look like this:

![step_1_define_components](/images/step_1.png)

## Step 2. start the game

To start the game we need to randomly select 2 tiles and set the **value** of each tile to 2. Let's create a **seedTwo** method:

**src/omponents/game.js**

```javascript
  Vue.component("game", {
    ...
    methods: {
      seedTwo() {
        const self = this

        let getRandomItem = function() {
          let row = self.board[Math.floor(Math.random()*self.board.length)]
          return row[Math.floor(Math.random()*row.length)]
        }

        let initialRandomItem = getRandomItem()

        while (initialRandomItem.value != 0) {
          initialRandomItem = getRandomItem()
        }

        initialRandomItem.value = 2
      }
    }
  })

  ...
```

How do we let the app know that we want to trigger this method when a game starts? Vue.js provides some useful [lifecycle methods](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram), and we will call **seedTwo** after all the elements are ready, so we choose to put the method inside `mounted()`:

```javascript
**src/omponents/game.js**

```javascript
  Vue.component("game", {
    ...

    mounted() {
      this.setupBoard()
    },

    methods: {
      setupBoard() {
        this.seedTwo()
        this.seedTwo()
      }

    }
  })

  ...
```
We call the function twice because we want to initialize two tiles randomly. If you go to `index.html` in the browser, and refresh the page, you see two tiles initiated randomly everytime:

![step_2](/images/step_2.gif)
















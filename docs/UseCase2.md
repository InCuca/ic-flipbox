Interacting and listening for events

```js
new Vue({
  data() {
    return {
      cardOpen: false
    }
  },
  methods: {
    onCardFlip(event) {
      this.cardOpen = event.flip;
    },
  },
  template: `
    <div>
      <button @click="cardOpen = !cardOpen">
        Click to Flip
      </button>
      <p>Flipped? {{cardOpen}}</p>
      <ic-flipbox
        :flip="cardOpen"
        @ic-flipbox-flip="onCardFlip">
          <div slot="front-content">My Front Content</div>
          <div slot="back-content">My Back Content</div>
      </ic-flipbox>
    </div>
  `
})

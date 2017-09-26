Interacting and listening for events

```js
new Vue({
  data() {
    return {
      cardOpen: false,
      myLog: {
        type: Array,
        default: [],
      }
    }
  },
  template: `
    <div>
      <h1>Current Status: {{cardOpen}}</h1>
      <ul><li v-for="event in myLog">Flip Event {{event.flip}}</li></ul>
      <ic-flipbox :flip="cardOpen" @ic-flipbox-flip="myLog.push($event)">
        <div slot="front-content">My Front Content</div>
        <button
          @click="cardOpen = false"
          slot="back-content">Close</button>
      </ic-flipbox>
    </div>
  `
})

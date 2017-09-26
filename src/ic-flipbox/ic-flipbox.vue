<template lang="html">
  <div
    :class="containerClasses"
    :style="containerStyle"
    @mouseover="onMouseOver"
    @mouseout="onMouseOut">
    <div class="flipbox-front">
      <slot name="front-content"></slot>
    </div>
    <div class="flipbox-back">
      <slot name="back-content"></slot>
    </div>
  </div>
</template>

<script>

/**
 * Component documentation
 */
export default {
  name: 'ic-flipbox',
  data: function() {
    return {
      isFlipped: this.flip,
    }
  },
  props: {
    /**
     * The component max perspective,
     * how much the element will zoom while
     * animating, default to not change perspective
     */
    perspective: {
      type: String
    },
    /**
     * Set flip state here
     */
    flip: {
      type: Boolean,
      default: false,
    }
  },
  watch: {
    flip: function(flipValue) {
      this.isFlipped = flipValue;
    }
  },
  computed: {
    containerClasses: function() {
      return {
        'flipbox': true,
        'flipbox-flipped': this.isFlipped,
      }
    },
    containerStyle: function() {
      let style = {};
      if (this.perspective) style['perspective'] = this.perspective;
      return style;
    },
  },
  methods: {
    onMouseOver() {
      this.isFlipped = true;
      this.$emit('ic-flipbox-flip', {flip: this.isFlipped});
    },
    onMouseOut(){
      this.isFlipped = false;
      this.$emit('ic-flipbox-flip', {flip: this.isFlipped});
    },
  }
}
</script>

<style scoped>
  .flipbox {
    position: relative;
  }

  .flipbox .flipbox-front {
    position: absolute;
    top: 0;
    z-index: 900;
    transform: rotateX(0deg) rotateY(0deg);
    transform-style: preserve-3d;
    backface-visibility: hidden;
    transition: all .4s ease-in-out;
  }

  .flipbox .flipbox-back {
    position: absolute;
    top: 0;
    z-index: 1000;
    transform: rotateY(-180deg);
    transform-style: preserve-3d;
    backface-visibility: hidden;
    transition: all .4s ease-in-out;
  }

  .flipbox.flipbox-flipped .flipbox-front {
    z-index: 900;
    transform: rotateY(180deg);
  }

  .flipbox.flipbox-flipped .flipbox-back {
    z-index: 1000;
    transform: rotateX(0deg);
  }
</style>

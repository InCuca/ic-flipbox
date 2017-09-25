<template lang="html">
  <div
    class="{flipbox: true, 'flipbox-flipped': isFlipped}"
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
     * animating
     */
    perspective: {
      type: String,
      default: '600px',
    },
    /**
     * Set flip state here
     */
    flip: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    onMouseOver() {
      //FIXME: neither emit or filpState change are working
      this.flipState = true;
      console.log('over', this.flipState);
      this.$emit('ic-flipbox-flip');
    },
    onMouseOut() {
      //FIXME: neither emit or filpState change are working
      this.flipState = false;
      console.log('out', this.flipState);
      this.$emit('ic-flipbox-notflip');
    },
  },
}
</script>

<style scoped>
  .flipbox {
    position: relative;
    perspective: 600px;
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
    transform: rotateY(180deg);
  }

  .flipbox.flipbox-flipped .flipbox-back {
    transform: rotateX(0deg);
  }
</style>

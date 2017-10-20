<template lang="html">
  <div
    :class="containerClasses"
    :style="containerStyle"
    @mouseenter="doFlip(true)"
    @mouseleave="doFlip(false)">
    <div :style="childStyle" ref="faceFront" class="flipbox-face flipbox-face-front">
      <slot name="front-content"></slot>
    </div>
    <div :style="childStyle" class="flipbox-face flipbox-face-back">
      <slot name="back-content"></slot>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import throttle from './throttle.js';

/**
 * Component documentation
 */
export default {
  name: 'ic-flipbox',
  data: function() {
    return {
      isFlipped: this.flip,
      containerWidth: null,
      containerHeight: null,
      childStyle: {},
      transitionListener: null,
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
      if (this.containerWidth) style['width'] = this.containerWidth + 'px';
      if (this.containerHeight) style['height'] = this.containerHeight + 'px';
      return style;
    },
  },
  methods: {
    // FIXME: throttle does not work well using multiple components
    // doFlip: throttle(function(flip) {
    //   this.isFlipped = flip;
    //   this.$emit('ic-flipbox-flip', {flip: this.isFlipped});
    // }, 400),
    doFlip: function(flip) {
      this.isFlipped = flip;
      this.$emit('ic-flipbox-flip', {flip: this.isFlipped});
    },
    recalcContainer() {
      this.childStyle['position'] = 'static';
      Vue.nextTick().then(() => {
        let childRects = Array
          .from(this.$el.children)
          .map(el => el.getBoundingClientRect());
        let biggestWidth = Math.max.apply(
          null,
          childRects.map(r => r.width)
        );
        let biggestHeight = Math.max.apply(
          null,
          childRects.map(r => r.height)
        );
        this.containerWidth = biggestWidth;
        this.containerHeight = biggestHeight;
        this.childStyle['position'] = 'absolute';
      });
    }
  },
  mounted() {
    this.recalcContainer();

    // Setup a mutation observer on children
    this.childObserver = new MutationObserver(
      this.recalcContainer.bind(this)
    );
    let children = Array.from(this.$el.children);
    children.forEach(child => {
      this.childObserver.observe( child, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
      });
    });
  },
}
</script>

<style scoped>
  .flipbox {
    display: block;
    position: relative;
  }

  .flipbox .flipbox-face {
    transform-style: preserve-3d;
    backface-visibility: hidden;
    transition: all .4s cubic-bezier(.2,.85,.4,1.275);
  }

  .flipbox .flipbox-face.flipbox-face-front {
    z-index: 900;
    transform: rotateX(0deg) rotateY(0deg);
  }

  .flipbox .flipbox-face.flipbox-face-back {
    z-index: 1000;
    transform: rotateY(-180deg);
  }

  .flipbox.flipbox-flipped .flipbox-face-front {
    z-index: 900;
    transform: rotateY(180deg);
  }

  .flipbox.flipbox-flipped .flipbox-face-back {
    z-index: 1000;
    transform: rotateX(0deg);
  }
</style>

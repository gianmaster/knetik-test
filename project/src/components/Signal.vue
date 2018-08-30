<template>
  <ul :class="signalClass">
    <li v-for="n in 5" :key="n"></li>
  </ul>
</template>
<script>

import { inRange } from 'lodash'

const signalMap = {
  veryLow: [-120, -104],
  low: [-103, -98],
  regular: [-97, -90],
  good: [-89, -77],
  veryGood: [-76, -60],
  excellent: [-59, 2]
}

export default {
  name: 'signal',
  computed: {
    signalClass () {
      let from, to
      for (let key in signalMap) {
        [from, to] = signalMap[key]
        if (inRange(this.level, from, to)) return key
      }
      return 'noSignal'
    }
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
// Some vars
$no-signal-color: #c5c5c5;
$greyed-out-opacity: .5;

ul {
  // Needed for clip-path
  position: relative;
  top: 2em;
  left: 50%;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 10em;
  height: 10em;
  margin-bottom: -4em;
  // Deprecated version
  clip: rect(0, 10em, 5em, 0);
  // CSS Shapes Level 2 version
  clip-path: rectangle(0, 10em, 5em, 0);
  // Current version
  clip-path: inset(0 0 5em 0);
  transform: translate(-50%, -25%);

  &.veryLow {
    li:nth-child(5) {
      border-top-color: #ca5252;
    }
  }

  &.low {
    li:nth-child(5), li:nth-child(4) {
      border-top-color: #b06135;
    }
  }

  &.regular {
    li:nth-child(5), li:nth-child(4), li:nth-child(3) {
      border-top-color: #b09a35;
    }
  }

  &.good {
    li:nth-child(5), li:nth-child(4), li:nth-child(3), li:nth-child(2) {
      border-top-color: #80ac12;
    }
  }

  &.veryGood {
    li:nth-child(1), li:nth-child(2), li:nth-child(3), li:nth-child(4), li:nth-child(5) {
      border-top-color: #1dc475;
    }
  }

  &.excellent {
    li:nth-child(1), li:nth-child(2), li:nth-child(3), li:nth-child(4), li:nth-child(5) {
      border-top-color: #0ae844;
    }
  }

  > li {
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 100%;
    border: .7em solid transparent;
    border-top-color: $no-signal-color;
    transform: translate(-50%, -50%);

    &:nth-child(1) {
      width: 100%;
      height: 100%;
    }

    &:nth-child(2) {
      width: 80%;
      height: 80%;
    }

    &:nth-child(3) {
      width: 60%;
      height: 60%;
    }

    &:nth-child(4) {
      width: 40%;
      height: 40%;
    }

    &:nth-child(5) {
      width: 20%;
      height: 20%;
      border-width: 1em;
    }

  }
}

</style>

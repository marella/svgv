<template>
  <div>
    <img :src="Star" />
    <Star />
    <span class="star"></span>
  </div>
</template>

<script>
import Star from './star.svg';

export default {
  components: {
    Star,
  },
  data() {
    return {
      Star,
    };
  },
};
</script>

<style>
.star {
  background: url('./star.svg');
  display: inline-block;
  width: 24px;
  height: 24px;
}
</style>

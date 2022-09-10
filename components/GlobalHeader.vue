<template>
  <header class="bg-blue h-32 bg-opacity-80 fixed w-full top-0 left-0 z-20">
    <div class="mx-auto max-w-[1440px] relative h-32 flex justify-between">
      <ul
        class="space-x-6 leading-8 items-center mr-4 flex font-bold absolute bottom-4 left-0"
      >
        <li>
          <!-- <nuxt-link rel="noopener" to="/">HOME</nuxt-link> -->
          <a href="#">HOME</a>
        </li>
        <li>
          <!-- <nuxt-link rel="noopener" to="/tutorials">TURBO TUTORIALS</nuxt-link> -->
          <a href="#">TURBO TUTORIALS</a>
        </li>
        <li>
          <!-- <nuxt-link rel="noopener" to="/bootcamps">TURBO BOOTCAMPS</nuxt-link> -->
          <a href="#">TURBO BOOTCAMPS</a>
        </li>
        <li>
          <!-- <nuxt-link rel="noopener" to="/about">ABOUT</nuxt-link> -->
          <a href="#">ABOUT</a>
        </li>
        <li>
          <!-- <nuxt-link rel="noopener" to="/sponsor">SPONSOR</nuxt-link> -->
          <a href="#">SPONSOR</a>
        </li>
      </ul>
      <AtomsImage
        alt="Turbo Tutorials"
        width="277"
        height="204"
        public-id="Turbo%20Tutorials/logo.png"
        :widths="[300, 400, 500, 600]"
        loading="eager"
        fetchpriority="high"
        class="self-center max-w-[220px] top-2 absolute right-0"
        :fetch="false"
      />
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      open: false,
    };
  },
};
</script>

<style lang="postcss" scoped>
header {
  backdrop-filter: blur(6px);
}
</style>

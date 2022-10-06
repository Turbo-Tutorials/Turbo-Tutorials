<template>
  <header class="bg-blue h-32 bg-opacity-80 fixed w-full top-0 left-0 z-20">
    <div
      class="mx-auto max-w-[1440px] relative h-32 flex justify-between px-4 xl:p-0"
    >
      <button
        class="w-12 h-12 relative mt-10 bg-lblue md:hidden"
        :aria-expanded="open"
        @click="open = !open"
      >
        <span class="sr-only">Open main menu</span>
        <div
          class="block w-6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <span
            aria-hidden="true"
            class="hamburger-bar"
            :class="{ 'rotate-45': open, ' -translate-y-1.5': !open }"
          ></span>
          <span
            aria-hidden="true"
            class="hamburger-bar"
            :class="{ 'opacity-0': open }"
          ></span>
          <span
            aria-hidden="true"
            class="hamburger-bar"
            :class="{ '-rotate-45': open, ' translate-y-1.5': !open }"
          ></span>
        </div>
      </button>
      <ul
        class="space-x-2 items-end mr-4 font-bold mb-4 hidden md:flex nav"
        :class="{ 'nav-open': open }"
      >
        <li>
          <nuxt-link to="/">HOME</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/tutorials">TUTORIALS</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/about" rel="noopener">ABOUT</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/pwyw" rel="noopener">PWYW</nuxt-link>
        </li>
        <li>
          <a
            href="https://youtube.com/timbenniks"
            target="_blank"
            rel="noopener"
          >
            <span>WATCH ON YOUTUBE</span>
            <AtomsIconLink class="inline w-4 h-4 ml-1" />
          </a>
        </li>
      </ul>

      <nuxt-link to="/">
        <AtomsImage
          alt="Turbo Tutorials"
          width="277"
          height="204"
          public-id="Turbo%20Tutorials/logo.png"
          :widths="[300, 400, 500, 600]"
          loading="eager"
          fetchpriority="high"
          class="self-center max-w-[160px] md:max-w-[220px] top-2 absolute right-0"
          :fetch="false"
        />
      </nuxt-link>
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

.nav-open {
  @apply absolute
          w-full
          top-32
          left-0
          flex
          bg-lblue
          p-4
          overflow-auto;

  li {
    white-space: nowrap;
  }
}

.hamburger-bar {
  @apply block
        absolute
        h-0.5
        w-6
        bg-white
        transform
        transition
        duration-500
        ease-in-out;
}

.nav li a {
  @apply p-2;
}

.router-link-active {
  @apply bg-black;
}
</style>

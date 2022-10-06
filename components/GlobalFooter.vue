<template>
  <footer class="bg-blue">
    <div
      class="mx-auto max-w-[1440px] flex justify-between p-8 flex-col md:flex-row"
    >
      <ul
        class="md:self-center space-y-2 mb-6 md:mb-0 text-center md:text-left"
      >
        <li>
          <nuxt-link to="/tutorials" rel="noopener">Tutorials</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/personalization-profile" rel="noopener"
            >Personalization profile</nuxt-link
          >
        </li>
        <li>
          <a
            href="https://youtube.com/timbenniks"
            target="_blank"
            rel="noopener"
            >Watch on YouTube</a
          >
        </li>
      </ul>
      <ul
        class="md:self-center space-y-2 mb-6 md:mb-0 text-center md:text-left"
      >
        <li><nuxt-link to="/about" rel="noopener">About</nuxt-link></li>
        <!-- <li>
          <nuxt-link to="/sponsor" rel="noopener">Become a sponsor</nuxt-link>
        </li> -->
        <li><nuxt-link to="/pwyw" rel="noopener">PWYW</nuxt-link></li>
      </ul>
      <ul
        class="md:self-center space-y-2 mb-6 md:mb-0 text-center md:text-left"
      >
        <li>
          <nuxt-link to="/privacy-policy" rel="noopener"
            >Privacy policy</nuxt-link
          >
        </li>
        <li class="inline-flex space-x-2">
          <AtomsLeIcon url="https://twitter.com/timbenniks" icon="twitter" />
          <AtomsLeIcon url="https://youtube.com/timbenniks" icon="youtube" />
          <AtomsLeIcon
            url="https://linkedin.com/in/timbenniks"
            icon="linkedin"
          />
          <AtomsLeIcon url="https://github.com/turbo-tutorials" icon="github" />
        </li>
      </ul>
      <nuxt-link to="/" class="mx-auto md:mx-0">
        <AtomsImage
          alt="Turbo Tutorials"
          width="277"
          height="204"
          public-id="Turbo%20Tutorials/logo.png"
          :widths="[300, 400, 500, 600]"
          loading="eager"
          fetchpriority="high"
          class="self-center max-w-[170px]"
          :fetch="false"
        />
      </nuxt-link>
    </div>
  </footer>
</template>

<template>
  <footer class="bg-blue">
    <div
      class="mx-auto max-w-[1440px] flex justify-between p-8 flex-col md:flex-row"
    >
      <ul
        class="md:self-center space-y-2 mb-6 md:mb-0 text-center md:text-left"
      >
        <li><a href="#">All tutorials</a></li>
        <li><a href="#">Personalization settings</a></li>
        <li><a href="#">Watch on YouTube</a></li>
      </ul>
      <ul
        class="md:self-center space-y-2 mb-6 md:mb-0 text-center md:text-left"
      >
        <li><a href="#">About</a></li>
        <li><a href="#">Become a sponsor</a></li>
        <li><a href="#">PWYW</a></li>
      </ul>
      <ul
        class="md:self-center space-y-2 mb-6 md:mb-0 text-center md:text-left"
      >
        <li><a href="#">Privacy</a></li>
        <li><a href="#">Cookies</a></li>
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

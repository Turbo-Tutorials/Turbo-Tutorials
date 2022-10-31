<script setup lang="ts">
const { $useUniformContext: useUniformContext } = useNuxtApp();
const { context } = useUniformContext();

async function setSignalForVueConfToronto() {
  await context.update({
    quirks: {
      vueconftoronto: true,
    },
  });

  navigateTo("/");
}

setSignalForVueConfToronto();
</script>

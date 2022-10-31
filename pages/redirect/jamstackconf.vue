<script setup lang="ts">
const { $useUniformContext: useUniformContext } = useNuxtApp();
const { context } = useUniformContext();

async function setSignalForJamstackConf() {
  await context.update({
    quirks: {
      jamstackconf: true,
    },
  });
  navigateTo("/");
}

setSignalForJamstackConf();
</script>

<script setup lang="ts">
const router = useRouter();
const { $useUniformContext: useUniformContext } = useNuxtApp();
const { context } = useUniformContext();

async function setSignalForVueConfToronto() {
  await context.update({
    quirks: {
      vueconftoronto: true,
    },
  });

  router.push({ path: "/" });
}

setSignalForVueConfToronto();
</script>

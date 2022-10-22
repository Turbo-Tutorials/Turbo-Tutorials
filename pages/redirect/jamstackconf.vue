<script setup lang="ts">
const router = useRouter();
const { $useUniformContext: useUniformContext } = useNuxtApp();
const { context } = useUniformContext();

async function setSignalForJamstackConf() {
  await context.update({
    quirks: {
      jamstackconf: true,
    },
  });

  router.push({ path: "/" });
}

setSignalForJamstackConf();
</script>

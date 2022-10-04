import type { Ref } from "vue"
import { CompositionGetResponse } from "@uniformdev/canvas";

export async function useEnhance(composition: Ref<CompositionGetResponse>, slug: string) {
  const { data, pending, error } = await useAsyncData(
    `composition-enhancer-${slug}`,
    () => {
      return $fetch('/api/enhance', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ composition: composition.value.composition })
      })
    })

  return { data, pending, error }
}
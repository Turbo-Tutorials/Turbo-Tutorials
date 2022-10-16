export const useUpdateTurboProfile = async (scores, context, forget = false) => {
  const enrichments = []
  const values = scores

  for (const enr in values) {
    enrichments.push({
      str: forget ? 0 : values[enr],
      cat: enr.split("_")[0],
      key: enr.split("_")[1],
    });
  }

  await context.forget(true)
  await context.update({
    enrichments,
  });
}
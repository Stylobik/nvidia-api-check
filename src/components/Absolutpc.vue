<template>
  <div >
      {{title}}
  </div>
</template>

<script>
export default {
  name: "Absolutpc",
  props: ["status", "list", "url"],
  data() {
    return {
      title: "Absolutpc",
      fix:
        "https://shop.nvidia.com/fr-fr/geforce/store/?page=1&limit=9&locale=fr-fr&gpu=RTX%203080,RTX%203090,RTX%203070,RTX%203060%20Ti&manufacturer=NVIDIA&gpu_filter=RTX%203090~1,RTX%203080~1,RTX%203070~1,RTX%203060%20Ti~0,RTX%203060~0,RTX%202080%20SUPER~0,RTX%202080~0,RTX%202070%20SUPER~0,RTX%202070~0,RTX%202060%20SUPER~0,RTX%202060~0,GTX%201660%20Ti~0,GTX%201660%20SUPER~0,GTX%201660~0,GTX%201650%20Ti~0,GTX%201650%20SUPER~0,GTX%201650~0",
    };
  },
  created() {},
  methods: {

  },

  watch: {

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

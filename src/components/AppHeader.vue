<template>
  <div class="mb-3">
    <h1>{{ kedai_nama }}</h1>
    <h4>{{ kedai_alamat}}</h4>
  </div>
</template>

<script>
export default {
  name: 'app_header',
  props: {
    kedai_nama: String,
    kedai_alamat: String
  }
}
</script>

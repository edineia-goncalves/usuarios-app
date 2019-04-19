<template>
  <div>
    <div class="title is-pulled-left is-4">{{ title }}</div>
    <usuario-grid></usuario-grid>
  </div>
</template>

<script>
import UsuarioGrid from "./grid";

export default {
  name: "Usuario",
  components: {
    UsuarioGrid
  },
  data() {
    return {
      title: "Cadastro de usuários"
    };
  }
};
</script>

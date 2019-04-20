<template>
  <div>
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle is-5">
            <span>{{ title }}</span>
          </p>
        </div>
      </div>
    </nav>
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

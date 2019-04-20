<template>
  <div>
    <grid :data="gridData" :columns="columns"></grid>
    <usuario-modal @submit="submit(form)"></usuario-modal>
  </div>
</template>

<script>
import api from "@/services/usuario-api";

import Grid from "@/components/grid";
import UsuarioModal from "./form-modal";

export default {
  name: "UsuarioGrid",
  components: {
    Grid,
    UsuarioModal,
  },
  data() {
    return {
      columns: ["id", "nome", "email", "senha"],
      gridData: []
    };
  },
  created() {
    api.getUsers().then(content => {
      this.gridData = content.map(data => {
        return {
          id: data.userId,
          nome: data.nome,
          email: data.email,
          senha: data.senha
        };
      });
    });
  },
  methods: {
    submit(form) {
      console.log(form);
      debugger;
    }
  }
};
</script>
<style>
.button {
  background-color: aquamarine;
  margin: 50px;
  padding: 5px;
  cursor: pointer;
}
</style>


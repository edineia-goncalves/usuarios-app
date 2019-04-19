<template>
  <div>
    <p>Cadastro de usuários</p>
    <br>
    <a class="button is-primary" @click="click">Incluir novo usuario</a>
    <usuario-form></usuario-form>
    <br>
    <br>
    <grid :data="gridData" :columns="columns" @deleteRow="deleteUser"></grid>
  </div>
</template>

<script>
import api from "@/services/usuario-api";

import Grid from "@/components/grid";
import UsuarioForm from "./form-modal";

export default {
  name: "UsuarioGrid",
  components: {
    Grid,
    UsuarioForm
  },
  data() {
    return {
      openModal : false,
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
    click() {
      debugger;
      this.openModal = true;
    },
    deleteUser(id) {
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


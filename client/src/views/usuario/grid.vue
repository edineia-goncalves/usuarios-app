<template>
  <div>
    <grid :data="gridData" 
          :columns="columns" 
          @clickRow="clickRow"
          @deleteRow="deleteRow"></grid>
    <usuario-modal @refreshPage="loadPage"></usuario-modal>
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
    UsuarioModal
  },
  data() {
    return {
      columns: ["id", "nome", "email", "telefone"],
      gridData: []
    };
  },
  async created() {
    await this.loadPage();
    this.$snotify.info("Usuários carregados com sucesso");
  },
  methods: {
    loadPage() {
      api.getUsers().then(content => {
        this.gridData = content.map(data => {
          return {
            id: data.userId,
            nome: data.nomeCompleto,
            email: data.email,
            senha: data.senha,
            telefone: data.telefone
          };
        });
      });
    },
    clickRow(id) {
      console.log(id);
    },
    deleteRow(id) {
      api
        .deleteUser(id)
        .then(() => {
          this.$snotify.success("Usuário excluído com sucesso");
          this.loadPage();
        })
        .catch(error => {
          const errorMessage = error || "Erro ao excluir usuário";
          this.$snotify.error(errorMessage);
        });
    }
  }
};
</script>


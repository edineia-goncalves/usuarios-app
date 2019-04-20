<template>
  <div>
    <usuario-modal @refreshPage="loadPage"></usuario-modal>
    <grid :data="gridData" 
          :columns="columns" 
          @clickRow="clickRow"
          @deleteRow="deleteRow"></grid>
    <usuario-modal-edit
    v-if="openModal"
    :open-modal="openModal" 
    @close="openModal=false"
    @refreshPage="loadPage">
    </usuario-modal-edit>
  </div>
</template>

<script>
import api from "@/services/usuario-api";

import Grid from "@/components/grid";
import UsuarioModal from "./form-modal";
import UsuarioModalEdit from "./form-modal-edit";

export default {
  name: "UsuarioGrid",
  components: {
    Grid,
    UsuarioModal,
    UsuarioModalEdit
  },
  data() {
    return {
      openModal: false,
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
      this.openModal = false;
    },
    clickRow(id) {
      localStorage.setItem("userId", id);
      this.openModal = !this.openModal;
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


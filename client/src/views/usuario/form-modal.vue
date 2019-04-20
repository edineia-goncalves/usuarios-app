<template>
  <div>
    <a class="button is-pulled-left is-primary" @click="openModal = !openModal">Incluir novo usuário</a>
    <modal
      :open-modal="openModal"
      @close="closeForm"
      title="Novo usuário"
      @save="save(form)"
    >
      <div class="field">
        <label class="label">Nome completo</label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="Oliver Oliveira"
            v-model="form.nomeCompleto"
          >
        </div>
      </div>
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input class="input" type="email" placeholder="email@email.com" v-model="form.email">
        </div>
      </div>
      <div class="field">
        <label class="label">Telefone</label>
        <div class="control">
          <input
            class="input"
            type="tel"
            v-mask="'(##)#####-####'"
            placeholder="(99) 9999999-99"
            v-model="form.telefone"
          >
        </div>
      </div>
      <div class="field">
        <label class="label">Senha</label>
        <div class="control">
          <input class="input" type="password" v-model="form.senha">
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import api from "@/services/usuario-api";
import Modal from "@/components/modal";

export default {
  name: "UsuarioModal",
  components: {
    Modal
  },
  data() {
    return {
      openModal: false,
      form: {
        nomeCompleto: "",
        email: "",
        telefone: "",
        senha: ""
      }
    };
  },
  methods: {
    save(form) {
      api
        .saveUser(form)
        .then(() => {
          this.openModal = false;
          this.$emit("refreshPage");
          this.$snotify.success("Usuário incluído com sucesso");
          this.formReset();
        })
        .catch(error => {
          const errorMessage = error || "Erro ao salvar usuário";
          this.$snotify.error(errorMessage);
          this.formReset();
        });
    },
    formReset() {
      const form = {
        nomeCompleto: '',
        email: '',
        telefone: '',
        senha: ''
      };
      this.form = form;
    },
    closeForm() {
      this.openModal = false;
      this.formReset();
    }
  }
};
</script>


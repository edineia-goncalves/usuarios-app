<template>
  <div>
    <a class="button is-pulled-left is-primary" @click="openModal = !openModal">Incluir novo usuário</a>
    <modal :open-modal="openModal" @close="closeForm" title="Novo usuário" @save="save(form)">
      <p class="has-text-danger is-size-7" v-for="error in errors" :key="error">{{ error }}</p>
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
          <input class="input" :type="type" v-model="form.senha">
        </div>
        <span
          v-if="this.type === 'password'"
          @click="tooglePassword"
          class="tag is-light is-pulled-left tag-config"
        >mostrar senha</span>
        <span
          v-else
          @click="tooglePassword"
          class="tag is-light is-pulled-left tag-config"
        >esconder senha</span>
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
      errors: [],
      type: "password",
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
      this.checkForm(form);
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
        nomeCompleto: "",
        email: "",
        telefone: "",
        senha: ""
      };
      this.form = form;
    },
    closeForm() {
      this.openModal = false;
      this.formReset();
    },
    checkForm(form) {
      this.errors = [];

      if (!form.nomeCompleto) {
        this.errors.push("O nome é obrigatório.");
      }
      if (!form.email) {
        this.errors.push("O e-mail é obrigatório.");
      } else if (!this.validEmail(form.email)) {
        this.errors.push("Utilize um e-mail válido exemplo email@email.com");
      }
      if (!form.senha) {
        this.errors.push("O senha é obrigatória.");
      }
      if (!this.errors.length) {
        return true;
      }

      form.preventDefault();
    },
    validEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    tooglePassword() {
      this.type = this.type === "password" ? "text" : "password";
    }
  }
};
</script>
<style scoped>
.tag-config {
  margin-top: 10px;
  cursor: pointer;
}
</style>


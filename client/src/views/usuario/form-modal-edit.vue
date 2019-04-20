<template>
  <div>
    <modal
      :open-modal="openModal"
      @close="$emit('close')"
      title="Editar usuário"
      @save="save(form)"
    >
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
        <div>
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
      </div>
    </modal>
  </div>
</template>
<script>
import api from "@/services/usuario-api";
import Modal from "@/components/modal";

export default {
  name: "UsuarioModalEdit",
  props: {
    openModal: Boolean
  },
  components: {
    Modal
  },
  data() {
    return {
      errors: [],
      openModal: false,
      type: "password",
      form: {
        id: "",
        nomeCompleto: "",
        email: "",
        telefone: "",
        senha: ""
      }
    };
  },
  created() {
    this.loadForm();
    this.$snotify.info("Usuário carregado com sucesso");
  },
  methods: {
    async loadForm() {
      const id = Number(localStorage.getItem("userId"));
      return await api
        .getUsers()
        .then(content => {
          const usuario = content.filter(usuario => usuario.userId === id);
          const form = {
            id: usuario[0].userId,
            nomeCompleto: usuario[0].nomeCompleto,
            email: usuario[0].email,
            telefone: usuario[0].telefone,
            senha: usuario[0].senha
          };
          this.form = form;
        })
        .catch(error => {
          const errorMessage = error || "Erro ao carregar usuário";
          this.$snotify.error(errorMessage);
        });
    },
    save(form) {
      this.checkForm(form);
      const formUser = { ...form };
      formUser.userId = form.id;
      const { id, ...formEdit } = formUser;
      api
        .saveUser(formEdit)
        .then(() => {
          this.$emit("refreshPage");
          this.$snotify.success("Usuário editado com sucesso");
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

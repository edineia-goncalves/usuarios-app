<template>
  <div>
    <modal
      :open-modal="openModal"
      @close="$emit('close')"
      title="Editar usuário"
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
          <input class="input" type="tel"
          v-mask="'(##)#####-####'"
           placeholder="(99) 9999999-99" v-model="form.telefone">
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
  name: "UsuarioModalEdit",
  props: {
    openModal: Boolean
  },
  components: {
    Modal
  },
  data() {
    return {
      openModal: false,
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
        nomeCompleto: '',
        email: '',
        telefone: '',
        senha: ''
      };
      this.form = form;
    },
  }
};
</script>
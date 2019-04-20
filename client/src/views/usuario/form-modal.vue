<template>
  <form>
    <a class="button" @click="openModal = !openModal">Incluir</a>
    <modal :open-modal="openModal" 
           @close="openModal = false"
            title="Novo usuário"
            @save="$emit('submit', form)">
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
          <input class="input" type="tel" placeholder="(99) 9999999-99" v-model="form.telefone">
        </div>
      </div>
      <div class="field">
        <label class="label">Senha</label>
        <div class="control">
          <input class="input" type="password" v-model="form.senha">
        </div>
      </div>
    </modal>
  </form>
</template>

<script>
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
  }
};
</script>


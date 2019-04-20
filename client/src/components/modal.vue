<template>
  <div class="modal" :class="{ 'is-active': openModal }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Modal title</p>
        <button class="delete" aria-label="close" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body">teste</section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="$emit('save')">Salvar</button>
        <button class="button" @click="$emit('close')">Cancelar</button>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  name: "Modal",
  props:{
    openModal: Boolean,
  },
};
</script>


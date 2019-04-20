<template>
  <div class="modal" :class="{ 'is-active' :openModal }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title" :title="title">{{ title }}</p>
        <button class="delete" aria-label="close" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body">
        <slot></slot>
      </section>
      <div class="field is-grouped modal-card-foot">
        <div class="control">
          <button class="button is-link" @click="$emit('save')">Salvar</button>
        </div>
        <div class="control">
          <button class="button" @click="$emit('close')">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Modal",
  props: {
    openModal: Boolean,
    title: String
  }
};
</script>


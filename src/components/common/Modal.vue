<template>
  <div class="modal">
    <div class="modal__wrapper">
      <button class="modal__close" @click="emit('update:modelValue', false)">&times;</button>
      <h6 class="modal__title">
        <slot name="title"></slot>
      </h6>
      <div class="modal__content">
        <slot name="content"></slot>
      </div>
    </div>

  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  }
})
const emit = defineEmits(['update:modelValue'])
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .7);
  backdrop-filter: blur(3px);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;

  &__wrapper {
    background: var(--basic-color);
    color: var(--main-color);
    padding: 30px;
    width: 100%;
    max-width: 400px;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__close {
    color: var(--accent-color);
    font-size: 36px;
    position: absolute;
    top: 0px;
    right: 10px;
    background: none;
    border: none;

    &:hover {
      opacity: .6;
    }
  }

  &__title {
    text-align: center;
    font-size: 24px;
    margin: 0;
  }

}
</style>
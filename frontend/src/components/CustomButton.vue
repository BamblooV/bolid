<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'custom-button'
}
</script>

<style>
.btn {
  background: none;
  color: deepskyblue;
  border: 1px solid deepskyblue;
  padding: 10px 15px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.btn:hover {
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
}

</style>
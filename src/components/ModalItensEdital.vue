<template>
  <div v-if="visible" class="modal">
    <div class="modal-content">
      <button class="close" @click="close" aria-label="Fechar">&times;</button>
      <h2>Itens do Edital</h2>
      <template v-if="itensEdital.length">
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Item</th>
              <th>Lote</th>
              <th>Diferenciado</th>
              <th>Unidade</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in itensEdital" :key="item.item">
              <td v-html="item.produtoLicitado"></td>
              <td>{{ item.item }}</td>
              <td>{{ item.lote }}</td>
              <td>{{ item.diferenciado }}</td>
              <td>{{ item.unidade }}</td>
              <td>{{ item.quantidade }}</td>
            </tr>
          </tbody>
        </table>
      </template>
      <p v-else class="no-items">Sem itens do edital disponíveis.</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    itensEdital: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 700px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease-out;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: #333;
}

.close:hover {
  color: #f00;
}

h2 {
  margin-top: 0;
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
  font-weight: 600;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

.no-items {
  text-align: center;
  color: #888;
  font-size: 16px;
  margin-top: 20px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
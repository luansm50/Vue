<template>
  <div v-if="visible" class="modal">
    <div class="modal-content">
      <span class="close" @click="close">&times;</span>
      <h2>Anexos</h2>
      <table v-if="Array.isArray(anexos) && anexos.length">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="anexo in anexos" :key="anexo.url">
            <td>{{ anexo.nome }}</td>
            <td><a :href="anexo.url" target="_blank" class="link">Visualizar</a></td>
          </tr>
        </tbody>
      </table>
      <p v-else>Sem anexos disponíveis.</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    anexos: {
      type: Array,
      default: () => [], // Inicializa anexos como um array vazio
    },
  },
  watch: {
    anexos(newAnexos) {
      console.log("Anexos recebidos:", newAnexos); // Verifique o valor recebido
    },
  },
  methods: {
    close() {
      console.log("here")
      this.$emit("close");
    },
  },
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
  z-index: 1000; /* Garantir que o modal fique sobre outros elementos */
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 700px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease-out; /* Adiciona uma animação de entrada suave */
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 24px;
  color: #333;
}

.close:hover {
  color: #f00; /* Altera a cor quando o botão é hovered */
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

th,
td {
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

.link {
  color: #007bff;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.no-items {
  text-align: center;
  color: #888;
  font-size: 16px;
  margin-top: 20px;
}

/* Adiciona animação de fade-in para o modal */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

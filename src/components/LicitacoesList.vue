<template>
  <div class="container">
    <header class="page-header">
      <h1>Gestão de Licitações</h1>
      <p>Visualize e gerencie as licitações disponíveis.</p>
    </header>
    <table class="licitacoes-table">
      <thead>
        <tr>
          <th>Órgão</th>
          <th>Objeto</th>
          <th>Data de Publicação</th>
          <th class="actions-header">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lic in licitacoes" :key="lic.idLicitacao">
          <td>{{ lic.orgao }}</td>
          <td v-html="lic.objeto"></td>
          <td>{{ lic.dataPublicacao }}</td>
          <td class="actions">
            <button @click="openModal('anexos', lic.idLicitacao)" class="btn">
              Anexos
            </button>
            <button @click="openModal('itensEdital', lic.idLicitacao)" class="btn">
              Itens Edital
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Seleção da Quantidade de Itens por Página -->
    <div class="pagination-controls">
      <label for="itemsPerPage">Itens por Página:</label>
      <select v-model="itemsPerPage" @change="fetchLicitacoes" class="select">
        <option v-for="option in [10, 25, 50, 100]" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>

    <!-- Paginação -->
    <div class="pagination">
      <button
        @click="changePage(currentPage - 1)"
        :disabled="currentPage <= 1"
        class="btn-nav"
      >
        Anterior
      </button>
      <span class="page-info">Página {{ currentPage }} de {{ totalPages }}</span>
      <button
        @click="changePage(currentPage + 1)"
        :disabled="currentPage >= totalPages"
        class="btn-nav"
      >
        Próxima
      </button>
    </div>

    <!-- Modal para Anexos -->
    <ModalAnexos
      :visible="showModal.anexos"
      :anexos="currentLicitacao.anexos"
      @close="closeModal('anexos')"
    />

    <!-- Modal para Itens Edital -->
    <ModalItensEdital
      :visible="showModal.itensEdital"
      :itensEdital="currentLicitacao.itensEdital"
      @close="closeModal('itensEdital')"
    />
  </div>
</template>

<script>
import { fetchLicitacoes } from "../services/apiService"; // Importando o serviço
import ModalAnexos from "./ModalAnexos.vue";
import ModalItensEdital from "./ModalItensEdital.vue";

export default {
  components: { ModalAnexos, ModalItensEdital },
  data() {
    return {
      licitacoes: [],
      currentPage: 1,
      itemsPerPage: 10,
      totalPages: 1,
      showModal: {
        anexos: false,
        itensEdital: false,
      },
      currentLicitacao: {
        anexos: [],
        itensEdital: [],
      },
    };
  },
  methods: {
    async fetchLicitacoes() {
      try {
        const response = await fetchLicitacoes(this.currentPage - 1, this.itemsPerPage);
        this.licitacoes = response.data.licitacoes;
        this.totalPages = Math.ceil(
          response.data._metadata.total_registros / this.itemsPerPage
        );
      } catch (error) {
        console.error("Erro ao buscar licitações:", error);
      }
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.fetchLicitacoes();
      }
    },
    openModal(type, idLicitacao) {
      this.currentLicitacao = this.licitacoes.find(
        (lic) => lic.idLicitacao === idLicitacao
      );
      this.showModal[type] = true;
      console.log(this.currentLicitacao);
    },
    closeModal(type) {
      this.showModal[type] = false;
    },
  },
  mounted() {
    this.fetchLicitacoes();
  },
};
</script>

<style scoped>
.container {
  font-family: Arial, sans-serif;
  margin: 20px;
}

.licitacoes-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.licitacoes-table th,
.licitacoes-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.licitacoes-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.licitacoes-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.actions-header {
  width: 200px; /* Largura fixa para a coluna de ações */
  text-align: center;
}

.actions {
  width: 200px; /* Largura fixa para a coluna de ações */
  text-align: center;
  white-space: nowrap; /* Evita quebra de linha dos botões */
}

.btn,
.btn-nav {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  margin: 2px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn:hover,
.btn-nav:hover {
  background-color: #0056b3;
}

.btn-nav:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.select {
  padding: 5px;
  margin-left: 10px;
}

.pagination-controls {
  margin-bottom: 10px;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-info {
  font-size: 16px;
}
</style>

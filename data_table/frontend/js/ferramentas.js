document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "http://localhost:3000/api"; // Atualize para o URL correto da sua API
  const ferramentaModal = document.getElementById("ferramentaModal");
  const ferramentaForm = document.getElementById("FerramentaForm");
  const addFerramentaBtn = document.getElementById("addFerramentaBtn");
  const modalTitleFerramenta = document.getElementById("modalTitleFerramenta");
  let editFerramentaId = null;

  // Função para carregar ferramentas
  const loadFerramentas = async () => {
    const response = await fetch(`${apiUrl}/ferramentas`);
    const ferramentas = await response.json();
    const tableBody = document.querySelector("#ferramentasTable tbody");
    tableBody.innerHTML = "";

    ferramentas.forEach((ferramenta) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${ferramenta.name}</td>
          <td>${ferramenta.tipo}</td>
          <td>${
            ferramenta.responsible ? ferramenta.responsible.name : "N/A"
          }</td>
          <td>
            <button class="editFerramentaBtn" data-id="${
              ferramenta._id
            }">Editar</button>
            <button class="deleteFerramentaBtn" data-id="${
              ferramenta._id
            }">Deletar</button>
          </td>
        `;
      tableBody.appendChild(row);
    });

    // Adicionar eventos de edição e deleção
    document.querySelectorAll(".editFerramentaBtn").forEach((button) => {
      button.addEventListener("click", (e) =>
        openEditFerramentaModal(e.target.dataset.id)
      );
    });

    document.querySelectorAll(".deleteFerramentaBtn").forEach((button) => {
      button.addEventListener("click", (e) =>
        deleteFerramenta(e.target.dataset.id)
      );
    });
  };

  // Função para adicionar ferramenta
  const addFerramenta = async (ferramenta) => {
    await fetch(`${apiUrl}/ferramentas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ferramenta),
    });
    loadFerramentas();
  };

  // Função para atualizar ferramenta
  const updateFerramenta = async (id, ferramenta) => {
    await fetch(`${apiUrl}/ferramentas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ferramenta),
    });
    loadFerramentas();
  };

  // Função para deletar ferramenta
  const deleteFerramenta = async (id) => {
    await fetch(`${apiUrl}/ferramentas/${id}`, {
      method: "DELETE",
    });
    loadFerramentas();
  };

  // Abrir modal para editar ferramenta
  const openEditFerramentaModal = async (id) => {
    editFerramentaId = id;
    modalTitleFerramenta.innerText = "Editar Ferramenta";

    // Buscar os dados da ferramenta para preencher o modal
    const response = await fetch(`${apiUrl}/ferramentas/${id}`);
    if (response.status === 404) {
      console.error("Ferramenta não encontrada");
      return;
    }
    const ferramenta = await response.json();

    document.getElementById("nameFerramenta").value = ferramenta.name;
    document.getElementById("tipo").value = ferramenta.tipo;
    await loadUsers(ferramenta.responsible ? ferramenta.responsible._id : null);

    ferramentaModal.style.display = "block";
  };

  // Abrir modal para adicionar nova ferramenta
  const openAddFerramentaModal = async () => {
    editFerramentaId = null;
    modalTitleFerramenta.innerText = "Adicionar Ferramenta";
    ferramentaForm.reset();
    await loadUsers(); // Carrega os usuários sem pré-selecionar nenhum
    ferramentaModal.style.display = "block";
  };

  // Carregar usuários para o select de responsável
  const loadUsers = async (selectedUserId = null) => {
    const response = await fetch(`${apiUrl}/users`);
    const users = await response.json();
    const select = document.getElementById("responsible");
    select.innerHTML = ""; // Limpa o select

    users.forEach((user) => {
      const option = document.createElement("option");
      option.value = user._id;
      option.text = user.name;
      if (user._id === selectedUserId) {
        option.selected = true;
      }
      select.appendChild(option);
    });
  };

  // Fechar modal ao clicar no "x"
  document.querySelector(".close").addEventListener("click", () => {
    ferramentaModal.style.display = "none";
  });

  // Fechar modal ao clicar fora dele
  window.addEventListener("click", (event) => {
    if (event.target === ferramentaModal) {
      ferramentaModal.style.display = "none";
    }
  });

  // Submissão do formulário
  ferramentaForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const ferramentaData = {
      name: document.getElementById("nameFerramenta").value,
      tipo: document.getElementById("tipo").value,
      responsible: document.getElementById("responsible").value,
    };

    if (editFerramentaId) {
      await updateFerramenta(editFerramentaId, ferramentaData);
    } else {
      await addFerramenta(ferramentaData);
    }

    ferramentaModal.style.display = "none";
    loadFerramentas();
  });

  // Inicializando o carregamento de ferramentas e eventos
  addFerramentaBtn.addEventListener("click", openAddFerramentaModal);
  loadFerramentas();
});

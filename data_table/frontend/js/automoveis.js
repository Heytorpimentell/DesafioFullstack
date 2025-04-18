document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "http://localhost:3000/api"; // Atualize para o URL correto da sua API
  const automovelModal = document.getElementById("automovelModal");
  const automovelForm = document.getElementById("AutomovelForm");
  const addAutomovelBtn = document.getElementById("addAutomovelBtn");
  const modalTitleAutomovel = document.getElementById("modalTitleAutomovel");
  let editAutomovelId = null;

  // Função para carregar plantações
  const loadAutomoveis = async () => {
    const response = await fetch(`${apiUrl}/automoveis`);
    const automoveis = await response.json();
    const tableBody = document.querySelector("#automoveisTable tbody");
    tableBody.innerHTML = "";

    automoveis.forEach((automovel) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${automovel.name}</td>
                <td>${automovel.tipo}</td>
                <td>${
                  automovel.responsible ? automovel.responsible.name : "N/A"
                }</td>
                <td>
                    <button class="editAutomovelBtn" data-id="${
                      automovel._id
                    }">Editar</button>
                    <button class="deleteAutomovelBtn" data-id="${
                      automovel._id
                    }">Deletar</button>
                </td>
            `;
      tableBody.appendChild(row);
    });

    // Adicionar eventos de edição e deleção
    document.querySelectorAll(".editAutomovelBtn").forEach((button) => {
      button.addEventListener("click", (e) =>
        openEditAutomovelModal(e.target.dataset.id)
      );
    });

    document.querySelectorAll(".deleteAutomovelBtn").forEach((button) => {
      button.addEventListener("click", (e) =>
        deleteAutomovel(e.target.dataset.id)
      );
    });
  };

  // Função para adicionar plantação
  const addAutomovel = async (automovel) => {
    await fetch(`${apiUrl}/automoveis`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(automovel),
    });
    loadAutomoveis();
  };

  // Função para atualizar plantação
  const updateAutomovel = async (id, automovel) => {
    await fetch(`${apiUrl}/automoveis/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(automovel),
    });
    loadAutomoveis();
  };

  // Função para deletar plantação
  const deleteAutomovel = async (id) => {
    await fetch(`${apiUrl}/automoveis/${id}`, {
      method: "DELETE",
    });
    loadAutomoveis();
  };

  // Abrir modal para editar plantação
  const openEditAutomovelModal = async (id) => {
    editAutomovelId = id;
    modalTitleAutomovel.innerText = "Editar Automóvel";

    // Buscar os dados da plantação para preencher o modal
    const response = await fetch(`${apiUrl}/automoveis/${id}`);
    if (response.status === 404) {
      console.error("Automovél não encontrada");
      return;
    }
    const automovel = await response.json();

    document.getElementById("nameAutomovel").value = automovel.name;
    document.getElementById("tipo").value = automovel.tipo;
    await loadUsers(automovel.responsible ? automovel.responsible._id : null);

    automovelModal.style.display = "block";
  };

  // Abrir modal para adicionar nova plantação
  const openAddAutomovelModal = async () => {
    editAutomovelId = null;
    modalTitleAutomovel.innerText = "Adicionar Automovel";
    automovelForm.reset();
    await loadUsers(); // Carrega os usuários sem pré-selecionar nenhum
    automovelModal.style.display = "block";
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
    automovelModal.style.display = "none";
  });

  // Fechar modal ao clicar fora dele
  window.addEventListener("click", (event) => {
    if (event.target === automovelModal) {
      automovelModal.style.display = "none";
    }
  });

  // Submissão do formulário
  automovelForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const automovelData = {
      name: document.getElementById("nameAutomovel").value,
      tipo: document.getElementById("tipo").value,
      responsible: document.getElementById("responsible").value,
    };

    if (editAutomovelId) {
      await updateAutomovel(editAutomovelId, automovelData);
    } else {
      await addAutomovel(automovelData);
    }

    automovelModal.style.display = "none";
    loadAutomoveis();
  });

  // Inicializando o carregamento de plantações e eventos
  addAutomovelBtn.addEventListener("click", openAddAutomovelModal);
  loadAutomoveis();
});

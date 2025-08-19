document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:8000/api/modalidades/';
    const nomeModalidadeInput = document.getElementById('nome_modalidade');
    const submitBtn = document.getElementById('submit-modalidade-btn');
    const tbody = document.getElementById('modalidades-table-body');

    let isEditing = false;
    let editingId = null;

    async function loadModalidades() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Erro ao carregar as modalidades');
            }
            const modalidades = await response.json();
            renderTable(modalidades);
        } catch (error) {
            console.error('Erro ao carregar modalidades:', error);
            alert('Erro ao carregar modalidades. Verifique a conexão com a API.');
        }
    }

    function renderTable(modalidades) {
        tbody.innerHTML = '';
        modalidades.forEach(modalidade => {
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-gray-50 transition-colors duration-200';
            tr.dataset.id = modalidade.id;
            tr.innerHTML = `
                <td class="py-4 px-6 text-gray-700">${modalidade.id}</td>
                <td class="py-4 px-6 text-gray-700">${modalidade.nome}</td>
                <td class="py-4 px-6 flex space-x-2">
                    <button class="text-blue-500 hover:text-blue-700 transition-colors edit-btn"><i class="fas fa-pencil-alt"></i></button>
                    <button class="text-red-500 hover:text-red-700 transition-colors delete-btn"><i class="fas fa-trash-alt"></i></button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    async function addModalidade(event) {
        event.preventDefault();
        const nome = nomeModalidadeInput.value;
        if (!nome) return;

        const fd = new FormData();
        fd.append('nome', nome);

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: fd
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.nome[0] || 'Erro ao cadastrar modalidade');
            }

            nomeModalidadeInput.value = '';
            loadModalidades();
        } catch (error) {
            console.error('Erro ao adicionar modalidade:', error);
            alert(error.message);
        }
    }

    async function deleteModalidade(id) {
        if (!confirm('Tem certeza que deseja excluir esta modalidade?')) return;

        try {
            const response = await fetch(`${apiUrl}${id}/`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Erro ao excluir modalidade');
            }
            
            loadModalidades();
        } catch (error) {
            console.error('Erro ao excluir modalidade:', error);
            alert('Ocorreu um erro ao excluir a modalidade.');
        }
    }

    async function updateModalidade(id, novoNome) {
        try {
            const response = await fetch(`${apiUrl}${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome: novoNome })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.nome[0] || 'Erro ao atualizar modalidade');
            }

            isEditing = false;
            editingId = null;
            submitBtn.textContent = 'Cadastrar';
            nomeModalidadeInput.value = '';
            
            loadModalidades(); 
        } catch (error) {
            console.error('Erro ao atualizar modalidade:', error);
            alert(error.message);
        }
    }

    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();
        if (isEditing) {
            const novoNome = nomeModalidadeInput.value;
            if (novoNome) {
                updateModalidade(editingId, novoNome);
            }
        } else {
            addModalidade(event);
        }
    });

    tbody.addEventListener('click', (event) => {
        const target = event.target.closest('button');
        if (!target) return;

        const row = target.closest('tr');
        const id = row.dataset.id;
        
        if (target.classList.contains('delete-btn')) {
            deleteModalidade(id);
        } else if (target.classList.contains('edit-btn')) {
            isEditing = true;
            editingId = id;
            
            const nomeCell = row.querySelector('td:nth-child(2)');
            const nomeAtual = nomeCell.textContent;

            nomeModalidadeInput.value = nomeAtual;
            submitBtn.textContent = 'Salvar Alteração';
            nomeModalidadeInput.focus();
        }
    });

    loadModalidades();
});
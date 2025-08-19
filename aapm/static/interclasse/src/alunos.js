document.addEventListener('DOMContentLoaded', () => {
    const apiUrlAlunos = 'http://localhost:8000/api/alunos/';
    const apiUrlModalidades = 'http://localhost:8000/api/modalidades/';

    const alunoForm = document.getElementById('aluno-form');
    const nomeAlunoInput = document.getElementById('nome_aluno');
    const turmaAlunoInput = document.getElementById('turma_aluno');
    const telefoneAlunoInput = document.getElementById('telefone_aluno');
    const emailAlunoInput = document.getElementById('email_aluno');
    const modalidadeAlunoSelect = document.getElementById('modalidade_aluno');
    const socioAlunoCheckbox = document.getElementById('socio_aluno');
    const fazParteDoTimeCheckbox = document.getElementById('faz_parte_do_time');
    const nomeDoTimeInput = document.getElementById('nome_do_time');
    const submitBtn = document.getElementById('submit-aluno-btn');
    const tbody = document.getElementById('alunos-table-body');

    let isEditing = false;
    let editingId = null;

    async function loadModalidades() {
        try {
            const response = await fetch(apiUrlModalidades);
            if (!response.ok) {
                throw new Error('Erro ao carregar as modalidades');
            }
            const modalidades = await response.json();
            modalidadeAlunoSelect.innerHTML = '<option value="" disabled selected>Selecione a modalidade</option>';
            modalidades.forEach(modalidade => {
                const option = document.createElement('option');
                option.value = modalidade.id;
                option.textContent = modalidade.nome;
                modalidadeAlunoSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Erro ao carregar modalidades:', error);
        }
    }

    async function loadAlunos() {
        try {
            const response = await fetch(apiUrlAlunos);
            if (!response.ok) {
                throw new Error('Erro ao carregar os alunos');
            }
            const alunos = await response.json();
            renderTable(alunos);
        } catch (error) {
            console.error('Erro ao carregar alunos:', error);
        }
    }

    function renderTable(alunos) {
        tbody.innerHTML = '';
        alunos.forEach(aluno => {
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-gray-50 transition-colors duration-200';
            tr.dataset.id = aluno.id;
            tr.innerHTML = `
                <td class="py-4 px-6 text-gray-700">${aluno.id}</td>
                <td class="py-4 px-6 text-gray-700">${aluno.nome}</td>
                <td class="py-4 px-6 text-gray-700">${aluno.turma}</td>
                <td class="py-4 px-6 text-gray-700">${aluno.telefone}</td>
                <td class="py-4 px-6 text-gray-700">${aluno.email}</td>
                <td class="py-4 px-6 text-gray-700">${aluno.modalidade.nome}</td>
                <td class="py-4 px-6 text-gray-700">${aluno.socio ? 'Sim' : 'Não'}</td>
                <td class="py-4 px-6 text-gray-700">${aluno.faz_parte_do_time ? aluno.nome_do_time : 'N/A'}</td>
                <td class="py-4 px-6 flex space-x-2">
                    <button class="text-blue-500 hover:text-blue-700 transition-colors edit-btn"><i class="fas fa-pencil-alt"></i></button>
                    <button class="text-red-500 hover:text-red-700 transition-colors delete-btn"><i class="fas fa-trash-alt"></i></button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }


    async function handleFormSubmit(event) {
        event.preventDefault();
        

        const modalidadeValue = parseInt(modalidadeAlunoSelect.value);
        if (isNaN(modalidadeValue)) {
            alert('Por favor, selecione uma modalidade.');
            return;
        }

        const alunoData = {
            nome: nomeAlunoInput.value,
            turma: turmaAlunoInput.value,
            telefone: telefoneAlunoInput.value,
            email: emailAlunoInput.value,
            modalidade_id: modalidadeValue, 
            socio: socioAlunoCheckbox.checked,
            faz_parte_do_time: fazParteDoTimeCheckbox.checked,
            nome_do_time: nomeDoTimeInput.value || null,
        };

        const method = isEditing ? 'PUT' : 'POST';
        const url = isEditing ? `${apiUrlAlunos}${editingId}/` : apiUrlAlunos;

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(alunoData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Erro na API:', errorData);
                throw new Error(JSON.stringify(errorData));
            }

            console.log('Aluno salvo com sucesso!');
            
            alunoForm.reset();
            nomeDoTimeInput.classList.add('hidden');
            
            isEditing = false;
            editingId = null;
            submitBtn.textContent = 'Cadastrar Aluno';
            
            await loadAlunos();
        } catch (error) {
            console.error('Erro ao salvar aluno:', error);
            try {
                const errorMessage = JSON.parse(error.message);
                let alertMessage = 'Erro ao salvar aluno:\n';
                for (const key in errorMessage) {
                    alertMessage += `\n- ${key}: ${errorMessage[key].join(', ')}`;
                }
                alert(alertMessage);
            } catch {
                alert('Ocorreu um erro ao salvar o aluno. Verifique o console para mais detalhes.');
            }
        }
    }

    async function deleteAluno(id) {
        if (!confirm('Tem certeza que deseja excluir este aluno?')) return;

        try {
            const response = await fetch(`${apiUrlAlunos}${id}/`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Erro ao excluir aluno');
            }
            await loadAlunos();
        } catch (error) {
            console.error('Erro ao excluir aluno:', error);
            alert('Ocorreu um erro ao excluir o aluno.');
        }
    }

    fazParteDoTimeCheckbox.addEventListener('change', () => {
        if (fazParteDoTimeCheckbox.checked) {
            nomeDoTimeInput.classList.remove('hidden');
        } else {
            nomeDoTimeInput.classList.add('hidden');
            nomeDoTimeInput.value = '';
        }
    });

    tbody.addEventListener('click', (event) => {
        const target = event.target.closest('button');
        if (!target) return;

        const row = target.closest('tr');
        const id = row.dataset.id;
        
        if (target.classList.contains('delete-btn')) {
            deleteAluno(id);
        } else if (target.classList.contains('edit-btn')) {
            isEditing = true;
            editingId = id;

            const aluno = Array.from(tbody.rows).find(r => r.dataset.id == id);
            const nomeCell = aluno.querySelector('td:nth-child(2)').textContent;
            const turmaCell = aluno.querySelector('td:nth-child(3)').textContent;
            const telefoneCell = aluno.querySelector('td:nth-child(4)').textContent;
            const emailCell = aluno.querySelector('td:nth-child(5)').textContent;
            const modalidadeCell = aluno.querySelector('td:nth-child(6)').textContent;
            const socioCell = aluno.querySelector('td:nth-child(7)').textContent;
            const timeCell = aluno.querySelector('td:nth-child(8)').textContent;

            nomeAlunoInput.value = nomeCell;
            turmaAlunoInput.value = turmaCell;
            telefoneAlunoInput.value = telefoneCell;
            emailAlunoInput.value = emailCell;

            const modalidadeOption = Array.from(modalidadeAlunoSelect.options).find(option => option.textContent === modalidadeCell);
            if (modalidadeOption) {
                modalidadeAlunoSelect.value = modalidadeOption.value;
            }

            socioAlunoCheckbox.checked = socioCell === 'Sim';
            
            if (timeCell !== 'N/A') {
                fazParteDoTimeCheckbox.checked = true;
                nomeDoTimeInput.value = timeCell;
                nomeDoTimeInput.classList.remove('hidden');
            } else {
                fazParteDoTimeCheckbox.checked = false;
                nomeDoTimeInput.value = '';
                nomeDoTimeInput.classList.add('hidden');
            }

            submitBtn.textContent = 'Salvar Alteração';
            nomeAlunoInput.focus();
        }
    });

    alunoForm.addEventListener('submit', handleFormSubmit);

    loadModalidades();
    loadAlunos();
});
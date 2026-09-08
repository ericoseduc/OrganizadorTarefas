
const submitButton = document.querySelector('#submit-btn');
const mensagemErro = document.querySelector('#error-message');

const adicionarTarefa = (event) => {
     event.preventDefault();

    const tituloTarefa = document.querySelector('#task-input').value;
    const prioridadeTarefa = document.querySelector('#task-priority').value;
    const prazoTarefa = document.querySelector('#task-deadline').value;

    try {
        salvarTarefa(tituloTarefa, prioridadeTarefa, prazoTarefa);
    } catch (error) {
        console.error('Error:', error);
        mensagemErro.textContent = error.message;
    }
}

submitButton.addEventListener('click', adicionarTarefa);

const buscarPrioridade = (prioridade) => {
    switch (prioridade) {
        case '1':
            return 'Alta';
        case '2':
            return 'Média';
        case '3':
            return 'Baixa';
    }
}

const formatarData = (data) => {
    const partesData = data.split('-');
    return `${partesData[2]}/${partesData[1]}/${partesData[0]}`;
}

const mostrarTarefas = () => {
    const tarefasContainer = document.querySelector('#task-list tbody');
    tarefasContainer.innerHTML = '';

    tarefas.forEach(tarefa => { 
        const tarefaElement = document.createElement('tr');
        tarefaElement.classList.add('task-item');
        tarefaElement.innerHTML = `
            <td>${tarefa.titulo}</td>
            <td>${buscarPrioridade(tarefa.prioridade)}</td>
            <td>${formatarData(tarefa.prazo)}</td>
            <td>${tarefa.status ? 'Concluída' : 'Pendente'}</td>
            <td>
                <button class="edit-btn" data-codigo="${tarefa.codigo}">Editar</button>
                <button class="delete-btn" data-codigo="${tarefa.codigo}">Excluir</button>
                <button class="status-btn" data-codigo="${tarefa.codigo}">${tarefa.status ? 'Concluir' : 'Pendente'}</button>
            </td>
        `;
        tarefasContainer.appendChild(tarefaElement);
    });

    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const codigo = parseInt(event.target.getAttribute('data-codigo'));
            const tarefa = localizarTarefa(codigo);
            document.querySelector('#task-input').value = tarefa.titulo;
            document.querySelector('#task-priority').value = tarefa.prioridade;
            document.querySelector('#task-deadline').value = tarefa.prazo;
            submitButton.textContent = 'Atualizar Tarefa';
            submitButton.removeEventListener('click', adicionarTarefa);
            submitButton.addEventListener('click', (event) => {
                event.preventDefault();
                try {
                    atualizarTarefa(codigo, document.querySelector('#task-input').value, document.querySelector('#task-priority').value, document.querySelector('#task-deadline').value, tarefa.status);
                    mostrarTarefas();
                    submitButton.textContent = 'Adicionar';
                } catch (error) {
                    console.error('Error:', error);
                    mensagemErro.textContent = error.message;
                }
            });
        });
    });

    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const codigo = parseInt(event.target.getAttribute('data-codigo'));
            excluirTarefa(codigo);
            // mostrarTarefas();
        });
    });

    const statusButtons = document.querySelectorAll('.status-btn');
    statusButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const codigo = parseInt(event.target.getAttribute('data-codigo'));
            const tarefa = localizarTarefa(codigo);
            atualizarTarefa(codigo, tarefa.titulo, tarefa.prioridade, tarefa.prazo, !tarefa.status);
            // mostrarTarefas();
        });
    });
}

document.addEventListener('DOMContentLoaded', mostrarTarefas); 
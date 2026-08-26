const submitButton = document.querySelector('#submit-btn');

submitButton.addEventListener('click', (event) => {
    event.preventDefault();

    const tituloTarefa = document.querySelector('#task-input').value;
    const prioridadeTarefa = document.querySelector('#task-priority').value;
    const prazoTarefa = document.querySelector('#task-deadline').value;

    try {
        salvarTarefa(tituloTarefa, prioridadeTarefa, prazoTarefa);
    } catch (error) {
        console.error('Error:', error);
        alert(error.message);
    }
});

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
            submitButton.removeEventListener('click', salvarTarefa);
            submitButton.addEventListener('click', (event) => {
                event.preventDefault();
                try {
                    atualizarTarefa(codigo, document.querySelector('#task-input').value, document.querySelector('#task-priority').value, document.querySelector('#task-deadline').value, tarefa.status);
                    mostrarTarefas();''
                    submitButton.textContent = 'Adicionar';
                } catch (error) {
                    console.error('Error:', error);
                    alert(error.message);
                }
            });
        });
    });

    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const codigo = parseInt(event.target.getAttribute('data-codigo'));
            excluirTarefa(codigo);
            mostrarTarefas();
        });
    });
}

document.addEventListener('DOMContentLoaded', mostrarTarefas); 
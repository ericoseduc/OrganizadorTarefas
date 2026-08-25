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

const mostrarTarefas = () => {
    const tarefasContainer = document.querySelector('#task-list');
    tarefasContainer.innerHTML = '';

    tarefas.forEach(tarefa => {
        const tarefaElement = document.createElement('li');
        tarefaElement.classList.add('task-item');
        tarefaElement.innerHTML = `
            <h3>${tarefa.titulo}</h3>
            <p>Prioridade: ${tarefa.prioridade}</p>
            <p>Prazo: ${tarefa.prazo}</p>
            <p>Status: ${tarefa.status ? 'Concluída' : 'Pendente'}</p>
            <button class="edit-btn" data-codigo="${tarefa.codigo}">Editar</button>
            <button class="delete-btn" data-codigo="${tarefa.codigo}">Excluir</button>
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
                    mostrarTarefas();
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
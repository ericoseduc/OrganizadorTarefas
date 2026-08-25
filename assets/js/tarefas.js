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
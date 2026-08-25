let tarefas = localStorage.getItem('tarefas') ? JSON.parse(localStorage.getItem('tarefas')) : [];

const validarTarefa = (tarefa) => {
    if (!tarefa.titulo || !tarefa.prioridade || !tarefa.prazo) {
        throw new Error('Todos os campos são obrigatórios.');
    }
    if(tarefa.titulo.length < 5) {
        throw new Error('O título da tarefa deve ter pelo menos 5 caracteres.');
    }
}

const salvarTarefa = (titulo, prioridade, prazo) => {
    const tarefa = {
        'codigo': tarefas.length + 1,
        'titulo': titulo,
        'prioridade': prioridade,
        'prazo': prazo,
        'status': false
    };

    validarTarefa(tarefa);

    tarefas.push(tarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    alert('Tarefa salva com sucesso!');
}

const localizarTarefa = (codigo) => {
    const tarefa = tarefas.find(tarefa => tarefa.codigo === codigo);
    if (!tarefa) {
        throw new Error('Tarefa não encontrada.');
    }
    return tarefa;
}

const atualizarTarefa = (codigo, titulo, prioridade, prazo, status) => {
    const tarefa = localizarTarefa(codigo);
    tarefa.titulo = titulo;
    tarefa.prioridade = prioridade;
    tarefa.prazo = prazo;
    tarefa.status = status;

    validarTarefa(tarefa);

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    alert('Tarefa atualizada com sucesso!');
}

const excluirTarefa = (codigo) => {
    tarefas = tarefas.filter(tarefa => tarefa.codigo !== codigo);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    alert('Tarefa excluída com sucesso!');
}   
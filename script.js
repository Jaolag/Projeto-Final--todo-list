//selecionando os elementos que executarão algum tipo de ação
const inputElement = document.querySelector(".new-task-input")
const addTaskButton = document.querySelector(".new-task-button")
const responsibleElement = document.querySelector(".new-task-responsible")
const tasksContainer = document.querySelector('.tasks-container')

//verificar se o input está vazio
const validateInput = () => inputElement.value.trim().length > 0

//não adicionar tarefa vazia
const handleAddTask = () => {
    const inputIsValid = validateInput();

    console.log(inputIsValid);

    if (!inputIsValid) {
        inputElement.classList.add("error");
        return;
    }

    // Criação da div onde vai entrar as tarefas adicionadas
    const taskItemContainer = document.createElement('div')
    taskItemContainer.classList.add('task-item')

    // Parágrafo da div
    const taskContent = document.createElement("p")
    taskContent.innerText = inputElement.value
    taskContent.addEventListener('click', () => handleClick(taskContent))

    taskContent.addEventListener('click', () => {
        taskContent.classList.toggle('completed')
    })

    // Span do responsável
    const responsibleSpan = document.createElement("span")
    responsibleSpan.innerText = responsibleElement.value
    responsibleSpan.classList.add('task-responsible')

    // Ícone de delete
    const deleteItem = document.createElement("i")
    deleteItem.classList.add('fas')
    deleteItem.classList.add('fa-trash-alt')
    deleteItem.classList.add('delete-task')
    // Ação de delete no botão delete
    deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer))

    taskItemContainer.appendChild(taskContent)
    taskItemContainer.appendChild(responsibleSpan)
    taskItemContainer.appendChild(deleteItem)

    tasksContainer.appendChild(taskItemContainer)

    //esvaziar o input depois de enviado
    inputElement.value = ''
    responsibleElement.value = ''
}


const handleClick = (taskContent) => {
    // Loop em todos os elementos task-container para achar o correspondente a quem está recebendo
    const tasks = tasksContainer.childNodes;

    for (const task of tasks) {
        if (task.firstChild.isSameNode(taskContent)){
            task.firstChild.classList.toggle('completed')
        }
    }
}

const handleDeleteClick = (taskItemContainer) => {
    const taskContent = taskItemContainer.firstChild;
    const isCompleted = taskContent.classList.contains('completed');
    
    // Se a tarefa não estiver concluída, perguntar ao usuário se deseja excluí-la
    if (!isCompleted && !confirm("Tem certeza que deseja excluir esta tarefa não concluída?")){
        return;
    }
    
    tasksContainer.removeChild(taskItemContainer);
}

const handleInputChange = () => {
    const inputIsValid = validateInput()
    if (inputIsValid){
        inputElement.classList.remove("error")
    }
}

// Executar o validateInput quando pressionar a tecla enter no input
inputElement.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        handleAddTask();
    }
})

// Executar o validateInput quando clicar no addTaskbutton
addTaskButton.addEventListener('click', () => handleAddTask())

// Executar handleInputChange quando houver mudança no input de texto
inputElement.addEventListener('change', () => handleInputChange())

// Adicionar responsável quando pressionar a tecla enter no input de responsável
responsibleElement.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        handleAddTask();
    }
})

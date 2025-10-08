// Função para alternar entre categorias
function switchCategory(event) {
    const buttons = document.querySelectorAll('.category-btn');
    const forms = document.querySelectorAll('.form-category');

    buttons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    event.target.classList.add('active');

    // Esconder todos os formulários
    forms.forEach(form => {
        form.classList.remove('active');
    });
    

    
    //captura a categoria selecionada
    const selectedCategory = event.target.dataset.category;

    // Mostrar formulário da categoria selecionada
    const selectedForm = document.getElementById('form-' + selectedCategory);
    if (selectedForm) {
        selectedForm.classList.add('active');
    }
}

// Função para mostrar notificação
function showNotification(message, type) {
    const notification = document.querySelector('.notification');
    const span = notification.querySelector('span');
    
    span.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';
    
    // Esconder notificação após 5 segundos
    setTimeout(() => {
        notification.style.display = 'none';
    }, 5000);
}

// Inicializar eventos da interface quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Adicionar eventos aos botões de categoria
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', switchCategory);
    })
});
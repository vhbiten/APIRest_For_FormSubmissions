
/* 
1. Configurações da API
2. Inicialização dos eventos (DOMContentLoaded)
3. Gerenciamento do envio (handleSubmit)
4. Validação dos dados (validateFormData)
5. Coleta dos dados (collectPocosData)
6. Envio para API (sendToGoogleSheets) 
*/


const API_CONFIG = {
    POCOS_ENDPOINT: "https://api.sheetmonkey.io/form/jiNVmv98o6PrRd8sEcCmWq"
};

// Observa o evento "Submit" do formulário principal e chama o handleSubmit. 
// O DOMContentLoaded garante que o HTML já carregou e o form existe
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.monitoring-form');
    if (form) {
        form.addEventListener("submit", handleSubmit);
    }
});


const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar qual categoria está ativa
    const activeCategory = document.querySelector('.form-category.active');
    
    if (activeCategory && activeCategory.id === 'form-pocos') {
        // verifica se tem uma data preenchida
        if (!validateFormData('pocos')) {
            return;
        }
        
        // Coletar e enviar dados dos poços
        const pocosData = collectPocosData();
        await sendToGoogleSheets(pocosData);
        
    } else if (activeCategory && activeCategory.id === 'form-efluente') {
        showNotification('Funcionalidade de efluente em desenvolvimento.', 'error');
        
    } else if (activeCategory && activeCategory.id === 'form-cloro') {
        showNotification('Funcionalidade de cloro residual em desenvolvimento.', 'error');
        
    } else {
        showNotification('Erro: Nenhuma categoria ativa identificada.', 'error');
    }
};

// Verifica se o campo "data" foi preenchido
function validateFormData(category) {
    const dataColeta = document.getElementById('dataColeta').value;
    
    if (!dataColeta) {
        showNotification('Por favor, preencha a data da coleta.', 'error');
        return false;
    }
    return true;
}

// coleta dos dados do formulário de poços
function collectPocosData() {
    const dataColeta = document.getElementById('dataColeta').value;
    
    // Formatar a data para formato brasileiro (dd/mm/aaaa)
    let dataFormatada = '';
    if (dataColeta) {
        const data = new Date(dataColeta + 'T00:00:00'); // considera sempre meia-noite local do dia escolhido

        const dia = data.getDate().toString().padStart(2, '0');
        const mes = (data.getMonth() + 1).toString().padStart(2, '0');
        const ano = data.getFullYear();
        dataFormatada = `${dia}/${mes}/${ano}`;
    }
    
    // Dados do Poço 1
    const poco1_hidrometro = document.getElementById('poco1_hidrometro').value || '';
    const poco1_horimetro = document.getElementById('poco1_horimetro').value || '';
    
    // Dados do Poço 2
    const poco2_hidrometro = document.getElementById('poco2_hidrometro').value || '';
    const poco2_horimetro = document.getElementById('poco2_horimetro').value || '';
    
    // Dados do Poço 3
    const poco3_hidrometro = document.getElementById('poco3_hidrometro').value || '';
    const poco3_horimetro = document.getElementById('poco3_horimetro').value || '';
    
    // Ordem em que os dados vão ser inseridos na planilha
    return {
        DATA: dataFormatada,
        Hidrômetro_POCO1: poco1_hidrometro,  // Coluna B - Poço 1 Hidrômetro
        Horímetro_POCO1: poco1_horimetro,    // Coluna C - Poço 1 Horímetro
        Hidrômetro_POCO2: poco2_hidrometro, // Coluna D - Poço 2 Hidrômetro
        Horímetro_POCO2: poco2_horimetro,   // Coluna E - Poço 2 Horímetro
        Hidrômetro_POCO3: poco3_hidrometro, // Coluna F - Poço 3 Hidrômetro
        Horímetro_POCO3: poco3_horimetro    // Coluna G - Poço 3 Horímetro
    };
}

// Envia os dados para o google sheets via API sheetmonkey
async function sendToGoogleSheets(data) {
    try {
        const response = await fetch(API_CONFIG.POCOS_ENDPOINT, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const responseData = await response.text();
            showNotification('Dados enviados com sucesso!', 'success');
            // Limpar formulário após envio bem-sucedido
            document.querySelector('.monitoring-form').reset();
        } else {
            const errorText = await response.text();
            console.error('Erro da API:', errorText);
            throw new Error(`Erro na resposta da API: ${response.status} - ${errorText}`);
        }
    } catch (error) {
        console.error('Erro ao enviar dados:', error);
        showNotification('Erro ao enviar dados.', 'error');
    }
}
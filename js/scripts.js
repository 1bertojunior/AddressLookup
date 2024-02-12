function formatarCEP(cep) {
    return cep.replace(/\D/g, ''); // Remove caracteres não numéricos
}

async function consultarCEP(cep) {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.ok) {
            throw new Error('Erro ao consultar o CEP');
        }

        const dadosJSONObj = await response.json();

        document.getElementById('endereco').value = dadosJSONObj.logradouro || '';
        document.getElementById('bairro').value = dadosJSONObj.bairro || '';
        document.getElementById('cidade').value = dadosJSONObj.localidade || '';
        document.getElementById('uf').value = dadosJSONObj.uf || '';
    } catch (error) {
        console.error(error.message);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const cepInput = document.getElementById('cep');
    cepInput.addEventListener('input', () => {
        cepInput.value = formatarCEP(cepInput.value).replace(/(\d{5})(\d{3})/, '$1-$2');
        consultarCEP(cepInput.value);
    });
});

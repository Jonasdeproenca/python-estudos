// Seleciona elementos do DOM
const editor = document.getElementById('editor');
const copiarBtn = document.getElementById('copiar');
const colarBtn = document.getElementById('colar');
const salvarBtn = document.getElementById('salvar');
const temaBtn = document.getElementById('tema');

// Carregar texto salvo do localStorage ao abrir a página
window.onload = () => {
    const textoSalvo = localStorage.getItem('editorTexto');
    if (textoSalvo) editor.value = textoSalvo;
};

// Função copiar
copiarBtn.addEventListener('click', () => {
    editor.select();
    document.execCommand('copy');
    alert('Texto copiado!');
});

// Função colar
colarBtn.addEventListener('click', async () => {
    const texto = await navigator.clipboard.readText();
    editor.value += texto;
});

// Função salvar
salvarBtn.addEventListener('click', () => {
    localStorage.setItem('editorTexto', editor.value);
    alert('Texto salvo no navegador!');
});

// Alternar tema claro/escuro
temaBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

// Menu de contexto personalizado ao clicar na área de texto
editor.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const opcao = prompt("Digite 'cp' para copiar ou 'cv' para colar:");
    if (opcao.toLowerCase() === 'cp') {
        editor.select();
        document.execCommand('copy');
        alert('Texto copiado!');
    } else if (opcao.toLowerCase() === 'cv') {
        navigator.clipboard.readText().then(text => {
            editor.value += text;
        });
    }
});

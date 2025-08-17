document.addEventListener("DOMContentLoaded", () => {
    const editor = document.getElementById("editor");
    const copyBtn = document.getElementById("copyBtn");
    const pasteBtn = document.getElementById("pasteBtn");
    const clearBtn = document.getElementById("clearBtn");
    const themeBtn = document.getElementById("themeBtn");

    // Carregar texto salvo
    const textoSalvo = localStorage.getItem("blocoNotas");
    if (textoSalvo) {
        editor.value = textoSalvo;
        autoResize();
    }

    // Salvar ao digitar
    editor.addEventListener("input", () => {
        localStorage.setItem("blocoNotas", editor.value);
        autoResize();
    });

    // Copiar texto
    copyBtn.addEventListener("click", () => {
        editor.select();
        document.execCommand("copy");
        alert("Texto copiado!");
    });

    // Colar texto
    pasteBtn.addEventListener("click", async () => {
        try {
            const text = await navigator.clipboard.readText();
            editor.value += text;
            localStorage.setItem("blocoNotas", editor.value);
            autoResize();
        } catch (err) {
            alert("Não foi possível colar: permissões negadas.");
        }
    });

    // Limpar texto
    clearBtn.addEventListener("click", () => {
        if (confirm("Tem certeza que deseja limpar o texto?")) {
            editor.value = "";
            localStorage.removeItem("blocoNotas");
            autoResize();
        }
    });

    // Alternar tema
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");
    });

    // Ajuste automático de altura
    function autoResize() {
        editor.style.height = "auto";
        editor.style.height = editor.scrollHeight + "px";
    }
});

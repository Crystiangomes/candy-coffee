// Seleciona o formulário
const form = document.querySelector("form");

form.addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio automático

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    if (nome === "" || email === "" || mensagem === "") {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        alert("Digite um e-mail válido!");
        return;
    }

    alert("Mensagem enviada com sucesso!");
    form.reset();
});



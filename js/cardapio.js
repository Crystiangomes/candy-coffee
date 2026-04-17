/* ==============================
1) Pegar elementos do HTML
=================================*/

const listaCardapio = document.querySelector("#listaCardapio");
const buscaCardapio = document.querySelector("#buscaCardapio");

/* ==============================
2) Lista vazia
=================================*/

let cardapio = [];

/* ==============================
3) Carregar JSON
=================================*/

async function carregarCardapio(){

    const resposta = await fetch("../data/cardapio.json");

    cardapio = await resposta.json();

    renderizarCardapio(cardapio);

}

/* ==============================
4) Criar os cards
=================================*/

function renderizarCardapio(lista){

    listaCardapio.innerHTML = "";

    lista.forEach((item)=>{

        const card = document.createElement("div");

        card.classList.add("item");

        card.innerHTML = `
            <h3>${item.titulo}</h3>
            <img src="${item.img}">
            <p><strong>Categoria:</strong> ${item.categoria}</p>
            <p>${item.descricao}</p>
            <p><strong>Preço:</strong> R$ ${item.preco}</p>
            <button class="btn-detalhes">Ver detalhes</button>
        `;

        listaCardapio.appendChild(card);

        const btn = card.querySelector(".btn-detalhes");

        btn.addEventListener("click",function(){
            alert("Você escolheu: " + item.titulo);
        });

    });

}

/* ==============================
5) BUSCA
=================================*/

buscaCardapio.addEventListener("input",function(){

    const texto = buscaCardapio.value.toLowerCase();

    const filtrados = cardapio.filter((item) => {
        return item.titulo.toLowerCase().includes(texto);
    });

    renderizarCardapio(filtrados);

});

/* ==============================
6) Iniciar
=================================*/

carregarCardapio();
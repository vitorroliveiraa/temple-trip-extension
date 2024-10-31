// Função que busca os dados da página de detalhes
async function fetchDetailData(referenceNumber) {
  const response = await fetch(
    `/donations/batch-details?id=${referenceNumber}&internalAccountId=54935`
  );
  const text = await response.text();

  // Cria um elemento temporário para analisar o HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "text/html");

  // Extraia os dados relevantes usando seletores apropriados
  // Altere esses seletores de acordo com a estrutura da página
  const name = doc.querySelector(".name-selector")?.innerText; // Exemplo de seletor
  const category = doc.querySelector(".category-selector")?.innerText; // Exemplo de seletor
  const amount = doc.querySelector(".amount-selector")?.innerText; // Exemplo de seletor

  return {
    name,
    category,
    amount,
  };
}

// Função que manipula a tabela após o carregamento
function manipulateTable() {
  const rows = document.querySelectorAll(".divRow.ng-scope");

  rows.forEach((row) => {
    const referenceNumber = row.querySelector("p > a")?.innerText;

    // Cria um ícone para clicar
    const icon = document.createElement("span");
    icon.innerText = "🔍"; // Adicione o seu ícone ou HTML desejado
    icon.style.cursor = "pointer"; // Para indicar que é clicável
    icon.style.display = "block";

    icon.addEventListener("click", async () => {
      // Lógica para buscar os dados da página de detalhes
      const detailData = await fetchDetailData(referenceNumber);
      if (detailData) {
        const collapseDiv = document.createElement("div");
        collapseDiv.innerHTML = `
                    <p>Nome: ${detailData.name}</p>
                    <p>Categoria: ${detailData.category}</p>
                    <p>Quantidade: ${detailData.amount}</p>
                `;
        row.appendChild(collapseDiv); // Adiciona os dados abaixo da linha
      }
    });

    // Adiciona o ícone na coluna da referência
    row.querySelector(".divCell:nth-child(2)").appendChild(icon);
  });
}

// Espera 1 segundo antes de manipular a tabela
setTimeout(manipulateTable, 1000);

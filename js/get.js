const resposta = document.querySelector("#resposta");
const lista = document.querySelector("#lista-series");
const modelo = document.querySelector("#modelo-serie");


const apiKey = "cv_khXwR2Q7UTuXmOE_KLgjcvUy1BfymgxyH-7OomkeldYrhvJpvxxE3d-MavAaO_2U";

const apiUrl = "https://api-ds.codeverse.dev.br/api/series";

async function buscarSeries() {

  //Mostra uma msg.
  resposta.textContent="Carregando séries..."
  
  try {
    //Fazer o get
    const retorno = await fetch(apiUrl, {
      method: "GET",
      headers: {"x-api-key" : apiKey},
    });
    
    //Verificar se não deu certo
    if(!retorno.ok){
      throw new Error("Não foi possível carregar as séries.");
    }

    // Converter o resultado para JSON, pois será um objeto.
    const resultado = await retorno.json();

    //Percorrer todos os herois que esta dentro de resultado.
    for (const serie of resultado.data){
      
      //fazer uma copia do modelo que criamos no html
      const card = modelo.content.cloneNode(true);

      //preecher cada item desse card

      card.querySelector(".nome").textContent = serie.title;
      card.querySelector(".genero").textContent = serie.genero;
      card.querySelector(".numero_temporadas").textContent = serie.temporadas;
      card.querySelector(".ano_lancamento").textContent = serie.lancamento;
      card.querySelector(".plataforma").textContent = serie.plataforma;
    

      const imagem = card.querySelector(".imagem-serie");

      if (serie.imageUrl){
        imagem.src = serie.imageUrl;
        imagem.alt = serie.title;
        
        imagem.onerror = () => imagem.remove();
        
      } else {
        imagem.remove();
      }

      // adiciona o card preenchido na tela

      lista.appendChild(card);
      resposta.textContent = "";

    }

  } catch (error) {
    console.error(error);
    resposta.textContent= "Não foi possível carregar as séries. Tente novamente!" 
  }
}

// Executar no arquivo

buscarSeries();
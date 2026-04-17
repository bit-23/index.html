// js/code.js

document.addEventListener("DOMContentLoaded", () => { // Garante que o código seja executado após o carregamento do DOM

    const input = document.querySelector("#cidade"); // Seleciona o campo de input para a cidade
    const botao = document.querySelector(".btn"); // Seleciona o botão para buscar o clima
    const resultado = document.querySelector(".resultado"); // Seleciona a área onde o resultado do clima será exibido

    botao.addEventListener("click", async () => { // Adiciona um evento de clique ao botão

        const cidade = input.value.trim(); // Obtém o valor do campo de input e remove espaços em branco

        if (cidade === "") { // Verifica se o campo de input está vazio
            resultado.innerHTML = "<p>Digite uma cidade.</p>"; // Exibe uma mensagem de erro se o campo estiver vazio
            return; // Retorna para evitar que o código continue a execução
        }

        // SUA CHAVE WEATHERAPI
        const apiKey = "1859c0dece5b4ee89fd230727261704"; //chave de acesso à API do WeatherAPI

        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cidade}&lang=pt`; // URL para buscar o clima da cidade usando a API do WeatherAPI

        try {

            resultado.innerHTML = "<p>Carregando...</p>"; // Exibe uma mensagem de carregamento enquanto a requisição está sendo processada

            const resposta = await fetch(url); // Faz a requisição para a API do WeatherAPI e aguarda a resposta
            const dados = await resposta.json(); // Converte a resposta para JSON e aguarda a conversão

            console.log(dados); // Exibe os dados retornados pela API no console para depuração

            if (dados.error) {
                resultado.innerHTML = "<p>Cidade não encontrada.</p>"; // Exibe uma mensagem de erro se a cidade não for encontrada
                return;
            }

            // Exibe os dados do clima na área de resultado usando template literals para formatar a saída
            resultado.innerHTML = `
                <h2>${dados.location.name}, ${dados.location.country}</h2>
                <p>🌡️ Temperatura: ${dados.current.temp_c}°C</p>
                <p>☁️ Clima: ${dados.current.condition.text}</p>
                <p>💧 Umidade: ${dados.current.humidity}%</p>
                <p>🌬️ Vento: ${dados.current.wind_kph} km/h</p>
                <img src="https:${dados.current.condition.icon}">
            `;
            // A API do WeatherAPI retorna um ícone para o clima atual, e a URL do ícone é construída usando o campo "icon" retornado pela API
        } catch (erro) { // Captura qualquer erro que ocorra durante a requisição ou processamento dos dados
            console.log(erro); // Exibe o erro no console para depuração
            resultado.innerHTML = "<p>Erro ao buscar clima.</p>";
        }

    });

});

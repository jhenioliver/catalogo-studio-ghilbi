function inicio(){
    exibirFilmes();
    inserirLog();
    exibirLog();
}

var matricula = 434903;
var api = 'StudioGhilbi';
var metodo = 'exibirFilmes';

async function exibirFilmes() {
    const filmesContainer = document.getElementById('filmes-container');

    fetch('https://ghibliapi.vercel.app/films')
        .then(response => response.json())
        .then(data => {
            var qnt = data.length;
            inserirLog(qnt);
            exibirLog(qnt);
            console.log(qnt);
            data.forEach(filme => {
                const filmeCard = document.createElement('div');
                filmeCard.classList.add('filme-card');

                filmeCard.innerHTML = `
                    <img src=${filme.image} class="card-img-top" style="padding-bottom: 10px;">
                    <h3>${filme.title}</h3>
                    <p><strong>Diretor:</strong> ${filme.director}</p>
                    <p><strong>Lançamento:</strong> ${filme.release_date}</p>
                    <p>${filme.description.substring(0, 100)}...</p>
                `;

                filmesContainer.appendChild(filmeCard);
            });

        })
        .catch(error => {
            console.error("Erro ao buscar os filmes:", error);
            filmesContainer.innerHTML = "<p>Erro ao carregar os filmes</p>";
        });
};

async function inserirLog(filme) {
    var url = `https://www.piway.com.br/unoesc/api/inserir/log/${matricula}/${api}/${metodo}/${filme}`;
    var res = await fetch(url)
        .then((resposta) => { return resposta.json() })
        .then(filme => {
            console.log("Log registrado com sucesso:", filme);
            document.getElementById("msg-log").innerText = "Log registrado com sucesso!";
        })
        .catch(error => {
            console.error("Erro ao registrar log:", error);
            document.getElementById("msg-log").innerText = "Erro ao registrar log.";
        });
        console.log(filme);
}

async function exibirLog(filme) {
    var url = `https://www.piway.com.br/unoesc/api/logs/${matricula}`;
    var res = await fetch(url)
        .then((resposta) => {return resposta.json() })
        .then(logs => {
            const logsContainer = document.getElementById('logs-container');
            logsContainer.innerHTML = '';
            logs.forEach(log => {
                if (log.api == 'StudioGhilbi' && log.metodo == 'exibirFilmes'){
                    const logItem = document.createElement('p');
                    logItem.textContent = `DATA: ${log.log} - API: ${log.api} - MÉTODO: ${log.metodo} - RESULTADO: ${filme}`;
                    logsContainer.appendChild(logItem);
                }
            });
        })
        .catch(error => {
            console.error("Erro ao buscar os logs:", error);
            document.getElementById('logs-container').innerText = "Erro ao carregar logs.";
        });
}
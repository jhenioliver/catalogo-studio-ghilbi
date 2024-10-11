document.addEventListener("DOMContentLoaded", () => {
    const personagensContainer = document.getElementById('personagens-container');

    fetch('https://ghibliapi.vercel.app/people')
        .then(response => response.json())
        .then(data => {
            data.forEach(personagem => {
                const personagemCard = document.createElement('div');
                personagemCard.classList.add('personagem-card');

                personagemCard.innerHTML = `
                    <h3>${personagem.name}</h3>
                    <p><strong>Gênero:</strong> ${personagem.gender}</p>
                    <p><strong>Idade:</strong> ${personagem.age}</p>
                    <p><strong>Cor dos olhos:</strong> ${personagem.eye_color}</p>
                    <p><strong>Cor dos cabelos:</strong> ${personagem.hair_color}</p>
                `;

                personagensContainer.appendChild(personagemCard);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar os personagens:", error);
            personagensContainer.innerHTML = "<p>Erro ao carregar os personagens</p>";
        });
});

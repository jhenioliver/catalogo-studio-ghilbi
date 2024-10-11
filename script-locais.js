document.addEventListener("DOMContentLoaded", () => {
    const locaisContainer = document.getElementById('locais-container');

    fetch('https://ghibliapi.vercel.app/locations')
        .then(response => response.json())
        .then(data => {
            data.forEach(local => {
                const localCard = document.createElement('div');
                localCard.classList.add('local-card');

                localCard.innerHTML = `
                    <h3>${local.name}</h3>
                    <p><strong>Clima:</strong> ${local.climate}</p>
                    <p><strong>Terreno:</strong> ${local.terrain}</p>
                `;

                locaisContainer.appendChild(localCard);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar os locais:", error);
            locaisContainer.innerHTML = "<p>Erro ao carregar os locais</p>";
        });
});

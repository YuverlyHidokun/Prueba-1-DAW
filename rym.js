const consultarPersonaje = (id) => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            pintarPersonaje(data);
            guardarNombreEnLocalStorage(data.name);
        })
        .catch(error => {
            console.error('Error al obtener el personaje:', error);
        });
};

const btnEnviar = () => {
    let personajeId = Math.round(Math.random() * 120);
    consultarPersonaje(personajeId);
};
btnEnviar()
const listaImg = document.getElementById("ListaImg");

const pintarPersonaje = (data) => {
    
    let imgElement = document.createElement('img');
    imgElement.src = data.image;
    imgElement.alt = data.name;

    let pElement = document.createElement('p');
    pElement.textContent = `¿Quién soy?`;
    pElement.style.color = `white`;
    pElement.style.fontSize = `35px`;
    

    listaImg.innerHTML = ''; 
    listaImg.appendChild(imgElement);
    listaImg.appendChild(pElement);

};

const guardarNombreEnLocalStorage = (nombre) => {
    let nombreEnMinusculas = nombre.toLowerCase();
    localStorage.setItem('character', JSON.stringify(nombreEnMinusculas));
};

const btnConsultar = () => {

    let nombreGuardado = JSON.parse(localStorage.getItem('character'));
    let boton = document.getElementById('adivina')
    let personaje = boton.value;
    if (personaje  === nombreGuardado) {
        Swal.fire({
            icon: "success",
            title: "Correcto",
            text: 'El personaje es: ' + nombreGuardado + `!!!`
        });  
        btnEnviar()
        
    }
    else
    {
        Swal.fire({
            icon: "error",
            title: "Nombre incorrecto",
            text: 'El nombre correcto es: ' + nombreGuardado
        });    
    }
};



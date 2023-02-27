const formularioCalculadora = document.getElementById("formulario-calculadora");
const resultado = document.getElementById("resultado");

formularioCalculadora.addEventListener("submit", (evento) => {
  evento.preventDefault();

  calcularCalorias();
});

function calcularCalorias() {
  aparecerResultado();

  const nombre = document.querySelector("#nombre");
  const tipoDocumento = document.querySelector("#tipo-documento");
  const documento = document.querySelector("#documento");
  const edad = document.querySelector("#edad");
  const peso = document.querySelector("#peso");
  const altura = document.querySelector("#altura");
  const genero = document.querySelector('input[name="genero"]:checked');
  const actividad = document.querySelector("#actividad");
  // const totalCalorias = document.querySelector('#total-calorias');

  const multiplicadorTMB = {
    peso: 10,
    altura: 6.25,
    edad: 5,
  };

  if (
    !(
      nombre.value &&
      tipoDocumento.value &&
      documento.value &&
      edad.value &&
      peso.value &&
      altura.value
    )
  ) {
    mostrarMensajeDeError("Por favor asegúrese de llenar todos los campos");
    return;
  } else if (edad.value < 15 || edad.value > 80) {
    mostrarMensajeDeError("La edad ingresada no es permitida");
    return;
  }

  let grupoPoblacional;
  if (edad.value >= 15 && edad.value <= 29) {
    grupoPoblacional = "Jovén";
  } else if (edad.value >= 30 && edad.value <= 59) {
    grupoPoblacional = "Adulto";
  } else if (edad.value >= 60 && edad.value <= 80) {
    grupoPoblacional = "Adulto mayor";
  }

  let calculoCalorias;
  if (genero.id === "hombre") {
    //Formula hombres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) + 5
    calculoCalorias =
      actividad.value *
        (multiplicadorTMB.peso * peso.value +
          multiplicadorTMB.altura * altura.value -
          multiplicadorTMB.edad * edad.value) +
      5;
  } else {
    //Formula mujeres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) - 161
    calculoCalorias =
      actividad.value *
        (multiplicadorTMB.peso * peso.value +
          multiplicadorTMB.altura * altura.value -
          multiplicadorTMB.edad * edad.value) -
      161;
  }

  // totalCalorias.value = `${Math.floor(calculoCalorias)} kcal`;

  resultado.innerHTML = `
        <div class=" card-body d-flex flex-column justify-content-start align-items-center h-100 mt-5" id="calculo">
            <h5 class="card-title h2">Calorías requeridas</h5>
            <div class="mb-3 w-100">
              <h6 class="card-subtitle mt-4" style="font-size: 1.2rem">El paciente ${
                nombre.value
              } identificado con ${tipoDocumento.value} No. ${
    documento.value
  }, requiere un total de:</h6>
              <input class="form-control text-center mt-3" value="${Math.floor(
                calculoCalorias
              )} kcal" style="font-size: 2rem" disabled>
              <h6 class="card-subtitle mt-3" style="font-size: 1.2rem">para el sostenimiento de su TBM.</h6>
            </div>
            <div class="mb-3 w-100">
              <h6 class="card-subtitle mt-4" style="font-size: 1.2rem">El paciente pertenece al grupo poblacional de:</h6>
              <input class="form-control text-center mt-3" value="${grupoPoblacional}" style="font-size: 2rem" disabled>

        </div>
    `;

  nombre.value = null;
  tipoDocumento.value = null;
  documento.value = null;
  peso.value = null;
  altura.value = null;
  edad.value = null;
  actividad.value = null;
}

function mostrarMensajeDeError(msg) {
  const calculo = document.querySelector("#calculo");
  if (calculo) {
    calculo.remove();
  }

  const divError = document.createElement("div");
  divError.className = "d-flex justify-content-center align-items-center h-100";
  divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

  resultado.appendChild(divError);

  setTimeout(() => {
    divError.remove();
    desvanecerResultado();
  }, 5000);
}

// Animaciones
function aparecerResultado() {
  resultado.style.top = "100vh";
  resultado.style.display = "block";

  let distancia = 100;
  let resta = 0.3;
  let id = setInterval(() => {
    resta *= 1.1;
    resultado.style.top = `${distancia - resta}vh`;
    if (resta > 100) {
      clearInterval(id);
    }
  }, 10);
}

function desvanecerResultado() {
  let distancia = 1;

  let id = setInterval(() => {
    distancia *= 2;
    resultado.style.top = `${distancia}vh`;
    if (distancia > 100) {
      clearInterval(id);
      resultado.style.display = "none";
      resultado.style.top = 0;
    }
  }, 10);
}

/*
TAREA:
Crear una interfaz que permita agregar ó quitar (botones agregar y quitar) inputs+labels para completar el salario anual de cada integrante de la familia que trabaje.
Al hacer click en "calcular", mostrar en un elemento pre-existente el mayor salario anual, menor salario anual, salario anual promedio y salario mensual promedio.

Punto bonus: si hay inputs vacíos, ignorarlos en el cálculo (no contarlos como 0).
*/

/*# Tarea clase 8

A las 2 tareas de la clase 6, ponerles las validaciones que consideren
necesarias.

TIP: Las edades no pueden tener decimales.

validad edades, nombre, etc. con regular expression con objetos, con forEach, escribir pruebas
pero copiando los archivos de esa clase y agregandolos al repositorio
de la clase 8 y ahi modificarlos
*/

let contadorIntegrantes = 0;

$form = document.querySelector("#salarios-integrantes");

function validarFormularioSalarios(event) {
  const salariosAnuales = obtenerSalariosAnualesIntegrantes();
  const errorSalarios = validarSalarios(salariosAnuales);

  if (!manejaErroresSalarios(errorSalarios)) {
    const mayorSalarioAnual = calcularMayorSalarioAnual(salariosAnuales);
    const menorSalarioAnual = calcularMenorSalarioAnual(salariosAnuales);
    const promedioSalariosAnuales = calculaPromedioSalariosAnuales(salariosAnuales);
    const promedioSalariosMensuales = calculaPromedioSalariosAnuales(salariosAnuales);

    document.querySelector("#mayor-salario-anual").value = `${mayorSalarioAnual}`;
    document.querySelector("#menor-salario-anual").value = `${menorSalarioAnual}`;
    document.querySelector("#promedio-salarios-anuales").value = `${promedioSalariosAnuales}`;
    document.querySelector("#promedio-salarios-mensuales").value = `${promedioSalariosMensuales}`;
  }

  event.preventDefault();
}

function validarSalarios(salariosAnuales) {
  let errores = {};

  for (let i = 0; i < salariosAnuales.length; i++) {
    errores[`Integrante${i + 1}`] = "";

    if (salariosAnuales[i] == " ") {
      errores[`Integrante${i + 1}`] = `Integrante#${i + 1} no puede estar vacío`;
    }
    if (salariosAnuales[i] < 0) {
      errores[`Integrante${i + 1}`] = `Integrante#${i + 1} no puede ser menor a cero`;
    }
  }
  return errores;
}

function manejaErroresSalarios(errores) {
  const keys = Object.keys(errores);
  const $errores = document.querySelector("#errores");
  let hayError = false;

  keys.forEach(function (key) {
    const error = errores[key];
    let $campoError = document.querySelector(`.error-${[key]}`);

    if (error) {
      hayError = true;

      if ($campoError === null) {
        const $error = document.createElement("li");
        $error.innerText = error;
        $error.className = `error-${[key]}`;
        $errores.appendChild($error);
        $form[key].className = "error";
      }
    } else {
      $form[key].className = "";
      if ($campoError) {
        $campoError.remove();
      }
    }
  });

  return hayError;
}

document.querySelector("#agregar-input").onclick = function (event) {
  contadorIntegrantes++;
  crearIntegrante(contadorIntegrantes);
  event.preventDefault();
};

function crearIntegrante(contadorIntegrantes) {
  const $div = document.createElement("div");
  $div.className = "integrante";

  const $label = document.createElement("label");
  $label.textContent = "Salario Anual del Integrante ";
  const $input = document.createElement("input");
  $input.type = "number";
  $input.placeholder = "Salario Anual";
  $input.name = `Integrante${contadorIntegrantes}`;

  $div.appendChild($label);
  $div.appendChild($input);

  const $integrantes = document.querySelector("#integrantes");
  $integrantes.appendChild($div);
}

document.querySelector("#eliminar-input").onclick = function (event) {
  contadorIntegrantes--;
  const $integrantes = document.querySelectorAll(".integrante");
  for (let i = $integrantes.length - 1; i < $integrantes.length; i++) {
    $integrantes[i].remove();
  }

  event.preventDefault();
};

function obtenerSalariosAnualesIntegrantes() {
  const $integrantes = document.querySelectorAll(".integrante input");
  const salariosAnuales = [];

  for (let i = 0; i < $integrantes.length; i++) {
    salariosAnuales.push(Number($integrantes[i].value));
  }
  return salariosAnuales;
}

function calcularMayorSalarioAnual(salariosAnuales) {
  let mayorSalarioAnual = salariosAnuales[0];
  for (let i = 0; i < salariosAnuales.length; i++) {
    if (salariosAnuales[i] > mayorSalarioAnual) {
      mayorSalarioAnual = salariosAnuales[i];
    }
  }

  return mayorSalarioAnual;
}

function calcularMenorSalarioAnual(salariosAnuales) {
  let menorSalarioAnual = salariosAnuales[0];
  for (let i = 0; i < salariosAnuales.length; i++) {
    if (salariosAnuales[i] < menorSalarioAnual) {
      menorSalarioAnual = salariosAnuales[i];
    }
  }

  return menorSalarioAnual;
}

function calculaPromedioSalariosAnuales(salariosAnuales) {
  let promedioSalariosAnuales = 0;
  for (let i = 0; i < salariosAnuales.length; i++) {
    promedioSalariosAnuales += salariosAnuales[i];
  }
  promedioSalariosAnuales = promedioSalariosAnuales / salariosAnuales.length;

  return promedioSalariosAnuales;
}

$form.onsubmit = validarFormularioSalarios;

const $formEdades = document.querySelector("#calcula-edades");

const $formIntegrantes = document.querySelector("#integrantes");

const cantidadIntegrantes = $formIntegrantes["cantidad-integrantes"].value;

function validarFormularioIntegrantes(event) {
  borrarIntegrantes();

  const $formIntegrantes = document.querySelector("#integrantes");

  const cantidadIntegrantes = Number($formIntegrantes["cantidad-integrantes"].value);
  const errorCantidadIntegrantes = validarCantidadIntegrantes(cantidadIntegrantes);

  const errores = {
    "cantidad-integrantes": errorCantidadIntegrantes,
  };

  if (!manejarErroresIntegrantes(errores)) {
    crearVariosIntegrantes(cantidadIntegrantes);
  }

  event.preventDefault();
}

function manejarErroresIntegrantes(errores) {
  const keys = Object.keys(errores);
  const $errores = document.querySelector("#errores");
  $errores.textContent = "";
  let hayError = false;

  keys.forEach(function (key) {
    const error = errores[key];
    if (error) {
      hayError = true;
      const $error = document.createElement("li");
      $formIntegrantes[key].className = "error";
      $error.innerText = error;
      $errores.appendChild($error);
    } else {
      $formIntegrantes[key].className = "";
    }
  });

  return hayError;
}

function borrarIntegrantes() {
  const $integrantes = document.querySelectorAll(".integrante");
  for (let i = 0; i < $integrantes.length; i++) {
    $integrantes[i].remove();
  }
}

function crearVariosIntegrantes(cantidadIntegrantes) {
  if (cantidadIntegrantes > 0) {
    mostrarBotonCalculo();
    mostrarBotonEmpezarDeNuevo();
  } else {
    resetear();
  }

  for (let i = 0; i < cantidadIntegrantes; i++) {
    crearIntegrante(i);
  }
}

function crearIntegrante(indice) {
  const $div = document.createElement("div");
  $div.className = "integrante";

  const $label = document.createElement("label");
  $label.textContent = "Edad del integrante número " + (indice + 1) + " ";
  const $input = document.createElement("input");
  $input.type = "number";
  $input.name = `Integrante${indice + 1}`;

  $div.appendChild($label);
  $div.appendChild($input);

  const $integrantes = document.querySelector("#campo-integrantes");
  $integrantes.appendChild($div);
}

function obtenerEdadesIntegrantes() {
  const $integrantes = document.querySelectorAll(".integrante input");
  const edades = [];
  for (let i = 0; i < $integrantes.length; i++) {
    edades.push(Number($integrantes[i].value));
  }
  return edades;
}

function validarFormularioCalculaEdades(event) {
  const edades = obtenerEdadesIntegrantes();
  const errorEdades = validarEdadesIntegrantes(edades);

  if (!manejarErroresEdades(errorEdades)) {
    const mayorEdad = calcularMayorEdad(edades);
    const menorEdad = calcularMenorEdad(edades);
    const promedioEdades = calculaPromedioEdades(edades);

    document.querySelector("#mayor-edad").value = `${mayorEdad}`;
    document.querySelector("#menor-edad").value = `${menorEdad}`;
    document.querySelector("#promedio-edad").value = `${promedioEdades}`;

    mostrarResultados();
  }

  event.preventDefault();
}

function manejarErroresEdades(errores) {
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
        $formEdades[key].className = "error";
      }
    } else {
      $formEdades[key].className = "";
      if ($campoError) {
        $campoError.remove();
      }
    }
  });

  return hayError;
}

document.querySelector("#borrar-todo").onclick = function (event) {
  resetear();

  event.preventDefault();
};

function resetear() {
  borrarIntegrantesAnteriores();
  ocultarBotonCalculo();
  ocultarResultados();
  ocultarBotonEmpezarDeNuevo();
}

function borrarIntegrantesAnteriores(cantidadIntegrantes) {
  const $integrantes = document.querySelectorAll(".integrante");
  for (let i = 0; i < $integrantes.length; i++) {
    $integrantes[i].remove();
  }
}

function ocultarBotonCalculo() {
  document.querySelector("#calcular").className = "oculto";
}

function mostrarBotonCalculo() {
  document.querySelector("#calcular").className = "";
}

function ocultarBotonEmpezarDeNuevo() {
  document.querySelector("#borrar-todo").className = "oculto";
}

function mostrarBotonEmpezarDeNuevo() {
  document.querySelector("#borrar-todo").className = "";
}

function ocultarResultados() {
  document.querySelector("#calculo").className = "oculto";
}

function mostrarResultados() {
  document.querySelector("#calculo").className = "";
}

function validarCantidadIntegrantes(cantidadIntegrantes) {
  if (cantidadIntegrantes == " ") {
    return "El campo cantidad de integrantes no puede estar vacío";
  }
  if (cantidadIntegrantes <= 0) {
    return "El campo cantidad de integrantes no puede ser cero o menor a cero";
  }

  return "";
}

function validarEdadesIntegrantes(edades) {
  let errores = {};
  for (let i = 0; i < edades.length; i++) {
    errores[`Integrante${i + 1}`] = "";

    if (edades[i] == " ") {
      errores[`Integrante${i + 1}`] = `Integrante#${i + 1} no puede estar vacío`;
    }
    if (edades[i] < 0) {
      errores[`Integrante${i + 1}`] = `Integrante#${i + 1} no puede ser menor a cero`;
    }
  }
  return errores;
}

document.querySelector("#integrantes").onsubmit = validarFormularioIntegrantes;
document.querySelector("#calcula-edades").onsubmit = validarFormularioCalculaEdades;

const $form = document.querySelector("#carta-a-santa");

const nombre = $form.nombre.value;
const ciudad = $form.ciudad.value;
const comportamiento = $form.comportamiento.value;
const descripcionRegalo = $form["descripcion-regalo"].value;

function validarNombre(nombre) {
  if (nombre.length === 0) {
    return "El campo nombre debe tener al menos 1 caracter";
  }
  if (nombre.length >= 50) {
    return "El campo nombre debe tener menos de 50 caracteres";
  }
  if (!/^[a-z]+$/i.test(nombre)) {
    //regular expression
    return "el campo nombre solo acepta letras";
  }
  return "";
}

function validarCiudad(ciudad) {
  if (ciudad.length === 0) {
    return "El campo ciudad no puede estar vacio";
  }

  return "";
}

function validarDescripcionRegalo(descripcionRegalo) {
  if (descripcionRegalo.length === 0) {
    return "El campo descripción regalo deberia tener al menos 1 caracter";
  }
  if (descripcionRegalo.length >= 255) {
    return "El campo descripción regalo debe tener menos de 255 caracteres";
  }

  return "";
}

function validarFormulario(event) {
  const $form = document.querySelector("#carta-a-santa");

  const nombre = $form.nombre.value;
  const ciudad = $form.ciudad.value;
  const descripcionRegalo = $form["descripcion-regalo"].value;

  const errorNombre = validarNombre(nombre);
  const errorCiudad = validarCiudad(ciudad);
  const errorDescripcionRegalo = validarDescripcionRegalo(descripcionRegalo);

  const errores = {
    nombre: errorNombre,
    ciudad: errorCiudad,
    "descripcion-regalo": errorDescripcionRegalo,
  };

  const esExito = manejarErrores(errores) === 0;

  if (esExito) {
    document.querySelector("#exito").className = "";
    $form.className = "oculto";
  }

  event.preventDefault();
}

function manejarErrores(errores) {
  const keys = Object.keys(errores);
  const $errores = document.querySelector("#errores");
  let cantidadErrores = 0;

  keys.forEach(function (key) {
    const error = errores[key];
    let $campoError = document.querySelector(`.error-${[key]}`);

    if (error) {
      $form[key].className = "error";
      cantidadErrores++;

      if ($campoError === null) {
        const $error = document.createElement("li");
        $error.innerText = error;
        $error.className = `error-${[key]}`;
        $errores.appendChild($error);
      }
    } else {
      $form[key].className = "";
      if ($campoError) {
        $campoError.remove();
      }
    }
  });

  return cantidadErrores;
}

$form.onsubmit = validarFormulario;

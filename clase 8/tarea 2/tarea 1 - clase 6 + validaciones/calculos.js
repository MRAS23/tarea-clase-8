function calcularMayorEdad(edades) {
  let mayorEdad = edades[0];
  for (let i = 0; i < edades.length; i++) {
    if (edades[i] > mayorEdad) {
      mayorEdad = edades[i];
    }
  }

  return mayorEdad;
}

function calcularMenorEdad(edades) {
  let menorEdad = edades[0];
  for (let i = 0; i < edades.length; i++) {
    if (edades[i] < menorEdad) {
      menorEdad = edades[i];
    }
  }

  return menorEdad;
}

function calculaPromedioEdades(edades) {
  let promedio = 0;
  for (let i = 0; i < edades.length; i++) {
    promedio += edades[i];
  }
  promedio = promedio / edades.length;

  return promedio;
}

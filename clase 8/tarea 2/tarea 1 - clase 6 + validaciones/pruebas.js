function probarValidarCantidadIntegrantes() {
  console.assert(
    validarCantidadIntegrantes(" ") === "El campo cantidad de integrantes no puede estar vacío",
    "Validar cantidad de integrantes no validó que el campo no este vacío"
  );
  console.assert(
    validarCantidadIntegrantes("-1") === "El campo cantidad de integrantes no puede ser cero o menor a cero",
    "Validar cantidad de integrantes no validó que el campo no sea cero o menor a cero"
  );
}

function probarValidarEdadesIntegrantes() {
  const errores1 = validarEdadesIntegrantes([" ", 10]);
  const errores = validarEdadesIntegrantes([-1, 1]);

  console.assert(
    errores1.Integrante1 === `Integrante#1 no puede estar vacío`,
    "validarEdades no comprobó que el campo no este vacío"
  );
  console.assert(
    errores.Integrante1 === `Integrante#1 no puede ser menor a cero`,
    "validarEdades no comprobó que el campo no sea menor a cero"
  );
}

probarValidarCantidadIntegrantes();
probarValidarEdadesIntegrantes();

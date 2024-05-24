function probarValidarSalarioss() {
  const errores1 = validarSalarios([" ", 10]);
  const errores = validarSalarios([-1, 1]);

  console.assert(
    errores1.Integrante1 === `Integrante#1 no puede estar vacío`,
    "validarSalarios no comprobó que el campo no este vacío"
  );
  console.assert(
    errores.Integrante1 === `Integrante#1 no puede ser menor a cero`,
    "validarSalarios no comprobó que el campo no sea menor a cero"
  );
}

probarValidarSalarioss();

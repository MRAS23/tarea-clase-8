function probarValidarNombre() {
  console.assert(
    validarNombre("") === "El campo nombre debe tener al menos 1 caracter",
    "Validar nombre no validó que el nombre no sea vacío"
  );

  console.assert(
    validarNombre("cincuentacincuentacincuentacincuentacincuentacincuenta") ===
      "El campo nombre debe tener menos de 50 caracteres",
    "Validar nombre no validó que el nombre sea menor a 50 caracteres"
  );

  console.assert(
    validarNombre("123123123") === "el campo nombre solo acepta letras",
    "validar nombre no valido que el campo nombre solo acepte letras"
  );

  console.assert(validarNombre("nombre") === "", "Validar nombre falló con un nombre válido"); //happy path
}

function probarValidarCiudad() {
  console.assert(validarCiudad("Salta") === "", "validar ciudad falló con una ciudad válida");

  console.assert(
    validarCiudad("") === "El campo ciudad no puede estar vacio",
    "Validar ciudad no validó que el nombre no sea vacío"
  );
}

function probarValidarDescripcionRegalo() {
  console.assert(
    validarDescripcionRegalo("descripción de regalo válida") === "",
    "validar descripción de regalo falló con una descripción válida"
  );

  console.assert(
    validarDescripcionRegalo("") === "El campo descripción regalo deberia tener al menos 1 caracter",
    "Validar descripción regalo no validó que descripción regalo no sea vacío"
  );

  console.assert(
    validarDescripcionRegalo(
      "12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890"
    ) === "El campo descripción regalo debe tener menos de 255 caracteres",
    "Validar descripción regalo no validó que descripción regalo tenga menos de 255 caracteres"
  );
}

probarValidarNombre();
probarValidarCiudad();
probarValidarDescripcionRegalo();

export const controlErrorMessage = {
  username: {
    required: "Ingrese un usuario válido",
    pattern: "El usuario solo debe contener letras"
  },
  password: {
    required: "Ingrese una contraseña válida",
    pattern: "La contraseña debe tener mínimo 8 catacteres, letras, y números. ",
    passwordMatch: "La contraseña no coincide"

  }
}

export const patternValidators = {
  onlyLetters: "[a-zA-Z-Ññ]+$",
  passwordSecure: "(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$"
}




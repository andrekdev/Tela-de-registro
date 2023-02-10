class UserRegisterValidation {
  constructor() {
    this.formulario = document.querySelector(".form-registro");
    this.eventos();
  }

  eventos() {
    this.formulario.addEventListener("submit", (e) => {
      this.handleSubmit(e);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const camposValidos = this.camposSaoValidos();
    const senhasValidas = this.senhasSaoValidas();

    if (camposValidos && senhasValidas) {
      alert("Seja bem vindo(a), camarada!");
      this.formulario.submit();
      this.flagSubmitInfo();
    }
  }

  senhasSaoValidas(campo) {
    let valid = true;

    const senha = this.formulario.querySelector(".senha");
    if (senha.value.length < 6 || senha.value.length > 17) {
      valid = false;
      this.criaErro(
        senha,
        "Veja, a senha precisa estar entre 6 e 17 caracteres"
      );
    }

    return valid;
  }

  camposSaoValidos() {
    let valid = true;

    for (let errorText of this.formulario.querySelectorAll(".error-text")) {
      errorText.remove();
    }

    for (let campo of this.formulario.querySelectorAll(".validar")) {
      const label = campo.previousElementSibling.innerText;
      if (!campo.value) {
        this.criaErro(campo, `${label} Esta vazio`);
        valid = false;
      }

      if (campo.classList.contains("nome")) {
        if (!this.validaUsuario(campo)) valid = false;
      }
    }
    return valid;
  }

  validaUsuario(campo) {
    const usuario = campo.value;
    let valid = true;
    if (usuario.length < 3 || usuario.length > 12) {
      this.criaErro(campo, "O usuario precisa ter entre 3 a 12 caracteres");
      valid = false;
    }

    return valid;
  }

  criaErro(campo, msg) {
    const div = document.createElement("div");
    div.innerHTML = msg;
    div.classList.add("error-text");

    campo.insertAdjacentElement("afterend", div);
  }

  flagSubmitInfo(campo) {
    location.href = "sucesso.html";
  }
}

const newUser = new UserRegisterValidation();

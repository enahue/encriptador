const textoIngresado = document.getElementById("texto-ingresado");
const textoResultado = document.getElementById("texto-resultado");
const btnEncriptar = document.getElementById("btn-encriptar");
const btnDesencriptar = document.getElementById("btn-desencriptar");
const textoVacio = document.getElementById("validacion-texto");
const btnCopiar = document.getElementById("btn-copiar");

function notify(message, color) {
  Toastify({
    text: message,
    className: "info",
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    style: {
      background: color,
      borderRadius: "20px",
      boxShadow:
        "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
      backdropFilter: "blur(1px) saturate(172%)",
      backdropFilter: "blur(1px) saturate(172%)",
      backgroundColor: "rgba(152, 165, 174, 0.75)",
    },
  }).showToast();
}


function encriptarTexto() {
  const reemplazoVocales = {
    e: "enter",
    i: "imes",
    a: "ai",
    o: "ober",
    u: "ufat",
  };
  let textoUsuario = textoIngresado.value;
  const textoModificado = textoUsuario
    .toLowerCase()
    .replace(
      /[aeiou]/g,
      (vocal) => reemplazoVocales[vocal.toLowerCase()] || vocal
    );
  textoResultado.textContent = textoModificado;
  textoIngresado.value = "";

}

function desencriptarTexto() {
  const reemplazoClaves = {
    enter: "e",
    imes: "i",
    ai: "a",
    ober: "o",
    ufat: "u",
  };
  let textoUsuario = textoIngresado.value;
  const textoOriginal = textoUsuario
    .toLowerCase()
    .replace(/enter|imes|ai|ober|ufat/g, (clave) => reemplazoClaves[clave]);
  textoResultado.textContent = textoOriginal;
  textoIngresado.value = "";

}

function copyToClipboard(texto) {
  return navigator.clipboard.writeText(texto);
}


function validarCampos(operacion) {
  if (textoResultado.textContent.length <= 0) {
    textoVacio.style.display = "block";
    notify("⚠️ Ingrese un texto", "#FF0000");
  } else {
    textoVacio.style.display = "none";
    notify(`✅ ${operacion} con exito`, "#03C988");
    return;
  }
}

btnEncriptar.addEventListener("click", () => {
  validarCampos('Encriptado');
  encriptarTexto();
});

btnDesencriptar.addEventListener("click", () => {
  validarCampos('Desencriptado');
  desencriptarTexto();
});

btnCopiar.addEventListener("click", () => {
  copyToClipboard(textoResultado.textContent);
  notify("🟢 Copiado al portapapeles", "#7F8487");
});

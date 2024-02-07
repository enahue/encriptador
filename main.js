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

function encriptarTexto(operacion) {
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
  notify(`✅ ${operacion} con exito`, "#03C988");
  return textoModificado;
}

function desencriptarTexto(operacion) {
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
  notify(`✅ ${operacion} con exito`, "#03C988");
  return textoOriginal;
}

function copyToClipboard(texto) {
  if(textoResultado.textContent.length <= 0){
    notify("⚠️ No hay texto para copiar", "#FF0000");
  }else{
    notify("❇️ Copiado al portapapeles", "#7F8487");
    return navigator.clipboard.writeText(texto);
  }
}

function quitarImagen() {
  if (textoIngresado.textContent.length <= 0) {
    textoVacio.style.display = "none";
    notify("esconder", "#03C988");
    textoVacio.style.display = "block";
  } else {
    notify("⚠️ Ingrese un texto", "#FF0000");
  }
}



btnEncriptar.addEventListener("click", () => {
  if (textoIngresado.value.length > 0) {
    textoResultado.textContent = encriptarTexto("Encriptado");
    textoVacio.style.display = "none";
    textoIngresado.value = "";
  } else {
    notify("⚠️ Ingrese un texto", "#FF0000");
    textoVacio.style.display = "block";
    textoResultado.textContent = "";
  }
});

btnDesencriptar.addEventListener("click", () => {
  if (textoIngresado.value.length > 0) {
    textoResultado.textContent = desencriptarTexto("Desencriptado");
    textoVacio.style.display = "none";
    textoIngresado.value = "";
  } else {
    notify("⚠️ Ingrese un texto", "#FF0000");
    textoVacio.style.display = "block";
    textoResultado.textContent = "";
  }
});

btnCopiar.addEventListener("click", () => {
  copyToClipboard(textoResultado.textContent);
});

const textoIngresado = document.getElementById("texto-ingresado");
const textoResultado = document.getElementById("texto-resultado");
const btnEncriptar = document.getElementById("btn-encriptar");
const btnDesencriptar = document.getElementById("btn-desencriptar");
const textoVacio = document.getElementById("validacion-texto");
const imagenMensage = document.getElementById("imagen-mensaje");
const btnCopiar = document.getElementById("btn-copiar");
const sMensaje = document.getElementById("s-mensaje");
const textoMensaje = document.getElementById("texto-mensaje");
const excluded = /[~!@#$%^&*()_+|}{[\]\\\/?><:"`;.,áéíóúàèìòù'ñÑA-Z]/g;

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
  if(validarCampos(textoIngresado.value, "encriptar")){
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
  textoVacio.style.display = "none";
  textoIngresado.value = "";
  notify(`✅ Encriptado con exito`, "#03C988");
  textoResultado.textContent =  textoModificado;
    }
}

function desencriptarTexto() {
  if(validarCampos(textoIngresado.value, "desencriptar")){
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
  textoVacio.style.display = "none";
  textoIngresado.value = "";
  notify(`✅ Desencriptado con exito`, "#03C988");
  textoResultado.textContent =  textoOriginal;
}
}

function copyToClipboard() {
  if(textoResultado.textContent.length <= 0){
    notify("⚠️ No hay texto para copiar", "#FF0000");
  }else{
    notify("❇️ Copiado al portapapeles", "#7F8487");
    return navigator.clipboard.writeText(textoResultado.textContent);
  }
}

function validarCampos(inputText, operacion) {
  if(inputText == "" ) {
      sMensaje.style.color= "black";
      textoMensaje.style.color= "black";
      sMensaje.style.display = "block";
      textoVacio.style.display = "block";
      textoResultado.textContent = "";
      sMensaje.innerHTML ="Ningún mensaje fue encontrado";
      textoMensaje.innerHTML ="Ingresa el texto que deseas encriptar o desencriptar.";
      return false;
  }

  if(inputText.match(excluded)) {
    sMensaje.style.color= "red";
    sMensaje.innerHTML = "<span class='bi bi-exclamation-octagon'></span> Error, no fue posible " + operacion;
    textoMensaje.style.display = "flex";
    textoMensaje.style.color = "orange";
    textoMensaje.textContent = "Las mayusculas, simbolos y caracteres especiales (incluidos acentos o similares) estan excluidos, por favor remueve esos caracteres e intenta de nuevo.";
    textoIngresado.value ="";
      return false;
  }
  
  return true;
}

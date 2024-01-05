export default function generarCodigo() {
  let longitud = 6;
  let caracteres = '0123456789';
  let codigo = '';
  for (var i = 0; i < longitud; i++) {
    codigo += caracteres.charAt(
      Math.floor(Math.random() * caracteres.length)
    );
  }
  return codigo;
}

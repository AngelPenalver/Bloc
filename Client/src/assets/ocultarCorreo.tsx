export const ocultarCorreo = (correo: string) => {
    const [nombre, dominio] = correo.split("@");
    return nombre[0] + "***" + "@" + dominio;
  };
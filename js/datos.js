/* ============================================
   DATOS — constantes y contenido de los módulos
   Preguntas: tomadas del documento entregado
   (preguntas_por_modulos.docx), asignadas en el
   mismo orden a nuestros 6 módulos — el nombre que
   cada tema tenía en ese documento no se usó para
   nada, solo el contenido de las preguntas.
   Los videos son de YouTube (no listados) — cada
   módulo trae su youtubeId (o null si aún no tiene
   video, en cuyo caso se usa el botón manual de
   respaldo). Para cambiar un video, solo hay que
   reemplazar el youtubeId aquí, no hace falta tocar
   nada más.
   ============================================ */

const CLAVE_ESTADO = "ntsc_estado";
const INTENTOS_MAXIMOS = 3;
const PORCENTAJE_APROBACION = 0.7;

/* Video de la sección de Bienvenida (ID de YouTube, video "no listado"). */
const BIENVENIDA_YOUTUBE_ID = "wxTF6LlK70o";

const MODULOS = [
  {
    id: "modulo1", titulo: "Huella digital", duracion: "3:47 min", nivel: "Fácil", youtubeId: "Fh6I3xxwWIw",
    resumen: "Qué es la huella digital, por qué no se borra fácilmente y cómo tus publicaciones de hoy pueden encontrarte en el futuro.",
    preguntas: [
      { pregunta: "¿Qué debemos hacer para proteger nuestros datos personales en internet?", opciones: ["Compartirlos con cualquier persona.", "Mantenerlos seguros y compartirlos solo cuando sea necesario.", "Publicarlos en redes sociales.", "Enviarlos a personas desconocidas."], correcta: 1 },
      { pregunta: "¿Cuál de los siguientes es un dato personal que debemos proteger?", opciones: ["Nuestra contraseña.", "Nuestro color favorito.", "Nuestro deporte favorito.", "Nuestra película favorita."], correcta: 0 },
      { pregunta: "¿Es recomendable compartir nuestra contraseña con otras personas?", opciones: ["Verdadero", "Falso"], correcta: 1 },
      { pregunta: "¿Cuál es una buena forma de proteger nuestras cuentas?", opciones: ["Usar la misma contraseña para todo.", "Compartir la contraseña con amigos.", "Escribir la contraseña en publicaciones.","Utilizar contraseñas seguras."], correcta: 3 },
      { pregunta: "¿Por qué es importante proteger nuestros datos personales?", opciones: ["Para conseguir más seguidores.", "Para publicar más información.", "Para evitar posibles riesgos y proteger nuestra privacidad.", "Para aceptar todas las solicitudes de amistad."], correcta: 2 },
    ],
  },
  {
    id: "modulo2", titulo: "Privacidad", duracion: "3:14 min", nivel: "Fácil", youtubeId: "ZZkCN3qWBas",
    resumen: "Cómo configurar la privacidad de tus cuentas y decidir con criterio qué compartir y con quién.",
    preguntas: [
      { pregunta: "¿Qué es la privacidad de los datos?", opciones: ["La protección y control de nuestra información personal.", "Compartir todos nuestros datos.", "Publicar información de otras personas.", "Eliminar nuestras redes sociales."], correcta: 0 },
      { pregunta: "¿Cuál de estos datos debemos proteger especialmente?", opciones: ["Nuestro color favorito.", "Nuestra comida favorita.","Nuestra contraseña.",  "Nuestro deporte preferido."], correcta: 2 },
      { pregunta: "Es importante revisar la configuración de privacidad de nuestras redes sociales.", opciones: ["Verdadero", "Falso"], correcta: 0 },
      { pregunta: "¿Qué puede ocurrir si dejamos nuestros datos personales públicos?", opciones: ["Siempre estaremos más seguros.", "Cualquier persona podría acceder a ellos.", "Nuestra información desaparecerá.", "Nadie podrá verla."], correcta: 1 },
      { pregunta: "¿Qué debemos hacer si una aplicación solicita información personal?", opciones: ["Dar toda la información sin revisar.", "Revisar qué información solicita y para qué la necesita.", "Compartir también nuestras contraseñas.", "Ignorar siempre la solicitud."], correcta: 1 },
    ],
  },
  {
    id: "modulo3", titulo: "Ciberacoso", duracion: "4:05 min", nivel: "Medio", youtubeId: "0X9JtHGOUYY",
    resumen: "Cómo identificar el ciberacoso, qué hacer si te ocurre a ti o a alguien cercano, y dónde pedir ayuda.",
    preguntas: [
      { pregunta: "¿Qué significa que una publicación tenga un gran alcance?", opciones: ["Que puede llegar a muchas personas.", "Que solamente la ve quien la publica.", "Que se elimina rápidamente.", "Que nadie puede compartirla."], correcta: 0 },
      { pregunta: "¿Qué puede pasar con una foto publicada en internet?", opciones: ["Solo puede verla el dueño.", "Desaparece automáticamente.", "Nunca puede descargarse.", "Puede ser compartida por otras personas.",], correcta: 3 },
      { pregunta: "Lo que publicamos en internet puede llegar a personas que no conocemos.", opciones: ["Verdadero", "Falso"], correcta: 0 },
      { pregunta: "Antes de compartir una publicación debemos preguntarnos:", opciones: ["¿Cuántos \"me gusta\" tendrá?", "¿Podría afectar mi privacidad o la de otra persona?", "¿Será la publicación más famosa?", "¿Todos mis amigos la compartirán?"], correcta: 1 },
      { pregunta: "¿Cuál es una forma responsable de compartir contenido?", opciones: ["Publicar sin pensar.", "Compartir información privada de otras personas.", "Pensar antes de publicar y respetar la privacidad.", "Compartir cualquier contenido que recibamos."], correcta: 2 },
    ],
  },
  {
    id: "modulo4", titulo: "Desinformación", duracion: "3:58 min", nivel: "Medio", youtubeId: "axStca1xfuo",
    resumen: "Cómo reconocer noticias falsas y verificar información antes de compartirla.",
    preguntas: [
      { pregunta: "¿Qué es el rastro digital?", opciones: ["La información que dejamos al utilizar internet.", "Una contraseña.", "Un programa de computadora.", "Un tipo de teléfono."], correcta: 0 },
      { pregunta: "¿Cuál puede formar parte de nuestro rastro digital?", opciones: ["Únicamente nuestras fotografías impresas.", "Publicaciones y comentarios en redes sociales.", "La ropa que utilizamos.", "Los objetos de nuestra casa."], correcta: 1 },
      { pregunta: "Las actividades que realizamos en internet pueden dejar información sobre nosotros.", opciones: ["Verdadero", "Falso"], correcta: 0 },
      { pregunta: "¿Por qué debemos cuidar nuestro rastro digital?", opciones: ["Porque internet deja de funcionar.", "Porque elimina nuestras cuentas.", "Porque aumenta automáticamente nuestras contraseñas.","Porque puede afectar nuestra privacidad y nuestra imagen."], correcta: 3 },
      { pregunta: "¿Cuál es una buena forma de cuidar nuestro rastro digital?", opciones: ["Publicar información constantemente.", "Revisar lo que publicamos y compartimos.", "Compartir datos con desconocidos.", "Utilizar la misma contraseña para todo."], correcta: 1 },
    ],
  },
  {
    id: "modulo5", titulo: "Bienestar digital", duracion: "8:10 min", nivel: "Fácil", youtubeId: "HwqC5VqcbcA",
    resumen: "Cómo equilibrar el tiempo en pantalla y reconocer cuándo las redes sociales afectan tu ánimo.",
    preguntas: [
      { pregunta: "¿Cuál es una oportunidad que ofrece el mundo digital?", opciones: ["Perder toda nuestra información.", "Acceder a información y aprender.", "Evitar cualquier comunicación.", "No poder estudiar."], correcta: 1 },
      { pregunta: "¿Cuál de los siguientes es un riesgo en línea?", opciones: ["Aprender nuevas cosas.", "Comunicarnos con otras personas.", "Estafas y perfiles falsos.", "Acceder a cursos educativos."], correcta: 2 },
      { pregunta: "Internet puede ofrecer oportunidades, pero también presenta riesgos.", opciones: ["Verdadero", "Falso"], correcta: 0 },
      { pregunta: "¿Qué debemos hacer ante un posible mensaje de estafa?", opciones: ["Responder inmediatamente.", "Compartir nuestros datos.", "Verificar la información antes de actuar.", "Enviar dinero."], correcta: 2 },
      { pregunta: "¿Cuál es una forma de aprovechar responsablemente el mundo digital?", opciones: ["Utilizar internet de manera segura y responsable.", "Compartir información privada.", "Confiar en cualquier persona.", "Abrir todos los enlaces recibidos."], correcta: 0 },
    ],
  },
  {
    id: "modulo6", titulo: "Uso responsable", duracion: "8:48 min", nivel: "Medio", youtubeId: "WccCZVjofEo",
    resumen: "Buenas prácticas para publicar, comentar e interactuar de forma responsable en redes sociales.",
    preguntas: [
      { pregunta: "¿Qué significa conectarse con responsabilidad?", opciones: ["Estar conectado todo el día.", "Compartir toda nuestra información.", "Utilizar internet de manera segura, respetuosa y consciente.", "Aceptar a cualquier persona en redes sociales."], correcta: 2 },
      { pregunta: "¿Cuál es una conducta responsable en internet?", opciones: ["Respetar a los demás.", "Compartir rumores.", "Publicar información privada de otras personas.", "Insultar a otros usuarios."], correcta: 0 },
      { pregunta: "Debemos pensar antes de publicar o compartir contenido en internet.", opciones: ["Verdadero", "Falso"], correcta: 0 },
      { pregunta: "¿Qué debemos hacer si recibimos un mensaje sospechoso?", opciones: ["Compartirlo con todos nuestros contactos.", "Abrir cualquier enlace que contenga.", "Verificarlo y evitar proporcionar información personal.", "Responder con nuestros datos."], correcta: 2 },
      { pregunta: "¿Cuál es el principal objetivo de conectarnos responsablemente?", opciones: ["Tener más seguidores.", "Protegernos y utilizar la tecnología de forma segura y respetuosa.", "Publicar más contenido.", "Pasar más tiempo en redes sociales."], correcta: 1 },
    ],
  },
];

/* Evaluación final — una pregunta de cada uno de los 6 temas del
   documento, sin importar el módulo al que quedó asignada arriba. */
const EVALUACION_FINAL = {
  titulo: "Evaluación final",
  preguntas: [
    { pregunta: "¿Por qué es importante proteger nuestros datos personales?", opciones: ["Para evitar posibles riesgos y proteger nuestra privacidad.", "Para conseguir más seguidores.", "Para publicar más información.", "Para aceptar todas las solicitudes de amistad."], correcta: 0 },
    { pregunta: "¿Qué puede ocurrir si dejamos nuestros datos personales públicos?", opciones: ["Siempre estaremos más seguros.", "Cualquier persona podría acceder a ellos.", "Nuestra información desaparecerá.", "Nadie podrá verla."], correcta: 1 },
    { pregunta: "¿Es recomendable compartir nuestra contraseña con otras personas?", opciones: ["Verdadero", "Falso"], correcta: 1 },
    { pregunta: "¿Cuál de los siguientes es un riesgo en línea?", opciones: ["Aprender nuevas cosas.", "Comunicarnos con otras personas.", "Estafas y perfiles falsos.", "Acceder a cursos educativos."], correcta: 2 },
    { pregunta: "¿Cuál es el principal objetivo de conectarnos responsablemente?", opciones: ["Tener más seguidores.", "Protegernos y utilizar la tecnología de forma segura y respetuosa.", "Publicar más contenido.", "Pasar más tiempo en redes sociales."], correcta: 1 },
    { pregunta: "Debemos pensar antes de publicar o compartir contenido en internet.", opciones: ["Verdadero", "Falso"], correcta: 0 },
    { pregunta: "Antes de compartir una publicación debemos preguntarnos:", opciones: ["¿Cuántos \"me gusta\" tendrá?", "¿Podría afectar mi privacidad o la de otra persona?", "¿Será la publicación más famosa?", "¿Todos mis amigos la compartirán?"], correcta: 1 },
    { pregunta: "Lo que publicamos en internet puede llegar a personas que no conocemos.", opciones: ["Verdadero", "Falso"], correcta: 0 },
    { pregunta: "Internet solo puede ofrecer oportunidades.", opciones: ["Verdadero", "Falso"], correcta: 1 },
    { pregunta: "¿Por qué debemos cuidar nuestro rastro digital?", opciones: ["Porque puede afectar nuestra privacidad y nuestra imagen.", "Porque internet deja de funcionar.", "Porque elimina nuestras cuentas.", "Porque aumenta automáticamente nuestras contraseñas."], correcta: 0 },
  ],
};

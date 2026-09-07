/* ============================================
   DATOS — constantes y contenido de los módulos
   Preguntas de ejemplo: reemplázalas por las reales.
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
const BIENVENIDA_YOUTUBE_ID = "0X9JtHGOUYY";

const MODULOS = [
  {
    id: "modulo1", titulo: "Huella digital", duracion: "3:47 min", nivel: "Fácil", youtubeId: "Fh6I3xxwWIw",
    resumen: "Qué es la huella digital, por qué no se borra fácilmente y cómo tus publicaciones de hoy pueden encontrarte en el futuro.",
    preguntas: [
      { pregunta: "¿Qué es la huella digital?", opciones: ["El rastro que dejas al usar internet", "Un tipo de virus informático", "La huella dactilar escaneada"], correcta: 0 },
      { pregunta: "¿Una publicación borrada desaparece por completo de internet?", opciones: ["Sí, siempre", "No necesariamente, puede haber sido guardada o compartida", "Solo si tiene pocas visitas"], correcta: 1 },
      { pregunta: "¿Quién puede ver tu huella digital?", opciones: ["Solo tú", "Solo tus amigos", "Potencialmente cualquier persona, incluso en el futuro"], correcta: 2 },
    ],
  },
  {
    id: "modulo2", titulo: "Privacidad", duracion: "3:14 min", nivel: "Fácil", youtubeId: "ZZkCN3qWBas",
    resumen: "Cómo configurar la privacidad de tus cuentas y decidir con criterio qué compartir y con quién.",
    preguntas: [
      { pregunta: "¿Qué es una cuenta 'pública' en redes sociales?", opciones: ["Solo la ven tus contactos", "La puede ver cualquier persona", "Solo la ve tu familia"], correcta: 1 },
      { pregunta: "Antes de publicar tu ubicación, es buena idea...", opciones: ["Hacerlo siempre en tiempo real", "Pensar si es necesario compartirla", "No importa, nadie la ve"], correcta: 1 },
      { pregunta: "¿Qué dato es más sensible compartir públicamente?", opciones: ["Tu color favorito", "Tu dirección de casa", "Tu serie favorita"], correcta: 1 },
    ],
  },
  {
    id: "modulo3", titulo: "Ciberacoso", duracion: "4:05 min", nivel: "Medio", youtubeId: "0X9JtHGOUYY",
    resumen: "Cómo identificar el ciberacoso, qué hacer si te ocurre a ti o a alguien cercano, y dónde pedir ayuda.",
    preguntas: [
      { pregunta: "¿Qué es el ciberacoso?", opciones: ["Un juego en línea", "Hostigar o intimidar a alguien por medios digitales", "Un tipo de publicidad"], correcta: 1 },
      { pregunta: "Si alguien te acosa por redes sociales, deberías...", opciones: ["Responder con más agresividad", "Guardar evidencia y contarle a un adulto de confianza", "Ignorarlo y no decir nada a nadie"], correcta: 1 },
      { pregunta: "¿Es válido pedir ayuda si ves a alguien siendo acosado en línea?", opciones: ["No, no es asunto tuyo", "Sí, siempre es válido", "Solo si es tu mejor amigo"], correcta: 1 },
    ],
  },
  {
    id: "modulo4", titulo: "Desinformación", duracion: "3:58 min", nivel: "Medio", youtubeId: "axStca1xfuo",
    resumen: "Cómo reconocer noticias falsas y verificar información antes de compartirla.",
    preguntas: [
      { pregunta: "Antes de compartir una noticia impactante, deberías...", opciones: ["Compartirla de inmediato", "Verificar la fuente primero", "Solo mirar el titular"], correcta: 1 },
      { pregunta: "¿Qué es una señal de posible noticia falsa?", opciones: ["Viene de un medio reconocido", "Tiene fuentes citadas", "Título exagerado sin fuente clara"], correcta: 2 },
      { pregunta: "¿Compartir información falsa sin saberlo tiene consecuencias?", opciones: ["No, si no lo sabías no pasa nada", "Sí, igual puede generar daño o confusión", "Solo si lo compartes muchas veces"], correcta: 1 },
    ],
  },
  {
    id: "modulo5", titulo: "Bienestar digital", duracion: "7 min", nivel: "Fácil", youtubeId: null,
    resumen: "Cómo equilibrar el tiempo en pantalla y reconocer cuándo las redes sociales afectan tu ánimo.",
    preguntas: [
      { pregunta: "¿Qué es el bienestar digital?", opciones: ["Tener el celular más caro", "Una relación sana con la tecnología", "Usar internet todo el día"], correcta: 1 },
      { pregunta: "Una señal de que necesitas una pausa de redes sociales es...", opciones: ["Sentirte con más energía", "Sentirte ansioso o comparándote todo el tiempo", "Dormir mejor"], correcta: 1 },
      { pregunta: "¿Establecer límites de tiempo en pantalla es útil?", opciones: ["Sí, puede ayudar a equilibrar tu rutina", "No, no sirve de nada", "Solo para adultos"], correcta: 0 },
    ],
  },
  {
    id: "modulo6", titulo: "Uso responsable", duracion: "8 min", nivel: "Medio", youtubeId: null,
    resumen: "Buenas prácticas para publicar, comentar e interactuar de forma responsable en redes sociales.",
    preguntas: [
      { pregunta: "Antes de comentar algo fuerte, es buena idea...", opciones: ["Publicarlo sin pensar", "Pensar cómo se sentiría la otra persona", "No importa lo que sientan otros"], correcta: 1 },
      { pregunta: "¿Qué significa ser un buen ciudadano digital?", opciones: ["Tratar a otros con respeto también en línea", "Tener muchos seguidores", "Publicar todos los días"], correcta: 0 },
      { pregunta: "Si ves contenido dañino o falso, lo más responsable es...", opciones: ["Compartirlo para que otros lo vean", "Reportarlo y no viralizarlo", "No hacer nada"], correcta: 1 },
    ],
  },
];

/* Evaluación final — de prueba, combina los 6 temas. Reemplázala por la versión definitiva. */
const EVALUACION_FINAL = {
  titulo: "Evaluación final",
  preguntas: [
    { pregunta: "¿Por qué es importante cuidar tu huella digital?", opciones: ["Porque lo que publicas puede permanecer y encontrarte en el futuro", "Porque internet borra todo automáticamente a los 30 días", "No es realmente importante"], correcta: 0 },
    { pregunta: "¿Qué deberías revisar antes de compartir tu ubicación?", opciones: ["Nada, siempre es seguro", "Si es realmente necesario compartirla", "Solo si tienes muchos seguidores"], correcta: 1 },
    { pregunta: "Si presencias ciberacoso hacia otra persona, lo correcto es...", opciones: ["Ignorarlo", "Sumarte a los comentarios", "Reportarlo y buscar ayuda de un adulto de confianza"], correcta: 2 },
    { pregunta: "Antes de compartir una noticia impactante, deberías...", opciones: ["Compartirla de inmediato para avisar a todos", "Verificar la fuente primero", "Solo mirar el titular"], correcta: 1 },
    { pregunta: "Una señal de que necesitas una pausa de redes sociales es...", opciones: ["Sentirte ansioso o comparándote todo el tiempo", "Sentirte con más energía", "Dormir mejor que nunca"], correcta: 0 },
    { pregunta: "Ser un buen ciudadano digital significa...", opciones: ["Tener muchos seguidores", "Tratar a otros con respeto también en línea", "Publicar todos los días sin excepción"], correcta: 1 },
  ],
};

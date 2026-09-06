/* ============================================
   INIT — arranque de la aplicación
   Se carga al final, después de todos los demás
   archivos, para que todas las funciones ya
   existan cuando se ejecuta.
   ============================================ */

if (estado.nombre) inputNombre.value = estado.nombre;
renderPanel();
renderSidebar();
mostrarVista(estado.nombre ? "view-dashboard" : "view-inicio");
if (estado.nombre) mostrarCampanaSiEsPrimeraVez();

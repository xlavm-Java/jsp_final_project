var tour_pagina = new Tour();

tour_pagina.addSteps([
    {
        title: "Bienvenido!",
        content: "Con este tour aprender&aacute;s algunas de las cosas que puedes hacer en esta p&aacute;gina, entre ellas: agendar, buscar y visualizar citas; agregar notas y seleccionar sucursales. Empecemos!",
        orphan: true
    },
    {
        element: $("#sucursal_selected_id"),
        title: "Sucursal",
        content: "Selecciona tu sucursal en caso de tener m&aacute;s de una."
    },
    {
        element: $("#lista"),
        title: "Doctor",
        content: "Selecciona un(a) doctor(a) para ver sus horas agendadas o agendarle nuevas horas."
    },
    {
        element: $("#calendar"),
        placement: "top",
        title: "Agenda una hora",
        content: "Haciendo click dentro de este calendario puedes agendar horas a nuevos pacientes, tambi&eacute;n puedes hacer click sobre horas ya creadas para visualizarlas."
    },
    {
        element: $("#checkbox_insertar_nota"),
        title: "Inserta una nota",
        content: "Haciendo click ac&aacute; puedes insertar notas dentro del calendario en vez de agendar horas, muy &uacute;til para recordar eventos especiales o bloquear horas."
    },
    {
        element: $("#pestana_estados_img"),
        placement:"left",
        title: "Visualiza los estados",
        content: "Haciendo click ac&aacute; puedes visualizar los estados de las citas de tu cl&iacute;nica."
    },
    {
        title: "Fin",
        content: "Con este tour ya aprendiste las cosas b&aacute;sicas que puedes hacer en esta p&aacute;gina. Haz click en \"Fin tour\" para cerrar el tour.",
        orphan: true
    }
]);

function tour_pagina_init() {
    tour_pagina.end();
    if (tour_pagina.ended()) {
        tour_pagina.restart();
    } else {
        tour_pagina.init();
        tour_pagina.start(true);
    }
}

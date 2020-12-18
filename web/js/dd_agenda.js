var rut_repetido    = false;
var texto_nombre    = '';
var available_names = [];

$(document).ready(function() {
    $('title').html(desk_agenda.title);
    $('#menu_inicio').addClass('active');

    /* Ingresa al home valida que sea o no su primera vez */
    if ($('#intentos').val() === '0' && ($('#id_perfil').val() == '1' || $('#id_perfil').val() == '4')) {
        $('#modal_home').modal('show');
    }

    $('#btn_no_mostrar_modal').click(function(event) {
        $('#modal_home').modal('hide');
        $.ajax({
            type     : 'post',
            dataType : 'json',
            url      : 'ajax/ajaxAgenda.php',
            data : {
                accion : 'no_mostrar_modal'
            },
            success: function(data) {
            },
            error: function(data) {
                if (typeof data.responseText != 'undefined') {
                    data_response = $.parseJSON(data.responseText);
                    if (data_response.code == 403) {
                        sesion_caducada();
                    }
                }
            },
            complete: function() {
            }
        });
    });

    /* Ocultar doctores en el caso de que perfil no es dentista(2) o tecnico(8) */
    if ($('#id_perfil').val() != '2' && $('#id_perfil').val() != '8') {
        $('#div_profesionales').removeClass('hide');
    }

    var cookie_sucursal = getCookie('sucursal_selected_'+ $('#usuario').val());
    if (cookie_sucursal !== null && cookie_sucursal !== '' && $('#sucursal_selected_id option[value='+ cookie_sucursal +']').val() !== undefined) {
        $('#sucursal_selected_id').val(cookie_sucursal);
    }

    $('#sucursal_selected_id').change(function(event) {
        if ($('#sucursal_selected_id').val() > 0) {
            $('header .logo_div').attr('style', 'background-image: url('+ sucursales_empleado[$('#sucursal_selected_id').val()].icono +')');
            $('#cita_print .logo_print').attr('src', sucursales_empleado[$('#sucursal_selected_id').val()].icono);
        }
        filtrar_profesional($('#sucursal_selected_id').val());
    });

    // Cargo los logos y sucursales segun la sucursal inicial
    $('#sucursal_selected_id').change();

    $('#btn_ver_mas_estados').click(function(event) {
        if ($('#btn_ver_mas_estados span').hasClass('arrow_open')) {
            // Abrir
            $('.div_estados').addClass('estados_open');
            $('#btn_ver_mas_estados span').attr('class', 'arrow_close');
            $('.div_estados').animate({
                height: ((iconos_estados.length * 30) + 45) +'px'
            });
            $('#btn_ver_mas_estados p').text(desk_global.btn_ver_menos);
        } else {
            // Cerrar
            $('.div_estados').removeClass('estados_open');
            $('#btn_ver_mas_estados span').attr('class', 'arrow_open');
            $('.div_estados').animate({
                height: '122px'
            });
            $('#btn_ver_mas_estados p').text(desk_global.btn_ver_mas);
        }
    });

    $('#btn_ver_mas_ayuda').click(function(event) {
        if ($('#btn_ver_mas_ayuda span').hasClass('arrow_open')) {
            // Abrir
            $('.ayuda_agenda').addClass('ayuda_open');
            $('#btn_ver_mas_ayuda span').attr('class', 'arrow_close');
            var el = $('.ayuda_agenda'),
                curHeight = el.height(),
                autoHeight = el.css('height', 'auto').height();
            el.height(curHeight).animate({height: autoHeight});
            $('#btn_ver_mas_ayuda p').text(desk_global.btn_ver_menos);
        } else {
            // Cerrar
            $('.ayuda_agenda').removeClass('ayuda_open');
            $('#btn_ver_mas_ayuda span').attr('class', 'arrow_open');
            $('.ayuda_agenda').animate({
                height: 0
            });
            $('#btn_ver_mas_ayuda p').text(desk_global.btn_ver_mas);
        }
    });

    /***** Datos del modal del calendario **********/
    $('#btn_modal_nota').click(function(event) {
        $('#div_enlace_cita').removeClass('invisible');
        $('#h5_title_cita').addClass('invisible');
        clean_modal_nota();
        $('#start_nota').val($('#start').val());
        $('#hora_nota').val($('#horac').val());
        $('#minutos_nota').val($('#minutos').val());
        $('#horario_nota').val($('#horario_cita').val());
        $('#largo_nota').val($('#largo').val());
        $('#dia_nota').val($('#diacita').val());
        $('#mes_nota').val($('#mescita').val());
        $('#anio_nota').val($('#aniocita').val());
        $('#modal_cita').modal('hide').on('hidden.bs.modal', function(event) {
            $('#modal_nota').modal('show');
            $(this).off('hidden.bs.modal'); // Remove the 'on' event binding
        });
    });

    $('#todo_el_dia_nota').change(function(event) {
        if ($('#todo_el_dia_nota').is(':checked')) {
            $('.nota_tiempo').addClass('hide');
            $('.nota_periodo').removeClass('hide');
        } else {
            $('.nota_tiempo').removeClass('hide');
            $('.nota_periodo').addClass('hide');
        }
        $('#repetir_nota').prop('checked', false);
        $('.nota_fecha_termino').addClass('hide');
    });

    $('#repetir_nota').change(function(event) {
        if ($('#repetir_nota').is(':checked')) {
            $('.nota_fecha_termino').removeClass('hide');
            $('#dia_nota_termino').val($('#dia_nota').val());
            $('#mes_nota_termino').val($('#mes_nota').val());
            $('#anio_nota_termino').val($('#anio_nota').val());
        } else {
            $('.nota_fecha_termino').addClass('hide');
        }
    });

    $('#btn_open_modal_nota').click(function(event) {
        $('#modal_nota').modal('hide').on('hidden.bs.modal', function(event) {
            $('#modal_cita').modal('show');
            $(this).off('hidden.bs.modal'); // Remove the 'on' event binding
        });
    });

    $('#nombre_norden').change(function(event) {
        $('#nombre').val(this.value);
    });

    $('#nombre_norden').keydown(function(event) {
        texto_nombre = this.value;
    });
    
    // Variable, mantiene el ID del último ajax que llamó a la función
    var flagAjaxBuscador = 0;

    $('#nombre_norden').keyup(function(event) {
        if (event.keyCode == 27) {
            event.preventDefault();
            $('#dropdown_norden').hide();
        } else if (this.value.length >= 3) {
            if (texto_nombre != this.value) {
                $.ajax({
                    type     : 'get',
                    dataType : 'json',
                    url      : 'ajax/ajaxAgendaBuscador.php',
                    data : {
                        accion : 'get_pacientes_sintaxis',
                        patron : this.value,
                        flag   : ++flagAjaxBuscador // le pasamos el flag a la llamada para recuperarlo a la vuelta de la ejecución del Ajax
                    },
                    success: function(data) {
                    	// Sólo modifico los resultados de la búsqueda si yo soy el último ajax que se ejecutó
                    	if (data !== '0') {
                    		if (data.flag < flagAjaxBuscador)
                    			return;
                    	}
                        if (data !== '0') {
                            if (data.n_pacientes > 0) {
                                var html_dropdown = '';
                                for (var i = 0; i < data.n_pacientes; i++) {
                                    html_dropdown += '<li><a href="#" onclick="select_paciente('+ data[i].id_paciente +')">'+ data[i].nombre +'</a></li>';
                                }
                                $('#dropdown_norden').html(html_dropdown);
                                $('#dropdown_norden').show();
                            } else {
                                $('#dropdown_norden').html('');
                                $('#dropdown_norden').hide();
                            }
                        } else {
                            $('#dropdown_norden').html('');
                            $('#dropdown_norden').hide();
                        }
                    },
                    error: function(data) {
                        if (typeof data.responseText != 'undefined') {
                            data_response = $.parseJSON(data.responseText);
                            if (data_response.code == 403) {
                                sesion_caducada();
                            }
                        }
                    },
                    complete: function() {
                    }
                });
            }
        } else {
            $('#dropdown_norden').html('');
            $('#dropdown_norden').hide();
        }
    });

    $(function () {
        var options = {
            content   : $('.menu_estados').parent().html(),
            html      : true,
            container : '#modal_cita'
        };
        $('#estado_paciente').popover(options);
    });

    $('#btn_eliminar_cita').click(function(event) {
        $.confirm({
            content : desk_agenda.cita_msg_eliminar + $('#nombre').val() +'?',
            buttons : {
                ok : {
                    text     : desk_global.btn_eliminar,
                    btnClass : 'btn-primary',
                    action   : function() {
                        $('.ajax-loader').show();
                        $.ajax({
                            type     : 'post',
                            dataType : 'json',
                            url      : 'ajax/ajaxAgenda.php',
                            data : {
                                accion    : 'eliminar_agenda',
                                id_agenda : $('#id_agenda').val()
                            },
                            success: function(data) {
                                alert_principal('danger', desk_agenda.cita_msg_eliminada);
                                $('#calendar').fullCalendar('removeEvents', $('#id_agenda').val());
                                $('#modal_cita').modal('hide');
                            },
                            error: function(data) {
                                if (typeof data.responseText != 'undefined') {
                                    data_response = $.parseJSON(data.responseText);
                                    if (data_response.code == 403) {
                                        sesion_caducada();
                                    }
                                }
                            },
                            complete: function() {
                                $('.ajax-loader').hide();
                            }
                        });
                    }
                },
                close : {
                    text     : desk_global.btn_cancelar,
                    btnClass : 'btn-default',
                },
            },
        });
    });

    $('#btn_eliminar_nota').click(function(event) {
        var id_agenda_padre = $('#id_agenda_padre').val();
        if (id_agenda_padre > 0) {
            $.confirm({
                title             : desk_agenda.nota_p_title_eliminar,
                content           : desk_agenda.nota_p_msg_eliminar,
                closeIcon         : true,
                backgroundDismiss : true,
                buttons : {
                    solo : {
                        text: desk_agenda.nota_p_btn_solo,
                        btnClass: 'btn-primary',
                        action: function() {
                            eliminar_nota(0);
                        }
                    },
                    todas : {
                        text: desk_agenda.nota_p_btn_todas,
                        btnClass: 'btn-danger',
                        action: function() {
                            eliminar_nota(1);
                        }
                    },
                    todas_sig : {
                        text: desk_agenda.nota_p_btn_todas_sig,
                        btnClass: 'btn-warning',
                        action: function() {
                            eliminar_nota(2);
                        }
                    },
                }
            });
        } else {
            $.confirm({
                content : desk_agenda.nota_msg_eliminar,
                buttons : {
                    ok : {
                        text     : desk_global.btn_eliminar,
                        btnClass : 'btn-primary',
                        action   : function() {
                            eliminar_nota(0);
                        }
                    },
                    close : {
                        text     : desk_global.btn_cancelar,
                        btnClass : 'btn-default',
                    },
                },
            });
        }
    });

    $('#btn_imprimir_cita').click(function(event) {
        var fecha_cita        = date_to_str_js($('#aniocita').val() +'-'+ $('#mescita').val() +'-'+ $('#diacita').val());
        var hora_cita         = $('#horac').val() +':'+ $('#minutos').val();
        hora_cita             = $('#agenda_formato_hora').val() == '12' ? hora_cita +' '+ $('#horario_cita').val() : hora_cita;
        var direccion_cita    = sucursales_empleado[$('#sucursal_cita option:selected').val()].direccion;
        var telefono_cita     = sucursales_empleado[$('#sucursal_cita option:selected').val()].telefono;
        var especialidad_cita = $('#th_dentista_'+ $('#dentista_cita option:selected').val() +' span').text();
        especialidad_cita     = especialidad_cita === null ? '' : $.trim(especialidad_cita);
        $('#nombre_paciente_print').text($('#nombre').val());
        if ($('#rut').val() !== '') {
            $('#rut_paciente_print').text($('#rut').val());
            $('#rut_paciente_print').parent().removeClass('hide');
        } else {
            $('#rut_paciente_print').text('');
            $('#rut_paciente_print').parent().addClass('hide');
        }
        $('#fecha_cita_print').text(fecha_cita);
        $('#hora_cita_print').text(hora_cita);
        $('#empleado_print').text($('#dentista_cita option:selected').text());
        if (especialidad_cita !== '') {
            $('#especialidad_print').text(especialidad_cita);
            $('#especialidad_print').parent().removeClass('hide');
        } else {
            $('#especialidad_print').text('');
            $('#especialidad_print').parent().addClass('hide');
        }
        $('#sucursal_print').text($('#sucursal_cita option:selected').text());
        $('#direccion_print').text(direccion_cita);
        $('#telefono_print').text(telefono_cita);
        $('#cita_print').printArea();
        return false;
    });

    $('#sucursal_cita').change(function(event) {
        // Carga de boxes y dentistas
        $.ajax({
            type     : 'get',
            dataType : 'json',
            url      : 'ajax/ajaxAgenda.php',
            data : {
                accion      : 'filtra_dr_sucursal',
                id_sucursal : $('#sucursal_cita').val()
            },
            success: function(data_json) {
                if (data_json !== null) {
                    var dentista_checked_in_sucursal = false;
                    var dentista_checked = $('input[name=filtro_profesional]:checked').val();

                    $('#dentista_cita').html('');
                    $('#dentista_cita').append('<option value="0" selected disabled>'+ desk_global.profesional +' *</option>');

                    for (var i = 0; i < data_json.length; i++) {
                        var doctor   = get_titulo_doctor(data_json[i].id_tipo_empleado, data_json[i].genero);
                        var nombre   = doctor + data_json[i].nombre +' '+ data_json[i].apellido;
                        var disabled = (data_json[i].dias_prueba > 0 || data_json[i].dias_pago > 0) && data_json[i].confirmado == 1 ? '' : 'disabled';
                        $('#dentista_cita').append('<option value="'+ data_json[i].id +'" '+ disabled +'>'+ nombre +'</option>');
                        if (data_json[i].id == dentista_checked) {
                            dentista_checked_in_sucursal = true;
                        }
                    }

                    if (dentista_checked_in_sucursal) {
                        $('#dentista_cita').val(dentista_checked);
                    } else{
                        $('#dentista_cita').val(0);
                    }

                    cantidad_boxes = data_json[0].box;
                    if (cantidad_boxes > 0) {
                        $('#boxes').parent().removeClass('hide');
                        if ($('#box_seleccionado') && $('#box_seleccionado').val() > 0) {
                            valor = $('#box_seleccionado').val();
                        } else {
                            valor = 0;
                        }
                        i = 0;
                        html = '';
                        html += '<select id="box" name="box" class="form-control input-sm" dir="rtl">';
                        for (i = 1; i <= cantidad_boxes; i++) {
                            if (valor == i) {
                                html +='<option value="'+ i +'" selected>'+ i +'</option>';
                            } else {
                                html +='<option value="'+ i +'">'+ i +'</option>';
                            }
                        }
                        html +='</select>';
                        $('#boxes').html(html);
                    } else {
                        $('#boxes').parent().addClass('hide');
                    }
                }
            },
            error: function(data) {
                if (typeof data.responseText != 'undefined') {
                    data_response = $.parseJSON(data.responseText);
                    if (data_response.code == 403) {
                        sesion_caducada();
                    }
                }
            },
            complete: function() {
            }
        });
    });

    $('#sucursal_nota').change(function(event) {
        // Carga de boxes y dentistas
        $.ajax({
            type     : 'get',
            dataType : 'json',
            url      : 'ajax/ajaxAgenda.php',
            data : {
                accion      : 'filtra_dr_sucursal',
                id_sucursal : $('#sucursal_nota').val()
            },
            success: function(data_json) {
                if (data_json !== null) {
                    var dentista_checked_in_sucursal = false;
                    var dentista_checked = $('input[name=filtro_profesional]:checked').val();

                    $('#id_empleado_nota').html('');
                    $('#id_empleado_nota').append('<option value="0" selected disabled>'+ desk_global.profesional +' *</option>');

                    for (var i = 0; i < data_json.length; i++) {
                        var doctor = get_titulo_doctor(data_json[i].id_tipo_empleado, data_json[i].genero);
                        var nombre = doctor + data_json[i].nombre +' '+ data_json[i].apellido;
                        $('#id_empleado_nota').append('<option value="'+ data_json[i].id +'">'+ nombre +'</option>');
                        if (data_json[i].id == dentista_checked) {
                            dentista_checked_in_sucursal = true;
                        }
                    }

                    if (dentista_checked_in_sucursal) {
                        $('#id_empleado_nota').val(dentista_checked);
                    } else{
                        $('#id_empleado_nota').val(0);
                    }
                }
            },
            error: function(data) {
                if (typeof data.responseText != 'undefined') {
                    data_response = $.parseJSON(data.responseText);
                    if (data_response.code == 403) {
                        sesion_caducada();
                    }
                }
            },
            complete: function() {
            }
        });
    });

    $('#referencia_cita').change(function(event) {
        if ($('#referencia_cita option:selected').val() == '-1') {
            $('#modal_referencias_label').text(desk_agenda.referido_label);
            $('#referencia_descripcion').val('');
            $('#referencia_descripcion').attr('placeholder', desk_agenda.referido_descripcion);
            $('#btn_volver_referencia').text(desk_global.btn_volver);
            $('#modal_cita').modal('hide').on('hidden.bs.modal', function(event) {
                $('#modal_referencias').modal('show');
                $(this).off('hidden.bs.modal'); // Remove the 'on' event binding
            });
        }
    });

    $('#btn_guardar_referencia').click(function(event) {
        event.preventDefault();
        var nombre_referencia = $.trim($('#referencia_descripcion').val());
        if (nombre_referencia === '') {
            alert_principal('danger', desk_agenda.referido_error_descripcion);
        } else {
            $.ajax({
                type     : 'post',
                dataType : 'json',
                url      : 'ajax/ajaxAdmin.php',
                data : {
                    accion        : 'guardar_admin_referencia',
                    id_referencia : $('#id_referencia').val(),
                    referencia    : nombre_referencia
                },
                success: function(id_referencia_nuevo) {
                    var html_opt = '';
                    if (id_referencia_nuevo) {
                        $('#referencia_cita option[value="0"]').remove();
                        html_opt += '<option value="0">- '+ desk_agenda.referido_select +' -</option>';
                        html_opt += '<option value="'+ id_referencia_nuevo +'">'+ $('#referencia_descripcion').val() +'</option>';
                        $('#referencia_cita').prepend(html_opt);
                        $('#btn_volver_referencia').click();
                        $('#referencia_cita').val(id_referencia_nuevo);
                        alert_principal('success', desk_agenda.referido_success);
                    }
                },
                error: function(data) {
                    if (typeof data.responseText != 'undefined') {
                        data_response = $.parseJSON(data.responseText);
                        if (data_response.code == 403) {
                            sesion_caducada();
                        }
                    }
                }
            });
        }
    });

    $('#btn_volver_referencia').click(function(event) {
        $('#modal_referencias').modal('hide').on('hidden.bs.modal', function(event) {
            $('#modal_cita').modal('show');
            $(this).off('hidden.bs.modal'); // Remove the 'on' event binding
        });
        $('#referencia_cita').val(0);
    });  
    
    $('#rut').blur(function() {
    	if ($('#rut').val() == '')
    		$('#rut').change();
    });
    
    $('#rut').change(function(event) {
        var rut = $.trim($('#rut').val());
        if (rut_string == 'RUT') {
            rut = rut.replace(/\./g, '');
            rut = rut.replace('-', '');
            $('#rut').val(formato_rut(rut));
        } else if (rut_string == 'RFC') {
            $('#rut').val($('#rut').val().toUpperCase());
        }

        if (rut == '19' || rut == '1-9') {
            $('#rut').parent().attr('class', '');
            $('#rut').attr('data-validado', 'si');
            rut_repetido = false;
            return;
        }        
        
        if (rut === '' || rut === '0' || rut === null) {
            $('#rut').parent().attr('class', '');
            $('#rut').attr('data-validado', 'no');
            alert_principal('danger', 'Debe especificar un rut v&aacute;lido para el paciente');
            rut_repetido = false;
            return;
        }

        $('#rut').addClass('input-loader');
        $.ajax({
            type     : 'get',
            dataType : 'json',
            url      : 'ajax/ajaxFicha.php',
            data : {
                accion      : 'isset_rut',
                id_paciente : $('#id_paciente').val(),
                rut         : rut
            },
            success: function(json) {
                if (json > 0) { // Rut existe en la BD
                    alert_principal('danger', desk_global.rut_error_repetido + rut_string +'.');
                    rut_repetido = true;
                    $('#rut').parent().addClass('has-error');
                    $('#rut').attr('data-validado', 'no');
                } else {
                    rut_repetido = false;
                    $('#rut').parent().attr('class', '');
                    var rut = $('#rut').val();
                    rut = rut.replace(/\./g, '');
                    if (rut_string == 'RUT' && !valida_rut(rut)) {
                        alert_principal('info', desk_global.rut_info_invalido);
                        $('#rut').parent().addClass('has-warning');
                        $('#rut').attr('data-validado', 'no');
                    } else {
                    	$('#rut').attr('data-validado', 'si');
                    }
                }
            },
            error: function(data) {
                if (typeof data.responseText != 'undefined') {
                    data_response = $.parseJSON(data.responseText);
                    if (data_response.code == 403) {
                        sesion_caducada();
                    }
                }
            },
            complete: function() {
                $('#rut').removeClass('input-loader');
            }
        });
    });

    $('#motivo').change(function(event) {
        var tiempo_motivo = parseInt($('#motivo option:selected').data('tiempo'), 10);
        if (!isNaN(tiempo_motivo) && tiempo_motivo > 0) {
            $('#largo').val(tiempo_motivo);
            flash_input('largo');
        }
    });

    $('#btn_guardar_cita').click(function(event) {
        event.preventDefault();        
        setTimeout(guardar_cita_timeout, 500);        
    });

    $('#btn_guardar_nota').click(function(event) {
        event.preventDefault();
        var titulo_nota   = $.trim($('#titulo_nota').val());
        var largo_nota    = $.trim($('#largo_nota').val());
        var hora_nota     = $('#hora_nota').val();
        var minutos_nota  = $('#minutos_nota').val();
        var repetir_nota  = $('#repetir_nota').is(':checked') ? 1 : 0;
        var fecha_inicio  = $('#anio_nota').val() +'-'+ $('#mes_nota').val() +'-'+ $('#dia_nota').val();
        var fecha_termino = $('#anio_nota_termino').val() +'-'+ $('#mes_nota_termino').val() +'-'+ $('#dia_nota_termino').val();
        var date_inicio   = new Date(fecha_inicio +' 00:00:00');
        var date_termino  = new Date(fecha_termino +' 00:00:00');

        if ($('#todo_el_dia_nota').is(':checked')) {
            hora_nota    = '00';
            minutos_nota = '00';
            largo_nota   = 1439;
        } else if ($('#agenda_formato_hora').val() == '12') {
            if ($('#horario_nota').val() == 'pm' && parseInt(hora_nota, 10) < 12) {
                hora_nota = parseInt(hora_nota, 10) + 12;
                hora_nota = ('0'+ hora_nota).slice(-2);
            } else if ($('#horario_nota').val() == 'am' && hora_nota == '12') { // 12 am
                hora_nota = '00';
            }
        }

        if (titulo_nota === '') {
            alert_principal('danger', desk_agenda.nota_error_titulo);
        } else if (!$('#sucursal_nota').val() || $('#sucursal_nota').val() === '0') {
            alert_principal('danger', desk_agenda.nota_error_sucursal);
        } else if (!$('#id_empleado_nota').val() && $('#id_perfil').val() != '2') {
            alert_principal('danger', desk_agenda.nota_error_profesional);
        } else if (hora_nota === null) {
            alert_principal('danger', desk_agenda.nota_error_hora);
        } else if (largo_nota === '' || largo_nota === '0' || !$.isNumeric(largo_nota)) {
            alert_principal('danger', desk_agenda.nota_error_duracion);
        } else if (repetir_nota == 1 && date_inicio >= date_termino) {
            alert_principal('danger', desk_agenda.nota_error_rep_fecha);
        } else {
            var id_agenda_padre = $('#id_agenda_padre').val();
            if (id_agenda_padre > 0) {
                $.confirm({
                    title             : desk_agenda.nota_p_title_edit,
                    content           : desk_agenda.nota_p_msg_edit,
                    closeIcon         : true,
                    backgroundDismiss : true,
                    buttons : {
                        solo : {
                            text: desk_agenda.nota_p_btn_solo,
                            btnClass: 'btn-primary',
                            action: function() {
                                guardar_nota(titulo_nota, fecha_inicio, hora_nota, minutos_nota, largo_nota, repetir_nota, fecha_termino, 0);
                            }
                        },
                        todas : {
                            text: desk_agenda.nota_p_btn_todas,
                            btnClass: 'btn-danger',
                            action: function() {
                                guardar_nota(titulo_nota, fecha_inicio, hora_nota, minutos_nota, largo_nota, repetir_nota, fecha_termino, 1);
                            }
                        },
                        todas_sig : {
                            text: desk_agenda.nota_p_btn_todas_sig,
                            btnClass: 'btn-warning',
                            action: function() {
                                guardar_nota(titulo_nota, fecha_inicio, hora_nota, minutos_nota, largo_nota, repetir_nota, fecha_termino, 2);
                            }
                        },
                    }
                });
            } else {
                guardar_nota(titulo_nota, fecha_inicio, hora_nota, minutos_nota, largo_nota, repetir_nota, fecha_termino, 0);
            }
        }
    });

    /* Menu Tips */
    $(function() {
        var options = {
            container : 'body',
            content   : $('#tips_agenda').html(),
            html      : true
        };
        $('#pestana_tips').popover(options);
    });

    /* Cargar los datos del nombre seleccionado */
    $('#nombre').change(function(event) {
        event.preventDefault();
        var valor = this.value;
        var id_paciente = valor.substring(valor.lastIndexOf('-') + 1, valor.length);
        if (id_paciente.trim() > 0) {
            $('.ajax-loader').show();
            $.ajax({
                type     : 'get',
                dataType : 'json',
                url      : 'ajax/ajaxAgenda.php',
                data : {
                    accion      : 'get_info_paciente',
                    id_paciente : id_paciente
                },
                success: function(data) {
                    cargar_paciente(data);
                },
                error: function(data) {
                    if (typeof data.responseText != 'undefined') {
                        data_response = $.parseJSON(data.responseText);
                        if (data_response.code == 403) {
                            sesion_caducada();
                        }
                    }
                },
                complete: function() {
                    $('.ajax-loader').hide();
                }
            });
        } else {
            valor = this.value;
            clean_modal_cita();
            $('input#nombre').val(valor);
        }
    });

    /*** Calendar Object ***/
    var calendar = $('#calendar').fullCalendar({
        customButtons: {
            agendaDrs: {
                text: 'Drs',
                click: function(event) {
                    event.preventDefault();
                    $('#calendar').addClass('invisible');
                    $('#calendario_todos').removeClass('invisible');
                    cargar_calendario_todos($('#calendar').fullCalendar('getDate'));
                    $('#div_profesionales').addClass('hide');
                    setCookie('vista_profesional_'+ $('#id_usuario').val(), 'agendaDrs', 1);
                }
            },
            agendaReload: {
                text: 'Refresh',
                click: function(event) {
                    $('#calendar').fullCalendar('refetchEvents');
                }
            },
        },
        header: {
            left   : ($('#ind_btndrs_sin_restriccion').val() == '1' || $('#id_perfil').val()==1 || $('#id_perfil').val()==3 || $('#id_perfil').val()==4) ? 'month agendaWeek agendaDay agendaDrs' : 'month agendaWeek agendaDay',
            center : 'title',
            right  : 'today agendaReload prev,next'
        },
        views: {
            month: { // month view
            },
            basic: { // basicWeek and basicDay views
            },
            agenda: { // agendaWeek and agendaDay views
            },
            week: { // basicWeek and agendaWeek views
                columnFormat : 'ddd '+ desk_date_format.dia_mes,
            },
            day: { // basicDay and agendaDay views
            },
        },
        defaultView       : getCookie('vista_profesional_'+ $('#id_usuario').val()) === '' || getCookie('vista_profesional_'+ $('#id_usuario').val()) == 'agendaDrs' ? 'agendaWeek' : getCookie('vista_profesional_'+ $('#id_usuario').val()),
        firstDay          : $('#agenda_primer_dia').val(),
        height            : ($('#slot_minutes').val() == 60 ? 505 : 870),
        allDaySlot        : false,
        nowIndicator      : true,
        slotDuration      : '00:'+ $('#slot_minutes').val() +':00',
        slotLabelInterval : '00:'+ $('#slot_minutes').val() +':00',
        scrollTime        : ((new Date()).getHours() - 2) +':00:00', //posicion inicial del calendario
        slotLabelFormat   : ($('#agenda_formato_hora').val() == 24 ? 'HH:mm' : 'h:mma'),
        timeFormat        : ($('#agenda_formato_hora').val() == 24 ? 'HH:mm' : 'h:mma'),
        minTime           : $('#agenda_hora_inicial').val() +':00:00',
        maxTime           : $('#agenda_hora_final').val() +':00:00',
        slotEventOverlap  : false, // Overlap de eventos
        displayEventTime  : true,
        selectable        : true,
        selectHelper      : true,
        editable          : true,

        events: {
            url     : 'ajax/json-events.php',
            type    : 'GET',
            timeout : 12000, // 12 segundos
            data: function() { // a function that returns an object
                if ($('#id_perfil').val() == '2' || $('#id_perfil').val() == '8' || $('input[name=filtro_profesional]:checked').val() === undefined) {
                    return {
                        id_empleado : $('#id_empleado').val(),
                        id_sucursal : $('#sucursal_selected_id').val(),
                    };
                } else {
                    return {
                        id_empleado : $('input[name=filtro_profesional]:checked').val(),
                        id_sucursal : $('#sucursal_selected_id').val(),
                    };
                }
            },
            error: function(data) {
                if (typeof data.responseText != 'undefined') {
                    data_response = $.parseJSON(data.responseText);
                    if (data_response.code == 403) {
                        sesion_caducada();
                    } else {
                        $('input[name=filtro_profesional]').prop('checked', false);
                        limpiar_horarios_disponible();
                        alert_principal('danger', desk_agenda.error_carga_citas);
                    }
                } else {
                    $('input[name=filtro_profesional]').prop('checked', false);
                    limpiar_horarios_disponible();
                    alert_principal('danger', desk_agenda.error_carga_citas);
                }
            }
        },

        loading: function(isLoading, view) {
            if (isLoading) {
                $('.section-loader').show();
            } else {
                $('.section-loader').hide();
            }
        },

        dayClick: function(date, jsEvent, view) {
        },

        select: function(start, end, jsEvent, view) {
            $('.section-loader').show();
            var id_empleado = $('input[name=filtro_profesional]:checked').val();
            var confirmado  = $('#dentista_'+ id_empleado).data('confirmado');
            var dias_emp    = $('#dentista_'+ id_empleado).data('dias');
            if (DIRECTORIO == 'norden.dentidesk.cl') {
                $('.section-loader').show();
                $.ajax({
                    type     : 'get',
                    dataType : 'json',
                    url      : 'ajax/ajaxAgenda.php',
                    data : {
                        accion      : 'is_in_horario_dentista_sucursal',
                        id_empleado : id_empleado,
                        id_sucursal : $('#sucursal_selected_id').val(),
                        dia         : start.day(), // 0 - 6
                        horas       : start.hours(),
                        minutos     : start.minutes(),
                        id_usuario  : $('#id_usuario').val()
                    },
                    success: function(data) {
                        if (data == '1') {
                            open_modal_cita(start, end);
                            $('.section-loader').hide();
                        } else {
                            alert_principal('danger', desk_agenda.error_fuera_horario);
                            $('#calendar').fullCalendar('unselect');
                        }
                    },
                    error: function(data) {
                        if (typeof data.responseText != 'undefined') {
                            data_response = $.parseJSON(data.responseText);
                            if (data_response.code == 403) {
                                sesion_caducada();
                            }
                        }
                    },
                    complete: function() {
                        $('.section-loader').hide();
                    }
                });
            } else if (dias_expiracion <= 0) {
                $('.section-loader').hide();
                alert_principal('danger', desk_agenda.error_agenda_expirado);
            } else if (confirmado === 0) {
                $('.section-loader').hide();
                alert_principal('danger', desk_agenda.error_agenda_no_confirmado);
            } else if (dias_emp <= 0) {
                $('.section-loader').hide();
                alert_principal('danger', desk_agenda.error_agenda_emp_expirado);
            } else {
                open_modal_cita(start, end);
                $('.section-loader').hide();
            }
        },

        eventClick: function(event, jsEvent, view) {
            var id_agenda = $.trim(event.id);
            if (id_agenda !== '') {
                $('.section-loader').show();
                $.ajax({
                    type     : 'get',
                    dataType : 'json',
                    url      : 'ajax/ajaxAgenda.php',
                    data : {
                        accion    : 'editar',
                        id_agenda : id_agenda
                    },
                    success: function(data) {
                        if (data) {
                            if (event.id_paciente > 0) {
                                clean_modal_cita();
                                load_data_cita(data);
                                $('#div_enlaces_paciente').removeClass('invisible');
                                $('#div_enlace_nota').addClass('invisible');
                                $('#modal_cita .btn-link').tooltip();
                                $('#btn_eliminar_cita').removeClass('invisible');
                                $('#rut').attr('data-validado', 'si');
                                $('#modal_cita').modal('show');
                            } else {
                                $('#div_enlace_cita').addClass('invisible');
                                $('#h5_title_cita').removeClass('invisible');
                                clean_modal_nota();
                                load_data_nota(data);
                                $('#btn_eliminar_nota').removeClass('invisible');
                                $('#modal_nota').modal('show');
                            }
                        }
                    },
                    error: function(data) {
                        if (typeof data.responseText != 'undefined') {
                            data_response = $.parseJSON(data.responseText);
                            if (data_response.code == 403) {
                                sesion_caducada();
                            }
                        }
                    },
                    complete: function() {
                        $('.section-loader').hide();
                    }
                });
            }
        },

        eventRender: function(event, element, view) {
            if (event.id > 0) {
                var html_i = '<i class="arrow_esq_min" style="border-top-color:'+ event.color +'"></i>';
                if (event.id_paciente > 0) {
                    html_i += '<i class="my_icon_micro my_icon_'+ event.estado +'_active"></i>';
                    // le agrego el tooltip del telefono
                    var html_tooltip = event.nombre_motivo;
                    html_tooltip += event.nombre_motivo === '' || event.telefono === '' ? '' : '<br>';
                    html_tooltip += event.telefono === '' ? '' : desk_global.telefono_short +': '+ event.telefono;
                    $(element).tooltip({
                        title     : html_tooltip,
                        html      : true,
                        placement : 'right auto',
                        container : 'body',
                    }).on('show.bs.tooltip', function() {
                        // Only one tooltip should ever be open at a time
                        $('.tooltip').not(this).hide();
                    });
                }
                element.find('.fc-time').before(html_i);
            }
        },

        eventAfterRender: function(event, element, view) {
            if (event.id_paciente > 0) {
                // agrego el popover para cambiar el estado
                var html_menu_iconos = '<div id="estados_menu_'+ event.id +'" class="estados_menu margin_bottom"';
                html_menu_iconos += 'style="width:'+ (iconos_estados.length * 21) +'px;max-width:120px;">';
                for (var i = 0; i < iconos_estados.length; i++) {
                    html_menu_iconos += '<button type="button" onclick="seleccionar_icono_estado(\''+ event.id +'\',\''+ iconos_estados[i] +'\');">';
                    html_menu_iconos += '<i class="my_icon_min my_icon_'+ iconos_estados[i] +'_active"></i></button>';
                }
                html_menu_iconos += '</div>';
                var container;
                if (view.name == 'month') {
                    container = '.fc-body';
                } else if (view.name == 'agendaWeek') {
                    container = '.fc-time-grid-container';
                } else if (view.name == 'agendaDay') {
                    container = '.fc-time-grid-container';
                }
                var options = {
                    content   : html_menu_iconos,
                    html      : true,
                    container : container,
                    trigger   : 'manual',
                    placement : 'bottom',
                };
                $(element).attr('rel', 'popover');
                $(element).popover(options).bind('contextmenu', function(event2) {
                    event2.preventDefault(); // evito que se ejecute el evento
                    $('[rel=popover]').each(function(event3) {
                        // hide any open popovers when the anywhere else in the body is clicked
                        if (!$(this).is(event2.target) && $(this).has(event2.target).length === 0 && $('.popover').has(event2.target).length === 0) {
                            $(this).popover('hide');
                        }
                    });
                    // conjunto de acciones a realizar
                    $(this).popover('show');
                    $('.estados_menu').mouseleave(function() {
                        $('.fc-event').popover('hide');
                    });
                });
            }
        },

        eventAfterAllRender: function(view) {
            var end_moment = view.end.clone();
            $.ajax({
                type     : 'get',
                dataType : 'json',
                url      : 'ajax/ajaxAgenda.php',
                data : {
                    accion : 'get_feriados_fechas',
                    start  : view.start.format(),
                    end    : end_moment.subtract(1, 'days').format()
                },
                success: function(data) {
                    if (data !== '') {
                        var holiday_moment;
                        for (var i = 0; i < data.length; i++) {
                            holiday_moment = moment(data[i].fecha_feriado, 'YYYY-MM-DD');
                            if (view.name == 'month') {
                                $('td[data-date='+ holiday_moment.format('YYYY-MM-DD') +']').addClass('holiday');
                            } else if (view.name =='agendaWeek') {
                                var class_names = $("th:contains(' "+ holiday_moment.format(desk_date_format.dia_mes) +"')").attr("class");
                                if (class_names !== null) {
                                    var class_names_array = class_names.split(' ');
                                    $('th.' + class_names_array[2] +' br, th.' + class_names_array[2] +' small').remove();
                                    $('th.' + class_names_array[2]).append('<br><small>'+ data[i].descripcion +'</small>');
                                    $('th.' + class_names_array[2]).addClass('holiday');
                                    $('td.' + class_names_array[2]).addClass('holiday');
                                }
                            } else if (view.name == 'agendaDay') {
                                if (holiday_moment.format('YYYY-MM-DD') == $('#calendar').fullCalendar('getDate').format('YYYY-MM-DD')) {
                                    $('.fc-day-header').html(dayNames[$('#calendar').fullCalendar('getDate').day()] +' / '+ data[i].descripcion);
                                    $('.fc-day-header').addClass('holiday');
                                    $('.fc-day').addClass('holiday');
                                }
                            }
                        }
                    }
                },
                error: function(data) {
                    if (typeof data.responseText != 'undefined') {
                        data_response = $.parseJSON(data.responseText);
                        if (data_response.code == 403) {
                            sesion_caducada();
                        }
                    }
                },
                complete: function() {
                }
            });
        },

        eventDrop: function(event, delta, revertFunc, jsEvent, ui, view) {
            if (event.id_paciente > 0) {
                mensaje_success        = desk_agenda.cita_msg_success_mover;
                mover_confirm_content  = sprintf(desk_agenda.cita_msg_mover, $.trim(event.title));
                copiar_confirm_content = sprintf(desk_agenda.cita_msg_copiar, $.trim(event.title));
                copiar_error_alert     = desk_agenda.cita_msg_copiar_error;
            } else {
                mensaje_success        = desk_agenda.nota_msg_success_mover;
                mover_confirm_content  = sprintf(desk_agenda.nota_msg_mover, $.trim(event.title));
                copiar_confirm_content = sprintf(desk_agenda.nota_msg_copiar, $.trim(event.title));
                copiar_error_alert     = desk_agenda.nota_msg_copiar_error;
            }

            if (jsEvent.shiftKey) {
                $.confirm({
                    content : copiar_confirm_content,
                    buttons : {
                        ok : {
                            text     : desk_global.btn_copiar,
                            btnClass : 'btn-primary',
                            action   : function() {
                                if (dias_expiracion <= 0) {
                                    alert_principal('danger', desk_agenda.error_agenda_expirado);
                                    revertFunc();
                                } else {
                                    $('.section-loader').show();
                                    $.ajax({
                                        type     : 'post',
                                        dataType : 'json',
                                        url      : 'ajax/ajaxAgenda.php',
                                        data : {
                                            accion    : 'copiar_agenda',
                                            id_agenda : event.id,
                                            start     : event.start.format('YYYY[-]MM[-]DD HH[:]mm[:00]')
                                        },
                                        success: function(id_agenda_nuevo) {
                                            if (id_agenda_nuevo > 0) {
                                                $('#calendar').fullCalendar('refetchEvents');
                                            } else {
                                                alert_principal('danger', copiar_error_alert);
                                            }
                                        },
                                        error: function(data) {
                                            if (typeof data.responseText != 'undefined') {
                                                data_response = $.parseJSON(data.responseText);
                                                if (data_response.code == 403) {
                                                    sesion_caducada();
                                                } else {
                                                    alert_principal('danger', copiar_error_alert);
                                                }
                                            } else {
                                                alert_principal('danger', copiar_error_alert);
                                            }
                                        },
                                        complete: function() {
                                            $('.section-loader').hide();
                                        }
                                    });
                                }
                            }
                        },
                        close : {
                            text     : desk_global.btn_cancelar,
                            btnClass : 'btn-default',
                            action   : function() {
                                revertFunc();
                            }
                        },
                    },
                });
            } else {
                $.confirm({
                    content : mover_confirm_content,
                    buttons : {
                        ok : {
                            text     : desk_global.btn_cambiar,
                            btnClass : 'btn-primary',
                            action   : function() {
                                actualizar_cita_fecha_hora(event, mensaje_success, 'FechaHora', 0);
                            }
                        },
                        close : {
                            text     : desk_global.btn_cancelar,
                            btnClass : 'btn-default',
                            action   : function() {
                                revertFunc();
                            }
                        },
                    },
                });
            }
        },

        eventResize: function(event, delta, revertFunc, jsEvent, ui, view) {
            if (event.id_paciente > 0) {
                tipo_evento     = desk_agenda.cita;
                mensaje_success = desk_agenda.cita_msg_success_mover;
            } else {
                tipo_evento     = desk_agenda.nota;
                mensaje_success = desk_agenda.nota_msg_success_mover;
            }
            confirm_content = sprintf(desk_agenda.msg_cambiar_largo, tipo_evento, $.trim(event.title), delta.asMinutes());
            $.confirm({
                content : confirm_content,
                buttons : {
                    ok : {
                        text     : desk_global.btn_cambiar,
                        btnClass : 'btn-primary',
                        action   : function() {
                            actualizar_cita_fecha_hora(event, mensaje_success, 'Largo', 0);
                        }
                    },
                    close : {
                        text     : desk_global.btn_cancelar,
                        btnClass : 'btn-default',
                        action   : function() {
                            revertFunc();
                        }
                    },
                },
            });
        }
    });

    $('#calendar .fc-today-button, #calendar .fc-agendaWeek-button, #calendar .fc-prev-button, #calendar .fc-next-button').click(function(event) {
        cargar_horarios_disponible($('#sucursal_selected_id').val(), $('input[name=filtro_profesional]:checked').val());
    });

    $('#calendario_todos .fc-month-button').click(function(event) {
        setCookie('vista_profesional_'+ $('#id_usuario').val(), 'month', 1);
        $('#calendar').removeClass('invisible');
        $('#calendario_todos').addClass('invisible');
        $('#calendar').fullCalendar('changeView', 'month');
        $('#div_profesionales').removeClass('hide');
    });

    $('#calendario_todos .fc-agendaWeek-button').click(function(event) {
        setCookie('vista_profesional_'+ $('#id_usuario').val(), 'agendaWeek', 1);
        $('#calendar').removeClass('invisible');
        $('#calendario_todos').addClass('invisible');
        $('#calendar').fullCalendar('changeView', 'agendaWeek');
        $('#div_profesionales').removeClass('hide');
        cargar_horarios_disponible($('#sucursal_selected_id').val(), $('input[name=filtro_profesional]:checked').val());
    });

    $('#calendario_todos .fc-agendaDay-button').click(function(event) {
        setCookie('vista_profesional_'+ $('#id_usuario').val(), 'agendaDay', 1);
        $('#calendar').removeClass('invisible');
        $('#calendario_todos').addClass('invisible');
        $('#calendar').fullCalendar('changeView', 'agendaDay');
        $('#div_profesionales').removeClass('hide');
    });

    $('#btn_today').click(function(event) {
        event.preventDefault();
        $('#calendar').fullCalendar('today');
        cargar_calendario_todos($('#calendar').fullCalendar('getDate'));
    });

    $('#btn_refresh_todos').click(function(event) {
        cargar_calendario_todos($('#calendar').fullCalendar('getDate'));
    });

    $('#btn_prev').click(function(event) {
        $('#calendar').fullCalendar('incrementDate', { days: -1 });
        cargar_calendario_todos($('#calendar').fullCalendar('getDate'));
    });

    $('#btn_next').click(function(event) {
        $('#calendar').fullCalendar('incrementDate', { days:1 });
        cargar_calendario_todos($('#calendar').fullCalendar('getDate'));
    });

    $('.fc-month-button').tooltip({
        title : desk_global.mes
    });

    $('.fc-month-button').click(function(event) {
        setCookie('vista_profesional_'+ $('#id_usuario').val(), 'month', 1);
    });

    $('.fc-agendaWeek-button').tooltip({
        title : desk_global.semana
    });

    $('.fc-agendaWeek-button').click(function(event) {
        setCookie('vista_profesional_'+ $('#id_usuario').val(), 'agendaWeek', 1);
    });

    $('.fc-agendaDay-button').tooltip({
        title : desk_global.dia
    });

    $('.fc-agendaDay-button').click(function(event) {
        setCookie('vista_profesional_'+ $('#id_usuario').val(), 'agendaDay', 1);
    });

    $('.fc-agendaDrs-button').tooltip({
        title : desk_global.profesionales
    });

    $('.fc-agendaWeek-button, .fc-agendaDrs-button, .fc-today-button').addClass('lang_'+ LOCALE);

    if (getCookie('vista_profesional_'+ $('#id_usuario').val()) == 'agendaDrs') {
        $('.fc-agendaDrs-button').click();
    }

    $('body').click(function(event) {
        $('.tooltip').remove();
        $('[rel=popover]').each(function(event2) {
            // hide any open popovers when the anywhere else in the body is clicked
            if (!$(this).is(event.target) && $(this).has(event.target).length === 0 && $('.popover').has(event.target).length === 0) {
                $(this).popover('hide');
            }
        });
    });

    $('#modal_cita').click(function(event) {
        if (event.target.id != 'nombre_norden') {
            $('#dropdown_norden').hide();
        } else if ($('#dropdown_norden').html() !== '') {
            $('#dropdown_norden').show();
        }
    });   
    
}); // end document ready

function go_to_date(date_str) {
    var date_array = date_str.split('/');
    if (desk_date_format.js_min == 'dd/mm/yy') {
        date_m = moment(date_array[2] +'-'+ date_array[1] +'-'+ date_array[0]);
    } else { // mm/dd/yy
        date_m = moment(date_array[2] +'-'+ date_array[0] +'-'+ date_array[1]);
    }
    $('#calendar').fullCalendar('gotoDate', date_m);
    cargar_horarios_disponible($('#sucursal_selected_id').val(), $('input[name=filtro_profesional]:checked').val());
    if (!$('#calendario_todos').hasClass('invisible')) {
        cargar_calendario_todos(date_m);
    }
}

function guardar_cita_timeout() {
    var id = $('input#id_agenda').val();
	var rutValidado = $('#rut').attr('data-validado');
	if (rutValidado == 'si') {
        if (id === '') { // cita nueva
            guardar_cita(0);
        } else { // actualiza cita
            actualizar_cita(0);
        } 
    }
	else {
		alert_principal('danger', 'Debe especificar un rut v&aacute;lido para el paciente');
	}
}

function redireccionar_modal(href) {
    window.location.href = href +'.php?id_paciente='+ $('#id_paciente').val();
}

function cambiar_imagen_estado(icono_estado, id_estado) {
    $('#id_estado').val(id_estado);
    $('#nombre_estado').val(icono_estado);
    $('#estado_img').attr('src', 'i/estados/'+ icono_estado +'_active.svg');
    $('#estado_nombre').text($.trim($('#p_estado_'+ id_estado).text()));
    $('#estado_paciente').popover('hide');
}

function seleccionar_icono_estado(id_agenda, estado) {
    $('.section-loader').show();
    $.ajax({
        type     : 'post',
        dataType : 'json',
        url      : 'ajax/ajaxAgenda.php',
        data : {
            accion    : 'set_estado_agenda',
            id_agenda : id_agenda,
            estado    : estado,
        },
        success: function(data) {
            if (data > 0) {
                $('.event_'+ id_agenda +' .my_icon_micro').attr('class', 'my_icon_micro my_icon_'+ estado +'_active');
                cita = $('#calendar').fullCalendar('clientEvents', id_agenda);
                cita[0].estado = estado;
                $('.fc-event').popover('hide');
            } else {
                alert_principal('danger', desk_agenda.cita_error_cambio_estado);
            }
        },
        error: function(data) {
            if (typeof data.responseText != 'undefined') {
                data_response = $.parseJSON(data.responseText);
                if (data_response.code == 403) {
                    sesion_caducada();
                } else {
                    alert_principal('danger', desk_agenda.cita_error_cambio_estado);
                }
            } else {
                alert_principal('danger', desk_agenda.cita_error_cambio_estado);
            }
        },
        complete: function() {
            $('.section-loader').hide();
        }
    });
}

function open_modal_cita(start_date, end_date) {
    var fecha_cita = start_date.year() +'/'+ (start_date.month() + 1)  +'/'+ start_date.date();
    var largo_cita = (end_date - start_date) / 60000;
    clean_modal_cita();
    $('#start').val(fecha_cita);
    var hora = start_date.hours();
    if ($('#agenda_formato_hora').val() == '12') {
        var horario = hora >= 12 ? 'pm' : 'am';
        hora = hora > 12 ? hora - 12 : (hora === 0 ? 12 : hora);
        $('#horario_cita').val(horario);
    }
    $('#horac').val(('0'+ hora).slice(-2));
    $('#minutos').val(('00'+ start_date.minutes()).slice(-2));
    $('#largo').val(largo_cita);
    $('#diacita').val(('0'+ start_date.date()).slice(-2));
    $('#mescita').val(('0'+ (start_date.month() + 1)).slice(-2));
    $('#aniocita').val(start_date.year());
    $('#modal_cita').modal('show');
}

function filtrar_profesional(id_sucursal) {
    $('.ajax-loader').show();
    setCookie('sucursal_selected_'+ $('#usuario').val(), id_sucursal, 1);
    $.ajax({
        type     : 'get',
        dataType : 'json',
        url      : 'ajax/ajaxAgenda.php',
        data : {
            accion      : 'filtrar_profesional',
            tipo        : 'agenda', //si viene desde agenda cambia a otra query
            id_sucursal : id_sucursal
        },
        success: function(data) {
            $('#lista_profesionales').empty();
            $('#dentistas_dia thead').empty();
            $('#dentistas_dia tbody tr').empty();

            var html_lista       = '';
            var html_tabla_head1 = '';
            var html_tabla_head2 = '';
            var html_tabla_body  = '';
            if ($.trim(data) !== 0) {
                for (i = 0; i < data.length; i++) {
                    var doctor = get_titulo_doctor(data[i].id_tipo_empleado, data[i].genero);
                    var nombre = doctor + data[i].nombre +' '+ data[i].apellido;
                    var dias_e = Math.max(data[i].dias_prueba, data[i].dias_pago);
                    html_lista += '<li data-toggle="tooltip" data-html="true"  data-placement="top" data-title="' + data[i].email + '<br>' + data[i].telefonos + '" data-original-title="" title="">';
                    html_lista += '<i class="arrow_esq_min" style="border-top-color:'+ data[i].color +'"></i>';
                    html_lista += '<label class="radio" style="color:'+ data[i].color +';">';
                    html_lista += '<input type="radio" id="dentista_'+ data[i].id_empleado +'" ';
                    html_lista += 'data-dias="'+ dias_e +'" data-confirmado="'+ data[i].confirmado +'" ';
                    html_lista += 'onchange="hide_show_dentista();" name="filtro_profesional" value="'+ data[i].id_empleado +'"/>';
                    html_lista += nombre +'</label></li>';
                    html_tabla_head1 += '<th id="th_dentista_'+ data[i].id_empleado +'" width="150px">';
                    html_tabla_head1 += '<i class="arrow_esq_min" style="border-top-color:'+ data[i].color +'"></i>'+ nombre;
                    if (data[i].especialidad !== '') {
                        html_tabla_head1 += '<br>(<span>'+ data[i].especialidad +'</span>)';
                    }
                    html_tabla_head1 += '</th>';
                    html_tabla_head2 += '<th><a class="btn btn-link btn_icon" onclick="print_agenda_dr('+ data[i].id_empleado +')">';
                    html_tabla_head2 += '<i class="my_icon my_icon_printer"></i></a></th>';
                    html_tabla_body += '<td id="td_dentista_'+ data[i].id_empleado +'" width="150px"></td>';
                }
                if (data.length === 0) {
                    alert_principal('danger', 'No existen dentistas para la sucursal seleccionada.');
                }
            }
            $('#lista_profesionales').append(html_lista);
            $('#dentistas_dia thead').append('<tr>'+ html_tabla_head1 +'</tr><tr>'+ html_tabla_head2 +'</tr>');
            $('#dentistas_dia tbody tr').append(html_tabla_body);
            // Seleccionando dentista
            $('#dentista_'+ $('#id_empleado').val()).prop('checked', true); // Profesional conectado
            // Si el usuario conectado no es dentista
            if ($('input[name=filtro_profesional]:checked').val() === undefined) {
                cookie_dentista = getCookie('dentista_selected_'+ $('#usuario').val());
                if (cookie_dentista !== '') {
                    $('#dentista_'+ cookie_dentista).prop('checked', true); // Selecciono al dentista en la cookie
                }
                if ($('input[name=filtro_profesional]:checked').val() === undefined) {
                    primer_dentista = $('input[name=filtro_profesional]').val();
                    $('#dentista_'+ primer_dentista).prop('checked', true); // Selecciono al primer dentista
                }
            }
            hide_show_dentista();
            if (!$('#calendario_todos').hasClass('invisible')) {
                cargar_calendario_todos($('#calendar').fullCalendar('getDate'));
            }
            
            $('[data-toggle="tooltip"]').tooltip();
        },
        error: function(data) {
            if (typeof data.responseText != 'undefined') {
                data_response = $.parseJSON(data.responseText);
                if (data_response.code == 403) {
                    sesion_caducada();
                } else {
                    alert_principal('danger', desk_agenda.error_carga_profesionales);
                }
            } else {
                alert_principal('danger', desk_agenda.error_carga_profesionales);
            }
        },
        complete: function() {
            $('.ajax-loader').hide();
        }
    });
}

function hide_show_dentista() {
    $('.section-loader').show();
    $('#lista_profesionales li').removeClass('active');
    $('input[name=filtro_profesional]:checked').parent().parent().addClass('active');
    $('#calendar').fullCalendar('refetchEvents');
    var id_sucursal_selected = $('#sucursal_selected_id').val();
    var id_empleado_selected = $('input[name=filtro_profesional]:checked').val();
    setCookie('dentista_selected_'+ $('#usuario').val(), id_empleado_selected, 1);
    cargar_horarios_disponible(id_sucursal_selected, id_empleado_selected);
}

function cargar_horarios_disponible(id_sucursal, id_empleado) {
    $.ajax({
        type     : 'get',
        dataType : 'json',
        url      : 'ajax/ajaxAgenda.php',
        data : {
            accion      : 'get_horario_empleado_sucursal',
            id_empleado : id_empleado,
            id_sucursal : id_sucursal
        },
        success: function(data) {
            if (data) {
                // Fecha cualquiera para iniciar el calendario a la hora inicial
                var fecha_hora   = new Date(2014, 0, 1, $('#agenda_hora_inicial').val(), 0, 0, 0);
                var slot_minutes = parseInt($('#slot_minutes').val(), 10);
                for (var i = 0; i < 102 && $('.fc-agendaWeek-view .fc-slats table tbody tr:nth-child('+ (i + 1) +')').html() !== undefined; i++) {
                    var html_images = '';
                    for (var j = 1; j <= 7; j++) {
                        var dia  = day_names_bd[j % 7];
                        var hora = ('0'+ fecha_hora.getHours()).slice(-2);
                        if (data[dia +'_'+ hora] !== undefined && data[dia +'_'+ hora] !== null) {
                            var pos   = parseInt((fecha_hora.getMinutes() / slot_minutes), 10);
                            var value = data[dia +'_'+ hora].charAt(pos);
                            if (value == '1') {
                                var columna = $('#agenda_primer_dia').val() == '1' ? j : (j + 1);
                                    columna = columna == 8 ? 1 : columna;
                                html_images += '<img src="i/calendario/fila_'+ columna +'.png" class="fila_imagen"/>';
                            }
                        }
                    }
                    $('.fc-agendaWeek-view .fc-slats table tbody tr:nth-child('+ (i + 1) +') td:nth-child(2)').html(html_images);
                    fecha_hora = addMinutes(fecha_hora, slot_minutes);
                }
            }
        },
        error: function(data) {
            if (typeof data.responseText != 'undefined') {
                data_response = $.parseJSON(data.responseText);
                if (data_response.code == 403) {
                    sesion_caducada();
                }
            }
        },
        complete: function() {
            $('.section-loader').hide();
        }
    });
}

function limpiar_horarios_disponible() {
    for (var i = 0; i < 102 && $('.fc-agendaWeek-view .fc-slats table tbody tr:nth-child('+ (i + 1) +')').html() !== undefined; i++) {
        $('.fc-agendaWeek-view .fc-slats table tbody tr:nth-child('+ (i + 1) +') td:nth-child(2)').html('');
    }
}

function cargar_calendario_todos(moment_date) {
    $('.section-loader').show();
    var texto_fecha = moment_date.format(desk_date_format.full_date);
    $('#calendario_todos .fc-toolbar h2').text(texto_fecha);
    $.ajax({
        type     : 'get',
        dataType : 'json',
        url      : 'ajax/json-events.php',
        timeout: 12000, // 12 segundos
        data : {
            id_empleado : 'all',
            id_sucursal : $('#sucursal_selected_id').val(),
            start       : moment_date.format('YYYY-MM-DD'),
            end         : moment_date.format('YYYY-MM-DD'),
        },
        success: function(data) {
            if (data) {
                $('#dentistas_dia tbody tr td').empty();
                for (i = 0; i < data.length; i++) {
                    html = '<div class="fc-event';
                    if (data[i].id_paciente === '0') {
                        html += ' event_nota" ';
                    } else {
                        var html_tooltip = data[i].nombre_motivo;
                        html_tooltip += data[i].nombre_motivo === '' || data[i].telefono === '' ? '' : '<br>';
                        html_tooltip += data[i].telefono === '' ? '' : desk_global.telefono_short +': '+ data[i].telefono;
                        html += '" data-toggle="tooltip" data-container="body" data-placement="right auto" data-title="'+ html_tooltip +'" ';
                    }
                    html += 'style="background-color:'+ data[i].backgroundColor +';">';
                    html += '<div class="fc-event-inner">';
                    if (data[i].id_paciente !== '0' && data[i].estado !== null) {
                        html += '<i class="my_icon_micro my_icon_'+ data[i].estado +'_active"></i> ';
                    } else {
                        html += '<div></div>';
                    }
                    html += '<div class="fc-time">';
                    html += data[i].start.substring(11, 16) +' - '+ data[i].end.substring(11, 16);
                    html += '</div>';
                    html += '<div class="fc-title"> '+ data[i].title +' </div>';
                    html += '<p class="event_estado hide">'+ data[i].estado_nombre +'</p>';
                    html += '<p class="event_motivo hide">'+ data[i].nombre_motivo +'</p>';
                    html += '</div>';
                    $('#td_dentista_'+ data[i].id_empleado).append(html);
                }
                $('#dentistas_dia tbody tr td .fc-event').tooltip({
                    html : true
                }).on('show.bs.tooltip', function() {
                    // Only one tooltip should ever be open at a time
                    $('.tooltip').not(this).hide();
                });
                var today = new Date();
                var date = $('#calendar').fullCalendar('getDate');
                if (today.getDate() == date.date() && today.getMonth() == date.month() && today.getFullYear() == date.year()) {
                    $('#btn_today').addClass('fc-state-disabled');
                } else {
                    $('#btn_today').removeClass('fc-state-disabled');
                }
            } else {
                alert_principal('danger', desk_agenda.error_carga_cal_todos);
            }
        },
        error: function(data) {
            if (typeof data.responseText != 'undefined') {
                data_response = $.parseJSON(data.responseText);
                if (data_response.code == 403) {
                    sesion_caducada();
                } else {
                    alert_principal('danger', desk_agenda.error_carga_cal_todos);
                }
            } else {
                alert_principal('danger', desk_agenda.error_carga_cal_todos);
            }
            $('input[name=filtro_profesional]').prop('checked', false);
        },
        complete: function() {
            $('.section-loader').hide();
        }
    });
}

function print_agenda_dr(id_empleado) {
    var html_print = '';
    $('#td_dentista_'+ id_empleado +' .fc-event-inner').each(function(index) {
        html_print += '<tr>';
        html_print += '<td>'+ $(this.children[1]).text() +'</td>';
        html_print += '<td>'+ $(this.children[2]).text() +'</td>';
        html_print += '<td>'+ $(this.children[3]).text() +'</td>';
        html_print += '<td>'+ $(this.children[4]).text() +'</td>';
        html_print += '</tr>';
    });
    html_print += '<tr><td></td><td></td><td></td><td></td></tr>';
    var html_titulo = 'Agenda '+ $('#th_dentista_'+ id_empleado).text() +'<br><br>'+ $('#calendario_todos .fc-toolbar h2').text();
    $('#agenda_dr_print h4').html(html_titulo);
    $('#agenda_dr_print tbody').html(html_print);
    $('#agenda_dr_print').printArea();
    return false;
}

function guardar_cita(forzar_guardado) {
    var nombre = $('input#nombre').val();
    // Verificar si el nombre viene con el id attachado
    if (nombre.search('-') > 0) {
        nombre = nombre.substring(0, nombre.search('-'));
    }
    var rut = $('#rut').val();
    if (rut_string == 'RUT') {
        rut = rut.replace(/\./g, '');
        rut = rut.replace('-', '');
    }

    var id_empleado = $('#dentista_cita').val();
    // es dentista o es tecnico, por lo tanto graba el dentista de la sesion
    if ($('#id_perfil').val() == '2' || $('#id_perfil').val() == '8') {
        id_empleado = $('#id_empleado').val();
    }

    // Valida que ingrese los datos correctamente
    if ($.trim(nombre) === '') {
        alert_principal('danger', desk_agenda.cita_error_nombre);
    } else if ($('input#email').val() !== '' && !(validateEmail($('input#email').val()))) {
        alert_principal('danger', desk_agenda.cita_error_mail);
    } else if (!$('#sucursal_cita').val() || $('#sucursal_cita').val() === '0') {
        alert_principal('danger', desk_agenda.cita_error_sucursal);
    } else if (id_empleado === null || id_empleado === '0') {
        alert_principal('danger', desk_agenda.cita_error_profesional);
    } else if (rut_repetido && rut != '19' && rut != '1-9') {
        alert_principal('danger', sprintf(desk_agenda.cita_error_rut_repetido, rut_string, rut_string));
    } else if ($('#horac').val() === null) {
        alert_principal('danger', desk_agenda.cita_error_hora);
    } else if ($.trim($('#largo').val()) === '' || $.trim($('#largo').val()) === '0' || !$.isNumeric($.trim($('#largo').val()))) {
        alert_principal('danger', desk_agenda.cita_error_duracion);
    } else {
        if ($('input#id_estado').val() === '') {
            estado = $('#id_estado_default').val();
        } else {
            estado = $('input#id_estado').val();
        }
        var hora = $('#horac').val();
        if ($('#agenda_formato_hora').val() == '12') {
            if ($('#horario_cita').val() == 'pm' && parseInt(hora, 10) < 12) {
                hora = parseInt(hora, 10) + 12;
                hora = ('0'+ hora).slice(-2);
            } else if ($('#horario_cita').val() == 'am' && hora == '12') { // 12 am
                hora = '00';
            }
        }
        $('.ajax-loader').show();
        $.ajax({
            type     : 'post',
            dataType : 'json',
            url      : 'ajax/ajaxAgenda.php',
            data : {
                accion          : 'guardar_cita',
                id_paciente     : $('#id_paciente').val(),
                nombre          : $.trim(nombre),
                rut             : rut,
                id_empleado     : id_empleado,
                motivo          : $('#motivo').val(),
                fecha           : $('#aniocita').val() +'-'+ $('#mescita').val() +'-'+ $('#diacita').val(),
                hora            : hora +':'+ $('#minutos').val(),
                largo_cita      : $.trim($('#largo').val()),
                telefono        : $('input#fono').val(),
                descripcion     : $('#observaciones').val(),
                sucursal        : $('#sucursal_cita').val(),
                email           : $('input#email').val(),
                estado          : estado,
                box             : $('select#box').val(),
                referencia      : $('#referencia_cita').val(),
                slot_minutes    : $('#slot_minutes').val(),
                agenda_tope_box : $('#agenda_tope_box').val(),
                forzar_guardado : forzar_guardado,
            },
            success: function(jsondata) {
                if (jsondata.id_agenda > 0 && jsondata.id_paciente > 0) {
                    $('#calendar').fullCalendar('refetchEvents');
                    $('#modal_cita').modal('hide');
                    alert_principal('success', desk_agenda.cita_success_guardar);
                    if ($('#id_paciente').val() === '') {
                        available_names[available_names.length] = $.trim(nombre) +' - '+ jsondata.id_paciente;
                        $('#nombre').typeahead({
                            source: available_names
                        });
                    }
                } else if (jsondata.box_usado == 1) {
                    $.confirm({
                        content : desk_agenda.cita_error_box_ocupado +'<br>'+ desk_agenda.cita_error_box_ocupado_g,
                        buttons : {
                            ok : {
                                text     : desk_global.btn_guardar,
                                btnClass : 'btn-primary',
                                action   : function() {
                                    guardar_cita(1);
                                }
                            },
                            close : {
                                text     : desk_global.btn_cancelar,
                                btnClass : 'btn-default',
                            },
                        },
                    });
                } else {
                    alert_principal('danger', desk_agenda.cita_error_guardar);
                }
            },
            error: function(data) {
                if (typeof data.responseText != 'undefined') {
                    data_response = $.parseJSON(data.responseText);
                    if (data_response.code == 403) {
                        sesion_caducada();
                    } else {
                        alert_principal('danger', desk_agenda.cita_error_guardar);
                    }
                } else {
                    alert_principal('danger', desk_agenda.cita_error_guardar);
                }
                $('input[name=filtro_profesional]').prop('checked', false);
            },
            complete: function() {
                $('.ajax-loader').hide();
            }
        });
    }
}

function actualizar_cita(forzar_guardado) {
    var id_empleado = $('#dentista_cita').val();
    if ($('#id_perfil').val() == '2' || $('#id_perfil').val() == '8') {
        id_empleado = $('#id_empleado').val();
    }
    // Valida que ingrese todos los datos obligatorios
    if ($.trim($('input#nombre').val()) === '') {
        alert_principal('danger', desk_agenda.cita_error_nombre);
    } else if ($('input#email').val() !== '' && !(validateEmail($('input#email').val()))) {
        alert_principal('danger', desk_agenda.cita_error_mail);
    } else if (!$('#sucursal_cita').val() || $('#sucursal_cita').val() === '0') {
        alert_principal('danger', desk_agenda.cita_error_sucursal);
    } else if (id_empleado === null || id_empleado === '0') {
        alert_principal('danger', desk_agenda.cita_error_profesional);
    } else if ($('#horac').val() === null) {
        alert_principal('danger', desk_agenda.cita_error_hora);
    } else if ($.trim($('#largo').val()) === '' || $.trim($('#largo').val()) === '0' || !$.isNumeric($.trim($('#largo').val()))) {
        alert_principal('danger', desk_agenda.cita_error_duracion);
    } else {
        rut = $('#rut').val();
        if (rut_string == 'RUT') {
            rut = rut.replace(/\./g, '');
            rut = rut.replace('-', '');
        }
        var hora = $('#horac').val();
        if ($('#agenda_formato_hora').val() == '12') {
            if ($('#horario_cita').val() == 'pm' && parseInt(hora, 10) < 12) {
                hora = parseInt(hora, 10) + 12;
                hora = ('0'+ hora).slice(-2);
            } else if ($('#horario_cita').val() == 'am' && hora == '12') { // 12 am
                hora = '00';
            }
        }
        $('.ajax-loader').show();
        $.ajax({
            type     : 'post',
            dataType : 'json',
            url      : 'ajax/ajaxAgenda.php',
            data : {
                accion          : 'actualizar',
                id              : $('input#id_agenda').val(),
                hora            : hora +':'+ $('#minutos').val(),
                id_paciente     : $('#id_paciente').val(),
                nombre          : $.trim($('input#nombre').val()),
                rut             : rut,
                id_empleado     : id_empleado,
                motivo          : $('#motivo').val(),
                fecha           : $('#aniocita').val() +'-'+ $('#mescita').val() +'-'+ $('#diacita').val(),
                largo_cita      : $('#largo').val(),
                telefono        : $('input#fono').val(),
                descripcion     : $('#observaciones').val(),
                email           : $('input#email').val(),
                sucursal        : $('#sucursal_cita').val(),
                estado          : $('input#id_estado').val(),
                box             : $('select#box').val(),
                referencia      : $('#referencia_cita').val(),
                slot_minutes    : $('#slot_minutes').val(),
                agenda_tope_box : $('#agenda_tope_box').val(),
                forzar_guardado : forzar_guardado,
            },
            success: function(jsondata) {
                if (jsondata.id_agenda > 0 && jsondata.id_paciente > 0) {
                    $('#calendar').fullCalendar('refetchEvents');
                    $('#modal_cita').modal('hide');
                    alert_principal('success', 'Su cita ha sido actualizada.');
                } else if (jsondata.box_usado == 1) {
                    $.confirm({
                        content : desk_agenda.cita_error_box_ocupado +'<br>'+ desk_agenda.cita_error_box_ocupado_a,
                        buttons : {
                            ok : {
                                text     : desk_global.btn_actualizar,
                                btnClass : 'btn-primary',
                                action   : function() {
                                    actualizar_cita(1);
                                }
                            },
                            close : {
                                text     : desk_global.btn_cancelar,
                                btnClass : 'btn-default',
                            },
                        },
                    });
                } else {
                    alert_principal('danger', desk_agenda.cita_error_actualizar);
                }
            },
            error: function(data) {
                if (typeof data.responseText != 'undefined') {
                    data_response = $.parseJSON(data.responseText);
                    if (data_response.code == 403) {
                        sesion_caducada();
                    } else {
                        alert_principal('danger', desk_agenda.cita_error_actualizar);
                    }
                } else {
                    alert_principal('danger', desk_agenda.cita_error_actualizar);
                }
            },
            complete: function() {
                $('.ajax-loader').hide();
            }
        });
    }
}

function actualizar_cita_fecha_hora(event, mensaje_success, tipo_evento, forzar_guardado) {
    var fecha      = event.start.format('YYYY[-]MM[-]DD');
    var hora       = event.start.format('HH[:]mm');
    var largo_cita = Math.abs(event.end.diff(event.start) / 60000);

    $('.ajax-loader').show();
    $.ajax({
        type     : 'post',
        dataType : 'json',
        url      : 'ajax/ajaxAgenda.php',
        data : {
            accion          : 'actualizarFH',
            id              : event.id,
            sucursal        : event.id_sucursal,
            nombre          : $.trim(event.title),
            tipo_evento     : tipo_evento,
            fecha           : fecha,
            hora            : hora,
            largo_cita      : largo_cita,
            box             : event.box,
            slot_minutes    : $('#slot_minutes').val(),
            agenda_tope_box : $('#agenda_tope_box').val(),
            forzar_guardado : forzar_guardado,
        },
        success: function(jsondata) {
            if (jsondata.id_agenda > 0) {
                alert_principal('success', mensaje_success);
            } else if (jsondata.box_usado == 1) {
                $.confirm({
                    content : desk_agenda.cita_error_box_ocupado +'<br>'+ desk_agenda.cita_error_box_ocupado_a,
                    buttons : {
                        ok : {
                            text     : desk_global.btn_actualizar,
                            btnClass : 'btn-primary',
                            action   : function() {
                                actualizar_cita_fecha_hora(event, mensaje_success, tipo_evento, 1);
                            }
                        },
                        close : {
                            text     : desk_global.btn_cancelar,
                            btnClass : 'btn-default',
                            action   : function() {
                                $('#calendar').fullCalendar('refetchEvents');
                            }
                        },
                    },
                });
            } else {
                alert_principal('danger', desk_agenda.cita_error_actualizar);
            }
        },
        error: function(data) {
            if (typeof data.responseText != 'undefined') {
                data_response = $.parseJSON(data.responseText);
                if (data_response.code == 403) {
                    sesion_caducada();
                }
            }
        },
        complete: function() {
            $('.ajax-loader').hide();
        }
    });
}

function load_data_cita(data) {
    if (data) {
        var dia  = data.FECHA.substring(8, 10);
        var mes  = data.FECHA.substring(5, 7);
        var anio = data.FECHA.substring(0, 4);

        $('input#id_agenda').val(data.ID_AGENDA);
        $('#id_paciente').val(data.ID_PACIENTE);
        $('input#nombre').val(data.NOMBRE_PACIENTE);
        $('input#nombre').prop('disabled', true);
        $('#nombre_norden').val(data.NOMBRE_PACIENTE);
        $('#nombre_norden').prop('disabled', true);
        if (rut_string == 'RUT') {
            $('#rut').val(formato_rut(data.RUT));
        } else if (rut_string == 'RFC') {
            $('#rut').val(data.RUT.toUpperCase());
        } else {
            $('#rut').val(data.RUT);
        }
        $('#rut').prop('disabled', true);
        $('#motivo').val(data.ID_MOTIVO);
        $('#largo').val(data.LARGO_CITA);
        $('#observaciones').val($.trim(data.DESCRIPCION));
        $('input#email').val(data.EMAIL);
        $('#box_seleccionado').val(data.BOX);
        $('#sucursal_cita').val(data.SUCURSAL);
        $('#sucursal_cita').change();
        $('#dentista_cita').val(data.DENTISTA);
        $('input#start').val(data.FECHA);
        $('#diacita').val(dia);
        $('#mescita').val(mes);
        $('#aniocita').val(anio);
        $('input#fono').val(data.TELEFONO);
        $('#referencia_cita').val(data.REFERENCIA);

        if (data.DEUDA == 1) {
            $('#btn_pagos_modal i').removeClass('peso_red');
            $('#btn_pagos_modal i').addClass('peso_red');
        } else {
            $('#btn_pagos_modal i').addClass('peso_red');
            $('#btn_pagos_modal i').removeClass('peso_red');
        }
        if (data.HORA !== '') {
            var hora = parseInt(data.HORA.substring(0, 2), 10);
            if ($('#agenda_formato_hora').val() == '12') {
                var horario = hora >= 12 ? 'pm' : 'am';
                hora = hora > 12 ? hora - 12 : (hora === 0 ? 12 : hora);
                $('#horario_cita').val(horario);
            }
            $('#horac').val(('0'+ hora).slice(-2));
            $('#minutos').val(data.HORA.substring(3));
        }

        if (data.ESTADO_ICONO !== '') {
            cambiar_imagen_estado(data.ESTADO_ICONO, data.ESTADO);
        }

        if (data.AGENDADO_POR !== null && data.AGENDADO_POR !== '') {
            $('#agendado_por').text(desk_agenda.agendado_por +': '+ data.AGENDADO_POR);
        } else {
            $('#agendado_por').text('');
        }

        var foto_archivo_paciente = 'i/sin_foto.png';
        if (data.FOTO !== null && data.FOTO !== '' && data.FOTO !== 0 && data.FOTO.split('/').pop() != 'sin_foto.png') {
            foto_archivo_paciente = data.FOTO;
        }
        $('img#foto_paciente').attr('src', foto_archivo_paciente);
        
        if (data.NO_ATENDER == 1) {
        	$('#no_atender_texto').removeClass('hide');
        }
        else {
        	$('#no_atender_texto').addClass('hide');
        }
    }
}

function load_data_nota(data) {
    if (data) {
        if (data.ID_AGENDA_PADRE === null) {
            $('#table_horarios_nota').removeClass('hide');
            $('#id_agenda_padre').val(0);
            $('#info_agenda_padre').addClass('hide');
            $('#titulo_padre').text('');
            $('#fecha_padre').text('');
        } else {
            $('#table_horarios_nota').addClass('hide');
            $('#id_agenda_padre').val(data.ID_AGENDA_PADRE);
            $('#info_agenda_padre').removeClass('hide');
            $('#titulo_padre').text(data.TITULO_PADRE);

            var date_array = data.FECHA_PADRE.split('-');
            if (desk_date_format.js_min == 'dd/mm/yy') {
                date_m = date_array[2] +'/'+ date_array[1] +'/'+ date_array[0];
            } else { // mm/dd/yy
                date_m = date_array[1] +'/'+ date_array[2] +'/'+ date_array[0];
            }
            $('#fecha_padre').text(date_m);
        }

        var dia  = data.FECHA.substring(8, 10);
        var mes  = data.FECHA.substring(5, 7);
        var anio = data.FECHA.substring(0, 4);

        $('#id_nota').val(data.ID_AGENDA);
        $('#titulo_nota').val(data.NOMBRE);
        $('#observaciones_nota').val(data.DESCRIPCION);
        $('#sucursal_nota').val(data.SUCURSAL);
        $('#sucursal_nota').change();
        $('#id_empleado_nota').val(data.DENTISTA);
        $('#start_nota').val(data.FECHA);
        $('#dia_nota').val(dia);
        $('#mes_nota').val(mes);
        $('#anio_nota').val(anio);
        if (data.HORA !== '') {
            var hora = parseInt(data.HORA.substring(0, 2), 10);
            if ($('#agenda_formato_hora').val() == '12') {
                var horario = hora >= 12 ? 'pm' : 'am';
                hora = hora > 12 ? hora - 12 : (hora === 0 ? 12 : hora);
                $('#horario_nota').val(horario);
            }
            $('#hora_nota').val(('0'+ hora).slice(-2));
            $('#minutos_nota').val(data.HORA.substring(3));
        }
        $('#largo_nota').val(data.LARGO_CITA);
        if (data.HORA == '00:00' && data.LARGO_CITA == 1439) {
            $('#todo_el_dia_nota').prop('checked', true);
            $('#todo_el_dia_nota').change();
        }

        if (data.AGENDADO_POR !== null && data.AGENDADO_POR !== '') {
            $('#nota_creada_por').text(desk_agenda.creada_por +': '+ data.AGENDADO_POR);
        } else {
            $('#nota_creada_por').text('');
        }
    }
}

function guardar_nota(titulo_nota, fecha_inicio, hora_nota, minutos_nota, largo_nota, repetir_nota, fecha_termino, tipo_guardar) {
    var id_empleado = $('#id_empleado_nota').val();
    if ($('#id_perfil').val() == '2' || $('#id_perfil').val() == '8') { // es dentista o es tecnico, por lo tanto graba el dentista de la sesion
        id_empleado = $('#id_empleado').val();
    }
    $('.ajax-loader').show();
    $.ajax({
        type     : 'post',
        dataType : 'json',
        url      : 'ajax/ajaxAgenda.php',
        data : {
            accion          : 'guardar_nota',
            id              : $('#id_nota').val(),
            id_agenda_padre : $('#id_agenda_padre').val(),
            id_paciente     : 0, // id_paciente = 0 es una nota
            nombre          : titulo_nota,
            id_empleado     : id_empleado,
            fecha           : fecha_inicio,
            hora            : hora_nota +':'+ minutos_nota,
            largo_cita      : largo_nota,
            descripcion     : $('#observaciones_nota').val(),
            sucursal        : $('#sucursal_nota').val(),
            estado          : 1,
            repetir_nota    : repetir_nota,
            fecha_termino   : fecha_termino,
            tipo_guardar    : tipo_guardar,
        },
        success: function(jsondata) {
            if (jsondata !== '0') {
                $('#calendar').fullCalendar('refetchEvents');
                $('#modal_nota').modal('hide');
                $('.ajax-loader').hide();
                if ($('#id_nota').val() == '0') {
                    if (tipo_guardar === 0) {
                        alert_principal('success', desk_agenda.nota_success_guardar);
                    } else {
                        alert_principal('success', desk_agenda.nota_p_success_guardar);
                    }
                } else {
                    if (tipo_guardar === 0) {
                        alert_principal('success', desk_agenda.nota_success_guardar);
                    } else {
                        alert_principal('success', desk_agenda.nota_p_success_guardar);
                    }
                }
            } else {
                alert_principal('danger', desk_agenda.nota_error_guardar);
            }
        },
        error: function(data) {
            if (typeof data.responseText != 'undefined') {
                data_response = $.parseJSON(data.responseText);
                if (data_response.code == 403) {
                    sesion_caducada();
                } else {
                    alert_principal('danger', desk_agenda.nota_error_guardar);
                }
            } else {
                alert_principal('danger', desk_agenda.nota_error_guardar);
            }
        },
        complete: function() {
            $('.ajax-loader').hide();
        }
    });
}

function eliminar_nota(tipo_eliminacion) {
    $('.ajax-loader').show();
    $.ajax({
        type     : 'post',
        dataType : 'json',
        url      : 'ajax/ajaxAgenda.php',
        data : {
            accion           : 'eliminar_agenda',
            id_agenda        : $('#id_nota').val(),
            id_agenda_padre  : $('#id_agenda_padre').val(),
            tipo_eliminacion : tipo_eliminacion,
        },
        success: function(data) {
            if (data !== '0') {
                if (tipo_eliminacion === 0) {
                    alert_principal('danger', desk_agenda.nota_msg_eliminada);
                    $('#calendar').fullCalendar('removeEvents', $('#id_nota').val());
                } else {
                    alert_principal('danger', desk_agenda.nota_msg_eliminadas);
                    $('#calendar').fullCalendar('refetchEvents');
                }
                $('#modal_nota').modal('hide');
            } else {

            }
        },
        error: function(data) {
            if (typeof data.responseText != 'undefined') {
                data_response = $.parseJSON(data.responseText);
                if (data_response.code == 403) {
                    sesion_caducada();
                }
            }
        },
        complete: function() {
            $('.ajax-loader').hide();
        }
    });
}

function select_paciente(id_paciente) {
    $('.ajax-loader').show();
    $.ajax({
        type     : 'get',
        dataType : 'json',
        url      : 'ajax/ajaxAgenda.php',
        data : {
            accion      : 'get_info_paciente',
            id_paciente : id_paciente
        },
        success: function(jsondata) {
            $('#nombre').val($.trim(jsondata.NOMBRE));
            $('#nombre_norden').val($.trim(jsondata.NOMBRE));
            cargar_paciente(jsondata);
            $('#rut').attr('data-validado', 'si');
            $('#dropdown_norden').hide();
        },
        error: function(data) {
            if (typeof data.responseText != 'undefined') {
                data_response = $.parseJSON(data.responseText);
                if (data_response.code == 403) {
                    sesion_caducada();
                }
            }
        },
        complete: function() {
            $('.ajax-loader').hide();
        }
    });
}

function cargar_paciente(data) {
    if (rut_string == 'RUT') {
        $('#rut').val(formato_rut(data.RUT));
    } else if (rut_string == 'RFC') {
        $('#rut').val(data.RUT.toUpperCase());
    } else {
        $('#rut').val(data.RUT);
    }
    $('input#email').val(data.EMAIL);
    $('#id_paciente').val(data.ID);

    if (data.DEUDA == 1) {
        $('#btn_pagos_modal i').removeClass('peso_red');
        $('#btn_pagos_modal i').addClass('peso_red');
    } else {
        $('#btn_pagos_modal i').addClass('peso_red');
        $('#btn_pagos_modal i').removeClass('peso_red');
    }

    $('#div_enlaces_paciente').removeClass('invisible');
    $('#div_enlace_nota').addClass('invisible');
    $('#modal_cita .btn-link').tooltip();

    var telefono = '';
    if (data.TELEFONO_CELULAR !== '') {
        telefono = data.TELEFONO_CELULAR;
    } else if (data.TELEFONO_FIJO !== '') {
        telefono = data.TELEFONO_FIJO;
    }
    $('input#fono').val(telefono);
    var foto_archivo_paciente = 'i/sin_foto.png';
    if (data.FOTO !== null && data.FOTO !== '' && data.FOTO !== 0 && data.FOTO.split('/').pop() != 'sin_foto.png') {
        foto_archivo_paciente = data.FOTO;
    }
    
    if (data.NO_ATENDER == 1) {
    	$('#no_atender_texto').removeClass('hide');
    }
    else {
    	$('#no_atender_texto').addClass('hide');
    }
    
    $('img#foto_paciente').attr('src', foto_archivo_paciente);
}

function clean_modal_cita() {
    $('input#id_agenda').val('');
    $('#id_paciente').val('');
    $('input#nombre').val('');
    $('input#nombre').prop('disabled', false);
    $('#nombre_norden').val('');
    $('#nombre_norden').prop('disabled', false);
    $('#dropdown_norden').html('');
    $('#dropdown_norden').hide();
    $('#rut').val('');
    $('#rut').attr('data-validado', 'no');
    $('#rut').prop('disabled', false);
    $('#rut').parent().attr('class', '');
    rut_repetido = false;
    $('#sucursal_cita').val($('#sucursal_selected_id option:selected').val());
    $('#sucursal_cita').change();
    $('#motivo').val(0);
    $('#observaciones').val('');
    $('input#email').val('');
    cambiar_imagen_estado($('#icono_estado_default').val(), $('#id_estado_default').val());
    $('input#fono').val('');
    $('select#box').val('');
    $('#box_seleccionado').val('');
    $('#agendado_por').text('');
    $('#referencia_cita').val(0);
    $('img#foto_paciente').attr('src', 'i/sin_foto.png');
    $('#div_enlaces_paciente').addClass('invisible');
    $('#div_enlace_nota').removeClass('invisible');
    $('#btn_eliminar_cita').addClass('invisible');
    $('#no_atender_texto').addClass('hide');
}

function clean_modal_nota() {
    $('#id_nota').val(0);
    $('#id_agenda_padre').val(0);
    $('#table_horarios_nota').removeClass('hide');
    $('#titulo_nota').val('');
    $('#observaciones_nota').val('');
    $('#sucursal_nota').val($('#sucursal_selected_id option:selected').val());
    $('#sucursal_nota').change();
    $('#info_agenda_padre').addClass('hide');
    $('#todo_el_dia_nota').prop('checked', false);
    $('.nota_periodo').addClass('hide');
    $('.nota_fecha_termino').addClass('hide');
    $('.nota_tiempo').removeClass('hide');
    $('#nota_creada_por').text('');
    $('#btn_eliminar_nota').addClass('invisible');
}

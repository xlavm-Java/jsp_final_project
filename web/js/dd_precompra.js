$(document).ready(function() {
    $('#modal_terminos').on('shown', function() {
        document.location.hash = '#politicas';
    });

    $('.btn_comprar').click(function(event) {
        event.preventDefault();
        $('#modal_comprar_licencia').modal('show');
        $.ajax({
            type     : 'post',
            dataType : 'json',
            url      : 'ajax/ajaxConfig.php',
            data : {
                accion : 'intencion_de_compra',
                url    : window.location.href
            },
            success: function(id) {
            }
        });
    });

    $('#btn_atras_terminos').click(function(event) {
        $('#modal_terminos').modal('hide').on('hidden.bs.modal', function(event) {
            $('#modal_comprar_licencia').modal('show');
            $(this).off('hidden.bs.modal'); // Remove the 'on' event binding
        });
    });

    $('#btn_atras_transferencia').click(function(event) {
        $('#modal_transferencia').modal('hide').on('hidden.bs.modal', function(event) {
            $('#modal_comprar_licencia').modal('show');
            $(this).off('hidden.bs.modal'); // Remove the 'on' event binding
        });
    });

    $('#btn_atras_paypal').click(function(event) {
        $('#modal_paypal').modal('hide').on('hidden.bs.modal', function(event) {
            $('#modal_comprar_licencia').modal('show');
            $(this).off('hidden.bs.modal'); // Remove the 'on' event binding
        });
    });

    $('#btn_atras_webpay').click(function(event) {
        $('#webpay-modal').modal('hide');
        $('#modal_comprar_licencia').modal('show');
    });

    $('#btn_ingresar_comprobante').click(function(event) {
        event.preventDefault();
        $('#btn_ingresar_comprobante').addClass('invisible');
        $('#btn_enviar_comprobante').removeClass('invisible');
        $('#datos_comprobante').removeClass('hide');
    });

    $('#btn_enviar_comprobante').click(function(event) {
        event.preventDefault();
        if ($('#id_clientes_precompra').val() === '0') {
            alert_principal('danger', desk_compra.error_sin_info_factura);
        } else if ($('#banco_pago').val() === null || $('#banco_pago').val() === '') {
            alert_principal('danger', desk_compra.error_banco);
        } else if ($('#valor_pago').val() === '') {
            alert_principal('danger', desk_compra.error_monto);
        } else if ($('#numero_pago').val() === '') {
            alert_principal('danger', desk_compra.error_n_comprobante);
        } else {
            var usuarios_pagados = getValuesCheckedUsingClass('chk');
            $('.ajax-loader').show();
            if (usuarios_pagados) {
                $.ajax({
                    type     : 'post',
                    dataType : 'json',
                    url      : 'ajax/ajaxConfig.php',
                    data : {
                        accion           : 'enviar_comprobante',
                        banco_pago       : $('#banco_pago').val(),
                        tiempo_pago      : $('#tiempo_pagado').val(),
                        valor_pago       : $('#valor_pago').val(),
                        numero_pago      : $('#numero_pago').val(),
                        url              : window.location.href,
                        usuarios_pagados : usuarios_pagados
                    },
                    success: function(id) {
                        $('.ajax-loader').hide();
                        alert_principal('success', desk_compra.envio_comprobante_success);
                        document.location.href = document.location.origin + document.location.pathname;
                    }
                });
            } else {
                alert_principal('danger', desk_compra.error_seleccione_usuarios);
            }
        }
    });
});

function show_terminos() {
    $('#modal_comprar_licencia').modal('hide').on('hidden.bs.modal', function(event) {
        $('#modal_terminos').modal('show');
        $(this).off('hidden.bs.modal'); // Remove the 'on' event binding
    });
}

/* funciones para manipulacion de fechas */
Date.isLeapYear = function (year) { 
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)); 
};

Date.getDaysInMonth = function (year, month) {
    return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};

Date.prototype.isLeapYear = function () { 
    return Date.isLeapYear(this.getFullYear()); 
};

Date.prototype.getDaysInMonth = function () { 
    return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
};

Date.prototype.addMonths = function (value) {
    var n = this.getDate();
    this.setDate(1);
    this.setMonth(this.getMonth() + value);
    this.setDate(Math.min(n, this.getDaysInMonth()));
    return this;
};

function recalcularPrecio() {
	
	//console.log('Clickeado');
	
	// Obtener el periodo seleccionado actual para ver cuántos meses se debe
	// extender la licencia
	var objRadioPeriodo = $('input[name=intervalo]:checked');
	var mesesExtension = objRadioPeriodo.attr('data-intervalo-meses');
	
	$('#intervalo-seleccionado').html(objRadioPeriodo.attr('data-intervalo-descripcion'));
	
	// Calcular fechas de expiracion nuevas
	recalcularFechasExpiracion(mesesExtension);
	
	// Calcular el monto a pagar (no incluye descuentos)
	var pagoMensual = recalcularMontoMensual();
	
	// Calcular el monto a pagar para cada intervalo que exista
	// extraerIntervaloPago(idPlanIntervaloPago)
	var intervaloPago, idPlanIntervaloPago;
	
	// MontoTotal a pagar para el intervalo seleccionado
	var montoTotalIntervalo = 0;
	var montoTotal = 0;
	
	$('.intervalo-pago').each(function( index ) { // encuentra la <tr class='intervalo-pago'> ==> $(this)
		idPlanIntervaloPago = $( this ).attr('data-id-plan-intervalo');
		
		// Obtener el intervalo de pago
		intervaloPago = extraerIntervaloPago(idPlanIntervaloPago);
		
		if (intervaloPago != null) {
			
			if (gbl_pago_fijo <= 0 && pagoMensual > 0) {			
				// Aplicar monto neto
				spanMontoNeto = $(this).find('#monto-neto'); // encuentra la <span id='monto-neto>
				montoNeto = pagoMensual * intervaloPago.IntervaloMeses;
				
				if (spanMontoNeto != null) {
					spanMontoNeto.text(my_currency_format(montoNeto));
				}
				
				// Aplicar el descuento asociado
				if (gbl_descuento_fijo > 0) {
					descuentoTotal = gbl_descuento_fijo * intervaloPago.IntervaloMeses;
					montoTotal = montoNeto - descuentoTotal;
					
					spanDescuentoFijo = $(this).find('#descuento-fijo'); // encuentra la <span id='descuento-fijo'>
					spanDescuentoFijo.text(my_currency_format(descuentoTotal));
					
				} else {
					porcentajeDescuento = gbl_descuento_porcentaje;
					if (gbl_descuento_porcentaje < intervaloPago.Descuento) {
						porcentajeDescuento = intervaloPago.Descuento;
					}
					montoTotal =  Math.round((montoNeto* (100-porcentajeDescuento))/100);
					
					spanDescuentoPorcentaje = $(this).find('#descuento-porcentaje'); // encuentra la <span id='descuento-porcentaje'>
					spanDescuentoPorcentaje.text(number_format(porcentajeDescuento, 2, separador_decimales(), separador_miles()));				
				}				
			} else if (pagoMensual > 0) {
				montoTotal = pagoMensual * intervaloPago.IntervaloMeses;
			}
			else {
				montoTotal = 0;
			}
			
			// Aplicar el monto total
			spanMontoTotal = $(this).find('#monto-total'); // encuentra la <span id='monto-total'>
			spanMontoTotal.text(my_currency_format(montoTotal));
			
			if (intervaloPago.IntervaloMeses == mesesExtension) {
				montoTotalIntervalo = montoTotal;
				
				// Actualizar valores en hidden para pago_webpay.php
				$('#idPlanIntervaloPago').val(intervaloPago.IdPlanIntervaloPago);
				$('#intervaloMeses').val(intervaloPago.IntervaloMeses);
				$('#intervaloPago').val(intervaloPago.Descripcion);
				$('#intervaloDescuento').val(intervaloPago.Descuento);
			}
		}			
	});
	
	$('#precio-final').text(my_currency_format(montoTotalIntervalo));
	
	// Actualizar el hidden para el llamado a pago_webpay.php
	$('#montoPago').val(montoTotalIntervalo);
}

function recalcularMontoMensual() {
	var cantidadPago = 0; // cuantos van
	var cantidadNoPago = 0; // cuantos van
	var pagoMensual = 0;
	
	// Si es de pago fijo, calcular el pago según el periodo seleccionado
	if (gbl_pago_fijo > 0){
		if (gbl_pago_fijo_intervalo_meses == 1) {
			pagoMensual = gbl_pago_fijo;
		}
		else if (gbl_pago_fijo_intervalo_meses == 6) {
			pagoMensual = gbl_pago_fijo/6;
		}
		else if (gbl_pago_fijo_intervalo_meses == 12) {
			pagoMensual = gbl_pago_fijo/12;
		}
	}
	else {		
		var tipoEmpleado, idTipoEmpleado;
		
		// Calcular pago mensual
		pagoMensual += parseInt(gbl_plan_precio_base);
		
		$('.empleado').each(function( index ) {		
			
			// Obtener el estado del checkbox
			chkEmpleado = $(this).find('.check-empleado');
			
			if (chkEmpleado != null && chkEmpleado.is(':checked')) {
				idTipoEmpleado = $( this ).attr('data-id-tipo-empleado');
				
				// Obtener el tipo de empleado
				tipoEmpleado = extraerTipoEmpleado(idTipoEmpleado);
				
				if (tipoEmpleado != null) {
					// Si es de pago
					if (tipoEmpleado.EsPago > 0) {
						cantidadPago++;
						
						if (cantidadPago > gbl_plan_usuarios_pago_incluidos) {
							pagoMensual += parseInt(tipoEmpleado.PrecioAdicional);
						}
					}
					else {
						cantidadNoPago++;
					}
				}
			}
		});		
	}
	
	if (gbl_pago_fijo > 0 || pagoMensual==0){
		// Calcular cantidad de usuarios
		cantidadUsuarios = 0;
		$('.empleado').each(function( index ) {	
			cantidadUsuarios ++;
		});
	}
	
	if (pagoMensual==0) {
		$('#activarLicencia').val("SI");
		$('#btn_comprar_transbank').addClass('hide');
		$('#btn_activar_licencia').removeClass('hide');
		$('#titulo-usuarios-seleccionados').html('Usuarios seleccionados');	
		$('#usuarios-seleccionados').html(cantidadUsuarios);
	}
	else {
		$('#activarLicencia').val("NO");
		$('#btn_comprar_transbank').removeClass('hide');
		$('#btn_activar_licencia').addClass('hide');
		
		if (gbl_pago_fijo > 0) {
			$('#titulo-usuarios-seleccionados').html('Usuarios seleccionados');	
			$('#usuarios-seleccionados').html(cantidadUsuarios);
		}
		else {
			$('#titulo-usuarios-seleccionados').html('Usuarios de pago seleccionados');	
			$('#usuarios-seleccionados').html(cantidadPago);
		}		
	}
	
	return pagoMensual;
}

function extraerTipoEmpleado(idTipoEmpleado) {
	var found = null;
	
	// Revisar según el plan cargado en el login	
	gbl_arr_plan_detalle.forEach(function(item) {
	    if (item.IdTipoEmpleado == idTipoEmpleado) {
	    	found = item;
	    }
	});
	
	return found;
}

function extraerIntervaloPago(idPlanIntervaloPago) {	
	var found = null;
	
	// Revisar según el plan cargado en el login	
	gbl_arr_plan_intervalos.forEach(function(item) {
	    if (item.IdPlanIntervaloPago == idPlanIntervaloPago) {
	    	found = item;
	    }
	});
	
	return found;	
}

function recalcularFechasExpiracion(meses_extension) {
	var hoy = moment();
	var fechaPartida;
	var ultimaFechaExpiracion;
	var nuevaFecha;
	var nuevaFechaExpiracion;
	
	// Variables para incluir en los hidden del formulario que invocará al pago pago_webpay.php
	var listaUsuariosExpiracion = ""; // forma = "USR*FECHA,USR*FECHA, etc... Ej:  "3543*2018-05-02,4389*2018-03-04"
	
	// A MODO DE OBSERVACION
	// Cuando se asocia el valor de una fecha desde una variable a otra
	// sólo se copia el puntero. Si se modifica la nueva variable, también
	// se modificará el valor en la variable original.
	// Por lo tanto, lo que se debe hacer es generar una nueva fecha a partir de la original.
	// Por ej:
	// En vez de : fechaPartida = ultimaFechaExpiracion;
	// Se debe escribir : fechaPartida = moment(ultimaFechaExpiracion.format('YYYY-MM-DD'), 'YYYY-MM-DD');
	
	// Recorrer todos los registros de la tabla de usuarios para actualizar las fechas de expiracion
	$('.empleado').each(function( index ) {
		// El punto de partida debería ser hoy, por defecto
		fechaPartida = moment();
		
		// Obtener la ultima fecha de expiracion
		ultimaFechaExpiracion = moment($( this ).attr('data-fecha_expiracion'), 'YYYY-MM-DD');
		
		// Ver si la ultima fecha es mayor a hoy o no	
		if (ultimaFechaExpiracion >= fechaPartida) {
			// entonces el punto de partida es la ultimaFechaExpiracion
			fechaPartida = moment(ultimaFechaExpiracion.format('YYYY-MM-DD'), 'YYYY-MM-DD');
		}
		
		// Agregar el intervalo en meses
		nuevaFecha = moment(fechaPartida.format('YYYY-MM-DD'), 'YYYY-MM-DD').add(meses_extension, 'months');

		// Modificar el atributo en la fila
		$(this).attr('data-nueva-fecha-expiracion', nuevaFecha.format('YYYY-MM-DD'));
		
		// Encontrar el elemento a modificar (la celda TD en la tabla)
		nuevaFechaExpiracion = $(this).find('.nueva_fecha_expiracion');
		// Modificar el elemento
		nuevaFechaExpiracion.text(nuevaFecha.format('DD-MM-YYYY'));
		
		// Obtener el estado del checkbox
		chkEmpleado = $(this).find('.check-empleado');		
		if (chkEmpleado != null && chkEmpleado.is(':checked')) {
			// Actualizar lista de usuarios para el formulario
			if (listaUsuariosExpiracion != "")
				listaUsuariosExpiracion += ",";			
			// Agregar el usuario y fecha
			listaUsuariosExpiracion += $(this).attr('data-id-usuario') + '*' + nuevaFecha.format('YYYY-MM-DD');
		}
	});
	
	// Actualizar el hidden
	$('#listaUsuariosExpiracion').val(listaUsuariosExpiracion);
}

function recalcular_precio_old(id_usuario, id_tipo_empleado, qwerty ) {
    var valor_plan                  = 0;
    var total_licencias_adicionales = 0;
    var total_usuarios              = 0;

    if ($('#check_u_'+ id_usuario).is(':checked')) {
        total_tipo[id_tipo_empleado] += 1;
        $('#user_pagado_'+ id_usuario).prop('checked', true);
    } else { // unchecked
        total_tipo[id_tipo_empleado] -= 1;
        $('#user_pagado_'+ id_usuario).prop('checked', false);
    }

    total_usuarios = total_tipo[1] + total_tipo[2] + total_tipo[3] + total_tipo[4] + total_tipo[5] + total_tipo[6] + total_tipo[7] + total_tipo[8];
    total_usuarios_virtual = (total_tipo[3] === 0) ? total_usuarios + 1 : total_usuarios;

    // Clientes Antiguos
    if (tipo_cliente == 'Antiguo') {
        if (total_tipo[2] + total_tipo[4] + total_tipo[8] <= 5) {  //si la cantidad de dentistas es menor o igual a 5
            valor_plan = 18000;
            total_licencias_adicionales = total_usuarios_virtual - 3;
            if (total_licencias_adicionales < 0) total_licencias_adicionales = 0;
            apagar = total_usuarios_virtual * precio_licencia;
            apagar = (apagar < valor_plan) ? valor_plan : apagar;
        } else { // si la cantidad de dentistas es mayor o igual a 6
            valor_plan = 57000;
            total_licencias_adicionales = total_usuarios_virtual - 7;
            if (total_licencias_adicionales < 0) total_licencias_adicionales = 0;
            apagar = valor_plan + total_licencias_adicionales * precio_licencia;
        }
    } else {
        // Clientes Nuevos
        valor_plan    = 25000;
        total_agendas = total_tipo[2] + total_tipo[4] + total_tipo[8];
        total_licencias_adicionales = total_agendas - 2;
        if (total_licencias_adicionales < 0) total_licencias_adicionales = 0;
        apagar = valor_plan + total_licencias_adicionales * precio_licencia;
    }
    // Precio en dolares o peso mexicano
    if (PAIS == 'MX') {
        moneda_paypal          = 'MXN';
        valor_plan_paypal      = 920;
        precio_licencia_paypal = 280;
    } else {
        moneda_paypal          = 'USD';
        valor_plan_paypal      = 50;
        precio_licencia_paypal = 15;
    }

    // Precios semestrales y anuales
    apagar_paypal                = valor_plan_paypal + total_licencias_adicionales * precio_licencia_paypal;
    valor_semestral_paypal       = apagar_paypal * 6;
    valor_semestral_dscto_paypal = (apagar_paypal * 6) * 0.95;
    valor_anual_paypal           = apagar_paypal * 12;
    valor_anual_dscto_paypal     = (apagar_paypal * 12) * 0.90;

    if (PAIS == 'CL') {
        // Precios semestrales y anuales
        valor_semestral       = apagar * 6;
        valor_semestral_dscto = (apagar * 6) * 0.95;
        valor_anual           = apagar * 12;
        valor_anual_dscto     = (apagar * 12) * 0.90;
        $('#plan_mensual').html(number_format(apagar, 0, ',', '.') +' CLP');
        $('#plan_mensual_dscto').html(number_format(apagar, 0, ',', '.') +' CLP');
        $('#plan_semestral').html(number_format(valor_semestral, 0, ',', '.') +' CLP');
        $('#plan_semestral_dscto').html(number_format(valor_semestral_dscto, 0, ',', '.') +' CLP');
        $('#plan_anual').html(number_format(valor_anual, 0, ',', '.') +' CLP');
        $('#plan_anual_dscto').html(number_format(valor_anual_dscto, 0, ',', '.') +' CLP');
    } else if (PAIS == 'US' || PAIS == 'CA') {
        // Precios semestrales y anuales
        precio_licencia_usa   = 149;
        total_agendas         = total_tipo[2] + total_tipo[4] + total_tipo[8];
        apagar                = total_agendas * precio_licencia_usa;
        apagar                = apagar > 0 ? apagar : precio_licencia_usa;
        valor_semestral       = apagar * 6;
        valor_semestral_dscto = (apagar * 6) * 0.95;
        valor_anual           = apagar * 12;
        valor_anual_dscto     = (apagar * 12) * 0.90;
        $('#plan_mensual').html(number_format(apagar, 2, '.', '') +' USD');
        $('#plan_mensual_dscto').html(number_format(apagar, 2, '.', '') +' USD');
        $('#plan_semestral').html(number_format(valor_semestral, 2, '.', '') +' USD');
        $('#plan_semestral_dscto').html(number_format(valor_semestral_dscto, 2, '.', '') +' USD');
        $('#plan_anual').html(number_format(valor_anual, 2, '.', '') +' USD');
        $('#plan_anual_dscto').html(number_format(valor_anual_dscto, 2, '.', '') +' USD');

        // Precios semestrales y anuales
        apagar_paypal                = apagar;
        valor_semestral_paypal       = valor_semestral;
        valor_semestral_dscto_paypal = valor_semestral_dscto;
        valor_anual_paypal           = valor_anual;
        valor_anual_dscto_paypal     = valor_anual_dscto;
    } else {
        $('#plan_mensual').html(number_format(apagar_paypal, 2, '.', '') +' '+ moneda_paypal);
        $('#plan_mensual_dscto').html(number_format(apagar_paypal, 2, '.', '') +' '+ moneda_paypal);
        $('#plan_semestral').html(number_format(valor_semestral_paypal, 2, '.', '') +' '+ moneda_paypal);
        $('#plan_semestral_dscto').html(number_format(valor_semestral_dscto_paypal, 2, '.', '') +' '+ moneda_paypal);
        $('#plan_anual').html(number_format(valor_anual_paypal, 2, '.', '') +' '+ moneda_paypal);
        $('#plan_anual_dscto').html(number_format(valor_anual_dscto_paypal, 2, '.', '') +' '+ moneda_paypal);
    }

    $('.plan_mensual_paypal').html(truncateDecimals(apagar_paypal, 2) +' '+ moneda_paypal);
    $('#monto_buynow_mensual').val(truncateDecimals(apagar_paypal, 2));
    $('#monto_subscribe_mensual').val(truncateDecimals(apagar_paypal, 2));

    $('.plan_semestral_paypal').html(truncateDecimals(valor_semestral_dscto_paypal, 2) +' '+ moneda_paypal);
    $('#monto_buynow_semestral').val(truncateDecimals(valor_semestral_dscto_paypal, 2));
    $('#monto_subscribe_semestral').val(truncateDecimals(valor_semestral_dscto_paypal, 2));

    $('.plan_anual_paypal').html(truncateDecimals(valor_anual_dscto_paypal, 2) +' '+ moneda_paypal);
    $('#monto_buynow_anual').val(truncateDecimals(valor_anual_dscto_paypal, 2));
    $('#monto_subscribe_anual').val(truncateDecimals(valor_anual_dscto_paypal, 2));
}

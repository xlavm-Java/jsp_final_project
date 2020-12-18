<%-- 
    Document   : paciente
    Created on : 06-jun-2018, 16:52:24
    Author     : Luis Angel
--%>

<%@page import="java.sql.DriverManager"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>
<%@page import="java.sql.Connection"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang='es'>
    <head>
        <meta http-equiv='Content-type' content='text/html; charset=utf-8'/><script type="text/javascript">window.NREUM || (NREUM = {}), __nr_require = function(e, t, n){function r(n){if (!t[n]){var o = t[n] = {exports:{}}; e[n][0].call(o.exports, function(t){var o = e[n][1][t]; return r(o || t)}, o, o.exports)}return t[n].exports}if ("function" == typeof __nr_require)return __nr_require; for (var o = 0; o < n.length; o++)r(n[o]); return r}({1:[function(e, t, n){function r(){}function o(e, t, n){return function(){return i(e, [f.now()].concat(u(arguments)), t?null:this, n), t?void 0:this}}var i = e("handle"), a = e(2), u = e(3), c = e("ee").get("tracer"), f = e("loader"), s = NREUM; "undefined" == typeof window.newrelic && (newrelic = s); var p = ["setPageViewName", "setCustomAttribute", "setErrorHandler", "finished", "addToTrace", "inlineHit", "addRelease"], d = "api-", l = d + "ixn-"; a(p, function(e, t){s[t] = o(d + t, !0, "api")}), s.addPageAction = o(d + "addPageAction", !0), s.setCurrentRouteName = o(d + "routeName", !0), t.exports = newrelic, s.interaction = function(){return(new r).get()}; var m = r.prototype = {createTracer:function(e, t){var n = {}, r = this, o = "function" == typeof t; return i(l + "tracer", [f.now(), e, n], r), function(){if (c.emit((o?"":"no-") + "fn-start", [f.now(), r, o], n), o)try{return t.apply(this, arguments)} catch (e){throw c.emit("fn-err", [arguments, this, e], n), e} finally{c.emit("fn-end", [f.now()], n)}}}}; a("setName,setAttribute,save,ignore,onEnd,getContext,end,get".split(","), function(e, t){m[t] = o(l + t)}), newrelic.noticeError = function(e){"string" == typeof e && (e = new Error(e)), i("err", [e, f.now()])}}, {}], 2:[function(e, t, n){function r(e, t){var n = [], r = "", i = 0; for (r in e)o.call(e, r) && (n[i] = t(r, e[r]), i += 1); return n}var o = Object.prototype.hasOwnProperty; t.exports = r}, {}], 3:[function(e, t, n){function r(e, t, n){t || (t = 0), "undefined" == typeof n && (n = e?e.length:0); for (var r = - 1, o = n - t || 0, i = Array(o < 0?0:o); ++r < o; )i[r] = e[t + r]; return i}t.exports = r}, {}], 4:[function(e, t, n){t.exports = {exists:"undefined" != typeof window.performance && window.performance.timing && "undefined" != typeof window.performance.timing.navigationStart}}, {}], ee:[function(e, t, n){function r(){}function o(e){function t(e){return e && e instanceof r?e:e?c(e, u, i):i()}function n(n, r, o, i){if (!d.aborted || i){e && e(n, r, o); for (var a = t(o), u = m(n), c = u.length, f = 0; f < c; f++)u[f].apply(a, r); var p = s[y[n]]; return p && p.push([b, n, r, a]), a}}function l(e, t){v[e] = m(e).concat(t)}function m(e){return v[e] || []}function w(e){return p[e] = p[e] || o(n)}function g(e, t){f(e, function(e, n){t = t || "feature", y[n] = t, t in s || (s[t] = [])})}var v = {}, y = {}, b = {on:l, emit:n, get:w, listeners:m, context:t, buffer:g, abort:a, aborted:!1}; return b}function i(){return new r}function a(){(s.api || s.feature) && (d.aborted = !0, s = d.backlog = {})}var u = "nr@context", c = e("gos"), f = e(2), s = {}, p = {}, d = t.exports = o(); d.backlog = s}, {}], gos:[function(e, t, n){function r(e, t, n){if (o.call(e, t))return e[t]; var r = n(); if (Object.defineProperty && Object.keys)try{return Object.defineProperty(e, t, {value:r, writable:!0, enumerable:!1}), r} catch (i){}return e[t] = r, r}var o = Object.prototype.hasOwnProperty; t.exports = r}, {}], handle:[function(e, t, n){function r(e, t, n, r){o.buffer([e], r), o.emit(e, t, n)}var o = e("ee").get("handle"); t.exports = r, r.ee = o}, {}], id:[function(e, t, n){function r(e){var t = typeof e; return!e || "object" !== t && "function" !== t? - 1:e === window?0:a(e, i, function(){return o++})}var o = 1, i = "nr@id", a = e("gos"); t.exports = r}, {}], loader:[function(e, t, n){function r(){if (!x++){var e = h.info = NREUM.info, t = d.getElementsByTagName("script")[0]; if (setTimeout(s.abort, 3e4), !(e && e.licenseKey && e.applicationID && t))return s.abort(); f(y, function(t, n){e[t] || (e[t] = n)}), c("mark", ["onload", a() + h.offset], null, "api"); var n = d.createElement("script"); n.src = "https://" + e.agent, t.parentNode.insertBefore(n, t)}}function o(){"complete" === d.readyState && i()}function i(){c("mark", ["domContent", a() + h.offset], null, "api")}function a(){return E.exists && performance.now?Math.round(performance.now()):(u = Math.max((new Date).getTime(), u)) - h.offset}var u = (new Date).getTime(), c = e("handle"), f = e(2), s = e("ee"), p = window, d = p.document, l = "addEventListener", m = "attachEvent", w = p.XMLHttpRequest, g = w && w.prototype; NREUM.o = {ST:setTimeout, SI:p.setImmediate, CT:clearTimeout, XHR:w, REQ:p.Request, EV:p.Event, PR:p.Promise, MO:p.MutationObserver}; var v = "" + location, y = {beacon:"bam.nr-data.net", errorBeacon:"bam.nr-data.net", agent:"js-agent.newrelic.com/nr-1071.min.js"}, b = w && g && g[l] && !/CriOS/.test(navigator.userAgent), h = t.exports = {offset:u, now:a, origin:v, features:{}, xhrWrappable:b}; e(1), d[l]?(d[l]("DOMContentLoaded", i, !1), p[l]("load", r, !1)):(d[m]("onreadystatechange", o), p[m]("onload", r)), c("mark", ["firstbyte", u], null, "api"); var x = 0, E = e(4)}, {}]}, {}, ["loader"]);</script>

        <meta name='author' content='DENTIDESK'/>
        <meta name='description' content='DENTIDESK es el software dental online dise&ntilde;ado y creado por dentistas y para dentistas. Trabajamos incorporando todos los elementos necesarios para optimizar su consulta dental, permiti&eacute;ndole as&iacute;, dedicar la mejor atenci&oacute;n a sus pacientes.'/>
        <meta name='keywords' content='dentidesk, software, odontologia, dentistas, plataforma, online, administracion'/>
        <meta name='robots' content='noindex,nofollow'/>
        <meta name='viewport' content='width=device-width, initial-scale=1'/>

        <meta http-equiv='Pragma' content='private'/>
        <meta http-equiv='Cache-Control' content='private, max-age=604800, pre-check=604800'/>
        <meta http-equiv='Expires' content='Tue, 29 May 2018 21:40:25 GMT'/>
        <title>Pacientes - Corporacion el Niño Alegre</title>

        <!-- WEB FONTS -->
        <link href='css/fonts/montserrat.css' rel='stylesheet'/>
        <link href='assets/elegant-icons/style.css' rel='stylesheet'/>

        <link href='favicon.ico?v=10.20180522.094600' id='_favicon' rel='shortcut icon' type='image/x-icon'/>
        <link rel='apple-touch-icon' href='images/apple-touch-icon.png'/>
        <link rel='apple-touch-icon' sizes='72x72' href='images/apple-touch-icon-72x72.png'/>
        <link rel='apple-touch-icon' sizes='114x114' href='images/apple-touch-icon-114x114.png'/>

        <link href='css/jquery-ui-1.11.4.css?v=10.20180522.094600' rel='stylesheet' type='text/css' media='all'/>

        <link href='css/jquery.printarea.min.css' rel='stylesheet' type='text/css' media='all'/>

        <link href='css/fullcalendar-2.7.3.min.css' rel='stylesheet' type='text/css' media='screen'/>
        <link href='css/fullcalendar-2.7.3.print.css' rel='stylesheet' media='print'/>

        <link href='css/bootstrap.3.3.6.min.css' rel='stylesheet' type='text/css' media='all'/>
        <link href='css/bootstrap-timepicker.min.css' rel='stylesheet' type='text/css' media='screen'/>
        <link href='css/bootstrap-tour.min.css' rel='stylesheet' type='text/css' media='screen'/>
        <link href='css/bootstrap-select.1.10.0.min.css' rel='stylesheet' type='text/css'/>

        <link href='css/jquery-confirm.3.0.1.min.css' rel='stylesheet' type='text/css'/>
        <link href='css/uploadfile.min.css' rel='stylesheet' type='text/css' media='all'/>
        <link href='css/jquery.tagit.css' rel='stylesheet' type='text/css'/>
        <link href='css/tagit.ui-zendesk.css' rel='stylesheet' type='text/css'/>
        <link href='js/signature/jquery.signature.css' rel='stylesheet' type='text/css'/>
        <!-- World Flags: https://github.com/lafeber/world-flags-sprite -->
        <link rel='stylesheet' type='text/css' href='css/flags16.css'/>
        <link rel='stylesheet' type='text/css' href='css/flags32.css'/>

        <link href='css/dd_style.css?v=10.20180522.094600' rel='stylesheet' type='text/css' media='all'/>
        <!-- COLORES  -->
        <link href='css/dd_dentidesk.css?v=10.20180522.094600' rel='stylesheet' type='text/css' media='all'/>
        <!-- -->
        <link href='css/dd_style-responsive.css?v=10.20180522.094600' rel='stylesheet' type='text/css' media='screen'/>
        <link href='css/dd_style-print.css?v=10.20180522.094600' rel='stylesheet' type='text/css' media='print'/>

        <script type='text/javascript' src='js/jquery-1.11.3.min.js'></script>
        <script type='text/javascript' src='js/jquery-ui-1.11.4.min.js'></script>
        <script type='text/javascript' src='js/jquery.printarea.min.js'></script>
        <script type='text/javascript' src='js/jquery.bootpag.min.js'></script>
        <script type='text/javascript' src='js/jquery.uploadfile.min.js'></script>

        <script type='text/javascript' src='js/moment-2.13.0.min.js'></script>
        <script type='text/javascript' src='js/fullcalendar-2.7.3.min.js'></script>

        <script type='text/javascript' src='js/bootstrap.3.3.6.min.js'></script>
        <script type='text/javascript' src='js/bootstrap3-typeahead.min.js'></script>
        <script type='text/javascript' src='js/bootstrap-tour.min.js'></script>
        <script type='text/javascript' src='js/bootstrap-timepicker.min.js'></script>
        <script type='text/javascript' src='js/bootstrap-select.1.10.0.min.js'></script>

        <script type='text/javascript' src='js/sprintf.1.0.3.min.js'></script>
        <script type='text/javascript' src='js/jquery-confirm.3.0.1.min.js'></script>
        <script type='text/javascript' src='js/tag-it.min.js'></script>
        <script type='text/javascript' src='js/rut.min.js'></script>
        <script type='text/javascript' src='js/cookies.min.js'></script>
        <script type='text/javascript' src='js/region_comuna.min.js'></script>
        <script type='text/javascript' src='js/dd_extend_core.min.js'></script>

        <script type='text/javascript' src='js/jquery-ui-datepicker-es.min.js'></script>
        <script type='text/javascript' src='js/fullcalendar-es-2.7.3.js'></script>
        <script type='text/javascript' src='js/bootstrap-select.1.10.0-es_CL.min.js'></script>
        <script type='text/javascript' src='js/locale/desk_es.js?v=10.20180522.094600'></script>

        <!--[if IE]>
        <script type='text/javascript' src='js/signature/excanvas.js'></script>
        <![endif]-->
        <script type='text/javascript' src='js/signature/jquery.ui.touch-punch.min.js'></script>
        <script type='text/javascript' src='js/signature/jquery.signature.min.js'></script>

        <script type='text/javascript'>
            var PAIS = 'CL';
            var MONEDA = 'CL';
            var LOCALE = 'es';
            var desk_date_format = {
            js_min    : 'dd/mm/yy',
                    js_may    : 'DD/MM/YYYY',
                    php_to_js : 'd/m/Y',
                    dia_mes   : 'D/M',
                    full_date : 'D [de] MMMM [de] YYYY',
            };
            var DIRECTORIO = 'app.dentidesk.cl';
            var region_string = 'Regi&oacute;n';
            var provincia_string = 'Provincia';
            var comuna_string = 'Comuna';
            var rut_string = 'RUT';
            var day_names_bd = ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'];
            var n_sucursales_empresa = '1';
            var sucursales_empresa = [];
            sucursales_empresa[2762] = {nombre: "luis", direccion: "", comuna: "", telefono: "3103717478", icono: "i/logo_big.png", color: "", pagina_web: ""};
            var dias_expiracion = 32;
            var sucursales_empleado = {};
            sucursales_empleado[2762] = {nombre: "luis", direccion: "", comuna: "", telefono: "3103717478", icono: "i/logo_big.png", color: "", pagina_web: ""};
            $(document).ready(function() {
            $('#datepicker').datepicker({
            dateFormat : desk_date_format.js_min,
                    firstDay   : '1',
                    onSelect: function(date_str) {
                    if (document.location.href.indexOf('home.php') !== - 1) {
                    go_to_date(date_str);
                    } else {
                    document.location.href = 'home.php?date=' + date_str;
                    }
                    }
            });
            $('#info_principal_close').click(function(event) {
            $('#info_principal').addClass('invisible');
            });
            setTimeout(getEmpresaStatus, 120000);
            // validar onfly float
            $(".format_valid_float").on('keypress keyup blur', function(e){
            $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
            if ((e.which != 46 || $(this).val().indexOf('.') != - 1) && (e.which < 48 || e.which > 57)) {
            e.preventDefault();
            }
            if ($(this).val().indexOf('.') != - 1){
            aux = $(this).val().split(".");
            if (aux[1].length >= 2){
            e.preventDefault();
            }
            }
            else{
            console.log(e.which);
            if ((e.which != 110 || (e.which != 190)) && $(this).val().length > 2){
            e.preventDefault();
            }
            }
            });
            });
            jconfirm.defaults = {
            title             : false,
                    content           : '',
                    defaultButtons: {
                    ok: {
                    text     : desk_global.btn_aceptar,
                            btnClass : 'btn-primary',
                    },
                            close: {
                            text     : desk_global.btn_cancelar,
                                    btnClass : 'btn-default',
                            },
                    },
                    backgroundDismiss : false,
            };
            function redireccionar(pagina, id_paciente) {
            document.location.href = pagina + '.php?id_paciente=' + id_paciente;
            }

            function getEmpresaStatus() {
            $.ajax({
            type     : 'get',
                    url      : 'ajax/ajaxIndex.php',
                    data : {
                    accion       : 'empresa_status'
                    },
                    success: function(data) {
                    if (data <= 0) {
                    document.location.href = 'msj_empresadesactivada.php';
                    }
                    },
                    error: function(data) {
                    console.log('Error get empresa status');
                    },
                    complete: function() {
                    setTimeout(getEmpresaStatus, 300000);
                    }
            });
            }

            function sesion_caducada() {
            $('.ajax-loader').hide();
            $.alert({
            title   : desk_global.sesion_caducada_title,
                    content : desk_global.sesion_caducada_content,
                    buttons: {
                    confirm: {
                    text   : desk_global.btn_aceptar,
                            action : function() {
                            document.location.href = 'close.php';
                            }
                    }
                    }
            });
            }

            function alert_principal(tipo_alerta, mensaje) {
            $('#info_principal').removeClass('invisible');
            $('#info_principal').attr('style', '');
            $('#info_principal_alert').attr('class', 'alert alert-' + tipo_alerta);
            $('#mensaje_alert').html(mensaje);
            var time_out = mensaje.length > 70 ? 10000 : 7000;
            setTimeout(function() {
            $('#info_principal').fadeOut('fast');
            }, time_out);
            }

            function flash_input(id) {
            $('#' + id).stop().css('backgroundColor', '#f0814f')
                    .animate({backgroundColor: '#FFF'}, 700)
                    .animate({backgroundColor: '#f0814f'}, 200)
                    .animate({backgroundColor: '#FFF'}, 700);
            }

            function get_titulo_doctor(id_tipo_empleado, genero) {
            return id_tipo_empleado == 2 || id_tipo_empleado == 4 ? (genero == 1 ? 'Dr. ' : 'Dra. ') : '';
            }

            function export_excel(nombre_archivo, table_id) {
            $('#nombre_archivo').val(nombre_archivo);
            var datos = $('<div>').append($('#' + table_id).clone()).html();
            datos = datos.split('Á').join('&Aacute;'); datos = datos.split('á').join('&aacute;');
            datos = datos.split('É').join('&Eacute;'); datos = datos.split('é').join('&eacute;');
            datos = datos.split('Í').join('&Iacute;'); datos = datos.split('í').join('&iacute;');
            datos = datos.split('Ó').join('&Oacute;'); datos = datos.split('ó').join('&oacute;');
            datos = datos.split('Ú').join('&Uacute;'); datos = datos.split('ú').join('&uacute;');
            datos = datos.split('Ñ').join('&Ntilde;'); datos = datos.split('ñ').join('&ntilde;');
            datos = datos.split('º').join('&ordm;'); datos = datos.split('ª').join('&ordf;');
            $('#datos_a_enviar').val(datos);
            $('#exportacion_form').submit();
            }

            function getValuesUsingClass(clase, container) {
            /* declare an checkbox array */
            var class_array = [];
            /* look for all checkboes that have a class 'chk' attached to it and check if it was checked */
            $(container + ' .' + clase).each(function() {
            class_array.push($(this).val());
            });
            /* check if there is selected checkboxes, by default the length is 1 as it contains one single comma */
            if (class_array.length >= 1) {
            return class_array;
            } else {
            return false;
            }
            }

            function getValuesCheckedUsingClass(clase) {
            /* declare an checkbox array */
            var chkArray = [];
            /* look for all checkboes that have a class 'chk' attached to it and check if it was checked */
            $('.' + clase + ':checked').each(function() {
            chkArray.push($(this).val());
            });
            /* check if there is selected checkboxes, by default the length is 1 as it contains one single comma */
            if (chkArray.length >= 1) {
            return chkArray;
            } else {
            return false;
            }
            }

            function getValuesCheckedUsingClassIn(clase, container) {
            /* declare an checkbox array */
            var chkArray = [];
            /* look for all checkboes that have a class 'chk' attached to it and check if it was checked */
            $(container + ' .' + clase + ':checked').each(function() {
            chkArray.push($(this).val());
            });
            /* check if there is selected checkboxes, by default the length is 1 as it contains one single comma */
            if (chkArray.length >= 1) {
            return chkArray;
            } else {
            return false;
            }
            }

            function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
            }

            function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
            }

            /***** Funciones para fecha *****/
            // Transforma un objeto fecha en un string
            function format_date(date_obj) {
            function pad(s) { return (s < 10) ? '0' + s : s; }
            var d = new Date(date_obj);
            if (desk_date_format.js_min == 'dd/mm/yy') {
            return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
            } else { // mm/dd/yy
            return [pad(d.getMonth() + 1), pad(d.getDate()), d.getFullYear()].join('/');
            }
            }

            // Entrega la fecha formateada desde un formato original de yy-mm-dd
            function date_to_str_js(date_obj) {
            if (!isValidDateObject(date_obj)) {
            var date_array = date_obj.split('-');
            date_obj = new Date(date_array[0], (date_array[1] - 1), date_array[2], 12, 0, 0, 0);
            }
            if (LOCALE == 'en') {
            return dayNames[date_obj.getDay()] + ', ' + monthNames[date_obj.getMonth()] + ' ' + date_obj.getDate() + ', ' + date_obj.getFullYear();
            } else {
            return dayNames[date_obj.getDay()] + ', ' + date_obj.getDate() + ' de ' + monthNames[date_obj.getMonth()] + ' de ' + date_obj.getFullYear();
            }
            }

            // Entrega un objeto Date a partir de una fecha en string
            function to_date(date_str) {
            var date_array = date_str.split('/');
            if (desk_date_format.js_min == 'dd/mm/yy') {
            return new Date(date_array[2], date_array[1] - 1, date_array[0]);
            } else { // mm/dd/yy
            return new Date(date_array[2], date_array[0] - 1, date_array[1]);
            }
            }

            // Entrega un string xx/xx/yy a partir de una fecha en formato yy-xx-xx
            function date_php_to_js(date_str) {
            var date_array = date_str.split('-');
            if (desk_date_format.js_min == 'dd/mm/yy') {
            return [date_array[2], date_array[1], date_array[0]].join('/');
            } else { // mm/dd/yy
            return [date_array[1], date_array[2], date_array[0]].join('/');
            }
            }

            function addMinutes(date_obj, minutes) {
            return new Date(date_obj.getTime() + (minutes * 60000));
            }

            function isValidDateObject(date_obj) {
            if (Object.prototype.toString.call(date_obj) !== '[object Date]') {
            return false;
            }
            return !isNaN(date_obj.getTime());
            }

            function validar_fecha(fecha_str) {
            if (fecha_str !== undefined && validarFormatoFecha(fecha_str) && existeFecha(fecha_str)) {
            return true;
            } else {
            return false;
            }
            }

            function validarFormatoFecha(fecha_str) {
            var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
            if ((fecha_str.match(RegExPattern)) && (fecha_str !== '')) {
            return true;
            } else {
            return false;
            }
            }

            function existeFecha(fecha_str) {
            var day, month;
            var fecha_array = fecha_str.split('/');
            if (desk_date_format.js_min == 'dd/mm/yy') {
            day = fecha_array[0];
            month = fecha_array[1];
            } else { // mm/dd/yy
            day = fecha_array[1];
            month = fecha_array[0];
            }
            var year = fecha_array[2];
            return month > 0 && month < 13 && year > 0 && year < 32768 && day > 0 && day <= (new Date(year, month, 0)).getDate();
            }

            function compararFechas(fecha_inicial, fecha_final) {
            var d1 = fecha_inicial.split('/');
            var d2 = fecha_final.split('/');
            var from, to;
            if (desk_date_format.js_min == 'dd/mm/yy') {
            from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]); // -1 because months are from 0 to 11
            to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
            } else { // mm/dd/yy
            from = new Date(d1[2], parseInt(d1[0]) - 1, d1[1]); // -1 because months are from 0 to 11
            to = new Date(d2[2], parseInt(d2[0]) - 1, d2[1]);
            }
            return from <= to;
            }

            function dateIsBetweenDates(fecha_inicial, fecha_final, fecha_check) {
            var d1 = fecha_inicial.split('/');
            var d2 = fecha_final.split('/');
            var c = fecha_check.split('/');
            var from, to, check;
            if (desk_date_format.js_min == 'dd/mm/yy') {
            from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]); // -1 because months are from 0 to 11
            to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
            check = new Date(c[2], parseInt(c[1]) - 1, c[0]);
            } else { // mm/dd/yy
            from = new Date(d1[2], parseInt(d1[0]) - 1, d1[1]); // -1 because months are from 0 to 11
            to = new Date(d2[2], parseInt(d2[0]) - 1, d2[1]);
            check = new Date(c[2], parseInt(c[0]) - 1, c[1]);
            }
            return from <= check && check <= to;
            }

            Date.isLeapYear = function(year) {
            return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
            };
            Date.getDaysInMonth = function(year, month) {
            return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
            };
            Date.prototype.isLeapYear = function() {
            return Date.isLeapYear(this.getFullYear());
            };
            Date.prototype.getDaysInMonth = function() {
            return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
            };
            Date.prototype.addMonths = function(value) {
            var n = this.getDate();
            this.setDate(1);
            this.setMonth(this.getMonth() + value);
            this.setDate(Math.min(n, this.getDaysInMonth()));
            return this;
            };
            /***** Funciones para numeros *****/
            function isNumber(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
            }

            function isInt(n) {
            return Number(n) == n && Number(n) % 1 === 0;
            }

            function truncateDecimals(number, digits) {
            var multiplier = Math.pow(10, digits),
                    adjustedNum = number * multiplier,
                    truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);
            return truncatedNum / multiplier;
            }

            function number_format(number, decimals, dec_point, thousands_sep) {
            number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
            var n = !isFinite( + number) ? 0 : + number,
                    prec = !isFinite( + decimals) ? 0 : Math.abs(decimals),
                    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
                    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
                    s = '',
                    toFixedFix = function(n, prec) {
                    var k = Math.pow(10, prec);
                    return '' + Math.round(n * k) / k;
                    };
            // Fix for IE parseFloat(0.55).toFixed(0) = 0;
            s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
            if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
            }
            if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
            }
            return s.join(dec);
            }

            function my_currency_format(number) {
            return simbolo_moneda() + '' + my_number_format(number);
            }

            function my_number_format(number) {
            return number_format(number, cantidad_decimales(), separador_decimales(), separador_miles());
            }

            function my_currency_round(number) {
            if (cantidad_decimales() > 0) {
            return Math.floor(number * 100) / 100;
            }
            return Math.floor(number);
            }

            function prepare_to_calculate(texto) {
            return ensure_dot_separator(remove_thousand_separator(remove_currency_symbol(texto)));
            }

            function ensure_dot_separator(texto) {
            return texto.replace(',', '.');
            }

            function remove_currency_symbol(texto) {
            return texto.replace(simbolo_moneda(), '');
            }

            function remove_thousand_separator(texto) {
            if (separador_miles() == ',') {
            return texto.replace(/\,/g, '');
            } else {
            return texto.replace(/\./g, '');
            }
            }

            function remove_percentage_symbol(texto) {
            return texto.replace(/\%/g, '');
            }

            function get_lang_graficos() {
            return separador_decimales() == ',' ? 'es' : 'en';
            }

            function cantidad_decimales() {
            switch (PAIS) {
            case 'AR':
                    case 'ES':
                    case 'CO': // Peso colombiano
                    case 'CU': // Peso cubano
                    case 'MX': // Peso mexicano
                    case 'DO': // Peso dominicano
                    case 'US': // Dolar USA
                    case 'SV': // Dolar USA
                    case 'EC': // Dolar USA
                    case 'PR': // Dolar USA
                    case 'CA': // Dolar Canadiense
                    case 'BO':
                    case 'BR':
                    case 'CR':
                    case 'GT':
                    case 'HN':
                    case 'NI':
                    case 'PA':
                    case 'PY':
                    case 'PE':
                    case 'UY':
                    case 'VE':
                    return 2; // Bol&iacute;var
            case 'CL':
                    return 0;
            default:
                    return 2;
            }
            }

            function separador_decimales() {
            switch (PAIS) {
            case 'AR':
                    case 'ES':
                    case 'CO': // Peso colombiano
                    case 'CU': // Peso cubano
                    case 'MX': // Peso mexicano
                    case 'DO': // Peso dominicano
                    case 'US': // Dolar USA
                    case 'SV':
                    case 'EC':
                    case 'PR':
                    case 'CA': // Dolar Canadiense
                    return '.';
            case 'CL':
                    case 'BO':
                    case 'BR':
                    case 'CR':
                    case 'GT':
                    case 'HN':
                    case 'NI':
                    case 'PA':
                    case 'PY':
                    case 'PE':
                    case 'UY':
                    case 'VE':
                    return ','; // Bol&iacute;var
            default:
                    return ',';
            }
            }

            function separador_miles() {
            switch (PAIS) {
            case 'AR':
                    case 'ES':
                    case 'CO': // Peso colombiano
                    case 'CU': // Peso cubano
                    case 'MX': // Peso mexicano
                    case 'DO': // Peso dominicano
                    case 'US': // Dolar USA
                    case 'SV':
                    case 'EC':
                    case 'PR':
                    case 'CA': // Dolar Canadiense
                    return ',';
            case 'CL':
                    case 'BO':
                    case 'BR':
                    case 'CR':
                    case 'GT':
                    case 'HN':
                    case 'NI':
                    case 'PA':
                    case 'PY':
                    case 'PE':
                    case 'UY':
                    case 'VE':
                    return '.'; // Bol&iacute;var
            default:
                    return '.';
            }
            }

            function simbolo_moneda() {
            switch (MONEDA) {
            case 'CL': // Peso chileno
                    case 'AR': // Peso Argentino
                    case 'CO': // Peso colombiano
                    case 'CU': // Peso cubano
                    case 'MX': // Peso mexicano
                    case 'DO': // Peso dominicano
                    case 'US': // Dolar USA
                    case 'SV':
                    case 'EC':
                    case 'PR':
                    case 'CA': // Dolar Canadiense
                    return '$';
            case 'ES':
                    return 'e'; // Euro
            case 'BO':
                    return 'Bs'; // Boliviano
            case 'BR':
                    return 'R$'; // Real
            case 'CR':
                    return 'C$'; // Col&oacute;n costarricense
            case 'GT':
                    return 'Q'; // Quetzal
            case 'HN':
                    return 'L'; // Lempira
            case 'NI':
                    return 'C$'; // C&oacute;rdoba
            case 'PA':
                    return 'B/.'; // Balboa
            case 'PY':
                    return 'G'; // Guaran&iacute;
            case 'PE':
                    return 'S/.'; // Nuevo sol
            case 'UY':
                    return '\$u'; // Peso uruguayo
            case 'VE':
                    return 'Bs'; // Bol&iacute;var
            default:
                    return '$';
            }
            }
        </script>
    </head>
    <body>

        <script language="javascript">

            var gbl_pago_fijo = 0.000;
            var gbl_pago_fijo_intervalo_meses = 0;
            var gbl_descuento_porcentaje = 0.000;
            var gbl_descuento_fijo = 0.000;
            var gbl_plan_id_plan = 1;
            var gbl_plan_plan = "STDR DSK018";
            var gbl_plan_precio_base = 25000.000;
            var gbl_plan_usuarios_pago_incluidos = 1;
            var gbl_arr_plan_detalle = [];
            var gbl_arr_plan_intervalos = [];
            // DETALLE PLAN
            gbl_arr_plan_detalle.push({
            IdPlanPerfilPago : "1",
                    EsPago:  "1",
                    IdTipoEmpleado:  "2",
                    TipoEmpleado:  "Profesional Doctor",
                    PrecioAdicional: "7000.000"
            });
            gbl_arr_plan_detalle.push({
            IdPlanPerfilPago : "2",
                    EsPago:  "1",
                    IdTipoEmpleado:  "4",
                    TipoEmpleado:  "Profesional Doctor Administrador Gr.",
                    PrecioAdicional: "7000.000"
            });
            gbl_arr_plan_detalle.push({
            IdPlanPerfilPago : "0",
                    EsPago:  "0",
                    IdTipoEmpleado:  "1",
                    TipoEmpleado:  "Administrador Gr.",
                    PrecioAdicional: "0.000"
            });
            gbl_arr_plan_detalle.push({
            IdPlanPerfilPago : "0",
                    EsPago:  "0",
                    IdTipoEmpleado:  "5",
                    TipoEmpleado:  "Administrador Sucursal",
                    PrecioAdicional: "0.000"
            });
            gbl_arr_plan_detalle.push({
            IdPlanPerfilPago : "0",
                    EsPago:  "0",
                    IdTipoEmpleado:  "6",
                    TipoEmpleado:  "Asistente",
                    PrecioAdicional: "0.000"
            });
            gbl_arr_plan_detalle.push({
            IdPlanPerfilPago : "0",
                    EsPago:  "0",
                    IdTipoEmpleado:  "7",
                    TipoEmpleado:  "Marketing",
                    PrecioAdicional: "0.000"
            });
            gbl_arr_plan_detalle.push({
            IdPlanPerfilPago : "0",
                    EsPago:  "0",
                    IdTipoEmpleado:  "8",
                    TipoEmpleado:  "Profesional o Técnico (No Doctor)",
                    PrecioAdicional: "0.000"
            });
            gbl_arr_plan_detalle.push({
            IdPlanPerfilPago : "0",
                    EsPago:  "0",
                    IdTipoEmpleado:  "3",
                    TipoEmpleado:  "Secretaria/Recepción",
                    PrecioAdicional: "0.000"
            });
            gbl_arr_plan_intervalos.push({
            IdPlanIntervaloPago : "3",
                    IdPlan:  "1",
                    IntervaloMeses:  "12",
                    Descripcion:  "Anual",
                    Descuento: "10"
            });
            gbl_arr_plan_intervalos.push({
            IdPlanIntervaloPago : "2",
                    IdPlan:  "1",
                    IntervaloMeses:  "6",
                    Descripcion:  "Semestral",
                    Descuento: "5"
            });
            gbl_arr_plan_intervalos.push({
            IdPlanIntervaloPago : "1",
                    IdPlan:  "1",
                    IntervaloMeses:  "1",
                    Descripcion:  "Mensual",
                    Descuento: "0"
            });
        </script>


        <header>
            <!-- Logo: 19% -->
            <a href="#" class='logo_div' style='background-image: url(i/logo.png)'></a>
            <!-- Logo: 81% -->
            <div class='menu_div'>
                <div class='row'>
                    <!-- Menu Derecha -->
                    <div class='dropdown pull-right text-right'>
                        &nbsp;&middot;&nbsp;
                        <a href='#' class='color_dd' onclick='tour_pagina_init()'>Tour</a>
                        &nbsp;&middot;&nbsp;
                        <a href='#' id='menu_usuario' class='dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='true'>
                            Paciente01 <b class='caret'></b>
                        </a>
                        <ul class='dropdown-menu dropdown-menu-right dropdown_menu_arrow' aria-labelledby='menu_usuario'>
                            <li><a href='#' tabindex='-1'>Configurar Cuenta</a></li>
                            <li><a href='#' tabindex='-1'>Cambiar Clave</a></li>
                            <li><a href='#' tabindex='-1'>Cambiar Obs. Ppto.</a></li>
                            <li><a href='#' tabindex='-1'>Copia de Correos</a></li>
                            <li><a href='#' tabindex='-1'>Mis Reportes</a></li>
                            <li class='hide'>
                                <a href='#' tabindex='-1'>
                                    English                        </a>
                            </li>
                            <li><a href='#' tabindex='-1'>Cerrar Sesi&oacute;n</a></li>
                        </ul>
                        <br>
                        <span>Martes, 05 de Junio de 2018</span>
                    </div>
                </div>
                <div class='row'>
                    <nav>
                        <a href='#' id='menu_inicio'>
                            <i class='icon_calendar'></i><br><span class='text_menu'>Agenda</span>
                        </a>
                        <a href='#' id='menu_pacientes'>
                            <i class='icon_contacts_alt'></i><br><span class='text_menu'>Pacientes</span>
                        </a>
                        <a href='#' id='menu_administrador'>
                            <i class='icon_lock_alt'></i><br><span class='text_menu'>Administrador</span>
                        </a>
                        <a href='#' id='menu_reportes'>
                            <i class='icon_datareport'></i><br><span class='text_menu'>Reportes</span>
                        </a>
                        <a href='#' id='menu_configuracion'>
                            <i class='icon_cog'></i><br><span class='text_menu'>Configuraci&oacute;n</span>
                        </a>
                    </nav>
                </div>
            </div>
        </header>

        <div class='container-fluid content_app'>
            <div class='content_left'>
                <div class='content_left_help'>
                    <div class='content_nota'>
                        <h5 class='nota_title'>Pacientes</h5>
                        <p>Esta p&aacute;gina le servir&aacute; para ingresar, actualizar, buscar y/o seleccionar Pacientes.<br>
                            Si usted tiene un perfil administrador podr&aacute; ver la lista con TODOS los pacientes de la cl&iacute;nica en TODAS sus sucursales. Si su perfil es de Profesional usted s&oacute;lo podr&aacute; ver los pacientes que le corresponden a usted.</p>
                    </div>
                    <div class='content_accion'>
                        <h5 class='accion_title'>Clasificaci&oacute;n de Controles</h5>
                        <div class='accion_content'>
                            <p><i class='my_icon_min my_icon_ficha'></i> Ficha</p>
                            <p><i class='my_icon_min my_icon_historial'></i> Evoluci&oacute;n/Historial</p>
                            <p><i class='my_icon_min my_icon_presupuestos'></i> Presupuestos</p>
                            <p><i class='my_icon_min my_icon_pagos'></i> Pagos</p>
                            <p><i class='my_icon_min my_icon_horas'></i> Horas</p>
                            <p><i class='my_icon_min my_icon_delete'></i> Desactivar Paciente</p>
                        </div>
                    </div>
                </div>
                <div id='small_calendar' class='content_accion'>
                    <div id='datepicker'></div>
                </div>
            </div>
            <div class='content_right'>
                <div class='box_white_right'>
                    <div class='menu_acciones'>


                    </div>
                    <div class='table-responsive'>
                        aquiiiiiiiiiiiiiiiiiiiiiii

                        <h1 align="center">Listado de Pacientes</h1>

                        <table border="1" width="600" align="center">

                            <tr bgcolor="skyblue">
                                <th colspan="5">Mantenimiento de Pacientes</th>
                                <th>
                                    <a href="registro.jsp"><img src="Iconos/nuevo.png" width="50" height="50"></a></th>
                            </tr>

                            <tr bgcolor="skyblue">
                                <th>Doc</th><th>Nombre</th><th>EPS</th><th>Email</th><th>Pass</th><th>Tel</th><th>Accion</th>
                            </tr>
                            <%
                                Connection conexion = null;
                                Statement st = null;
                                ResultSet rs = null;

                                try {
                                    Class.forName("com.mysql.jdbc.Driver");
                                    conexion = DriverManager.getConnection("jdbc:mysql://localhost/proyectofinal?user=root&password=");

                                    st = conexion.createStatement();
                                    rs = st.executeQuery("select * from pacientes");
                                    while (rs.next()) {//recorro fila a fila y luego pido las columnas
%>
                            <tr>
                                <th><%=rs.getString(1)%></th>
                                <th><%=rs.getString(2)%></th>
                                <th><%=rs.getString(3)%></th>
                                <th><%=rs.getString(4)%></th>
                                <th><%=rs.getString(5)%></th>
                                <th><%=rs.getString(6)%></th>
                                <th>
                                    <%--redirecciona a la pagina editar.jsp y envía un parametro que llamamos cod --%>
                                    <a href="editarPaciente.jsp?doc=<%=rs.getString(1)%>"><img src="Iconos/editar.png" width="30" height="30"></a> ||
                                        <%--redirecciona a la pagina eliminar.jsp y envía un parametro que llamamos cod --%>
                                    <a href="eliminarPaciente.jsp?doc=<%=rs.getString(1)%>"><img src="Iconos/eliminar.png" width="30" height="30"></a>
                                </th>
                            </tr>
                            <%
                                    }
                                    st.close();
                                    rs.close();
                                    conexion.close();
                                } catch (Exception e) {
                                }
                            %>
                        </table>
                    </div>
                </div>
            </div>
            <footer class='relative'>
                <a href='index.jsp' class='absolute'>
                    <img src='i/logo.png' class='logo_footer'/>
                </a>
                <p class='margin_top'>
                    <i class='glyphicon glyphicon-envelope color_dd'></i>
                    <a href='mailto:contacto@corporacionENA.com' target='_blank'>contacto@corporacionENA.com</a>
                    &nbsp;&nbsp;
                    &nbsp;&nbsp;
                    <i class='glyphicon glyphicon-earphone color_dd'></i>
                    <span>Dudas y consultas: </span>
                    <a href='tel:+5740435645'>+57 4043 5645</a>
                    &nbsp;&nbsp;
                    <i class='glyphicon glyphicon-earphone color_dd'></i>
                    <span>Soporte T&eacute;cnico: </span>
                    <a href='tel:+5740223909'>+57 4022 3909</a>
                    &nbsp;&nbsp;
                    <i class='glyphicon glyphicon-earphone color_dd'></i>
                    <span>Soporte Comercial: </span>
                    <a href='tel:+5775881906'>+57 7588 1906</a>
                </p>
                <p><i class='glyphicon glyphicon-map-marker color_dd'></i>
                    <button type="label" data-toggle="modal" data-target="#myModal">Edificio Central, piso 2. San Rafael, Antioquia.</button>
                </p>
            </footer>

            <div class="modal fade" id="myModal" role="dialog">
                <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">Google Maps</h4>
                        </div>
                        <div class="modal-body">

                            <div id="map_canvas" style="width:auto; height: 400px;"></div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <script src="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyAsXY3V5qK1D2DlcXZwyW2YkNBnvVTZsUE"></script>
            <script type="text/javascript">
                            function initializeMap() {
                            var mapOptions = {
                            center: new google.maps.LatLng( - 33.42441, - 70.6189588),
                                    zoom: 17,
                                    mapTypeId: google.maps.MapTypeId.ROADMAP
                            };
                            var map = new google.maps.Map(document.getElementById("map_canvas"),
                                    mapOptions);
                            var marker = new google.maps.Marker({
                            position: new google.maps.LatLng( - 33.42441, - 70.6189588)
                            });
                            marker.setMap(map);
                            }

                            //show map on modal
                            $('#myModal').on('shown.bs.modal', function () {
                            initializeMap();
                            });
                            // DATA PARA VERIFICACION

                            /*
                             Fecha inicio nuevos abonos: 2018-02-20 00:00:00	*/

            </script>

            <!-- Google Analytics Script -->
            <script>
                (function(i, s, o, g, r, a, m){i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function(){
                (i[r].q = i[r].q || []).push(arguments)}, i[r].l = 1 * new Date(); a = s.createElement(o),
                        m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
                })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
                ga('create', 'UA-46684695-2', 'auto', {'allowLinker': true});
                ga('require', 'linker');
                ga('linker:autoLink', ['app.dentidesk.pe', 'app.dentidesk.us', 'app.dentidesk.com']);
                ga('require', 'displayfeatures');
                ga('send', 'pageview');
            </script>
            <!-- UserVoice JavaScript SDK (only needed once on a page) -->
            <script>
                (function(){
                var uv = document.createElement('script');
                uv.type = 'text/javascript';
                uv.async = true;
                uv.src = '//widget.uservoice.com/AlFCkqvnLqRpqyz0gcukqA.js';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(uv, s)})()
            </script>

            <!-- UserVoice - A tab to launch the Classic Widget -->
            <script>
                        UserVoice = window.UserVoice || [];
                UserVoice.push([
                        'showTab',
                        'classic_widget', {
                        mode              : 'full',
                                locale            : 'es',
                                primary_color     : '#00b588',
                                link_color        : '#00b588',
                                default_mode      : 'feedback',
                                forum_id          : 240706,
                                support_tab_name  : desk_global.support_label,
                                feedback_tab_name : desk_global.feedback_label,
                                tab_label         : desk_global.feedback_label,
                                tab_color         : '#00b588',
                                tab_position      : 'middle-left',
                                tab_inverted      : false
                        }
                ]);
            </script>

        </div>

        <input type='hidden' id='id_empresa' value='2507'/>
        <input type='hidden' id='id_usuario' value='5423'/>
        <input type='hidden' id='id_empleado' value='5423'/>
        <input type='hidden' id='id_perfil' value='1'/>

        <script src='js/dd_pacientes.js?v=10.20180522.094600'></script>
        <script src='js/tour_pacientes.js'></script>
        <script type='text/javascript'>
                var rows_per_page = 15;
                var is_admin = '1';
                var permiso_pagos = '1';
                $('#pagination_pacientes').bootpag({
                total      : 0,
                        page       : 1,
                        maxVisible : 10,
                        leaps      : true
                }).on('page', function(event, num) {
                cambiar_pagina(num);
                });
        </script>
    </body>
</html>

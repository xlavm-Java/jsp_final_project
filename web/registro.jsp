<%-- 
    Document   : registro
    Created on : 06-jun-2018, 16:52:39
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
        <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1'/>

        <!-- SITE TITLE -->
        <title>Corporación el Niño Alegre - Software Dental</title>

        <!-- ========== FAV AND TOUCH ICONS ========== -->
        <link rel='icon' href='favicon.ico?v=10.20180213.183417'/>
        <link rel='apple-touch-icon' href='images/apple-touch-icon.png'/>
        <link rel='apple-touch-icon' sizes='72x72' href='images/apple-touch-icon-72x72.png'/>
        <link rel='apple-touch-icon' sizes='114x114' href='images/apple-touch-icon-114x114.png'/>

        <!-- ========== STYLESHEETS ========== -->
        <!-- BOOTSTRAP -->
        <link rel='stylesheet' href='css/bootstrap.3.3.6.min.css'/>

        <!-- FONT ICONS -->
        <link rel='stylesheet' href='assets/elegant-icons/style.css'/>
        <link rel='stylesheet' href='assets/app-icons/styles.css'/>
        <!--[if lte IE 7]><script src='lte-ie7.js'></script><![endif]-->

        <!-- WEB FONTS -->
        <link rel='stylesheet' href='css/fonts/montserrat.css'/>

        <!-- World Flags: https://github.com/lafeber/world-flags-sprite -->
        <link rel='stylesheet' type='text/css' href='css/flags16.css'/>
        <link rel='stylesheet' type='text/css' href='css/flags32.css'/>

        <!-- ANIMATIONS -->
        <link rel='stylesheet' href='css/animate.min.css'/>

        <!-- CUSTOM STYLESHEETS -->
        <link rel='stylesheet' href='css/styles.css?v=10.20180213.183417'/>
        <link rel='stylesheet' href='css/dd_style.css?v=10.20180213.183417'/>
        <link rel='stylesheet' href='css/base-ui.css?v=10.20180213.183417'/>
        <link rel='stylesheet' href='css/platform.css?v=10.20180213.183417'/>

        <!-- COLORS -->
        <link rel='stylesheet' href='css/colors/green.css?v=10.20180213.183417'/>

        <!-- RESPONSIVE FIXES -->
        <link rel='stylesheet' href='css/responsive.css?v=10.20180213.183417'/>

        <!--[if lt IE 9]>
            <script src='js/html5shiv.js'></script>
            <script src='js/respond.min.js'></script>
        <![endif]-->

        <!-- JQUERY -->
        <script type='text/javascript' src='js/jquery-1.11.3.min.js'></script>
        <script type='text/javascript' src='js/bootstrap.3.3.6.min.js'></script>
        <script type='text/javascript' src='js/sprintf.1.0.3.min.js'></script>
        <script type='text/javascript' src='js/locale/index_es.js?v=10.20180213.183417'></script>
        <script type='text/javascript'>
        var LOCALE = 'es';
        var DIRECTORIO = 'agendame.itplaydo.com';
        $(document).ready(function() {
        $('#info_principal_close').click(function(event) {
        $('#info_principal').addClass('invisible');
        });
        });
        function alert_principal(tipo_alerta, mensaje) {
        $('#info_principal').removeClass('invisible');
        $('#info_principal').attr('style', '');
        $('#info_principal_alert').attr('class', 'alert alert-' + tipo_alerta);
        $('#mensaje_alert').html(mensaje);
        setTimeout(function() {
        $('#info_principal').fadeOut('fast');
        }, 7000);
        }

        function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
        }
        </script>
    </head>
    <body data-box='box'>
        <div class='ajax-loader'></div>
        <div id='info_principal' class='info_principal invisible'>
            <div id='info_principal_alert' class='alert' role='alert'>
                <button type='button' class='close' id='info_principal_close'>&times;</button>
                <span id='mensaje_alert'></span>
            </div>
        </div>

        <div class='color-overlay start-wizard full-height scroll'>
            <form action='' method='post' id='form-login' class='a-form' autocomplete='off'>
                <input type='hidden' id='ref-reg' name='ref-reg'/>
                <a href='index.jsp' id='index_btn'>
                    <img src='i/logo.png' alt='' class='logo-login'/>
                </a>
                <hgroup>
                    <h3>Bienvenid@</h3>
                </hgroup>
                <div class='active'>
                    <div class='form-block'>


                        <div class='box-row'>
                            <div class='col-md-3 col-sm-3 col-xs-12'>
                                <label for='title-wiz'>Tipo Doc.</label>
                                <select name='title-wiz' id='title-wiz' class='input'>
                                    <option value='Dr' >C.C.</option>
                                    <option value='Dra' >T.I.</option>
                                    <option value='Sr' >R.C.</option>
                                    <option value='Sra' >T.E.</option>
                                </select>
                            </div>
                            <div class='col-md-9 col-sm-9 col-xs-12'>
                                <label for='name-wiz'>Numero Documento</label>
                                <input type='text' class='input' id='name-wiz' name='doc' placeholder='Numero de Documento' value='' required/>
                            </div>
                        </div>

                        <div class='box-row'>
                            <div class='col-md-12 col-sm-12 col-xs-12'>
                                <label for='name-wiz'>Nombre Completo</label>
                                <input type='text' class='input' id='name-wiz' name='nombre' placeholder='Nombre completo' value='' required/>
                            </div>
                        </div>

                        <div class='box-row'>
                            <div class='col-md-12 col-sm-12 col-xs-12'>
                                <label for='name-wiz'>EPS</label>
                                <input type='text' class='input' id='name-wiz' name='eps' placeholder='eps' value='' required/>
                            </div>
                        </div>
                        
                        
                        <div class='box-row'>
                            <div class='col-md-12 col-sm-12 col-xs-12'>
                                <label for='email-reg'>Correo electr&oacute;nico</label>
                                <input type='email' id='email-reg' name='email' class='input' value='' placeholder='correo@ejemplo.com' required/>
                            </div>
                        </div>
                        <div class='box-row'>
                            <div class='col-md-12 col-sm-12 col-xs-12'>
                                <label for='pass-reg'>Clave</label>
                                <input type='password' id='pass-reg' name='pass' class='input' placeholder='Clave (6-12 caracteres)' required/>
                            </div>
                        </div>
                        <div class='box-row'>
                            <div class='col-md-12 col-sm-12 col-xs-12'>
                                <label for='phone-clinic-wiz'>Tel&eacute;fono</label>
                                <input type='tel' name='tel' id='phone-clinic-wiz' class='input' placeholder='+57 1234 5678' value=''/>
                            </div>
                        </div>
                        <div class='box-row'>
                            <label for='terminos-wiz' class='checkbox'>
                                <input type='checkbox' name='terminos-wiz' id='terminos-wiz'>
                                <i></i> Acepta los <a href='#' onclick='javascript:$("#modal_terminos").modal("show");'><u>T&eacute;rminos de Uso</u></a>
                            </label>
                        </div>
                    </div>
                    <div class='clear'></div>
                    <div class='form-block'>
                        <div class='box-row'>
                            <button type='submit' name='btnguardar'lass='btn btn-default standard-button btn-block' id='btn_crear_cuenta'>Agregar Paciente</button>
                        </div>
                    </div>
                    <div class='clear'></div>
                    <div class='footer_login margin_top'>
                        <div class='form-block margin_top'>
                            <div class='box-row'>
                                <a href='index.html' id='login_btn' class='btn btn-default standard-button btn-block'>Ingresa aqu&iacute;</a>
                            </div>
                        </div>
                        <div class='clear'></div>
                    </div>
                </div>
            </form>
            
             <%
            if (request.getParameter("btnguardar") != null) {
                String doc = request.getParameter("doc");
                String nombre = request.getParameter("nombre");
                String eps = request.getParameter("eps");
                String email = request.getParameter("email");
                String pass = request.getParameter("pass");
                String tel = request.getParameter("tel");

                Connection conexion = null;
                Statement st = null;
                ResultSet rs = null;
                try {
                    Class.forName("com.mysql.jdbc.Driver");
                    conexion = DriverManager.getConnection("jdbc:mysql://localhost/proyectofinal?user=root&password=");

                    st = conexion.createStatement();
                    st.executeUpdate("insert into pacientes values('" + doc + "','" + nombre + "','" + eps + "','" + email + "','" + pass + "','" + tel +"')");
                    //la siguiente linea hace que devuelva a la pagina indicada
                    request.getRequestDispatcher("paciente.jsp").forward(request, response);

                    st.close();
                    rs.close();
                    conexion.close();
                } catch (Exception e) {
                    out.print(e + "");
                }
            }
        %>
        
        </div>

        <div id='modal_terminos' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='modal_terminos_label' aria-hidden='true'>
            <div class='modal-dialog modal-xlg'>
                <div class='modal-content'>
                    <div class='modal-header'>
                        <button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
                        <h5 class='modal-title' id='modal_terminos_label'>T&eacute;rminos de uso generales del servicio</h5>
                    </div>
                    <div class='modal-body'></div></div>
            </div>
        </div>

    </body>

</html>

<%-- 
    Document   : editarPaciente
    Created on : 06-jun-2018, 17:19:20
    Author     : Luis Angel
--%>

<%@page import="java.sql.DriverManager"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>
<%@page import="java.sql.Connection"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
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
            
             <%
            String doc = request.getParameter("doc");

            Connection conexion = null;
            Statement st = null;
            ResultSet rs = null;

            try {
                Class.forName("com.mysql.jdbc.Driver");
                conexion = DriverManager.getConnection("jdbc:mysql://localhost/proyectofinal?user=root&password=");

                st = conexion.createStatement();
                rs = st.executeQuery("select * from pacientes where doc = '" + doc + "'");
                while (rs.next()) {//recorro fila a fila y luego pido las columnas
        %>
            
            <%--como el action está vacio "" entonces se redirecciona a la misma pagina y se ejecuta el codigo
        que se encuentra despues de la etiqueta de cierre del form--%>
            <form action='' method='post' id='form-login' class='a-form' autocomplete='off'>
                <input type='hidden' id='ref-reg' name='ref-reg'/>
                <a href='index.jsp' id='index_btn'>
                    <img src='i/logo.png' alt='' class='logo-login'/>
                </a>
                <hgroup>
                    <h3>Editar Paciente</h3>
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
                                <input type='text' class='input' id='name-wiz' name='doc' placeholder='Numero de Documento' value="<%=rs.getString(1)%>" readonly="readonly" required/><%--readonly es para que no se permita editar--%>
                            </div>
                        </div>

                        <div class='box-row'>
                            <div class='col-md-12 col-sm-12 col-xs-12'>
                                <label for='name-wiz'>Nombre Completo</label>
                                <input type='text' class='input' id='name-wiz' name='nombre' placeholder='Nombre completo' value="<%=rs.getString(2)%>" required/>
                            </div>
                        </div>

                        <div class='box-row'>
                            <div class='col-md-12 col-sm-12 col-xs-12'>
                                <label for='name-wiz'>EPS</label>
                                <input type='text' class='input' id='name-wiz' name='eps' placeholder='eps' value="<%=rs.getString(3)%>" required/>
                            </div>
                        </div>
                        
                        
                        <div class='box-row'>
                            <div class='col-md-12 col-sm-12 col-xs-12'>
                                <label for='email-reg'>Correo electr&oacute;nico</label>
                                <input type='email' id='email-reg' name='email' class='input' value='' placeholder='correo@ejemplo.com' value="<%=rs.getString(4)%>" required/>
                            </div>
                        </div>
                        <div class='box-row'>
                            <div class='col-md-12 col-sm-12 col-xs-12'>
                                <label for='pass-reg'>Clave</label>
                                <input type='password' id='pass-reg' name='pass' class='input' placeholder='Clave (6-12 caracteres)' value="<%=rs.getString(5)%>" required/>
                            </div>
                        </div>
                        <div class='box-row'>
                            <div class='col-md-12 col-sm-12 col-xs-12'>
                                <label for='phone-clinic-wiz'>Tel&eacute;fono</label>
                                <input type='tel' name='tel' id='phone-clinic-wiz' class='input' placeholder='+57 1234 5678' value="<%=rs.getString(6)%>"/>
                            </div>
                        </div>
                    </div>
                    <div class='clear'></div>
                    <div class='form-block'>
                        <div class='box-row'>
                            <button type='submit' name='btneditar'lass='btn btn-default standard-button btn-block' id='btn_crear_cuenta'>Editar Paciente</button>
                        </div>
                    </div>
                    <div class='clear'></div>
                
                </div>
            </form>
            
                             <%
                }
            } catch (Exception e) {
            }
            if (request.getParameter("btneditar") != null) {
                String docp = request.getParameter("doc");
                String nombre = request.getParameter("nombre");
                String eps = request.getParameter("eps");
                String email = request.getParameter("email");
                String pass = request.getParameter("pass");
                String tel = request.getParameter("tel");
                rs = st.executeQuery("update pacientes set nombre='"+nombre+"',eps="+eps+", email='"+email+"', pass='"+pass+"', tel='"+tel+"' where doc='"+docp+"'");
                request.getRequestDispatcher("paciente.jsp").forward(request, response);
            }
        %>
            
        </div>

        
    </body>

</html>

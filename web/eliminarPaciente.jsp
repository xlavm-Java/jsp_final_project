<%-- 
    Document   : eliminarPaciente
    Created on : 06-jun-2018, 17:32:48
    Author     : Luis Angel
--%>

<%@page import="java.sql.Connection"%>
<%@page import="java.sql.DriverManager"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <%
                String doc = request.getParameter("doc");

                Connection conexion = null;
                Statement st = null;
                ResultSet rs = null;
                try {
                    Class.forName("com.mysql.jdbc.Driver");
                    conexion = DriverManager.getConnection("jdbc:mysql://localhost/proyectofinal?user=root&password=");

                    st = conexion.createStatement();
                    st.executeUpdate("delete from pacientes where doc = '"+doc+"'");
                    //la siguiente linea hace que devuelva a la pagina indicada
                    request.getRequestDispatcher("paciente.jsp").forward(request, response);

                    st.close();
                    rs.close();
                    conexion.close();
                } catch (Exception e) {
                    out.print(e + "");
                }
        %>
    </body>
</html>

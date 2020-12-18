/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.udea.ProyectoFinal.Persistencia.Entidad;


import co.edu.udea.ProyectoFinal.Dominio.DTO.administradorDTO;
import co.edu.udea.ProyectoFinal.Persistencia.DAO.administradorDAO;
import java.util.List;

/**
 * Clase en desarrollo
 *
 * @author Luis Angel
 */
public class administradorDAOimp implements administradorDAO {

    administradorDTO objAdministrador = new administradorDTO();
    conexion objConexion = new conexion();

    /**
     * Metodo en desarrollo sobreescrito
     *
     * @param objAdmin
     */
    @Override
    public void registrarAdmin(administradorDTO objAdmin) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    /**
     * Metodo en desarrollo sobreescrito
     *
     * @return
     */
    @Override
    public List<String[]> mostrarAdmin() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    /**
     * Metodo en desarrollo sobreescrito
     *
     * @param objAdmin
     */
    @Override
    public void editarAdmin(administradorDTO objAdmin) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    /**
     * Metodo en desarrollo sobreescrito
     *
     * @param user
     * @param pass
     * @return
     */
    @Override
    public boolean validarLoggin(String user, String pass) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }


}

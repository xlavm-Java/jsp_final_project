/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.udea.ProyectoFinal.Persistencia.Entidad;

import co.edu.udea.ProyectoFinal.Dominio.DTO.pacienteDTO;
import co.edu.udea.ProyectoFinal.Persistencia.DAO.pacienteDAO;
import java.util.List;

/**
 * Clase en desarrollo
 *
 * @author Luis Angel
 */
public class pacienteDAOimp implements pacienteDAO {

    pacienteDTO objAdministrador = new pacienteDTO();
    conexion objConexion = new conexion();

    /**
     * Metodo en desarrollo sobreescrito
     *
     * @param objPaciente
     */
    @Override
    public void registrarPaciente(pacienteDTO objPaciente) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    /**
     * Metodo en desarrollo sobreescrito
     *
     * @param paciente
     * @return
     */
    @Override
    public pacienteDTO consultarPaciente(String paciente) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    /**
     * Metodo en desarrollo sobreescrito
     *
     * @param objPaciente
     */
    @Override
    public void editarPaciente(pacienteDTO objPaciente) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    /**
     * Metodo en desarrollo sobreescrito
     *
     * @return
     */
    @Override
    public List<String[]> mostrarTodos() {
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

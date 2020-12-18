/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.udea.ProyectoFinal.Persistencia.Entidad;

import co.edu.udea.ProyectoFinal.Dominio.DTO.citasDTO;
import co.edu.udea.ProyectoFinal.Persistencia.DAO.citasDAO;

/**
 * Clase en desarrollo
 *
 * @author Luis Angel
 */
public class citasDAOimp implements citasDAO {

    citasDTO objAdministrador = new citasDTO();
    conexion objConexion = new conexion();

    /**
     * Metodo en desarrollo sobreescrito
     *
     * @param objCita
     */
    @Override
    public void asignarCitas(citasDTO objCita) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    /**
     * Metodo en desarrollo sobreescrito
     *
     * @param objCita
     */
    @Override
    public void modificarCitas(citasDTO objCita) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    /**
     * Metodo en desarrollo sobreescrito
     *
     * @param objCita
     */
    @Override
    public void cancelarCita(citasDTO objCita) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    /**
     * Metodo en desarrollo sobreescrito
     *
     * @param cita
     */
    @Override
    public void eliminarCita(String cita) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    /**
     * Metodo en desarrollo sobreescrito
     *
     * @param cita
     * @return
     */
    @Override
    public citasDTO consultarCita(String cita) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

}

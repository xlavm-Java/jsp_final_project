/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.udea.ProyectoFinal.Persistencia.Entidad;
import co.edu.udea.ProyectoFinal.Dominio.DTO.asistenciasDTO;
import co.edu.udea.ProyectoFinal.Dominio.DTO.citasDTO;
import co.edu.udea.ProyectoFinal.Dominio.DTO.pacienteDTO;
import co.edu.udea.ProyectoFinal.Persistencia.DAO.asistenciasDAO;

/**
 * Clase en desarrollo
 *
 * @author Luis Angel
 */
public class asistenciasDAOimp implements asistenciasDAO {

    asistenciasDTO objAdministrador = new asistenciasDTO();
    conexion objConexion = new conexion();

    /**
     * Metodo en desarrollo sobreescrito
     *
     * @param objPaciente
     * @param objCitas
     */
    @Override
    public void confirmarAsistencia(pacienteDTO objPaciente, citasDTO objCitas) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    /**
     * Metodo en desarrollo sobreescrito
     *
     * @param objPaciente
     * @param objCitas
     */
    @Override
    public void modificarAsistencia(pacienteDTO objPaciente, citasDTO objCitas) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }


}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.udea.ProyectoFinal.Persistencia.DAO;

import co.edu.udea.ProyectoFinal.Dominio.DTO.citasDTO;
import co.edu.udea.ProyectoFinal.Dominio.DTO.pacienteDTO;

/**
 * Interfaz en desarrollo
 * @author Luis Angel
 */
public interface asistenciasDAO {

    public void confirmarAsistencia(pacienteDTO objPaciente, citasDTO objCitas);

    public void modificarAsistencia(pacienteDTO objPaciente, citasDTO objCitas);
}

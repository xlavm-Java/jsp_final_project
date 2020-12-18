/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.udea.ProyectoFinal.Persistencia.DAO;

import co.edu.udea.ProyectoFinal.Dominio.DTO.pacienteDTO;
import java.util.List;

/**
 * Interfaz en desarrollo
 * @author Luis Angel
 */
public interface pacienteDAO {

    public void registrarPaciente(pacienteDTO objPaciente);

    public pacienteDTO consultarPaciente(String paciente);

    public void editarPaciente(pacienteDTO objPaciente);

    public List<String[]> mostrarTodos();

    public boolean validarLoggin(String user, String pass);
}

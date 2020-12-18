/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.udea.ProyectoFinal.Persistencia.DAO;

import co.edu.udea.ProyectoFinal.Dominio.DTO.citasDTO;


/**
 * Interfaz en desarrollo
 * @author Luis Angel
 */
public interface citasDAO {

    public void asignarCitas(citasDTO objCita);

    public void modificarCitas(citasDTO objCita);

    public void cancelarCita(citasDTO objCita);

    public void eliminarCita(String cita);

    public citasDTO consultarCita(String cita);
}

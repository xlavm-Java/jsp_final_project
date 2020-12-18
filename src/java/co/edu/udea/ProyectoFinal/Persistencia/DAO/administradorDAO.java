/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.udea.ProyectoFinal.Persistencia.DAO;


import co.edu.udea.ProyectoFinal.Dominio.DTO.administradorDTO;
import java.util.List;

/**
 * Interfaz en desarrollo
 * @author Luis Angel
 */
public interface administradorDAO {
    
    public void registrarAdmin(administradorDTO objAdmin);

    public List<String[]> mostrarAdmin();

    public void editarAdmin(administradorDTO objAdmin);

    public boolean validarLoggin(String user, String pass);
    
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.udea.ProyectoFinal.Dominio.DTO;

/**
 * Clase molde Asistencias en desarrollo
 *
 * @author Luis Angel
 */
public class asistenciasDTO {

    private String id;
    private String nroDocPaciente;
    private String nroDocAdministrador;
    private String fecha;
    private String asistencia;

    public asistenciasDTO() {
    }

    public asistenciasDTO(String id, String nroDocPaciente, String nroDocAdministrador, String fecha, String asistencia) {
        this.id = id;
        this.nroDocPaciente = nroDocPaciente;
        this.nroDocAdministrador = nroDocAdministrador;
        this.fecha = fecha;
        this.asistencia = asistencia;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNroDocPaciente() {
        return nroDocPaciente;
    }

    public void setNroDocPaciente(String nroDocPaciente) {
        this.nroDocPaciente = nroDocPaciente;
    }

    public String getNroDocAdministrador() {
        return nroDocAdministrador;
    }

    public void setNroDocAdministrador(String nroDocAdministrador) {
        this.nroDocAdministrador = nroDocAdministrador;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getAsistencia() {
        return asistencia;
    }

    public void setAsistencia(String asistencia) {
        this.asistencia = asistencia;
    }

}

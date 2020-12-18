/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.udea.ProyectoFinal.Dominio.DTO;

/**
 * Clase molde Citas en desarrollo
 *
 * @author Luis Angel
 */
public class citasDTO {

    private String id;
    private String nroDocPaciente;
    private String profesional;
    private String fecha;
    private String estadoCita;
    private String observaciones;

    public citasDTO() {
    }

    public citasDTO(String id, String nroDocPaciente, String profesional, String fecha, String estadoCita, String observaciones) {
        this.id = id;
        this.nroDocPaciente = nroDocPaciente;
        this.profesional = profesional;
        this.fecha = fecha;
        this.estadoCita = estadoCita;
        this.observaciones = observaciones;
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

    public String getProfesional() {
        return profesional;
    }

    public void setProfesional(String profesional) {
        this.profesional = profesional;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getEstadoCita() {
        return estadoCita;
    }

    public void setEstadoCita(String estadoCita) {
        this.estadoCita = estadoCita;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

}

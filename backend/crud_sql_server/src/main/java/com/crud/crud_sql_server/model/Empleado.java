package com.crud.crud_sql_server.model;

import lombok.Data;

@Data
public class Empleado {
    int idEmpleado;
    String nombre;
    String apellido;
    String puesto;

    public int getIdEmpleado() {
        return idEmpleado;
    }

    public String getNombre() {
        return nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public String getPuesto() {
        return puesto;
    }
}

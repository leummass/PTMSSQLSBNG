package com.crud.crud_sql_server.model;

import lombok.Data;

@Data
public class Empleado {
    int idempleado;
    String nombre;
    String apellido;
    String puesto;

    public int getIdEmpleado() {
        return idempleado;
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

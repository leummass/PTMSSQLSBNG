package com.crud.crud_sql_server.model;

import lombok.Data;

@Data
public class Poliza {
    int idpolizas;
    int empleadogenero;
    int sku;
    int cantidad;
    String fecha;

    public int getIdPolizas() {
        return idpolizas;
    }

    public int getEmpleadoGenero() {
        return empleadogenero;
    }

    public int getSku() {
        return sku;
    }

    public int getCantidad() {
        return cantidad;
    }

    public String getFecha() {
        return fecha;
    }
}
package com.crud.crud_sql_server.model;

import lombok.Data;

@Data
public class Poliza {
    int idPolizas;
    int empleadoGenero;
    String sku;
    int cantidad;
    String fecha;

    public int getIdPolizas() {
        return idPolizas;
    }

    public int getEmpleadoGenero() {
        return empleadoGenero;
    }

    public String getSku() {
        return sku;
    }

    public int getCantidad() {
        return cantidad;
    }

    public String getFecha() {
        return fecha;
    }
}
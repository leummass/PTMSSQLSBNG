package com.crud.crud_sql_server.model;

import lombok.Data;

@Data
public class Inventario {
    String sku;
    String nombre;
    int cantidad;

    public String getSKU() {
        return sku;
    }

    public String getNombre() {
        return nombre;
    }

    public int getCantidad() {
        return cantidad;
    }
}

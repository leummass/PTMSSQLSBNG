package com.crud.crud_sql_server.model;

public class RespuestaSQL {
    int resultado;
    String mensaje;

    public RespuestaSQL(int resultado, String mensaje) {
        this.resultado = resultado;
        this.mensaje = mensaje;
    }

    public int getResultado() {
        return resultado;
    }

    public String getMensaje() {
        return mensaje;
    }
}

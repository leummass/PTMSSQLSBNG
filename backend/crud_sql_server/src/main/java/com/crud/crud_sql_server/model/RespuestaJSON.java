package com.crud.crud_sql_server.model;

import java.util.HashMap;
import java.util.Map;

public class RespuestaJSON {
    private Map<String, Object> meta;
    private Map<String, Object> data;

    public RespuestaJSON() {
        this.meta = new HashMap<>();
        this.data = new HashMap<>();
    }

    public Map<String, Object> getMeta() {
        return meta;
    }

    public void setMeta(Map<String, Object> meta) {
        this.meta = meta;
    }

    public Map<String, Object> getData() {
        return data;
    }

    public void setData(Map<String, Object> data) {
        this.data = data;
    }
}

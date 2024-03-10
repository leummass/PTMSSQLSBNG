package com.crud.crud_sql_server.controller;

import com.crud.crud_sql_server.model.Empleado;
import com.crud.crud_sql_server.service.IEmpleadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("ptmssqlsbng/empleado")
@CrossOrigin("*")
public class EmpleadoController {
    @Autowired
    private IEmpleadoService iEmpleadoService;
    @GetMapping("/all")
    public ResponseEntity<List<Empleado>> list() {
        var result = iEmpleadoService.findAll();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}

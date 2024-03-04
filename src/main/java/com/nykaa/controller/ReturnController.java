package com.nykaa.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.nykaa.entities.ReturnProduct;
import com.nykaa.service.ReturnService;

import java.util.List;

@RestController
@RequestMapping("/returns")
@CrossOrigin(origins = "*")
public class ReturnController {

 @Autowired
 private ReturnService returnService;

 @PostMapping
 public ReturnProduct createReturn(@RequestBody ReturnProduct returnObject) {
     return returnService.saveReturn(returnObject);
 }

 @GetMapping
 public List<ReturnProduct> getAllReturns() {
     return returnService.getAllReturns();
 }


}


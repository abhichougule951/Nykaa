package com.nykaa.service;


import java.util.List;

import com.nykaa.entities.ReturnProduct;

public interface ReturnService {
 ReturnProduct saveReturn(ReturnProduct returnObject);
 List<ReturnProduct> getAllReturns();

}

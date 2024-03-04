package com.nykaa.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nykaa.entities.ReturnProduct;
import com.nykaa.repository.ReturnRepository;
import com.nykaa.service.ReturnService;
@Service
public class ReturnServiceImpl implements ReturnService{
	 @Autowired
	    private ReturnRepository returnRepository;

	    @Override
	    public ReturnProduct saveReturn(ReturnProduct returnObject) {
	        return returnRepository.save(returnObject);
	    }

	    @Override
	    public List<ReturnProduct> getAllReturns() {
	        return returnRepository.findAll();
	    }

}

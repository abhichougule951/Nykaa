package com.nykaa.dto;

import java.util.List;

public class UserDTO {

    private Long id;
    private String email;
    private String username;
    private List<Long> orderIds;

  

    public UserDTO() {
       
    }

    public UserDTO(Long id, String email, String username, List<Long> orderIds) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.orderIds = orderIds;
    }

   

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<Long> getOrderIds() {
        return orderIds;
    }

    public void setOrderIds(List<Long> orderIds) {
        this.orderIds = orderIds;
    }
}

package com.cloudstudio.ontology.bean;

public class WSEntity {
	private String address;
	private String desc;
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	private String name;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getJSONDescription() {
		// TODO Auto-generated method stub
		return "{" 
		+ "\"address\":\""+address 
		+ "\",\"desc\":\""+desc
		+ "\",\"name\":\""+name
		+ "\"}";
	}
}

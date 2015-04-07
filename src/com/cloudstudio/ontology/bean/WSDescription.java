package com.cloudstudio.ontology.bean;

public class WSDescription {
	private String desc;
    private WSEntity entity;
    private String wsdl;
    public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	public WSEntity getEntity() {
		return entity;
	}
	public void setEntity(WSEntity entity) {
		this.entity = entity;
	}
	public String getWsdl() {
		return wsdl;
	}
	public void setWsdl(String wsdl) {
		this.wsdl = wsdl;
	}
	public String getJSONDescription() {
		// TODO Auto-generated method stub
		return "{" 
		+ "\"desc\":\""+desc 
		+ "\",\"entity\":\""+entity.getJSONDescription()
		+ "\",\"wsdl\":\""+wsdl
		+ "\"}";
	}
}

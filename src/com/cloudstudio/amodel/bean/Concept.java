package com.cloudstudio.amodel.bean;

public class Concept {
	private long id;
	private String dtype;
	private String name;
	private long parentConcept_id;
	
	public Concept() {
		super();
	}
	public Concept(String dtype, String name, long parentConcept_id) {
		super();
		this.dtype = dtype;
		this.name = name;
		this.parentConcept_id = parentConcept_id;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getDtype() {
		return dtype;
	}
	public void setDtype(String dtype) {
		this.dtype = dtype;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public long getParentConcept_id() {
		return parentConcept_id;
	}
	public void setParentConcept_id(long parentConcept_id) {
		this.parentConcept_id = parentConcept_id;
	}
	
}

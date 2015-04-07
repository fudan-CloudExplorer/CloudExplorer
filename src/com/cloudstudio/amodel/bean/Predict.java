package com.cloudstudio.amodel.bean;

public class Predict {
	private long id;
	
	private long degree_id;
	
	private String name;

	public Predict(long degree_id, String name) {
		super();
		this.degree_id = degree_id;
		this.name = name;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getDegree_id() {
		return degree_id;
	}

	public void setDegree_id(long degree_id) {
		this.degree_id = degree_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}

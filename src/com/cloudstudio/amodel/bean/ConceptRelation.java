package com.cloudstudio.amodel.bean;

public class ConceptRelation {
	
	private long id;
	
	private long to_id;
	
	private long from_id;
	
	private long predict_degree_id;
	
	private String predict_name;

	public ConceptRelation(long to_id, long from_id, long predict_degree_id,
			String predict_name) {
		super();
		this.to_id = to_id;
		this.from_id = from_id;
		this.predict_degree_id = predict_degree_id;
		this.predict_name = predict_name;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getTo_id() {
		return to_id;
	}

	public void setTo_id(long to_id) {
		this.to_id = to_id;
	}

	public long getFrom_id() {
		return from_id;
	}

	public void setFrom_id(long from_id) {
		this.from_id = from_id;
	}

	public long getPredict_degree_id() {
		return predict_degree_id;
	}

	public void setPredict_degree_id(long predict_degree_id) {
		this.predict_degree_id = predict_degree_id;
	}

	public String getPredict_name() {
		return predict_name;
	}

	public void setPredict_name(String predict_name) {
		this.predict_name = predict_name;
	}
}

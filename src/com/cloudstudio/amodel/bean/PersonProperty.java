package com.cloudstudio.amodel.bean;

public class PersonProperty {
	private long id;
	
	private String fact;
	
	private Float fuzzyValue;
	
	private long concept_id;
	
	private long predict_degree_id;
	
	private String predict_name;
	
	private long individual_id;

	public PersonProperty(String fact, Float fuzzyValue, long concept_id,
			long predict_degree_id, String predict_name, long individual_id) {
		super();
		this.fact = fact;
		this.fuzzyValue = fuzzyValue;
		this.concept_id = concept_id;
		this.predict_degree_id = predict_degree_id;
		this.predict_name = predict_name;
		this.individual_id = individual_id;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getFact() {
		return fact;
	}

	public void setFact(String fact) {
		this.fact = fact;
	}

	public Float getFuzzyValue() {
		return fuzzyValue;
	}

	public void setFuzzyValue(Float fuzzyValue) {
		this.fuzzyValue = fuzzyValue;
	}

	public long getConcept_id() {
		return concept_id;
	}

	public void setConcept_id(long concept_id) {
		this.concept_id = concept_id;
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

	public long getIndividual_id() {
		return individual_id;
	}

	public void setIndividual_id(long individual_id) {
		this.individual_id = individual_id;
	}
}

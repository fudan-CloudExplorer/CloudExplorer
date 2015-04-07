package com.cloudstudio.amodel.bean;

public class PersonIndividualPersonProperty {
	private long id;
	
	private long personIndividual_id;
	
	private long properties_concept_id;
	
	private String properties_fact;
	
	private Float properties_fuzzyValue;
	
	private long properties_individual_id;
	
	private long properties_predict_degree_id;
	
	private String properties_predict_name;

	public PersonIndividualPersonProperty(long personIndividual_id,
			long properties_concept_id, String properties_fact,
			Float properties_fuzzyValue, long properties_individual_id,
			long properties_predict_degree_id, String properties_predict_name) {
		super();
		this.personIndividual_id = personIndividual_id;
		this.properties_concept_id = properties_concept_id;
		this.properties_fact = properties_fact;
		this.properties_fuzzyValue = properties_fuzzyValue;
		this.properties_individual_id = properties_individual_id;
		this.properties_predict_degree_id = properties_predict_degree_id;
		this.properties_predict_name = properties_predict_name;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getPersonIndividual_id() {
		return personIndividual_id;
	}

	public void setPersonIndividual_id(long personIndividual_id) {
		this.personIndividual_id = personIndividual_id;
	}

	public long getProperties_concept_id() {
		return properties_concept_id;
	}

	public void setProperties_concept_id(long properties_concept_id) {
		this.properties_concept_id = properties_concept_id;
	}

	public String getProperties_fact() {
		return properties_fact;
	}

	public void setProperties_fact(String properties_fact) {
		this.properties_fact = properties_fact;
	}

	public Float getProperties_fuzzyValue() {
		return properties_fuzzyValue;
	}

	public void setProperties_fuzzyValue(Float properties_fuzzyValue) {
		this.properties_fuzzyValue = properties_fuzzyValue;
	}

	public long getProperties_individual_id() {
		return properties_individual_id;
	}

	public void setProperties_individual_id(long properties_individual_id) {
		this.properties_individual_id = properties_individual_id;
	}

	public long getProperties_predict_degree_id() {
		return properties_predict_degree_id;
	}

	public void setProperties_predict_degree_id(long properties_predict_degree_id) {
		this.properties_predict_degree_id = properties_predict_degree_id;
	}

	public String getProperties_predict_name() {
		return properties_predict_name;
	}

	public void setProperties_predict_name(String properties_predict_name) {
		this.properties_predict_name = properties_predict_name;
	}
}

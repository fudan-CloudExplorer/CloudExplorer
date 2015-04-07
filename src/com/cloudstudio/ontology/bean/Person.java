package com.cloudstudio.ontology.bean;

import com.cloudstudio.ontology.annotation.CSDataProperty;
import com.cloudstudio.ontology.annotation.CSEntity;
import com.hp.hpl.jena.ontology.Individual;

public class Person implements CSEntity {

	@CSDataProperty(property = "hasGenderObj", isEnum = true, isObject = true)
	private Gender gender;
	@CSDataProperty(property = "hasBodyInfo", isObject = true)
	private BodyInfo bodyInfo;

	public Person() {
		gender = Gender.Male;
		bodyInfo = new BodyInfo();
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Individual gender) {
		this.gender = Gender.getGender(gender.getLocalName());
	}

	public BodyInfo getBodyInfo() {
		return bodyInfo;
	}

	public String getOntClass() {
		return "Person";
	}

	public String getJSONDescription() {
		String s="{\"gender\":\"" + gender.getJSONDescription() + "\",\"bodyInfo\":"
				+ bodyInfo.getJSONDescription() + "}";
		return s;
	}
}

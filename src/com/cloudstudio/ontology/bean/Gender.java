package com.cloudstudio.ontology.bean;

import com.cloudstudio.ontology.annotation.CSEntity;

public enum Gender implements CSEntity{

	Male("Male"),Female("Female");
	private String description;
	
	Gender(String description){
		this.description = description;
	}
	
	public String getGender(){
		return description;
	}
	
	public String getOntClass(){
		return "Gender";
	}
	
	public static Gender getGender(String description){
		for(Gender gender:Gender.values()){
			if(gender.description.equals(description))
				return gender;
		}
		return null;
	}
	
	public String getJSONDescription(){
		return description;
	}
}

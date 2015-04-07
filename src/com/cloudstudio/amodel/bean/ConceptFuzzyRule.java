package com.cloudstudio.amodel.bean;

public class ConceptFuzzyRule {
	private long id;
	
	private String content;

	public ConceptFuzzyRule(String content) {
		super();
		this.content = content;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
}

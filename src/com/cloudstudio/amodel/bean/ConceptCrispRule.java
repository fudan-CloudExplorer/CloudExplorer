package com.cloudstudio.amodel.bean;

public class ConceptCrispRule {
	private long id;
	
	private String content;
	
	private String head;

	public ConceptCrispRule(String content, String head) {
		super();
		this.content = content;
		this.head = head;
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

	public String getHead() {
		return head;
	}

	public void setHead(String head) {
		this.head = head;
	}
	
}

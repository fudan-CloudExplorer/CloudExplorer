package com.cloudstudio.ontology.annotation;

/**
 * Any class that extends CSEntity should has its own constructor.
 * In the constructor it should new all the field that is a CSEntity and is not enum.
 * For any field that is a list, create a set method, in the method, add
 * the new element to the list.
 * @author ioeb
 */
public interface CSEntity {

	String getOntClass();
}

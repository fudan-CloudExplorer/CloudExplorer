package com.cloudstudio.ontology.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

//annotation for property of CloudStudio entity 
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface CSDataProperty {
	public String property();
	public boolean isCollection() default false;
	public boolean isObject() default false;
	public boolean isEnum() default false;
}

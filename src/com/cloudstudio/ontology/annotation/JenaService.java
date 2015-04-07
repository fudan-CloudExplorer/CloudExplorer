package com.cloudstudio.ontology.annotation;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;

import com.hp.hpl.jena.ontology.Individual;
import com.hp.hpl.jena.ontology.OntModel;
import com.hp.hpl.jena.rdf.model.Literal;
import com.hp.hpl.jena.rdf.model.Property;
import com.hp.hpl.jena.rdf.model.Resource;
import com.hp.hpl.jena.rdf.model.Statement;
import com.hp.hpl.jena.rdf.model.StmtIterator;

public class JenaService {

	private final OntModel model;
	private final String ns;

	public JenaService(OntModel model, String ns) {
		this.model = model;
		this.ns = ns;
	}

	public Individual createEntityWithDataProperty(String id, CSEntity entity) {
		Individual in = model.createIndividual(ns + id,
				model.getOntClass(ns + entity.getOntClass()));
		this.updateEntityWithDataProperty(in, entity);
		return in;
	}

	public void createObjectProperty(Individual subject, String propertyName,
			Individual object) {
		Property prop = model.getProperty(ns + propertyName);
		if (prop == null)
			throw new NullPointerException("找不到相应的Property: " + propertyName);
		subject.addProperty(prop, object);
	}

	public void updateEntityWithDataProperty(Individual in, CSEntity entity) {
		for (Field field : entity.getClass().getDeclaredFields()) {
			CSDataProperty p = field.getAnnotation(CSDataProperty.class);
			field.setAccessible(true);
			try {
				if (p != null) {
					Property prop = model.getProperty(ns + p.property());
					in.removeAll(prop);
					if (field.get(entity) == null)
						continue;
					if (p.isObject() == false) {
						if (p.isCollection()) {
							for (Object value : (Collection) (field.get(entity)))
								in.addLiteral(prop, value);
						} else {
							if (field.get(entity) instanceof Date){
								SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
								in.addLiteral(prop, sdf.format((Date)field.get(entity))
										);
							}
							else
								in.addLiteral(prop, field.get(entity));
						}
					} else {
						Resource target;
						if (p.isEnum()) {
							target = model.getResource(ns
									+ ((CSEnum) field.get(entity))
											.getDescription());
							in.setPropertyValue(prop, target);
						} else {
							target = model.getIndividual(ns + in.getLocalName()
									+ "#" + entity.getOntClass());
							if (target != null) {
								StmtIterator stmts = model.listStatements(in,
										prop, target);
								model.remove(stmts);
							}
							Individual targetIn = createEntityWithDataProperty(
									in.getLocalName() + "#"
											+ entity.getOntClass(),
									(CSEntity) field.get(entity));
							in.setPropertyValue(prop, targetIn);
						}
					}
				}
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			}
			field.setAccessible(false);
		}
	}

	public void loadEntityFromIndividual(OntModel model, Individual individual,
			CSEntity entity) {
		for (Field field : entity.getClass().getDeclaredFields()) {
			CSDataProperty p = field.getAnnotation(CSDataProperty.class);
			field.setAccessible(true);
			try {
				if (p == null)
					continue;
				if (p.isObject() == false) {
					if (p.isCollection() == false) {
						Property prop = model.getProperty(ns + p.property());
						Statement stmt = individual.getProperty(prop);
						if (stmt == null)
							continue;
						char first = Character.toUpperCase(field.getName()
								.charAt(0));
						String methodName = "set" + first
								+ field.getName().substring(1);
						Method setMethod = entity.getClass().getMethod(
								methodName, new Class[] { Literal.class });
						setMethod.invoke(entity, stmt
								.getObject().as(Literal.class));
					} else {
						Property prop = model.getProperty(ns + p.property());
						StmtIterator iterator = individual.listProperties(prop);
						while (iterator.hasNext()) {
							char first = Character.toUpperCase(field.getName()
									.charAt(0));
							String methodName = "set" + first
									+ field.getName().substring(1);
							Method setMethod = entity.getClass().getMethod(
									methodName, new Class[] { Literal.class });
							setMethod.invoke(entity, iterator.next()
									.getObject().as(Literal.class));
						}
					}
				} 
				else {
					if (p.isCollection() == false) {
						if (p.isEnum() == true) {
							Property prop = model
									.getProperty(ns + p.property());
							char first = Character.toUpperCase(field.getName()
									.charAt(0));
							String methodName = "set" + first
									+ field.getName().substring(1);
							Statement stmt = individual.getProperty(prop);
							Method setMethod = entity.getClass().getMethod(
									methodName,
									new Class[] { Individual.class });
							setMethod.invoke(entity, stmt.getObject()
									.as(Resource.class).as(Individual.class));
						} else {
							Property prop = model
									.getProperty(ns + p.property());
							Statement stmt = individual.getProperty(prop);
							loadEntityFromIndividual(model, stmt.getObject()
									.as(Resource.class).as(Individual.class),
									(CSEntity) field.get(entity));
						}
					} 
					else {
						Property prop = model.getProperty(ns + p.property());
						StmtIterator stmts = individual.listProperties(prop);
						while (stmts.hasNext()) {
							Statement stmt = stmts.next();
							loadEntityFromIndividual(model, stmt.getObject()
									.as(Resource.class).as(Individual.class),
									(CSEntity) field.get(entity));
						}
					}
				}
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			} catch (NoSuchMethodException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (SecurityException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IllegalArgumentException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (InvocationTargetException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			field.setAccessible(false);
		}
	}
}

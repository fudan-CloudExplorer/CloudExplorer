package com.cloudstudio.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintStream;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import com.cloudstudio.ontology.annotation.JenaService;
import com.cloudstudio.ontology.bean.Person;

import com.hp.hpl.jena.ontology.Individual;
import com.hp.hpl.jena.ontology.OntClass;
import com.hp.hpl.jena.ontology.OntModel;
import com.hp.hpl.jena.ontology.OntModelSpec;
import com.hp.hpl.jena.rdf.model.ModelFactory;

public class OWLOperator {

	private static final String FILENAME = "person.owl";
	private static String NS = "http://www.cloudexplorer.org/person#";
	private static String BASE = "http://www.cloudexplorer.org/person";
	public static OntModel personModel;
	public static Person person;
	public static JenaService js;
	public static File personFile;

	private static void readPersonModelFromFile(File dir) throws FileNotFoundException {
		// TODO Auto-generated method stub
		personFile = new File(dir, FILENAME);
		FileInputStream inputStream = new FileInputStream(personFile);
		personModel = ModelFactory.createOntologyModel(OntModelSpec.DAML_MEM);
		person = new Person();
		personModel.read(inputStream, BASE);
		js = new JenaService(personModel, NS);
		Individual ind = personModel.getIndividual(NS + "zhangmi");
		js.loadEntityFromIndividual(personModel, ind, person);
	}

	public static void updatePersonModel(File dir,String field, String value) {
		// TODO Auto-generated method stub
		
		try {
			personFile = new File(dir, FILENAME);
			FileInputStream inputStream = new FileInputStream(personFile);
			personModel = ModelFactory.createOntologyModel(OntModelSpec.DAML_MEM);
			personModel.read(inputStream, BASE);
			person = new Person();
			js = new JenaService(personModel, NS);
			Individual ind = personModel.getIndividual(NS + "zhangmi");

			OntClass bodyInfoClass = personModel.getResource(NS + "BodyInfo")
					.as(OntClass.class);
			Individual bodyInfo = personModel.createIndividual(NS
					+ "bodyInfo_of_zhangmi", bodyInfoClass);
			js.loadEntityFromIndividual(personModel, ind, person);
			String methodName = "set" + field;
			System.out.println(methodName);
			Method setMethod = null;
			try {
				setMethod = person.getBodyInfo().getClass().getMethod(
						methodName, new Class[] { String.class });
			} catch (SecurityException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			} catch (NoSuchMethodException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			try {
				setMethod.invoke(person, value);
			} catch (IllegalArgumentException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (InvocationTargetException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			js.updateEntityWithDataProperty(bodyInfo, person.getBodyInfo());

			PrintStream p = new PrintStream(personFile);
			personModel.writeAll(p, "RDF/XML-ABBREV", null);
			p.close();

		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

	}
	
	public static void main(String[] args){
//		OWLOperator.updatePersonModel(new File("D://"), "Height","173cm");
		try {
			OWLOperator.readPersonModelFromFile(new File("D://"));
			System.out.println(person.getBodyInfo().getHeight());
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
}

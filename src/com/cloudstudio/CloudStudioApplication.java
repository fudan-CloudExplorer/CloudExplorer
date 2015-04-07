package com.cloudstudio;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.util.List;

import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONException;
import org.json.JSONObject;

import android.app.Application;
import android.content.Context;
import android.os.Handler;

import com.cloudstudio.ontology.annotation.JenaService;
import com.cloudstudio.ontology.bean.Person;
import com.cloudstudio.util.DBHelper;
import com.hp.hpl.jena.ontology.Individual;
import com.hp.hpl.jena.ontology.OntClass;
import com.hp.hpl.jena.ontology.OntModel;
import com.hp.hpl.jena.ontology.OntModelSpec;
import com.hp.hpl.jena.rdf.model.ModelFactory;

public class CloudStudioApplication extends Application {

	private static final String FILENAME = "person.owl";
	private static String NS = "http://www.cloudexplorer.org/person#";
	private static String BASE = "http://www.cloudexplorer.org/person";
	public static OntModel personModel;
	public static Person person;
	public static JenaService js;
	public static File personFile;
	private static CloudStudioApplication contextApplication;
	
	public static CloudStudioApplication getInstance()
	{
		return contextApplication;
	}
	
	private OntModel getPersonModel() {
		return personModel;
	}

	public Person getPerson() {
		return person;
	}

	public JenaService getJenaService() {
		return js;
	}

	@Override
	public void onCreate() {
		super.onCreate();
		contextApplication = this;
		try {
			DBHelper dbHelper = DBHelper.getDBHelper(getApplicationContext());//首次加载创建数据库
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		/*
		try {
			readPersonModelFromFile();
			
		} catch (FileNotFoundException e) {
			// create person file if it does not exist
			try {
				e.printStackTrace();
				File fileDir = getFilesDir();
				personFile = new File(fileDir, FILENAME);
				personFile.createNewFile();
				FileOutputStream outputStream = openFileOutput(FILENAME,
						Context.MODE_PRIVATE);
				InputStream inputStreamFromAssets = getAssets().open(FILENAME);
				byte[] buffer = new byte[1024];
				int read;
				while ((read = inputStreamFromAssets.read(buffer)) != -1) {
					outputStream.write(buffer, 0, read);
				}
				inputStreamFromAssets.close();
				outputStream.flush();
				outputStream.close();
				readPersonModelFromFile();
			} catch (FileNotFoundException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		} finally {
			new Thread() {
				public void run() {
					while(true){
						updatePersonModel();
						try {
							Thread.sleep(1000*5);
						} catch (InterruptedException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
				}
			};
			
		}
		*/
	}

	public void updatePersonModel() {
		// TODO Auto-generated method stub
		new Thread() {

			@Override
			public void run() {
				// TODO Auto-generated method stub
				try {
					JSONObject bodyInfoJSON = new JSONObject();
					Individual ind = personModel.getIndividual(NS + "zhangmi");

					OntClass bodyInfoClass = personModel.getResource(
							NS + "BodyInfo").as(OntClass.class);
					Individual bodyInfo = personModel.createIndividual(NS
							+ "bodyInfo_of_zhangmi", bodyInfoClass);
					js.loadEntityFromIndividual(personModel, ind, person);
					HttpClient getClient = new DefaultHttpClient();
					HttpGet request = new HttpGet(
							"http://www.fbionline.cn:7080"
									+ "/WS4Fitbit/user/info.action?"
									+ "username=fdeb@outlook.com");
					HttpResponse response = getClient.execute(request);
					if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
						BufferedReader br = new BufferedReader(
								new InputStreamReader(response.getEntity()
										.getContent()));
						StringBuilder sb = new StringBuilder();
						String line;
						while ((line = br.readLine()) != null) {
							sb.append(line + "\n");
						}
						br.close();
						bodyInfoJSON = new JSONObject(sb.toString());
					}
					person.getBodyInfo().setHeight(
							bodyInfoJSON.getJSONObject("result").getString("height"));
					person.getBodyInfo().setWeight(
							bodyInfoJSON.getJSONObject("result").getString("weight"));
					js.updateEntityWithDataProperty(bodyInfo,
							person.getBodyInfo());

					PrintStream p = new PrintStream(personFile);
					personModel.writeAll(p, "RDF/XML-ABBREV", null);
					p.close();

				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				} catch (JSONException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}

		}.start();
	}

	private void readPersonModelFromFile() throws FileNotFoundException {
		// TODO Auto-generated method stub
		personFile = new File(getFilesDir(),FILENAME);
		FileInputStream inputStream = openFileInput(FILENAME);
		personModel = ModelFactory.createOntologyModel(OntModelSpec.DAML_MEM);
		person = new Person();
		personModel.read(inputStream, BASE);
		js = new JenaService(personModel, NS);
		Individual ind = personModel.getIndividual(NS + "zhangmi");
		List<Individual> list = personModel.listIndividuals().toList();
		js.loadEntityFromIndividual(personModel, ind, person);
	}

}

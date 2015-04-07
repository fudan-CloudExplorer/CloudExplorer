package com.cloudstudio.ontology.bean;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.cloudstudio.ontology.annotation.CSDataProperty;
import com.cloudstudio.ontology.annotation.CSEntity;
import com.hp.hpl.jena.rdf.model.Literal;

public class BodyInfo implements CSEntity {

	@CSDataProperty(property = "hasBodyBloodFat")
	private String bloodFat;
	@CSDataProperty(property = "hasBodyBloodGlucose")
	private String bloodGlucose;
	@CSDataProperty(property = "hasBodyBloodPressure")
	private String bloodPressure;
	@CSDataProperty(property = "hasBodyChestCir")
	private String chestCir;
	@CSDataProperty(property = "hasBodyFatRate")
	private String fatRate;
	@CSDataProperty(property = "hasBodyHeight")
	private String height;
	@CSDataProperty(property = "hasBodyHipCir")
	private String hipCir;
	@CSDataProperty(property = "hasBodyMeasuredDate")
	private Date measuredDate;
	@CSDataProperty(property = "hasBodyTemperature")
	private String temperature;
	@CSDataProperty(property = "hasBodyWaistCir")
	private String waistCir;
	@CSDataProperty(property = "hasBodyWeight")
	private String weight;
	@CSDataProperty(property = "hasMindAttention")
	private String attention;
	@CSDataProperty(property = "hasMindMeditation")
	private String meditation;

	public BodyInfo() {
		this.bloodFat = "";
		this.bloodGlucose = "";
		this.bloodPressure = "";
		this.chestCir = "";
		this.fatRate = "";
		this.height = "";
		this.hipCir = "";
		this.measuredDate = null;
		this.temperature = "";
		this.waistCir = "";
		this.weight = "";
		this.attention = "";
		this.meditation = "";
	}

	public String getBloodFat() {
		return bloodFat;
	}

	public void setBloodFat(Literal bloodFat) {
		this.bloodFat = bloodFat.getString();
	}

	public void setBloodFat(String bloodFat) {
		this.bloodFat = bloodFat;
	}

	public void setBloodGlucose(String bloodGlucose) {
		this.bloodGlucose = bloodGlucose;
	}

	public void setBloodPressure(String bloodPressure) {
		this.bloodPressure = bloodPressure;
	}

	public void setChestCir(String chestCir) {
		this.chestCir = chestCir;
	}

	public void setFatRate(String fatRate) {
		this.fatRate = fatRate;
	}

	public void setHeight(String height) {
		this.height = height;
	}

	public void setHipCir(String hipCir) {
		this.hipCir = hipCir;
	}

	public void setMeasuredDate(Date measuredDate) {
		this.measuredDate = measuredDate;
	}

	public void setTemperature(String temperature) {
		this.temperature = temperature;
	}

	public void setWaistCir(String waistCir) {
		this.waistCir = waistCir;
	}

	public void setWeight(String weight) {
		this.weight = weight;
	}

	public String getBloodGlucose() {
		return bloodGlucose;
	}

	public void setBloodGlucose(Literal bloodGlucose) {
		this.bloodGlucose = bloodGlucose.getString();
	}

	public String getBloodPressure() {
		return bloodPressure;
	}

	public void setBloodPressure(Literal bloodPressure) {
		this.bloodPressure = bloodPressure.getString();
	}

	public String getChestCir() {
		return chestCir;
	}

	public void setChestCir(Literal chestCir) {
		this.chestCir = chestCir.getString();
	}

	public String getFatRate() {
		return fatRate;
	}

	public void setFatRate(Literal fatRate) {
		this.fatRate = fatRate.getString();
	}

	public String getHeight() {
		return height;
	}

	public void setHeight(Literal height) {
		this.height = height.getString();
	}

	public String getHipCir() {
		return hipCir;
	}

	public void setHipCir(Literal hipCir) {
		this.hipCir = hipCir.getString();
	}

	public Date getMeasuredDate() {
		return measuredDate;
	}

	public void setMeasuredDate(Literal measuredDate) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		try {
			this.measuredDate = sdf.parse(measuredDate.getString());
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			this.measuredDate = new Date(measuredDate.getString());
			e.printStackTrace();
		}
	}

	public String getTemperature() {
		return temperature;
	}

	public void setTemperature(Literal temperature) {
		this.temperature = temperature.getString();
	}

	public String getWaistCir() {
		return waistCir;
	}

	public void setWaistCir(Literal waistCir) {
		this.waistCir = waistCir.getString();
	}

	public String getWeight() {
		return weight;
	}

	public void setWeight(Literal weight) {
		this.weight = weight.getString();
	}

	public String getOntClass() {
		return "BodyInfo";
	}

	public String getJSONDescription() {
		return "{" 
				+ "\"bloodFat\":\""+bloodFat 
				+ "\",\"bloodGlucose\":\""+bloodGlucose 
				+ "\",\"bloodPressure\":\""+bloodPressure 
				+ "\",\"chestCir\":\""+chestCir 
				+ "\",\"fatRate\":\""+fatRate 
				+ "\",\"height\":\""+height 
				+ "\",\"hipCir\":\""+hipCir 
				+ "\",\"measuredDate\":\""+measuredDate 
				+ "\",\"temperature\":\""+temperature 
				+ "\",\"waistCir\":\""+waistCir
				+ "\",\"weight\":\""+weight
				+ "\",\"meditation\":\""+meditation
				+ "\",\"attention\":\""+attention
				+ "\"}";
	}

	public String getAttention() {
		return attention;
	}

	public void setAttention(String attention) {
		this.attention = attention;
	}

	public String getMeditation() {
		return meditation;
	}

	public void setMeditation(String meditation) {
		this.meditation = meditation;
	}
}

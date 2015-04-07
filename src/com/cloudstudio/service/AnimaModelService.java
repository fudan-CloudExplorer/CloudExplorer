package com.cloudstudio.service;

import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.cloudstudio.amodel.bean.Concept;
import com.cloudstudio.amodel.dao.ConceptDao;

public class AnimaModelService {
	
	public Boolean insertConcept(JSONArray wsArgs)
	{
		ConceptDao conceptDao = new ConceptDao();
		Concept concept;
		try {
			concept = new Concept(wsArgs.getString(0), wsArgs.getString(1), wsArgs.getLong(2));
			conceptDao.insert(concept);
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return true;
	}
	
	public String getConceptById(JSONArray wsArgs)
	{
		String result = "";
		ConceptDao conceptDao = new ConceptDao();
		try {
			Concept concept = conceptDao.getById(wsArgs.getLong(0));
			if(concept == null)
				return result;
			result += concept.getDtype() + "," + concept.getName() + "," + concept.getParentConcept_id();
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return result;
	}
	
	public JSONArray getConceptsByParentId(JSONArray wsArgs)
	{
		JSONArray resultJsonArray = new JSONArray();
		ConceptDao conceptDao = new ConceptDao();
		try {
			List<Concept> concepts = conceptDao.getConceptsByParentId(wsArgs.getLong(0));
			for(Concept concept: concepts)
			{
				JSONObject jsonObject = new JSONObject();
				jsonObject.put("id", concept.getId());
				jsonObject.put("dtype", concept.getDtype());
				jsonObject.put("name", concept.getName());
				jsonObject.put("parentConcept_id", concept.getParentConcept_id());
				resultJsonArray.put(jsonObject);
			}
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return resultJsonArray;
	}
}

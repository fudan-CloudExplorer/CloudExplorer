package com.cloudstudio.amodel.dao;

import java.util.ArrayList;
import java.util.List;

import com.cloudstudio.CloudStudioApplication;
import com.cloudstudio.amodel.bean.Concept;
import com.cloudstudio.util.DBHelper;

import android.content.ContentValues;
import android.database.Cursor;

public class ConceptDao {
	private static final String TABLE_NAME = "Concept";
	
	private DBHelper dbHelper;
	
	public ConceptDao()
	{
		this.dbHelper = DBHelper.getDBHelper(CloudStudioApplication.getInstance());
	}
	
	public void insert(Concept concept)
	{
		ContentValues values = new ContentValues();
		values.put("DTYPE", concept.getDtype());
		values.put("name", concept.getName());
		values.put("parentConcept_id", concept.getParentConcept_id());
		dbHelper.insert(TABLE_NAME, values);
	}
	
	public void deleteById(long id)
	{
		dbHelper.delete(TABLE_NAME, "id=?", new String[]{id + ""});
	}
	
	public void deleteByPartentId(long parentConceptId)
	{
		dbHelper.delete(TABLE_NAME, "parentConcept_id=?", new String[]{parentConceptId + ""});
	}
	
	public void update(Concept concept)
	{
		ContentValues values = new ContentValues();
		values.put("DTYPE", concept.getDtype());
		values.put("name", concept.getName());
		values.put("parentConcept_id", concept.getParentConcept_id());
		dbHelper.update(TABLE_NAME, "id=?", new String[]{concept.getId() + ""}, values);
	}
	
	public Concept getById(long id)
	{
		Concept concept = new Concept();
		Cursor cursor = dbHelper.query(TABLE_NAME, "id=?", new String[]{id+""}, null, null, null);
		if(cursor.getCount() == 0)
			return null;
		cursor.moveToFirst();
		concept.setId(cursor.getLong(0));
		concept.setDtype(cursor.getString(1));
		concept.setName(cursor.getString(2));
		concept.setParentConcept_id(cursor.getLong(3));
		cursor.close();
		return concept;
	}
	
	public List<Concept> getConceptsByParentId(long parentId)
	{
		List<Concept> concepts = new ArrayList<Concept>();
		Cursor cursor = dbHelper.query(TABLE_NAME, "parentConcept_id=?", new String[]{parentId + ""}, null, null, "id");
		if(cursor.getCount() == 0)
			return concepts;
		while(cursor.moveToNext())
		{
			Concept concept = new Concept();
			concept.setId(cursor.getLong(0));
			concept.setDtype(cursor.getString(1));
			concept.setName(cursor.getString(2));
			concept.setParentConcept_id(cursor.getLong(3));
			concepts.add(concept);
		}
		cursor.close();
		return concepts;
	}
}

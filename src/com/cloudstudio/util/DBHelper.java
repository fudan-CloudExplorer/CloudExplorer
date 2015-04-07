package com.cloudstudio.util;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteDatabase.CursorFactory;
import android.database.sqlite.SQLiteOpenHelper;

public class DBHelper extends SQLiteOpenHelper {
	//数据库名称
	private static final String DB_NAME = "anima_model.db";
	//以下9张表为灵魂模型必备的表，与领域应用无关
	private static final String TABLE_Concept = "Concept";
	private static final String TABLE_ConceptCrispRule = "ConceptCrispRule";
	private static final String TABLE_ConceptFuzzyRule = "ConceptFuzzyRule";
	private static final String TABLE_ConceptRelation = "ConceptRelation";
	private static final String TABLE_Degree = "Degree";
	private static final String TABLE_PersonIndividual = "PersonIndividual";
	private static final String TABLE_PersonIndividual_PersonProperty = "PersonIndividual_PersonProperty";
	private static final String TABLE_PersonProperty = "PersonProperty";
	private static final String TABLE_Predict = "Predict";
	
	private static final String SQL_Concept = "CREATE TABLE IF NOT EXISTS " + TABLE_Concept + 
			"(id INTEGER PRIMARY KEY AUTOINCREMENT, DTYPE TEXT NOT NULL, name TEXT NOT NULL, parentConcept_id INTEGER)";
	private static final String SQL_ConceptCrispRule = "CREATE TABLE IF NOT EXISTS " + TABLE_ConceptCrispRule + 
			"(id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT NOT NULL, head TEXT NOT NULL)";
	private static final String SQL_ConceptFuzzyRule = "CREATE TABLE IF NOT EXISTS " + TABLE_ConceptFuzzyRule + 
			"(id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT NOT NULL)";
	private static final String SQL_ConceptRelation = "CREATE TABLE IF NOT EXISTS " + TABLE_ConceptRelation + 
			"(id INTEGER PRIMARY KEY AUTOINCREMENT, to_id INTEGER, from_id INTEGER, predict_degree_id INTEGER, predict_name TEXT)";
	private static final String SQL_Degree = "CREATE TABLE IF NOT EXISTS " + TABLE_Degree + 
			"(id INTEGER PRIMARY KEY AUTOINCREMENT, name INTEGER)";
	private static final String SQL_PersonIndividual = "CREATE TABLE IF NOT EXISTS " + TABLE_PersonIndividual + 
			"(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)";
	private static final String SQL_PersonIndividual_PersonProperty = "CREATE TABLE IF NOT EXISTS " + TABLE_PersonIndividual_PersonProperty + 
			"(id INTEGER PRIMARY KEY AUTOINCREMENT, personIndividual_id INTEGER, properties_concept_id INTEGER, properties_fact TEXT, "
			+ "properties_fuzzyValue REAL, properties_individual_id INTEGER, properties_predict_degree_id INTEGER, "
			+ "properties_predict_name TEXT)";
	private static final String SQL_PersonProperty = "CREATE TABLE IF NOT EXISTS " + TABLE_PersonProperty + 
			"(id INTEGER PRIMARY KEY AUTOINCREMENT, fact TEXT, fuzzyValue REAL, concept_id INTEGER, predict_degree_id INTEGER, "
			+ "predict_name TEXT, individual_id INTEGER)";
	private static final String SQL_Predict = "CREATE TABLE IF NOT EXISTS " + TABLE_Predict + 
			"(id INTEGER PRIMARY KEY AUTOINCREMENT, degree_id INTEGER, name TEXT)";
	
    private static DBHelper dbHelper = null;
    
    public static DBHelper getDBHelper(Context context)
    {
    	if(dbHelper == null)
    	{
    		dbHelper = new DBHelper(context, DB_NAME, null, 1);
    		dbHelper.getReadableDatabase();//调用后方可执行oncreate
    		System.out.println("初始化数据库完成");
    	}
    	return dbHelper;
    }
    
    /*创建表的方法，注意sqlString必须涵盖if not exists*/
    public void createTable(Context context, String sqlString)
    {
    	SQLiteDatabase sqLiteDatabase = dbHelper.getWritableDatabase();
    	try {
    		sqLiteDatabase.execSQL(sqlString);
		} catch (Exception e) {
			e.printStackTrace();
		}
    }
    
	public DBHelper(Context context, String name, CursorFactory factory,
			int version) {
		super(context, name, factory, version);
	}
	
	@Override
	public void onCreate(SQLiteDatabase db) {
		try {//创建公有表
			db.execSQL(SQL_Concept);
			db.execSQL(SQL_ConceptFuzzyRule);
			db.execSQL(SQL_ConceptCrispRule);
			db.execSQL(SQL_ConceptRelation);
			db.execSQL(SQL_Degree);
			db.execSQL(SQL_PersonIndividual);
			db.execSQL(SQL_PersonIndividual_PersonProperty);
			db.execSQL(SQL_PersonProperty);
			db.execSQL(SQL_Predict);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void onUpgrade(SQLiteDatabase db, int arg1, int arg2) {
	}

	/* 插入一条数据，注意第二个参数要与表格式相对应*/
	public void insert(String tableName, ContentValues values)
	{
		SQLiteDatabase db = dbHelper.getWritableDatabase();
		try {
			db.insert(tableName, null, values);
		} catch (Exception e) {
			e.printStackTrace();
		}
		db.close();
	}
	
	/* 参数依次为表名，删除条件语句，删除语句参数 */
	public void delete(String tableName, String whereClause, String[] whereArgs)
	{
		SQLiteDatabase db = dbHelper.getWritableDatabase();
		try {
			db.delete(tableName, whereClause, whereArgs);
		} catch (Exception e) {
			e.printStackTrace();
		}
		db.close();
	}
	
	/*参数依次为：表名，查询条件，查询参数，分组参数，having参数，排序参数 */
	public Cursor query(String tableName, String selection, String[] selectionArgs, String groupBy, String having, String orderBy)
	{
		SQLiteDatabase db = getReadableDatabase();
		Cursor cursor = null;
		try {
			cursor = db.query(tableName, null, selection, selectionArgs, groupBy, having, orderBy);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return cursor;
	}
	
	/* 可以根据sql语句执行查询（如连接两张表查询），参数依次为:查询sql语句，需要查询的列名数组 */
	public Cursor queryBySql(String sqlString, String[] selectionArgs)
	{
		SQLiteDatabase db = getReadableDatabase();
		Cursor cursor = null;
		try {
			cursor = db.rawQuery(sqlString, selectionArgs);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return cursor;
	}
	
	/* 参数依次为：表名，条件语句，条件参数，新值values */
	public void update(String tableName, String whereClause, String[] whereArgs, ContentValues values)
	{
		SQLiteDatabase db = getWritableDatabase();
		try {
			db.update(tableName, values, whereClause, whereArgs);
		} catch (Exception e) {
			e.printStackTrace();
		}
		db.close();//如果出现连接已关闭的异常，就删除此句
	}
}

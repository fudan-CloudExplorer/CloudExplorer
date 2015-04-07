package com.cloudstudio.ontology.plugin;

import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.cloudstudio.CloudStudioApplication;
import com.cloudstudio.ontology.bean.Person;

public class OntologyPlugin extends CordovaPlugin {

	@Override
	public boolean execute(String action, JSONArray args,
			CallbackContext callbackContext) throws JSONException {
		// TODO Auto-generated method stub
		((CloudStudioApplication)this.cordova.getActivity().getApplication()).updatePersonModel();
		Person person = ((CloudStudioApplication) this.cordova.getActivity()
				.getApplication()).getPerson();
		callbackContext.success(new JSONObject(person.getBodyInfo()
				.getJSONDescription()));
		return true;
	}
}

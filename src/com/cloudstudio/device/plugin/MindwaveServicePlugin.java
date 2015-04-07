package com.cloudstudio.device.plugin;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintStream;

import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.bluetooth.BluetoothAdapter;
import android.os.Handler;
import android.os.Message;

import com.cloudstudio.CloudStudioApplication;
import com.cloudstudio.ontology.bean.Person;
import com.hp.hpl.jena.ontology.Individual;
import com.hp.hpl.jena.ontology.OntClass;
import com.hp.hpl.jena.ontology.OntModel;
import com.neurosky.thinkgear.TGDevice;

public class MindwaveServicePlugin extends CordovaPlugin {

	private Handler queryServiceHandler;
	private Handler callServiceHandler;
	private JSONArray result;
	private String action;
	private JSONArray args;
	
	private  File personFile;
	BluetoothAdapter            bluetoothAdapter;
    TGDevice                    device;
    final boolean               rawEnabled = true;
    
    private int meditation;
    private int attention;
	@Override
	public boolean execute(String action, JSONArray args,
			final CallbackContext callbackContext) throws JSONException {
		// TODO Auto-generated method stub
		this.action = action;
		this.args = args;
		bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
        if( bluetoothAdapter == null ) {            

        	// Alert user that Bluetooth is not available
        	result.put("Bluetooth not available");
        	//finish();
        	return false;

        } else {
        	// create the TGDevice 	
        	device = new TGDevice(bluetoothAdapter, handler);
        } 					
		queryServiceHandler = new Handler() {

			@Override
			public void handleMessage(Message msg) {
				// TODO Auto-generated method stub
				callService();
			}

		};
		callServiceHandler = new Handler() {

			@Override
			public void handleMessage(Message msg) {
				// TODO Auto-generated method stub
				//updatePersonModel();
				callbackContext.success(result);
			}

		};
		new Thread() {

			@Override
			public void run() {
				// TODO Auto-generated method stub
				queryServiceHandler.sendEmptyMessage(0);
			}

		}.start();

		return true;
	}

	/**
     * Handles messages from TGDevice
     */
    final Handler handler = new Handler() {
        @Override
        public void handleMessage( Message msg ) {

            switch( msg.what ) {
                case TGDevice.MSG_STATE_CHANGE:
    
                    switch( msg.arg1 ) {
    	                case TGDevice.STATE_IDLE:
    	                    break;
    	                case TGDevice.STATE_CONNECTING:       	
    	                	//result.put( "Connecting...\n" );
    	                	break;	
                        case TGDevice.STATE_CONNECTED:
                        	//result.put( "Connected.\n" );
                            device.start();
                            break;
    	                case TGDevice.STATE_NOT_FOUND:
    	                	//result.put( "Could not connect any of the paired BT devices.  Turn them on and try again.\n" );
    	                	break;
                        case TGDevice.STATE_ERR_NO_DEVICE:
                        	//result.put( "No Bluetooth devices paired.  Pair your device and try again.\n" );
                            break;
    	                case TGDevice.STATE_ERR_BT_OFF:
    	                	//result.put( "Bluetooth is off.  Turn on Bluetooth and try again." );
    	                    break;

    	                case TGDevice.STATE_DISCONNECTED:
    	                	//result.put( "Disconnected.\n" );
    	           
                    } /* end switch on msg.arg1 */

                    break;
    
                case TGDevice.MSG_POOR_SIGNAL:
                	//result.put( "PoorSignal: " + msg.arg1 + "\n" );
                    break;
                
                case TGDevice.MSG_HEART_RATE:
                	//result.put( "Heart rate: " + msg.arg1 + "\n" );
                    break;
                
                case TGDevice.MSG_RAW_DATA:	  
                	/* Handle raw EEG/EKG data here */
                	break;

                
                case TGDevice.MSG_ATTENTION:
                	//result.put( "Attention: " + msg.arg1 + "\n" );
                	attention = msg.arg1;
                	break;
                
                case TGDevice.MSG_MEDITATION:
                	//result.put( "Meditation: " + msg.arg1 + "\n" );
                	meditation = msg.arg1;
                	break;

                case TGDevice.MSG_BLINK:
                	//result.put( "Blink: " + msg.arg1 + "\n" );
                	break;
                case TGDevice.MSG_RAW_COUNT:
                    
                	break;
                case TGDevice.MSG_EKG_RRINT:
                	//result.put( "EKG_RRINT "+msg.arg1 + "\n" );
                	break;
                case TGDevice.MSG_LOW_BATTERY:
//                	Toast.makeText(getApplicationContext(), "Low battery!", Toast.LENGTH_SHORT).show();
                	break;
                case TGDevice.MSG_RAW_MULTI:

                	break;
                case TGDevice.MSG_RELAXATION:
                	//result.put("MSG_RELAXATION "+msg.arg1+"\n");
                	break;
                case TGDevice.MSG_RESPIRATION:
                	//print out about 64s after touching, then update per 10s
                	Float r = (Float)msg.obj;
                	//result.put(String.valueOf("MSG_RESPIRATION  "+msg.obj)+"\n");
                	break;
                case TGDevice.MSG_HEART_AGE:
                	//result.put( "MSG_HEART_AGE  "+msg.arg1 + "\n" );
                    break;
                case TGDevice.MSG_HEART_AGE_5MIN:
                	//result.put( "HEART_AGE_5MIN   "+msg.arg1 + "\n" );
                    break;
                
                default:
                	break;
                	
        	} /* end switch on msg.what */
            
        	
        } /* end handleMessage() */
        
    }; /* end Handler */
    
	private void callService() {
		new Thread() {
			public void run() {
				if (action.equals("connect")) {
					if( device.getState() != TGDevice.STATE_CONNECTING && device.getState() != TGDevice.STATE_CONNECTED ) {
			    	    
			    		device.connect( rawEnabled );
			    	}
					result = new JSONArray();
					result.put(attention);
					result.put(meditation);
					callServiceHandler.sendEmptyMessage(0);		
				} else if (action.equals("disconnect")) {
					device.close();
					callServiceHandler.sendEmptyMessage(0);
				}
				
			}
		}.start();
	}
	
	private void updatePersonModel() {
		// TODO Auto-generated method stub
		Person person = CloudStudioApplication.person;
		person.getBodyInfo().setAttention(attention+"");
		person.getBodyInfo().setMeditation(meditation+"");
	}
}

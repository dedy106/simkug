/**
 * @author dweexfuad
 */
//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_saku3_testForm = function(owner)
{
	if (owner)
	{
		try
		{
			window.app_saku3_testForm.prototype.parent.constructor.call(this, owner);
			this.className = "app_saku3_testForm";
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Test Form", 0);	
		
			this.maximize();
			
			uses("saiSearch;saiLabelEdit;util_socketio",true);		
			this.e5 = new saiSearch(this, {
				bound: [20, 20, 400, 20],
				caption: "Bisnis Area",
				placeHolder : true,
				change: [this, "doEditChange"],
				multiSelection:false,
				sql:["select nik, nama from karyawan where kode_lokasi = '"+this.app._lokasi+"' ",["nik","nama"],false, ["NIK","Nama"],"and","Daftar Karyawan",true]
			});			
			this.bTest = new button(this, {bound:[20,21,80,20], caption:"test", click:[this,"doClick"]});			
			this.e6 = new saiSearch(this, {
				bound: [20, 20, 400, 20],
				caption: "Bisnis Area",
				placeHolder : true,
				change: [this, "doEditChange"],
				multiSelection:false,
				sql:["select no_ju, keterangan from ju_m where kode_lokasi = '"+this.app._lokasi+"' ",["no_ju","keterangan"],false, ["No Jurnal","Keterangan"],"and","Daftar Jurnal",true]
			});		
			this.bTest = new button(this, {bound:[20,21,80,20], caption:"send", click:[this,"doSendClick"]});			
			
			this.ctrl = new control(this, {bound:[10,23,700,100]});
			this.ctrl.addStyle("overflow:auto;background:#f00");
			this.rearrangeChild(20,23);
			this.ctrl2 = new control(this, {bound:[10,this.ctrl.top + 120,700,300]});
			this.ctrl2.addStyle("overflow:auto;background:#f00");


			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standar = new util_standar();
			setTipeButton(tbSimpan);
			this.setTabChildIndex();
			
			this.io = new util_socketio("http://10.211.55.3:1337");
			this.io.onMessage.set(this,"doMessage");
			this.io.onReady.set(this,"doMessage");
			this.io.onDisconnect.set(this, "doMessage");
			this.io.connect();
			eval(" window.message_list"+this.resourceId+" = function(data){"+
					" window.system.getResource("+this.resourceId+").doList(data);"+
				"};");
			eval("this.io.socket.on('message_list', window.message_list"+this.resourceId+");");
			this.onClose.set(this,"doClose");
		}catch(e)
		{
			alert("[app_saku3_testForm]::constructor:"+e);
		}
		
		
	}
};
window.app_saku3_testForm.extend(window.childForm);
window.app_saku3_testForm.implement({
	doClose: function(){
		this.io.disconnect();
	},
	doClick: function(sender){
		alert(this.e5.getSelectedId());
	},
	doSendClick: function(sender){
		this.io.sendMessage(this.e6.getText());;
	},
	doMessage: function(sender, data){
		this.ctrl.getCanvas().innerHTML += data.message+"<br>";
	},
	doList: function(data){
		this.ctrl2.getCanvas().innerHTML = "";
		for (var i = 0; i < data.message.length;i++){
			this.ctrl2.getCanvas().innerHTML += new Date() +"<br>"+data.message[i].message+"<br>";
		}
	}
});

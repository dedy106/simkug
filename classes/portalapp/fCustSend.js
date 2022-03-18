//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalapp_fCustSend = function(owner){
	try{
		if (owner)
		{
			window.portalapp_fCustSend.prototype.parent.constructor.call(this, owner);
			window.portalapp_fCustSend.prototype.parent.setBorder.call(this, 0);		
			window.portalapp_fCustSend.prototype.parent.setColor.call(this, "");		
			this.className = "portalapp_fCustSend";											
			this.initComponent();		
			this.title = "Kirim Pesan";
		}
	}catch(e)
	{
		systemAPI.alert("[portalapp_fCustSend]::contruct:"+e,"");
	}
};
window.portalapp_fCustSend.extend(window.portalui_panel);
window.portalapp_fCustSend.implement({
	initComponent: function(){		
		try{
			uses("portalui_richTextArea",true);
			uses("util_standar;util_file;portalui_button;portalui_saiGrid;portalui_sgNavigator;portalui_label");						
			uses("portalui_uploader;portalui_saiCBBL;portalui_saiLabelEdit;server_util_mail");			
			this.standarLib = new util_standar();
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.file = new util_file();
			this.kpd = new portalui_saiCBBL(this);
			this.kpd.setBound(20,10,250,20);
			this.kpd.setCaption("Kepada");		
			this.kpd.setReadOnly(false);
			this.kpd.onBtnClick.set(this, "FindBtnClick");		
			this.kpd.setRightLabelVisible(true);
			this.subjek = new portalui_saiLabelEdit(this);
			this.subjek.setBound(20,32,620,20);
			this.subjek.setCaption("Subyek");
			this.subjek.setReadOnly(false);
			this.subjek.setLength(100);
			this.attfile = new portalui_saiLabelEdit(this);
			this.attfile.setBound(20,54,200,20);
			this.attfile.setCaption("File Attachment");
			this.attfile.setReadOnly(false);
			this.attfile.setText("-");
			this.attach = new portalui_uploader(this);
			this.attach.setBound(230,54,80,20);		
			this.attach.onAfterUpload.set(this,"doAfterLoad");
			this.attach.setParam4("data");
			this.attach.setParam1(this.app.userlog);
			this.attach.setAutoSubmit(true);
			this.attach.onChange.set(this,"doFileChange");
			this.pesan = new portalui_richTextArea(this);
			this.pesan.setBound(20,77,670,277);						
			this.pesan.display();
			this.lbl = new portalui_label(this);
			this.lbl.setBound(20,77,100,18);
			this.lbl.setUnderLine(true);
			this.lbl.setCaption("Message");			
			this.lbl.hide();
			this.bsend = new portalui_button(this);
			this.bsend.setBound(565,365,80,20);
			this.bsend.setCaption("Kirim");
			this.bsend.setIcon("url(icon/"+system.getThemes()+"/message.png)");
			this.bsend.onClick.set(this,"doBtnClick");
			this.bsend.setTag("send");	
			this.mail = new server_util_mail();
			this.p_tmp="";
			this.filename = "";
			this.tmpFile = "";			
			if (this.app._mainForm.listDataForm === undefined)
				this.app._mainForm.createListData();
		}catch(e){
			systemAPI.alert(e);
		}
	},
	FindBtnClick:function(sender){
		if (sender == this.kpd)
			this.standarLib.showListData(this.getForm(), "Data Anggota",sender,undefined,
										  "select kode_cust,nama from portal_cust ",
										  "select count(*) from portal_cust ",
										  ["kode_cust","nama"],"where",["Kode Anggota","Nama"]);
		
	},
	doAfterLoad: function(sender, result, data, filename){
		try{						
		}catch(e){
			systemAPI.alert("doAfterLoad: "+e);
		}
	},
	doFileChange: function(sender, filename, allow, data){
		try{					
			if (this.tmpFile != ""){				
				this.file.deleteFile(this.tmpFile);			
			}
			this.attfile.setText(filename);					
			sender.setParam2("");
			if (typeof(data) == "object"){								
				this.namaFile=data.filename;
				this.Folder=data.folder;
				this.tmpFile = data.tmpfile;
			}else throw(data);
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(){
		try{
			this.btnBayar="send";
			this.formBayar=true;
			var id=this.standarLib.noBuktiOtomatis(this.dbLib, "portal_pesan", "no_pesan", "PSN/"+this.getForm().getPeriodeNow()+"/","0000");
			uses("server_util_arrayList");					
			var sql = new server_util_arrayList();
			sql.add("insert into portal_pesan (no_pesan,kode_lokasi,tanggal,dari, kepada,subyek,isi_pesan,flag_email,no_file_dok,tgl_input,flag_read,periode,nik_user,modul) values  "+
					"('"+id+"','"+this.app._lokasi+"','"+(new Date).getDateStr()+"','"+this.app.userlog+"','"+this.kpd.getText()+"','"+this.subjek.getText()+"','"+this.pesan.getText(2)+"','0','"+this.attfile.getText()+"','"+(new Date).getDateStr()+"','0','"+this.getForm().getPeriodeNow()+"','"+this.app.userlog+"','PORTAL') ");
			
			if (this.kpd.getText()=='admin')
				var kepada="admin@roojax.com";
			else{
				var data = this.dbLib.runSQL("select nama,email from portal_sales where kode_sales='"+this.kpd.getText()+"' ");
				if (data instanceof portalui_arrayMap){
					if (data.get(0) != undefined){
						data = data.get(0);
						var kepada=data.get("email");
					}
				}else throw(data);
			}
			data = this.dbLib.runSQL("select nama,email from portal_cust where kode_cust='"+this.app.userlog+"' ");
			if (data instanceof portalui_arrayMap){
				if (data.get(0) != undefined){
					data = data.get(0);
					var dari=data.get("email");
				}
			}else throw(data);
			this.mail.send(dari,kepada,this.subjek.getText(),this.pesan.getText());
			this.dbLib.execArraySQL(sql);
			this.saveData = true;
			this.attfile.setText("-");
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doRequestReady:function(sender, methodName, result){	
		try{
			if (sender == this.dbLib && methodName == "execArraySQL"){
				this.uploadFile();			
				system.info(this.app._mainForm,result,"");
				this.standarLib.clearByTag(this, [0], this.kpd);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	uploadFile: function(sender){
		try{
			if (this.tmpFile != ""){
				var rootDir = this.file.getRootDir();										
				var separator = rootDir.charAt(rootDir.length-1);				
				this.file.copyFileTo(this.tmpFile,rootDir+this.Folder+separator+this.namaFile,true);
				this.file.deleteFile(this.tmpFile);
				this.tmpFile = "";
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
});
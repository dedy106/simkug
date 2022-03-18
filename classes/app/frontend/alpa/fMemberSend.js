//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_frontend_alpa_fMemberSend = function(owner,options){
	try{
		if (owner)
		{
			window.app_frontend_alpa_fMemberSend.prototype.parent.constructor.call(this, owner,options);
			this.className = "app_frontend_alpa_fMemberSend";											
			this.initComponent();		
			this.setCaption("Kirim Pesan");
		}
	}catch(e)
	{
		alert("[app_frontend_alpa_fMemberSend]::contruct:"+e,"");
	}
};
window.app_frontend_alpa_fMemberSend.extend(window.portalui_roundPanel);
window.app_frontend_alpa_fMemberSend.implement({
	initComponent: function(){		
		try{
			uses("portalui_richTextArea;util_file;portalui_button;portalui_saiGrid;portalui_sgNavigator;portalui_label;portalui_uploader;portalui_saiCBBL;server_util_mail");
			this.standarLib = new util_standar();
			this.dbLib = new util_dbUtility();
			this.dbLib.addListener(this);
			this.file = new util_file();
			this.file.addListener(this);
			this.kpd = new portalui_saiCBBL(this,{bound:[10,10,250,20],caption:"Kepada",btnClick:[this,"FindBtnClick"]});
			this.subjek = new portalui_saiLabelEdit(this,{bound:[10,32,570,20],caption:"Subyek"});
			this.attfile = new portalui_saiLabelEdit(this,{bound:[10,54,200,20],caption:"File Attachment",text:"-"});
			this.attach = new portalui_uploader(this,{bound:[220,54,80,20],afterUpload:[this,"doAfterLoad"],param1:"uploadTo",param2:"server/media/tmp/",param3:"object",autoSubmit:true,change:[this,"doFileChange"]});
			this.pesan = new portalui_richTextArea(this,{bound:[10,77,570,257]});			
			this.pesan.display();
			this.bsend = new portalui_button(this,{bound:[490,345,80,20],caption:"Kirim",icon:"url(icon/"+system.getThemes()+"/message.png)",click:[this,"doBtnClick"],tag:"send"});						
			this.mail = new server_util_mail();
			this.mail.addListener(this);
			this.p_tmp="";
			this.filename = "";
			this.tmpFile = "";			
			if (this.app._mainForm.listDataForm === undefined)
				this.app._mainForm.createListData();
			this.rootDir=this.file.getRootDir();
			this.file.cleanUp(this.rootDir+"/media/tmp");
		}catch(e){
			alert(e);
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
			if (!result && this.saveData)
			{				
				this.saveData = false;
			}else if (this.saveData){
				this.saveData = false;			
			}
		}catch(e){
			alert("doAfterLoad: "+e);
		}
	},
	doFileChange: function(sender, filename, allow, data){
		try{					
			/*if (this.tmpFile != ""){				
				this.file.deleteFile(this.tmpFile);			
			}*/
			this.attfile.setText(filename);					
			this.namaFile=data;
			/*if (typeof(data) == "object"){								
				this.namaFile=data.filename;
				this.Folder=data.folder;
				this.tmpFile = data.tmpfile;
			}else throw(data);*/
		}catch(e){
			alert(e);
		}
	},
	doBtnClick: function(){
		try{
		    uses("app_frontend_alpa_fConfirmPswd");
			this.confirm = new app_frontend_alpa_fConfirmPswd(this,{bound:[this.left+(this.width/2-125),this.top+(this.height/2-60),250,120],caption:"Confirm Password"});			
		}catch(e){
			alert(e);
		}
	},
	doConfirmClick: function(sender){
		if (sender === this.confirm.bConfirm){
			var pswd = this.confirm.getPassword();
			this.confirm.free();
			this.mail.setUser(this.app.userMail,pswd,"tls");
			this.mail.configSmtp("smtp."+this.app.site,"465");
			this.mail.configPop3("pop."+this.app.site,"995");
			this.sendMail();
		}else if (sender === this.confirm.bCancel){
			this.confirm.free();
		}
	},
	sendMail: function(){
		this.btnBayar="send";
		this.formBayar=true;
		var id=this.standarLib.noBuktiOtomatis(this.dbLib, "portal_pesan", "no_pesan", "PSN/"+this.getForm().getPeriodeNow()+"/","0000");
		var sql = new server_util_arrayList();
		sql.add("insert into portal_pesan (no_pesan,kode_lokasi,tanggal,dari, kepada,subyek,isi_pesan,flag_email,no_file_dok,tgl_input,flag_read,periode,nik_user,modul) values  "+
				"('"+id+"','"+this.app._lokasi+"','"+(new Date).getDateStr()+"','"+this.app.userlog+"','"+this.kpd.getText()+"','"+this.subjek.getText()+"','"+this.pesan.getText(2)+"','0','"+this.attfile.getText()+"','"+(new Date).getDateStr()+"','0','"+this.getForm().getPeriodeNow()+"','"+this.app.userlog+"','FRONTEND') ");
		
		if (this.kpd.getText()==='admin')
			var kepada="admin@roojax.com";
		else{
			var data = this.dbLib.runSQL("select nama,email from portal_cust where kode_cust='"+this.kpd.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
			if (data instanceof portalui_arrayMap){
				if (data.get(0) !== undefined){
					data = data.get(0);
					var kepada=data.get("email");
				}
			}else throw(data);
		}
		data = this.dbLib.runSQL("select nama,email from portal_cust where kode_cust='"+this.app.userlog+"' and kode_lokasi='"+this.app._lokasi+"'");
		if (data instanceof portalui_arrayMap){
			if (data.get(0) !== undefined){
				data = data.get(0);
				var dari=data.get("email");
			}
		}else throw(data);
		if (this.attfile.getText() === "-")
			this.mail.send(dari,kepada,this.subjek.getText(),this.pesan.getText(2));
		else this.mail.send(dari,kepada,this.subjek.getText(),this.pesan.getText(2),this.rootDir+"/media/tmp/"+this.namaFile);
		this.dbLib.execArraySQL(sql);
		this.saveData = true;
	},
	doRequestReady:function(sender, methodName, result){
		try{
			if (sender === this.dbLib && methodName === "execArraySQL"){
				this.uploadFile();
				system.info(this.app._mainForm,result,"");
				this.standarLib.clearByTag(this, [0], this.kpd);
				this.attfile.setText("-");
			}
		}catch(e){
			alert(e);
		}
	},
	uploadFile: function(sender){
		try{
			//var separator = rootDir.charAt(rootDir.length-1);				
			this.file.copyFileTo(this.rootDir+"/media/tmp/"+this.namaFile,this.rootDir+"/media/"+this.namaFile,true);
			//this.file.deleteFile(this.tmpFile);
		}catch(e){
			alert(e);
		}
	}
});

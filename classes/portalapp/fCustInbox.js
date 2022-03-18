//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalapp_fCustInbox = function(owner){
	try{
		if (owner)
		{
			window.portalapp_fCustInbox.prototype.parent.constructor.call(this, owner);
			window.portalapp_fCustInbox.prototype.parent.setBorder.call(this, 0);		
			window.portalapp_fCustInbox.prototype.parent.setColor.call(this, "");		
			this.className = "portalapp_fCustInbox";											
			this.initComponent();		
			this.title = "Inbox";
		}
	}catch(e)
	{
		systemAPI.alert("[portalapp_fCustInbox]::contruct:"+e,"");
	}
};
window.portalapp_fCustInbox.extend(window.portalui_panel);
window.portalapp_fCustInbox.implement({
	initComponent: function(){		
		try{
			uses("util_standar;util_file;portalui_button;portalui_saiGrid;portalui_sgNavigator");						
			uses("portalui_uploader;portalui_saiCBBL;portalui_saiLabelEdit;portalui_saiMemo;server_util_mail");
			this.standarLib = new util_standar();
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.file = new util_file();
			this.p_psn = new portalui_panel(this);
			this.p_psn.setBound(10,10,630,170);
			this.p_psn.setName('p1');
			this.p_psn.setBorder(3);
			this.p_psn.setCaption('Daftar Pesan');
			this.sg1_psn = new portalui_saiGrid(this.p_psn);
			this.sg1_psn.setBound(1,20,625,146);
			this.sg1_psn.setName('sg1mb');
			this.sg1_psn.setColCount(4);
			this.sg1_psn.setReadOnly(true);
			this.sg1_psn.setColTitle(["Dari","Subyek","Tanggal","Attachment"]);
			this.sg1_psn.setColWidth([3,2,1,0],[100,100,225,175]);
			this.sg1_psn.onDblClick.set(this, "sg1onDblClick");			
			this.psn_i = new portalui_panel(this);
			this.psn_i.setBound(10,185,629,200);
			this.psn_i.setBorder(0);
			this.psn_i.getCanvas().style.background="#f0f9ef";
			this.psn_i.getCanvas().style.overflow="auto";
			this.tglInbox = [];			
			var brg = this.dbLib.getDataProvider("select dari,subyek,date_format(tanggal,'%d-%m-%Y') as tgl,no_file_dok "+
				"from portal_pesan "+
				"where kepada='"+this.app.userlog+"' "+//and modul='PORTAL' "+
				"order by tanggal desc");
			eval("brg="+brg+";");
			if (typeof(brg) == "object"){
				for (var i in brg.rs.rows){
					var tgl = brg.rs.rows[i].tgl.split("-");
					this.tglInbox[i]=tgl[2] +"-"+tgl[1]+"-"+tgl[0];				
				}
				this.sg1_psn.clear();
				this.sg1_psn.showLoading();
				this.sg1_psn.setData(brg);										
				this.sg1_psn.setColWidth([3,2,1,0],[100,100,225,175]);
			}			
			for (var k=0; k < this.sg1_psn.rows.getLength(); k++){
				if (this.sg1_psn.getCell(3,k) != "-" && this.sg1_psn.getCell(3,k) != "")
					this.sg1_psn.setCell(3,k,"<a href='server/media/"+this.sg1_psn.getCell(3,k)+"' target='_blank'>"+this.sg1_psn.getCell(3,k)+"</a>");			
			}
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
					"('"+id+"','"+this.app._lokasi+"','"+(new Date).getDateStr()+"','"+this.app.userlog+"','"+this.kpd.getText()+"','"+this.subjek.getText()+"','"+this.pesan.getText()+"','0','"+this.attfile.getText()+"','"+(new Date).getDateStr()+"','0','"+this.getForm().getPeriodeNow()+"','"+this.app.userlog+"','PORTAL') ");
			
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
	sg1onDblClick: function(sender, col, row){
		var data = this.dbLib.getDataProvider("select isi_pesan from portal_pesan "+
				"where dari='"+this.sg1_psn.getCell(0,row)+"' and subyek='"+this.sg1_psn.getCell(1,row)+"' and tanggal='"+this.tglInbox[row]+"' ");			
		eval("data = "+data+";");
		if (typeof(data) =="object")
		{
			if (data.rs.rows != undefined)
			{
				data = data.rs.rows[0];
				this.psn_i.getCanvas().innerHTML= data.isi_pesan.replace(/\\/gi,"");
			}
		}
	},
	uploadFile: function(sender){
		if (this.tmpFile != ""){
			var rootDir = this.file.getRootDir();										
			var separator = rootDir.charAt(rootDir.length-1);						
			this.file.copyFileTo(this.tmpFile,rootDir+this.Folder+separator+this.namaFile,true);
			this.file.deleteFile(this.tmpFile);
			this.tmpFile = "";
		}
	}
});
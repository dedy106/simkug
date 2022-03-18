//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_frontend_alpa_fMemberInbox = function(owner,options){
	try{
		if (owner)
		{
			window.app_frontend_alpa_fMemberInbox.prototype.parent.constructor.call(this, owner,options);
			this.className = "app_frontend_alpa_fMemberInbox";											
			this.initComponent();		
			this.setCaption("Inbox");
		}
	}catch(e)
	{
		alert("[app_frontend_alpa_fMemberInbox]::contruct:"+e,"");
	}
};
window.app_frontend_alpa_fMemberInbox.extend(window.portalui_roundPanel);
window.app_frontend_alpa_fMemberInbox.implement({
	initComponent: function(){		
		try{
			uses("util_standar;util_file;portalui_button;portalui_saiGrid;portalui_sgNavigator;portalui_saiCBBL;portalui_saiMemo");
			this.standarLib = new util_standar();
			this.dbLib = new util_dbUtility();
			this.dbLib.addListener(this);
			this.file = new util_file();
			this.p_psn = new portalui_panel(this,{bound:[10,10,630,170],caption:"Daftar Pesan",border:3});
			this.sg1_psn = new portalui_saiGrid(this.p_psn,{bound:[1,20,625,146],colCount:5,readOnly:true,colTitle:["Dari","Subyek","Tanggal","Attachment","No. Order"],
                colWidth:[[4,3,2,1,0],[1,100,100,225,175]],dblClick:[this,"sg1onDblClick"]});
			this.psn_i = new portalui_panel(this,{bound:[10,185,629,180],border:2});
			this.psn_i.addStyle("background:transparant");
			this.psn_i.getClientCanvas().style.overflow ="auto";
			this.tglInbox = [];
			this.noPesan = [];
			var brg = this.dbLib.getDataProvider("select concat(b.nama,' (',b.email,')') as dari,a.subyek,date_format(a.tanggal,'%d-%m-%Y') as tgl,a.no_file_dok,a.no_pesan "+
				"from portal_pesan a inner join portal_cust b on a.dari=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
				"where a.kepada='"+this.app.userlog+"' and a.kode_lokasi='"+this.app._lokasi+"' "+//and modul='PORTAL' "+
				"order by a.tanggal desc,a.no_pesan desc",true);
			if (typeof(brg) != "string"){
				for (var i in brg.rs.rows){
					var tgl = brg.rs.rows[i].tgl.split("-");
					this.tglInbox[i]=tgl[2] +"-"+tgl[1]+"-"+tgl[0];
					this.noPesan[i]=brg.rs.rows[i].no_pesan;
				}
				this.sg1_psn.clear();
				this.sg1_psn.showLoading();
				this.sg1_psn.setData(brg);										
				this.sg1_psn.setColWidth([4,3,2,1,0],[1,100,100,225,175]);
			}			
			for (var k=0; k < this.sg1_psn.rows.getLength(); k++){
				if (this.sg1_psn.getCell(3,k) != "-" && this.sg1_psn.getCell(3,k) != "")
					this.sg1_psn.setCell(3,k,"<a href='server/media/"+this.sg1_psn.getCell(3,k)+"' target='_blank'>"+this.sg1_psn.getCell(3,k)+"</a>");			
			}
			if (this.app._mainForm.listDataForm === undefined)
				this.app._mainForm.createListData();
			this.mail = new server_util_mail();
			this.mail.addListener(this);
			this.mail.setUser(this.app.userEmail,this.app.userEmailPwd,"tls");
			this.mail.configSmtp("smtp.gmail.com","465");
			this.mail.configPop3("pop.gmail.com","995");
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
		}catch(e){
			alert("doAfterLoad: "+e);
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
			alert(e);
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
			alert(e);
		}
	},
	sg1onDblClick: function(sender, col, row){
		var data = this.dbLib.getDataProvider("select isi_pesan from portal_pesan "+
				"where subyek='"+this.sg1_psn.getCell(1,row)+"' and kode_lokasi='"+this.app._lokasi+"' and no_pesan='"+this.sg1_psn.getCell(4,row)+"'");
		eval("data = "+data+";");
		if (typeof(data) =="object")
		{
			if (data.rs.rows != undefined)
			{
				data = data.rs.rows[0];
				this.psn_i.getCanvas().innerHTML= data.isi_pesan;//.replace(/\\/gi,"");
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

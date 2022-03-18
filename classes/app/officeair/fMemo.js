window.app_officeair_fMemo = function(owner,options){
	if (owner){
		try{
			window.app_officeair_fMemo.prototype.parent.constructor.call(this,owner,options);
			this.className  = "app_officeair_fMemo";						
			this.addStyle("border:2px solid #ffffff");			
			uses("portalui_uploader;portalui_saiCBBL;portalui_saiCB;portalui_saiGrid;util_file;portalui_bevel;portalui_richTextArea;portalui_datePicker");
			//---------------------- input
			this.pInput = new portalui_panel(this,{bound:[0,50,this.width - 20, this.height-90], visible:false});
			this.eSubject = new portalui_saiLabelEdit(this.pInput,{bound:[10,20,500,20],caption:"<font color='#ffffff'>Subject</font>"});			
			this.eEmail = new portalui_saiCBBL(this.pInput,{bound:[10,32,300,20],caption:"<font color='#ffffff'>Assign. Kepada</font>", btnClick:[this,"FindBtnClick"]});
			this.eContent = new portalui_richTextArea(this.pInput,{bound:[10,31,600,300]});
			this.pInput.rearrangeChild(10,23);
			this.bevel1 = new portalui_bevel(this.pInput,{bound:[10,this.height - 130,this.width - 40,25]});
			this.bSave = new portalui_button(this.pInput,{bound:[20,this.height - 126,80,18],caption:"Kirim",click:[this,"doClick"]});
			this.bCancel = new portalui_button(this.pInput,{bound:[110,this.height - 126,80,18],caption:"Hapus",click:[this,"doClick"]});			
			this.pInput.getCanvas().style.border = "";
			this.pInput.getCanvas().style.background="";
			//this.pInput.hide();
			//------------------------browse
			this.pBrowse = new portalui_panel(this,{bound:[0,50,this.width - 20, this.height-90]});
			this.bAdd = new portalui_button(this.pBrowse,{bound:[20,5,80,18],caption:"Add",click:[this,"doClick"]});
			this.bInbox = new portalui_button(this.pBrowse,{bound:[this.width - 200,5,80,18],caption:"Inbox",click:[this,"doClick"]});
			this.bOutbox = new portalui_button(this.pBrowse,{bound:[this.width - 100,5,80,18],caption:"Outbox",click:[this,"doClick"]});
			this.sgData = new portalui_saiGrid(this.pBrowse,{bound:[10,30,this.width - 40,this.height - 130],colCount:5,colTitle:["Dari","Subject","Tanggal","Content","ID"],readOnly:true,
				colWidth:[[4,3,2,1,0],[40,450,100,250,250]], dblClick:[this,"doSGDblClick"]});
			this.pBrowse.getCanvas().style.border = "";
			this.pBrowse.getCanvas().style.background="";
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();
			this.fileUtil = new util_file();	
			this.rootDir = this.fileUtil.getRootDir();
			this.rootDir = this.rootDir.substr(0,this.rootDir.search("server")-1);
			this.imgSblm = "";
			this.owner.createListData();
			
			this.bClose = new portalui_imageButton(this,{bound:[this.width - 60,1,45,16],image:"icon/dynpro/pnlclose.png",click:[this,"doClick"]});
			this.bMin = new portalui_imageButton(this,{bound:[this.width - 85,1,27,16],image:"icon/dynpro/pnlmin.png",click:[this,"doClick"]});
			//this.reloadData();
			this.formEvent = "save";
		}catch(e){
			alert(e);
		}
	}
};
window.app_officeair_fMemo.extend(window.portalui_roundPanel);
window.app_officeair_fMemo.implement({
	doClick: function(sender){
		try{
			if (sender == this.bSave){	
				uses("server_util_arrayList");			
				var sql = new server_util_arrayList();								
				if (this.formEvent == "save")
					sql.add("insert into off_memo(dari, kepada, subject, tanggal, content)values"+
						"	('"+window.dataLogin.email+"','"+this.eEmail.getText()+"','"+this.eSubject.getText()+"',now(),'"+urlencode(this.eContent.getText(2))+"')");					
				else sql.add("update off_memo set kepada = '"+this.eEmail.getText()+"', subject='"+this.eSubject.getText()+"', tanggal=now(), content='"+urlencode(this.eContent.getText(2))+"' "+
					" where id_memo= "+this.selectId+" ");
				this.dbLib.execArraySQL(sql);				
			}else if (sender == this.bClose || sender == this.bMin){
				this.hide();
			}else if (sender == this.bAdd){
				this.formEvent = "save";
				this.eSubject.setText("");
				this.eEmail.setText("");
				this.eContent.setText("");
				this.pInput.show();
				this.pBrowse.hide();
			}else if (sender == this.bInbox){
				this.sgData.clear();
				var data = this.dbLib.getDataProvider("select dari, subject, date_format(tanggal,'%Y-%m-%d %h:%i:%s') as tanggal, content, id_memo from off_memo where kepada ='"+window.dataLogin.email+"' order by tanggal desc",true);			
				this.dataMemo = new portalui_arrayMap();
				if (typeof data != "string"){
					var line;
					for (var i in data.rs.rows){
						line = data.rs.rows[i];				
						this.dataMemo.set(line.id_memo,urldecode(line.content));
						this.sgData.appendData([line.dari,line.subject, line.tanggal, urldecode(line.content), line.id_memo]);
					}
				}
			}else if (sender == this.bOutbox){
				this.sgData.clear();
				var data = this.dbLib.getDataProvider("select kepada, subject, date_format(tanggal,'%Y-%m-%d %h:%i:%s') as tanggal, content, id_memo from off_memo where dari ='"+window.dataLogin.email+"' order by tanggal desc",true);			
				this.dataMemo = new portalui_arrayMap();
				if (typeof data != "string"){
					var line;
					for (var i in data.rs.rows){
						line = data.rs.rows[i];				
						this.dataMemo.set(line.id_memo,urldecode(line.content));
						this.sgData.appendData([line.kepada,line.subject, line.tanggal, urldecode(line.content), line.id_memo]);
					}
				}	
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.pInput.hide();
						this.pBrowse.show();
						this.reloadData();
					}else systemAPI.alert(e);
					break;
			}
		}
	},
	FindBtnClick: function(sender){
		if (sender == this.eEmail){
			this.standarLib.showListData(this,"Data Karyawan",sender, this.eNama,
				"select email, nama from off_karyawan where kode_lokasi = '"+window.dataLogin.office+"' ",
				"select count(*) as tot from off_karyawan where kode_lokasi = '"+window.dataLogin.office+"' ",
				["email","nama"],"and",["Email","Nama"],false);
		}
	},
	doSGDblClick: function(sender, col, row){
		try{
			var email = this.sgData.cells(0,row);
			this.eEmail.setText(email);
			this.eSubject.setText(this.sgData.cells(1,row));					
			this.eContent.setText(this.dataMemo.get(this.sgData.cells(4,row)));	
			this.selectId = this.sgData.cells(4,row);
			this.formEvent = "edit";				
			this.pBrowse.hide();
			this.pInput.show();
		}catch(e){
			alert(e);
		}
	},
	reloadData: function(){
		this.sgData.clear();
		var data = this.dbLib.getDataProvider("select kepada, subject, date_format(tanggal,'%Y-%m-%d %h:%i:%s') as tanggal, content, id_memo from off_memo where dari ='"+window.dataLogin.email+"' order by tanggal desc",true);			
		this.dataMemo = new portalui_arrayMap();
		if (typeof data != "string"){
			var line;
			for (var i in data.rs.rows){
				line = data.rs.rows[i];				
				this.dataMemo.set(line.id_memo,urldecode(line.content));
				this.sgData.appendData([line.kepada,line.subject, line.tanggal, urldecode(line.content), line.id_memo]);
			}
		}
	},
	show: function(){
		window.app_officeair_fMemo.prototype.parent.show.call(this);
		this.formEvent = "save";
		this.pInput.hide();
		this.pBrowse.show();
		this.reloadData();
	}
});
/**
 * @author dweexfuad
 */
window.app_assetsap_transaksi_fUploadEvdRekon = function(owner, ba, klpfa, fa, formView) {
	if (owner){
		
		window.app_assetsap_transaksi_fUploadEvdRekon.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_assetsap_transaksi_fUploadEvdRekon";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Upload Evidence Rekon", 0);	
		uses("util_file;uploader;saiCBBL;checkbox");												
		this.ed_lokfa = new saiCBBL(this, {
			bound: [20, 30, 200, 20],
			caption: "Bus. Area",
			multiSelection: false,
			text:this.app._kodeLokfa,
			rightLabel:this.app._namaLokfa,						
			sql:["select kode_lokfa, nama from amu_lokasi where kode_lokasi = '"+this.app._lokasi+"' and  kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? this.app._kodeLokfa : "%")+"' ", ["kode_lokfa","nama"],false, ["Lokasi","Nama Lokasi"],"and","Data Area Bisnis",true],
			change:[this,"doChange"]		
		});
		this.ed_kode = new saiCBBL(this,{bound:[20,2,220,20],caption:"No Rekon",readOnly:false,
			multiSelection:false,
			change:[this,"doChange"]
		});						
		this.ed_file2 = new saiLabelEdit(this, {bound:[20,6,400,20], caption:"Lampiran Sebelumnya"});
		this.ed_file = new saiLabelEdit(this, {bound:[20,7,400,20], caption:"Attachment"});
		this.upl_1 = new uploader(this,{bound:[430,7,80,20], param3: "object", param2 :"server/tmp/", param1 : "uploadTo",
				autoSubmit:true, afterUpload: [this, "doUploadFinish"], caption:"Browse"});		
		this.rearrangeChild(10,23);
		this.setTabChildIndex();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		setTipeButton(tbSimpan);
					
		this.onClose.set(this,"doClose");		
		this.doChange(this.ed_lokfa);
		this.fileUtil = new util_file();
		this.fileUtil.addListener(this);		
		this.rootDir = this.fileUtil.getRootDir();			
		this.separator = "/";
		this.rootDir = this.rootDir.substr(0,this.rootDir.search("server")-1);				
		this.cekStatus = 0;		
		if (fa){			
			this.fromView = true;
			this.formView = formView;
		}
		
	}
};
window.app_assetsap_transaksi_fUploadEvdRekon.extend(window.childForm);
window.app_assetsap_transaksi_fUploadEvdRekon.implement({
	doClose: function(sender){				
	},
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	doModalResult: function(event, result){				
		try{
			if (result != mrOk) return;
			var sql = new server_util_arrayList();			
			switch(event){
				case "clear" :
					if (result == mrOk){
						this.standarLib.clearByTag(this, new Array("0","1","9"),this.ed_kode);								
					}
				break;
				case "simpan" :					
					if (this.standarLib.checkEmptyByTag(this,[0,1,2])){
						if (this.ed_file.getText() != "-"){
							var file = this.filename.split(";");
							this.saveFiles = this.rootDir+"/"+this.upl_1.param2 + file[1];
							this.dest = this.rootDir+"/server/media/amu/" + file[0];
							this.fileUtil.copyFilesTo(this.saveFiles, this.dest, true);						
						}else{
							var sql = new server_util_arrayList();
							sql.add("update amu_rekon_m set lampiran = '"+this.ed_file.getText()+"' where no_rekon = '"+this.ed_kode.getText()+"' ");
							this.dbLib.execArraySQL(sql);
						}						
					}					
				break;
				case "ubah" :
					
				break;
				case "delete" :
					
				break;
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectedDate: function(sender, y, m, d){       
    },
	doFindBtnClick: function(sender){				
	},
	doChange: function(sender){
		try{
			if (sender == this.ed_lokfa){						
				this.ed_kode.setSQL("select distinct a.no_rekon  from amu_rekon_m a "+	
					"where a.kode_lokfa = '"+this.ed_lokfa.getText()+"'  ", ["no_rekon"],false, ["No Rekon(KKP)"], "and","Daftar KKP Rekon",true);
			}	
			if (sender == this.ed_kode){					
				this.no_inv = " ";
				var data = this.dbLib.getDataProvider("select distinct lampiran from amu_rekon_m a where a.no_rekon = '"+this.ed_kode.getText()+"' ",true);
				if (data.rs.rows[0]){
					this.ed_file2.setText(data.rs.rows[0].lampiran);				
				}
			}	
			if (sender == this.ed_nofa){				
			}
		}catch(e){
			alert(e);
		}
	},
	doClick: function(sender){		
	},
	doRequestReady: function(sender, methodName, result){		
		if (sender == this.dbLib)
		{
			try
			{   				
				switch(methodName)
	    		{
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{									
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+")");
							this.app._mainForm.bClear.click();                            
						}else system.info(this,result,"");
	    			break;	    			
	    		}
			}
			catch(e)
			{
				systemAPI.alert("error = "+e,result);
			}
		}else if (sender == this.fileUtil){	     
			if (methodName == "copyFilesTo"){   
				var sql = new server_util_arrayList();
				sql.add("update amu_rekon_m set lampiran = '"+this.ed_file.getText()+"' where no_rekon = '"+this.ed_kode.getText()+"' ");
				this.dbLib.execArraySQL(sql);
				if (this.ed_file2.getText() != "-" && this.ed_file2.getText() != "") {					
					this.fileUtil.deleteFile(this.rootDir+"/server/media/amu/" + this.ed_file2.getText());
				}
			}else if (methodName == "deleteFile"){   
				showProgress("delete file...."+result);
			}
       }
        
	},			
	doUploadFinish: function(sender, result, data, filename){
		try{				
			if (sender == this.upl_1){
				this.ed_file.setText(filename);				
				this.filename = filename +";"+urldecode(data);
			}
		}catch(e){
			alert(e);
		}
	}	
});

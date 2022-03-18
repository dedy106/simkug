/**
 * @author dweexfuad
 */
window.app_assetsap_transaksi_fUploadEvdVer = function(owner, ba, klpfa, fa, formView) {
	if (owner){
		
		window.app_assetsap_transaksi_fUploadEvdVer.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_assetsap_transaksi_fUploadEvdVer";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Upload Evidence KK Verifikasi", 0);	
		uses("util_file;uploader;saiCBBL;checkbox");			
		this.ed_jns = new saiCB(this,{bound:[20,4,200,20], caption:"Jenis Prosedur", change:[this,"doChange"]});									
		this.ed_lokfa = new saiCBBL(this, {
			bound: [20, 30, 200, 20],
			caption: "Bus. Area",
			multiSelection: false,
			text:this.app._kodeLokfa,
			rightLabel:this.app._namaLokfa,						
			sql:["select kode_lokfa, nama from amu_lokasi where kode_lokasi = '"+this.app._lokasi+"' and  kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? this.app._kodeLokfa : "%")+"' ", ["kode_lokfa","nama"],false, ["Lokasi","Nama Lokasi"],"and","Data Area Bisnis",true],
			change:[this,"doChange"]		
		});
		this.ed_kode = new saiCBBL(this,{bound:[20,2,220,20],caption:"No Verifikasi",readOnly:false,
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
		this.dbLib.getDataProviderA("select kode_klp, nama from amu_alt_klp");
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
window.app_assetsap_transaksi_fUploadEvdVer.extend(window.childForm);
window.app_assetsap_transaksi_fUploadEvdVer.implement({
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
							sql.add("update amu_alt_ver_m set lampiran = '"+this.ed_file.getText()+"' where no_ver = '"+this.ed_kode.getText()+"' ");
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
				this.ed_kode.setSQL("select distinct no_ver, keterangan from amu_alt_ver_m "+
					"where kode_lokfa = '"+this.ed_lokfa.getText()+"'  ", ["no_ver","keterangan"],false, ["No Verifikasi","keterangan"], "and","Daftar Verifikasi",true);
			}	
			if (sender == this.ed_jns){
				this.ed_lokfa.setSQL("select kode_lokfa, nama from (select a.kode_lokfa, a.nama from amu_lokasi a "+
					 "	inner join amu_lokasi b on b.kode_lokfa = a.kode_induk and b.kode_lokasi = a.kode_lokasi "+
					 "	inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_lokasi = a.kode_lokasi "+
					 "	inner join amu_asset x on x.kode_lokfa = a.kode_lokfa "+
					 " inner join (select distinct kode_klpfa from amu_bagiklp_d where jenis_proc = 'ALTERNATIF') d on d.kode_klpfa = x.kode_klpfa "+
					 " inner join amu_klp_alt k on k.kode_klpfa = x.kode_klpfa and k.periode = '"+this.app._periode +"' and k.jenis_proc = '"+this.ed_jns.getText()+"' "+
					 " where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? this.app._kodeLokfa : "%")+"' "+
					 "union "+
					 "select a.kode_lokfa, a.nama from amu_lokasi a "+
					 "	inner join amu_lokasi b on b.kode_lokfa = a.kode_induk and b.kode_lokasi = a.kode_lokasi and b.kode_induk = '00' "+					 
					 "	inner join amu_asset x on x.kode_lokfa = a.kode_lokfa "+
					 " inner join (select distinct kode_klpfa from amu_bagiklp_d where jenis_proc = 'ALTERNATIF') d on d.kode_klpfa = x.kode_klpfa "+
					 " inner join amu_klp_alt k on k.kode_klpfa = x.kode_klpfa and k.periode = '"+this.app._periode +"' and k.jenis_proc = '"+this.ed_jns.getText()+"' "+
					 " where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U" || this.app._userStatus == "R" ? this.app._kodeLokfa : "%")+"' "+
					 "union "+
					 "select a.kode_lokfa, a.nama from amu_lokasi a "+					 
					 "	inner join amu_asset x on x.kode_lokfa = a.kode_lokfa "+
					 " inner join (select distinct kode_klpfa from amu_bagiklp_d where jenis_proc = 'ALTERNATIF') d on d.kode_klpfa = x.kode_klpfa "+
					 " inner join amu_klp_alt k on k.kode_klpfa = x.kode_klpfa and k.periode = '"+this.app._periode +"' and k.jenis_proc = '"+this.ed_jns.getText()+"' "+
					 " where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U" || this.app._userStatus == "R"? this.app._kodeLokfa : "%")+"' and a.kode_induk = '00') ", 
						["kode_lokfa","nama"],false, ["Klp Aset","Nama"],"where","Data Kelompok Aset",true);
			}	
			if (sender == this.ed_kode){					
				this.no_inv = " ";
				var data = this.dbLib.getDataProvider("select distinct lampiran  from amu_alt_ver_m a  where a.no_ver = '"+this.ed_kode.getText()+"' ",true);
				if (data.rs.rows[0]){
					this.ed_file.setText(data.rs.rows[0].lampiran);				
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
	    			case "getDataProvider":
						result = JSON.parse(result);						
						var line;						
						for (var i in result.rs.rows) {
							line = result.rs.rows[i];
							this.ed_jns.addItem(line.kode_klp, line.nama);
						}						
						this.doChange(this.ed_jns);
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
				sql.add("update amu_alt_ver_m set lampiran = '"+this.ed_file.getText()+"' where no_ver = '"+this.ed_kode.getText()+"' ");
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

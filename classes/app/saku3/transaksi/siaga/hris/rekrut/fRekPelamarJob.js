window.app_saku3_transaksi_siaga_hris_rekrut_fRekPelamarJob = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_rekrut_fRekPelamarJob.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_rekrut_fRekPelamarJob";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Alokasi Lowongan Pelamar", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;saiGrid;sgNavigator;label;util_file");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,220,20],caption:"Kode Lowongan",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});
		this.e_nama = new saiLabelEdit(this,{bound:[20,11,500,20],caption:"Posisi", tag:1, readOnly:true});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,15,500,20],caption:"Keterangan", readOnly:true});		
		this.cb_jab = new saiCBBL(this,{bound:[20,13,220,20],caption:"Jabatan",tag:1,readOnly:true});
		this.e_tgl1 = new saiLabelEdit(this,{bound:[20,16,200,20],caption:"Tgl Mulai - Selesai", readOnly:true});
		this.e_tgl2 = new saiLabelEdit(this,{bound:[240,16,100,20],labelWidth:0, readOnly:true});
		
		this.pc1 = new pageControl(this,{bound:[10,12,1000,330], childPage:["Daftar Pelamar Pekerjaan"]});				
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:13,tag:9,
					colTitle:["Tanggal","Kd Media","Nama Media","File Dok.","Upload","NIP","Nama","Alamat","Gender","Pendidikan","Jurusan","Perguruan Tinggi","IPK"],
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[60,150,100,80,60,150,200,100,80,150,100,70,80]],
					columnReadOnly:[true,[1,2,3,4,5,6,7,8,9,10,11,12],[0]],
					colHide:[[1,2],[true,true]],
					buttonStyle:[[0,1,5],[bsDate,bsEllips,bsEllips]], 
					colFormat:[[0,4],[cfDate,cfUpload]],
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],autoAppend:true});
		this.sg.setUploadParam([4],"uploadTo", "server/media/tmp/"+this.app._userLog+"_", "object","server/media/");		
		this.sgn = new sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});
		
		this.rearrangeChild(10, 22);

		setTipeButton(tbSimpan);
		this.maximize();
		this.setTabChildIndex();
		this.onClose.set(this,"doClose");

		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();
			
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	
			
			//this.cb_jab.setSQL("select kode_so, nama from gr_so where tipe = 'posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_so","nama"],false,["Kode","Nama"],"and","Data Jabatan",true);		
			this.cb_jab.setSQL("select kode_jab, nama from gr_jab where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_jab","nama"],false,["Kode","Nama"],"and","Data Jabatan",true);		
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_rekrut_fRekPelamarJob.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_rekrut_fRekPelamarJob.implement({
	doClose: function(sender){		
		if (this.uploadedFiles !="" ) this.fileUtil.deleteFiles(this.uploadedFiles);
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
	simpan: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_rekrut_job_pelamar where kode_job = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					var first = true;
					this.saveFiles="";
					this.dest = "";
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into gr_rekrut_job_pelamar(kode_job,nip,tanggal,kode_media,file_dok,flag_seleksi,flag_proses,nik_user,tgl_input,kode_lokasi) values "+  
										"('"+this.cb_kode.getText()+"','"+this.sg.cells(5,i)+"','"+this.sg.getCellDateValue(0,i)+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(3,i)+"','0','0','"+this.app._userLog+"',getdate(),'"+this.app._lokasi+"')");
								
								//file upload
								if (!first) { 
									this.saveFiles += ";";
									this.dest += ";";
								}                               
								this.saveFiles += this.rootDir+"/"+this.sg.columns.get(4).param2 + this.sg.cells(4,i).tmpfile;
								this.dest += this.rootDir+"/server/media/" + this.sg.cells(4,i).filedest;																								
								first = false;
							}							
						}						
					}
					setTipeButton(tbAllFalse);					
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
					this.sg.clear(1);
					setTipeButton(tbSimpan);					
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doChange: function(sender){
		try{
			if (this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider(
						   "select nama,keterangan,kode_jab,convert(varchar,tgl_mulai,103) as tgl_mulai,convert(varchar,tgl_selesai,103) as tgl_selesai "+
						   " from gr_rekrut_job "+
						   "where kode_job ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_nama.setText(line.nama);
						this.cb_jab.setText(line.kode_jab);						
						this.e_ket.setText(line.keterangan);
						this.e_tgl1.setText(line.tgl_mulai);
						this.e_tgl2.setText(line.tgl_selesai);
						
						var data = this.dbLib.getDataProvider(
								"select a.nip,a.nama,"+								
								"case when a.alamat='' then '-' else a.alamat end as alamat, "+
						   		"case when a.sex='' then '-' else a.sex end as sex, "+
						   		"isnull(d.nama,'-') as pendidikan,"+
						   		"isnull(e.nama,'-') as jurusan,"+
						   		"case when a.univ='' then '-' else a.univ end as univ,"+
						   		"case when a.ipk='' then 0 else a.ipk end as ipk,"+
						   		"case when a.asal_lamaran ='' then '-' else a.asal_lamaran end as asal_lamaran, "+
								"convert(varchar,b.tanggal,103) as tgl,"+
								"c.nama as nama_media,"+								
								"b.file_dok "+
						        "from gr_rekrut_pelamar a "+
								"		inner join gr_rekrut_job_pelamar b on a.nip=b.nip and a.kode_lokasi=b.kode_lokasi "+
								"		left join gr_rekrut_media c on b.kode_media=c.kode_media and b.kode_lokasi=c.kode_lokasi "+
								"		left join gr_strata d on a.kode_strata=d.kode_strata and a.kode_lokasi=d.kode_lokasi "+
								"		left join gr_jur e on a.kode_jur=e.kode_jur and a.kode_lokasi=e.kode_lokasi "+
								"where b.kode_job = '"+this.cb_kode.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];							
								this.sg.appendData([line.tgl,line.asal_lamaran,line.nama_media,line.file_dok,'Browse',line.nip,line.nama,line.alamat,line.sex,line.pendidikan,line.jurusan,line.univ,floatToNilai(line.ipk)]);
							}
						} else this.sg.clear(1);
						
					}
					else{
						this.e_nama.setText("");
						this.e_posisi.setText("");
						this.e_ket.setText("");
						this.e_tgl1.setText("");
						this.e_tgl2.setText("");
						this.sg.clear(1);
					}
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Lowongan Pekerjaan",sender,undefined, 
											  "select kode_job, nama  from gr_rekrut_job where kode_lokasi='"+this.app._lokasi+"' and datediff(day,tgl_selesai,getdate()) < 30 ",
											  "select count(kode_job) from gr_rekrut_job where kode_lokasi='"+this.app._lokasi+"' and datediff(day,tgl_selesai,getdate()) < 30 ",
											  ["kode_job","nama"],"and",["Kode","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doEllipsClick: function(sender, col, row) {
		try
		{
			switch(col){
				case 1 :
						this.standarLib.showListDataForSG(this, "Daftar Media",this.sg, this.sg.row, this.sg.col, 
														"select kode_media, nama  from gr_rekrut_media where kode_lokasi = '"+this.app._lokasi+"' ",
														"select kode_media, nama  from gr_rekrut_media where kode_lokasi = '"+this.app._lokasi+"' ",
														 new Array("kode_media","nama"),"and",new Array("Kode","Nama"),false);					
						break;					
				case 5 :
						this.standarLib.showListDataForSG(this, "Daftar Pelamar",this.sg, this.sg.row, this.sg.col, 
														"select nip,nama   from gr_rekrut_pelamar where kode_lokasi='"+this.app._lokasi+"'",
														"select count(nip) from gr_rekrut_pelamar where kode_lokasi='"+this.app._lokasi+"'",
														 new Array("nip","nama"),"and",new Array("NIP","Nama"),false);					
						break;					
			}						
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
		}
	},	
	doChangeCell: function(sender, col, row,param1,result, data){
		try{
			if (sender == this.sg && col == 0) {
				if (this.sg.cells(3,row)=='') {
					this.sg.cells(3,row,"-");
				}
			}
			if (sender == this.sg && col == 3) {			
				if (this.sg.cells(3,row)=='-') {
					sender.onChange.set(this,undefined);
					this.sg.cells(4,row,{tmpfile:'-',filedest:'-'});
					sender.onChange.set(this,"doChangeCell");
				}
				
			}
			if (sender == this.sg && col == 4){
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sg.columns.get(1).param2 + data.tmpfile;
				this.sg.cells(3,row, data.filedest);
			}
			if (col == 5 && this.sg.cells(5,row) != "") {				
				var data = this.dbLib.getDataProvider("select "+
						   "case when a.alamat='' then '-' else a.alamat end as alamat, "+
						   "case when a.sex='' then '-' else a.sex end as sex, "+
						   "isnull(b.nama,'-') as pendidikan,"+
						   "isnull(c.nama,'-') as jurusan,"+
						   "case when a.univ='' then '-' else a.univ end as univ,"+
						   "case when a.ipk='' then '0' else a.ipk end as ipk,"+
						   "case when a.asal_lamaran ='' then '-' else a.asal_lamaran end as asal_lamaran "+
						   "from gr_rekrut_pelamar a "+						   
						   "left join gr_strata b on a.kode_strata=b.kode_strata and a.kode_lokasi=b.kode_lokasi "+
						   "left join gr_jur c on a.kode_jur=c.kode_jur and a.kode_lokasi=c.kode_lokasi "+
						   "where a.nip ='"+this.sg.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.sg.setCell(1,row,line.asal_lamaran);
						this.sg.setCell(2,row,"-");

						this.sg.setCell(7,row,line.alamat);
						this.sg.setCell(8,row,line.sex);
						this.sg.setCell(9,row,line.pendidikan);
						this.sg.setCell(10,row,line.jurusan);
						this.sg.setCell(11,row,line.univ);
						this.sg.setCell(12,row,floatToNilai(line.ipk));
					}
					else{
						this.sg.setCell(7,row,"");
						this.sg.setCell(8,row,"");
						this.sg.setCell(9,row,"");
						this.sg.setCell(10,row,"");
						this.sg.setCell(11,row,"");
						this.sg.setCell(12,row,"0");
					}
				}
			}
		}catch(e){
			alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
						  this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");
						  this.fileUtil.copyFilesTo(this.saveFiles, this.dest, true);					  
						}else
							 system.alert(this, result,"");						
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	    if (sender == this.fileUtil){
			switch(methodName){
			   case "copyFilesTo" : 			   
				   if (result.indexOf("error") != -1){
					   systemAPI.alert(result);
				   }else{ 
						this.app._mainForm.pesan(2,"upload "+result);	
						system.info(this,"transaksi telah sukses tersimpan (ID : "+ this.cb_kode.getText()+")");
						this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);		
						this.sgUpld.clear(1);
						showProgress("delete temporary...");
						if (this.saveFiles !="" ) this.fileUtil.deleteFiles(this.saveFiles);
				   }
				break;

				case "deleteFiles" :
					hideProgress("delete temporary...");
				break;
			 }
		}
	}
});

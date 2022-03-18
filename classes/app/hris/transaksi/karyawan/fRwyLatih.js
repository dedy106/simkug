window.app_hris_transaksi_karyawan_fRwyLatih = function(owner)
{
	if (owner)
	{
		window.app_hris_transaksi_karyawan_fRwyLatih.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hris_transaksi_karyawan_fRwyLatih";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Riwayat Pelatihan", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"NIK",maxLength:10,multiSelection:false,change:[this,"doChange"]});
		this.p1 = new panel(this,{bound:[10,23,900,433],caption:"Daftar Riwayat Pelatihan"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,895,380],colCount:18,tag:9,
		            colTitle:["Kode Plth","Jenis Pelatihan","Nama Pelatihan","Lama","Tgl Mulai","Tgl Selesai","Penyelenggara","Jml Peserta","Kota","Nama Kota","Sts Biaya","Ket Biaya","Biaya",
					          "Sts Sertfk","Ket. Sertifikat","Masa Berlaku","File","Upload"],
					colWidth:[[17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[60,100,100,100,50,80,100,50,100,50,80,100,80,80,70,200,150,70]],
					columnReadOnly:[true,[0,1,8,9,10,11,13,14],[2,3,4,5,6,7,12,15,16]],
					buttonStyle:[[0,8,10,13,4,5],[bsEllips,bsEllips,bsEllips,bsEllips,bsDate,bsDate]], 
					colFormat:[[3,7,12,17],[cfNilai,cfNilai,cfNilai,cfUpload]],
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],autoAppend:true});
		this.sg.setUploadParam([17],"uploadTo", "server/media/tmp/"+this.app._userLog+"_", "object","server/media/");		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,410,899,25],buttonStyle:2,grid:this.sg});
			
		this.rearrangeChild(10, 23);
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.cb_kode.setSQL("select nik, nama from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Karyawan",true);
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_hris_transaksi_karyawan_fRwyLatih.extend(window.childForm);
window.app_hris_transaksi_karyawan_fRwyLatih.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_rwylatih where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
					var first = true;
					this.saveFiles="";
					this.dest = "";
					//alert(this.sg.getRowValidCount());
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into gr_rwylatih(nik,no_urut,kode_lokasi,sts_latih,nama,lama,tgl_mulai,tgl_selesai,panitia,kode_kota,sts_dana,sts_sertifikat,masa_berlaku,gambar,jumlah,nik_user,tgl_input,biaya) values "+
										"	('"+this.cb_kode.getText()+"',"+i+",'"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"','"+parseNilai(this.sg.cells(3,i))+"','"+this.sg.getCellDateValue(4,i)+"','"+this.sg.getCellDateValue(5,i)+"','"+this.sg.cells(6,i)+"','"+this.sg.cells(8,i)+"','"+this.sg.cells(10,i)+"','"+this.sg.cells(13,i)+"','"+this.sg.cells(15,i)+"','"+this.sg.cells(16,i)+"','"+parseNilai(this.sg.cells(7,i))+"','"+this.app._userLog+"',getdate(),'"+parseNilai(this.sg.cells(12,i))+"')");
							//file	
								if (this.saveFiles != "") { 
									this.saveFiles += ";";
									this.dest += ";";
								}                     								
								if (this.sg.cells(16,i) != "-" && this.sg.cells(17,i).tmpfile != this.sg.cells(17,i).filedest ){
									this.saveFiles += this.rootDir+"/"+this.sg.columns.get(4).param2 + this.sg.cells(17,i).tmpfile;
									this.dest += this.rootDir+"/server/media/" + this.sg.cells(17,i).filedest;																																
								}
							}
						}
					}					
					setTipeButton(tbUbahHapus);
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_rwylatih where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");								
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
					this.standarLib.clearByTag(this, new Array("0"),this.cb_kode);
					this.sg.clear(1);
				setTipeButton(tbUbahHapus);
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
				var sql="select a.sts_latih, b.nama as nama_latih, a.nama, a.lama, convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai, "+
				      "                                a.panitia,a.jumlah, a.kode_kota,d.nama as nama_kota,a.biaya,a.sts_sertifikat,c.nama as nama_srtfk,a.masa_berlaku,a.gambar,a.sts_dana,e.nama as nama_dana,a.biaya "+
					  "from gr_rwylatih a "+
					  "inner join gr_status_latih b on a.sts_latih=b.sts_latih and a.kode_lokasi=b.kode_lokasi "+
					  "inner join gr_status_sertifikat c on a.sts_sertifikat=c.sts_sertifikat and a.kode_lokasi=c.kode_lokasi "+
					  "inner join gr_kota d on a.kode_kota=d.kode_kota and a.kode_lokasi=d.kode_lokasi "+
					  "inner join gr_status_dana e on a.sts_dana=e.sts_dana and a.kode_lokasi=e.kode_lokasi "+
					  "where a.nik = '"+this.cb_kode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(sql,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.sts_latih,line.nama_latih,line.nama,floatToNilai(line.lama),line.tgl_mulai,line.tgl_selesai,line.panitia,floatToNilai(line.jumlah),line.kode_kota,line.nama_kota,line.sts_dana,line.nama_dana,line.biaya,line.sts_sertifikat,line.nama_srtfk,line.masa_berlaku,line.gambar,{tmpfile:line.gambar,filedest:line.gambar}]);
					}
				} else this.sg.clear(1);	
				setTipeButton(tbUbahHapus);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doEllipsClick: function(sender, col, row) {
		try
		{
			switch(col){
				case 0 :
						this.standarLib.showListDataForSG(this, "Daftar Pelatihan",this.sg, this.sg.row, this.sg.col, 
														"select sts_latih, nama  from gr_status_latih where kode_lokasi='"+this.app._lokasi+"'",
														"select count(sts_latih) from gr_status_latih where kode_lokasi='"+this.app._lokasi+"'",
														 new Array("sts_latih","nama"),"and",new Array("Kode","Nama"),false);
						break;
				case 8:
						this.standarLib.showListDataForSG(this, "Daftar Kota",this.sg, this.sg.row, this.sg.col, 
														"select kode_kota, nama  from gr_kota where kode_lokasi='"+this.app._lokasi+"'",
														"select count(kode_kota) from gr_kota where kode_lokasi='"+this.app._lokasi+"'",
														 new Array("kode_kota","nama"),"and",new Array("Kode","Nama"),false);
						break;
				case 13:
						this.standarLib.showListDataForSG(this, "Daftar Status Sertifikat",this.sg, this.sg.row, this.sg.col, 
														"select sts_sertifikat, nama  from gr_status_sertifikat where kode_lokasi='"+this.app._lokasi+"'",
														"select count(sts_sertifikat) from gr_status_sertifikat where kode_lokasi='"+this.app._lokasi+"'",
														 new Array("sts_sertifikat","nama"),"and",new Array("Kode","Nama"),false);
						break;
				case 10:
						this.standarLib.showListDataForSG(this, "Daftar Status Dana",this.sg, this.sg.row, this.sg.col, 
														"select sts_dana, nama  from gr_status_dana where kode_lokasi='"+this.app._lokasi+"'",
														"select count(sts_dana) from gr_status_dana where kode_lokasi='"+this.app._lokasi+"'",
														 new Array("sts_dana","nama"),"and",new Array("Kode","Nama"),false);
						break;
			}						
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
		}
	},	
	
	doChangeCell: function(sender, col, row,param1,result, data){
		try{
			if (sender == this.sg && col == 17 && data != undefined){
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sg.columns.get(1).param2 + data.tmpfile;
				this.sg.cells(16,row, data.filedest);
			}else if (col == 16){
				if (sender.cells(16,row) == "-"){
					this.sg.rows.get(row).values[17] = {filedest:'-',tmpfile:'-'};
					this.sg.cells(17,row,{filedest:'-',tmpfile:'-'}); 
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
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.cb_kode.getText()+")","");	
							//this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");
							this.fileUtil.copyFilesTo(this.saveFiles, this.dest, true);	
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
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

window.app_saku3_transaksi_siaga_hris_karyawan_fRwyLatih = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_karyawan_fRwyLatih.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_karyawan_fRwyLatih";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Riwayat Pelatihan", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		
		this.pc1 = new pageControl(this,{bound:[10,23,1160,433],childPage:["Data Pelatihan","Riwayat Pelatihan"]});
		this.cb_nik = new saiCBBL(this.pc1.childPage[0],{bound:[20,10,220,20],caption:"ID",maxLength:10,multiSelection:false,tag:0,change:[this,"doChange"]});
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,500,20],caption:"Keterangan", maxLength:150,tag:1});		
		this.cb_latih = new saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"Pelatihan",maxLength:10,multiSelection:false,tag:1});		
		this.e_buat = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,500,20],caption:"Penyelenggara", maxLength:150,tag:1});		
		this.l_tgl1 = new portalui_label(this.pc1.childPage[0],{bound:[20,14,100,18],caption:"Tgl Berlaku", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,14,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});		
		this.e_lama = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Lama Hari", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[20,15,100,18],caption:"Tgl Berakhir", underline:true});				
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,15,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});				
		this.e_jum = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,200,20],caption:"Jml. Peserta", tag:1, tipeText:ttNilai, text:"0"});
		this.cb_kota = new saiCBBL(this.pc1.childPage[0],{bound:[20,19,220,20],caption:"Kota",maxLength:10,multiSelection:false,tag:1});		
		this.cb_biaya = new saiCBBL(this.pc1.childPage[0],{bound:[20,20,220,20],caption:"Sts. Dana",maxLength:10,multiSelection:false,tag:1});		
		this.e_biaya = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,21,200,20],caption:"Jml Dana", tag:1, tipeText:ttNilai, text:"0"});
		this.cb_serft = new saiCBBL(this.pc1.childPage[0],{bound:[20,22,220,20],caption:"Sertifikat",maxLength:10,multiSelection:false,tag:1});		
		this.e_masa = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,24,200,20],caption:"Masa Berlaku", maxLength:150,tag:1});		
		this.e_foto = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,31,410,20],caption:"Lampiran", readOnly:true, maxLength:100, tag:9});		
		this.uploader = new uploader(this.pc1.childPage[0],{bound:[440,31,80,18],caption:"Browse", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"]});				
					
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:13,tag:9,
					colTitle:["No. Urut","Pelatihan","Keterangan","Tgl Mulai","Tgl Selesai","Lama","Penyelenggara","Jml Peserta","Kota","Sts Dana","Dana",
					          "Sertifikat","Masa Berlaku"],
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[100,120,100,120,120,80,120,80,100,100,300,200,80]],
					columnReadOnly:[true,[12,11,10,9,8,7,6,5,4,3,2,1,0],[]],
					colFormat:[[5,7,10],[cfNilai,cfNilai,cfNilai]],
					defaultRow:1,
					dblClick:[this,"doDoubleClick"],
					autoAppend:true});
	//	this.sg.setUploadParam([17],"uploadTo", "server/media/tmp/"+this.app._userLog+"_", "object","server/media/");				
		this.sgn =  new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2, grid:this.sg, pager:[this,"doPager"]});		
	
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);					
		this.img = new image(this.pc1.childPage[0],{bound:[750,30,160,180],visible:false});			
	
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
	
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.rootDir = this.app._rootDir;
		this.fileUtil = new util_file();
		this.fileUtil.addListener(this);
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.cb_nik.setSQL("select nik, nama, nik2 from gr_karyawan where flag_aktif='0' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama","nik2"],false,["ID","Nama","NIK Gratika"],"and","Data Karyawan",true);
			this.cb_latih.setSQL("select sts_latih, nama from gr_status_latih where kode_lokasi='"+this.app._lokasi+"'",["sts_latih","nama"],false,["Kode Pelatihan","Nama"],"and","Data Pelatihan",true);
			this.cb_kota.setSQL("select kode_kota, nama from gr_kota where kode_lokasi='"+this.app._lokasi+"'",["kode_kota","nama"],false,["Kode Kota","Nama"],"and","Data Kota",true);
			this.cb_biaya.setSQL("select sts_dana, nama from gr_status_dana where kode_lokasi='"+this.app._lokasi+"'",["sts_dana","nama"],false,["Kode Dana","Nama"],"and","Data Biaya",true);
			this.cb_serft.setSQL("select sts_sertifikat, nama from gr_status_sertifikat where kode_lokasi='"+this.app._lokasi+"'",["sts_sertifikat","nama"],false,["Kode Sertifikat","Nama"],"and","Data Sertifikat",true);
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_karyawan_fRwyLatih.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_karyawan_fRwyLatih.implement({
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
						var strSQL = "select count(*)+1 as nu from gr_rwylatih where nik='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";						   
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object"){
							var line3 = data.rs.rows[0];							
							if (line3 != undefined){																			
								this.nu = line3.nu;	
							}
						}
						sql.add("insert into gr_rwylatih(nik,no_urut,kode_lokasi,sts_latih,nama,lama,tgl_mulai,tgl_selesai,panitia,kode_kota,sts_dana,sts_sertifikat,masa_berlaku,gambar,jumlah,nik_user,tgl_input,biaya) values "+
								"	('"+this.cb_nik.getText()+"',"+this.nu+",'"+this.app._lokasi+"','"+this.cb_latih.getText()+"','"+this.e_ket.getText()+"',"+parseNilai(this.e_lama.getText())+",'"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.e_buat.getText()+"','"+this.cb_kota.getText()+"','"+this.cb_biaya.getText()+"','"+this.cb_serft.getText()+"','"+this.e_masa.getText()+"','"+this.e_foto.getText()+"',"+parseNilai(this.e_jum.getText())+",'"+this.app._userLog+"',getdate(),"+nilaiToFloat(this.e_biaya.getText())+")");
							
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update gr_rwylatih set sts_latih='"+this.cb_latih.getText()+"',nama='"+this.e_ket.getText()+"',lama="+parseNilai(this.e_lama.getText())+",tgl_mulai='"+this.dp_d1.getDateString()+"',tgl_selesai='"+this.dp_d2.getDateString()+"',panitia='"+this.e_buat.getText()+"',kode_kota='"+this.cb_kota.getText()+"',sts_dana='"+this.cb_biaya.getText()+"',sts_sertifikat='"+this.cb_serft.getText()+"',masa_berlaku='"+this.e_masa.getText()+"',gambar='"+this.e_foto.getText()+"',jumlah="+parseNilai(this.e_jum.getText())+",nik_user='"+this.app._userLog+"',tgl_input=getdate(),biaya="+nilaiToFloat(this.e_biaya.getText())+" "+ 
							"where nik = '"+this.cb_nik.getText()+"' and no_urut='"+this.nu+"' and kode_lokasi='"+this.app._lokasi+"' ");		
										
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
	
					sql.add("delete from gr_rwylatih where nik = '"+this.cb_nik.getText()+"' and no_urut='"+this.nu+"' and kode_lokasi='"+this.app._lokasi+"'");								
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_nik);
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
	doSelectDate: function(sender, d,m,y){
		if (sender == this.dp_d1){
			this.dp_d2.dateAdd('d',parseFloat(this.e_lama.getText()), this.dp_d1.toSysDate());			
		}
	},
	doChange: function(sender){
		try{
			if (sender == this.e_lama) this.doSelectDate(this.dp_d1);
			if (this.cb_nik.getText() != ""){
				var sql="select a.no_urut, a.sts_latih+' | '+b.nama as latih, a.nama, a.lama, convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai, "+
				      "         a.panitia,a.jumlah, a.kode_kota+' | '+d.nama as kota,a.sts_sertifikat+' | '+c.nama as srtfk,a.masa_berlaku,a.sts_dana+' | '+e.nama as dana,a.biaya "+
					  "from gr_rwylatih a "+
					  "inner join gr_status_latih b on a.sts_latih=b.sts_latih and a.kode_lokasi=b.kode_lokasi "+
					  "inner join gr_status_sertifikat c on a.sts_sertifikat=c.sts_sertifikat and a.kode_lokasi=c.kode_lokasi "+
					  "inner join gr_kota d on a.kode_kota=d.kode_kota and a.kode_lokasi=d.kode_lokasi "+
					  "inner join gr_status_dana e on a.sts_dana=e.sts_dana and a.kode_lokasi=e.kode_lokasi "+
					  "where a.nik = '"+this.cb_nik.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(sql,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.no_urut,line.latih,line.nama,line.tgl_mulai,line.tgl_selesai,floatToNilai(line.lama),line.panitia,floatToNilai(line.jumlah),line.kota,line.dana,floatToNilai(line.biaya),line.srtfk,line.masa_berlaku]);
					}
				} else this.sg.clear(1);	
			//	setTipeButton(tbUbahHapus);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {		
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[0]);
				var strSQL = "select * from gr_rwylatih "+
							 "where nik='"+this.cb_nik.getText()+"' and no_urut='"+ this.sg.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){						
					var line = data.rs.rows[0];							
					if (line != undefined){					
						this.e_ket.setText(line.nama);							
						this.cb_latih.setText(line.sts_latih);							
						this.e_buat.setText(line.panitia);							
						this.dp_d1.setText(line.tgl_mulai);							
						this.dp_d2.setText(line.tgl_selesai);							
						this.e_lama.setText(line.lama);
						this.e_jum.setText(line.jumlah);
						this.cb_kota.setText(line.kode_kota);	
						this.cb_biaya.setText(line.sts_dana);
						this.e_biaya.setText(line.biaya);
						this.cb_serft.setText(line.sts_sertifikat);	
						this.e_masa.setText(line.masa_berlaku);
						this.e_foto.setText(line.gambar	);
						//this.mDesk.setCode(urldecode(line.jobdesk));
						this.img.setImage(this.uploader.param4+line.gambar	);
						this.fileBfr = line.gambar	;		
						this.nu = line.no_urut;						
					} 
					
				}											
			}
		} catch(e) {alert(e);}
	},
	doAfterLoad:  function(sender, result, data, filename){
		try{
			if (result) this.e_foto.setText(data.filedest);
			this.dataUpload = data;
			this.img.setImage(this.uploader.param2 +this.dataUpload.tmpfile);
			if (this.dataUpload.temporary !== undefined) this.dataUpload.temporary += ";";
			else this.dataUpload.temporary = "";
			this.dataUpload.temporary += this.rootDir+"/"+this.uploader.param2 +this.dataUpload.tmpfile;
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
							
							if (this.fileBfr && this.dataUpload) {
								if (this.fileBfr != this.e_foto.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr);
							}		
							
							if (this.dataUpload) this.fileUtil.copyFileTo(this.rootDir+"/"+this.uploader.param2+this.dataUpload.tmpfile,this.rootDir+"/"+this.uploader.param4+this.dataUpload.filedest);
							system.info(this,"Transaksi telah sukses tersimpan (NIK : "+ this.cb_nik.getText()+")","");	
							this.app._mainForm.bClear.click();
							//this.app._mainForm.pesan(2,"Proses Lengkap tersimpan.)");
							//this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert(e);
			}
	    }
		if (sender == this.fileUtil){
			//alert(result);
		}
	}
});

window.app_saku3_transaksi_klinik_fReg = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_klinik_fReg.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_klinik_fReg";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Registrasi", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;uploader;util_file;image");
		uses("saiGrid",true);				
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Data Registrasi","Data Antrian","Daftar Registrasi"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:16,tag:9,
		            colTitle:["No Reg","Tanggal","No Peserta","Mitra","ID Peserta","Nama","Nama Ayah","Nama Ibu","Tmp Lahir","Tgl Lahir","Sex","Gol Darah","Alamat","No HP","No Telpon","Pekerjaan"],
					colWidth:[[15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[100,80,80,300,80,60,70,100,150,150,200,80,150,80,120,100]],
					readOnly:true, 
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
				
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,10,220,20],caption:"No Registrasi",readOnly:true,maxLength:10,change:[this,"doChange"]});		
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[245,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});										
		this.cb_peserta = new saiCBBL(this.pc1.childPage[0],{bound:[20,11,240,20],caption:"Peserta", multiSelection:false, maxLength:10, tag:1, rightLabelVisible:false, change:[this,"doChange"]});				
		this.e_nama = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,500,20],caption:"Nama", tag:1, readOnly:true});					
		this.cb_dokter = new saiCBBL(this.pc1.childPage[0],{bound:[550,12,200,20],caption:"Dokter", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});						
		this.e_umur = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,500,20],caption:"Umur",tag:1, readOnly:true,});					
		this.e_jenis = new saiLabelEdit(this.pc1.childPage[0],{bound:[550,18,180,20],caption:"Jenis Poli",tag:1, readOnly:true});			
		this.e_antri = new saiLabelEdit(this.pc1.childPage[0],{bound:[750,18,180,20],caption:"Antrian Ke-",tag:1, tipeText:ttNilai, text:"0",readOnly:true});					
		this.e_bb = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,19,200,20],caption:"Berat Badan (kg)",tag:1, tipeText:ttNilai, text:"0"});							
		this.e_tb = new saiLabelEdit(this.pc1.childPage[0],{bound:[320,19,200,20],caption:"Tinggi Badan (cm)",tag:1, tipeText:ttNilai, text:"0"});					
		this.e_tdarah = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,21,200,20],caption:"Tek Darah (mmHg)",tag:1,maxlength:10});					
		this.e_suhu = new saiLabelEdit(this.pc1.childPage[0],{bound:[320,21,200,20],caption:"Suhu Badan (c)",tag:1, tipeText:ttNilai, text:"0"});			
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,500,20],caption:"Alamat",tag:1, readOnly:true});					
		this.e_mitra = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,500,20],caption:"Mitra", tag:1, readOnly:true});					
		this.e_id = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,500,20],caption:"ID Peserta",  tag:1, readOnly:true});					
		this.e_ayah = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,500,20],caption:"Ayah",  tag:1, readOnly:true});					
		this.e_ibu = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,500,20],caption:"Ibu", tag:1, readOnly:true});							
		this.e_tempat = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,230,20],caption:"Tempat Lahir", tag:1, readOnly:true});					
		this.e_tgllahir = new saiLabelEdit(this.pc1.childPage[0],{bound:[320,18,200,20],caption:"Tgl Lahir", tag:1, readOnly:true});									
		this.e_jk = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,230,20],caption:"Sex", tag:1, readOnly:true});					
		this.e_goldar = new saiLabelEdit(this.pc1.childPage[0],{bound:[320,15,200,20],caption:"Gol Darah", tag:1, readOnly:true});									
		this.e_agama = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,230,20],caption:"Agama", tag:1, readOnly:true});							
		this.e_hp = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,230,20],caption:"No HP", readOnly:true, tag:1});			
		this.e_tel = new saiLabelEdit(this.pc1.childPage[0],{bound:[320,18,200,20],caption:"No Telpon", readOnly:true, tag:1});			
		this.e_email = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,230,20],caption:"Email", readOnly:true, tag:1});					
		this.e_kerja = new saiLabelEdit(this.pc1.childPage[0],{bound:[320,15,200,20],caption:"Pekerjaan", readOnly:true, tag:1});					
		this.uploader = new uploader(this.pc1.childPage[0],{bound:[20,16,80,18],caption:"Browse", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"],visible:false});				
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:3,tag:9,
		            colTitle:["Kode Dokter","Nama","Antrian"],
					colWidth:[[2,1,0],[100,320,100]],
					readOnly:true, 
					autoAppend:false,defaultRow:1});		
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2,pager:[this,"doPager"]});
		this.i_load = new portalui_imageButton(this.sgn2,{bound:[200,2,18,18],hint:"Refresh",image:"icon/"+system.getThemes()+"/reload.png",click:[this,"doAntri"]});										
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);			
		this.img = new image(this.pc1.childPage[0],{bound:[550,200,160,180]});			
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.rootDir = this.app._rootDir;
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			
			uses("util_standar");
			this.standarLib = new util_standar();						
			this.ppKlinik = "";			
			var data = this.dbLib.getDataProvider("select kode_pp from kli_klinik_user where kode_lokasi='"+this.app._lokasi+"' and nik='"+this.app._userLog+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.ppKlinik = line.kode_pp;
			}			
			var data = this.dbLib.getDataProvider("select cast(year(getdate()) as varchar) + right('0' + RTRIM(MONTH(getdate())), 2) + right('0' + RTRIM(DAY(getdate())), 2) as periode ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.thnBln = line.periode.substr(2,6);
				this.periode = line.periode.substr(0,6);
			}								
			this.cb_peserta.setSQL("select no_peserta, nama from kli_peserta where kode_lokasi='"+this.app._lokasi+"' ",["no_peserta","nama"],false,["No Peserta","Nama"],"and","Data Peserta",true);
			this.cb_dokter.setSQL("select a.kode_dokter, a.nama from kli_dokter a inner join kli_klinik b on a.kode_klinik=b.kode_klinik and a.kode_lokasi=b.kode_lokasi where b.kode_pp='"+this.ppKlinik+"' and b.kode_lokasi='"+this.app._lokasi+"' ",["a.kode_dokter","a.nama"],false,["Kode","Nama"],"and","Data Dokter",true);
			this.doClick(this.i_gen);
			this.stsEdit = "0";
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_klinik_fReg.extend(window.childForm);
window.app_saku3_transaksi_klinik_fReg.implement({
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
					var data = this.dbLib.getDataProvider("select  count(no_reg)+1 as jml from kli_reg where progress = '0' and kode_dokter='"+this.cb_dokter.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line = data.rs.rows[0];					
						this.e_antri.setText(floatToNilai(line.jml));							
					}
					sql.add("insert into kli_reg(no_reg,kode_lokasi,kode_dokter,kode_klinik,kode_jenis,no_peserta,tanggal,umur,bb,tb,suhu,tdarah,progress,no_urut,kode_pp,periode) values "+
						    "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.cb_dokter.getText()+"','"+this.kodeKlinik+"','"+this.e_jenis.getText()+"','"+this.cb_peserta.getText()+"',getdate(),'"+this.e_umur.getText()+"',"+nilaiToFloat(this.e_bb.getText())+","+nilaiToFloat(this.e_tb.getText())+","+nilaiToFloat(this.e_suhu.getText())+",'"+this.e_tdarah.getText()+"','0',"+nilaiToFloat(this.e_antri.getText())+",'"+this.ppKlinik+"','"+this.periode+"')");
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
					sql.add("delete from kli_reg where no_reg = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");								
					sql.add("insert into kli_reg(no_reg,kode_lokasi,kode_dokter,kode_klinik,kode_jenis,no_peserta,tanggal,umur,bb,tb,suhu,tdarah,progress,no_urut,kode_pp) values "+
						    "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.cb_dokter.getText()+"','"+this.kodeKlinik+"','"+this.e_jenis.getText()+"','"+this.cb_peserta.getText()+"',getdate(),'"+this.e_umur.getText()+"',"+nilaiToFloat(this.e_bb.getText())+","+nilaiToFloat(this.e_tb.getText())+","+nilaiToFloat(this.e_suhu.getText())+",'"+this.e_tdarah.getText()+"','0',"+nilaiToFloat(this.e_antri.getText())+",'"+this.ppKlinik+"')");
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from kli_reg where no_reg = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
				setTipeButton(tbAllFalse);
				this.doLoad();
				this.pc1.setActivePage(this.pc1.childPage[0]);	
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
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.stsEdit = "0";
			if (this.ppKlinik != "") {
				this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kli_reg","no_reg",this.app._lokasi+"-RG"+this.thnBln+this.ppKlinik+".","0000"));
				this.cb_peserta.setFocus();
			}
			else {
				system.alert(this,"Data Lokasi Poli tidak valid.","User belum disetting.");
			} 
		}
	},
	doAntri:function(sender){
		var strSQL = "select a.kode_dokter,a.nama,isnull(b.jml,0)+1 as jml from kli_dokter a "+
		            "        inner join kli_klinik c on a.kode_klinik=c.kode_klinik and a.kode_lokasi=c.kode_lokasi "+
					"        left join ("+
					"			select  kode_lokasi,kode_dokter,count(no_reg) as jml "+
					"		    from kli_reg where progress = '0' and kode_lokasi='"+this.app._lokasi+"' "+
					"           group by kode_lokasi,kode_dokter) b on a.kode_dokter=b.kode_dokter and a.kode_lokasi=b.kode_lokasi "+
					"where c.kode_pp='"+this.ppKlinik+"' and c.kode_lokasi='"+this.app._lokasi+"'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg2.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];													
				this.sg2.appendData([line.kode_dokter,line.nama,floatToNilai(line.jml)]);
			}
		} else this.sg2.clear(1);
	},
	doChange: function(sender){
		try{
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select no_peserta from kli_reg where no_reg ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																		
						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}
				}
			}			
			if (sender == this.cb_peserta && this.cb_peserta.getText() != ""){
				var strSQL = "select a.foto,a.nama,a.alamat,a.kode_mitra+' - '+b.nama as mitra,a.jenis_id+' - '+id_peserta as id_peserta,a.ayah,a.ibu,a.tempat,convert(varchar,a.tgl_lahir,103) as tgl_lahir,a.jk,c.nama as agama,a.kode_goldar,a.no_hp,a.no_tel,a.email,a.kerja,a.tgl_lahir as tanggal "+
							 "from kli_peserta a inner join kli_mitra b on a.kode_mitra=b.kode_mitra and a.kode_lokasi=b.kode_lokasi "+
							 "                   inner join kli_agama c on a.kode_agama=c.kode_agama "+
				             "where a.no_peserta='"+this.cb_peserta.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.img.setImage(this.uploader.param4+line.foto);				
						this.e_nama.setText(line.nama);
						this.e_alamat.setText(line.alamat);
						this.e_mitra.setText(line.mitra);
						this.e_id.setText(line.id_peserta);
						this.e_ayah.setText(line.ayah);
						this.e_ibu.setText(line.ibu);
						this.e_tempat.setText(line.tempat);
						this.e_tgllahir.setText(line.tgl_lahir);
						this.e_jk.setText(line.jk);
						this.e_agama.setText(line.agama);
						this.e_goldar.setText(line.kode_goldar);
						this.e_hp.setText(line.no_hp);
						this.e_tel.setText(line.no_tel);
						this.e_email.setText(line.email);
						this.e_kerja.setText(line.kerja);
						if (this.stsEdit == "0") {
							var data = this.dbLib.getDataProvider("select fn_getUmur('"+line.tanggal+"') as umur ",true);
							if (typeof data == "object" && data.rs.rows[0] != undefined){
								var line = data.rs.rows[0];
								data = line.umur.split(";");
								this.e_umur.setText(data[0] + " Tahun "+data[1] + " Bulan "+data[2] + " Hari");							
							}
						}
					}
				}
			}
			if (sender == this.cb_dokter && this.cb_dokter.getText() != ""){
				var data = this.dbLib.getDataProvider("select b.kode_jenis,a.kode_klinik from kli_dokter a inner join kli_klinik b on a.kode_klinik = b.kode_klinik and a.kode_lokasi=b.kode_lokasi where a.kode_dokter='"+this.cb_dokter.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];					
					this.e_jenis.setText(line.kode_jenis);					
					this.kodeKlinik = line.kode_klinik;										
				}
				if (this.stsEdit == "0") {					
					var data = this.dbLib.getDataProvider("select  count(no_reg)+1 as jml from kli_reg where progress = '0' and kode_dokter='"+this.cb_dokter.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line = data.rs.rows[0];					
						this.e_antri.setText(line.jml);							
					}				
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}  
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.stsEdit = "1";
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));																					
				this.cb_peserta.setText(this.sg1.cells(2,row));
				
				var strSQL = "select * from kli_reg where no_reg='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.e_bb.setText(floatToNilai(line.bb));						
						this.e_tb.setText(floatToNilai(line.tb));						
						this.e_suhu.setText(floatToNilai(line.suhu));						
						this.e_tdarah.setText(line.tdarah);			
						this.cb_dokter.setText(line.kode_dokter);									
						
						this.antri = line.no_urut;
						this.umur = line.umur;
						
						this.e_antri.setText(floatToNilai(line.no_urut));
						this.e_umur.setText(line.umur);
					}
				}
			}
		} catch(e) {alert(e);}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    										
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");						
	    			break;	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},	
	doLoad:function(sender){								
		var strSQL = "select x.no_reg,convert(varchar,x.tanggal,120) as tanggal,a.no_peserta,a.id_peserta,a.kode_mitra+' - '+b.nama as mitra,a.nama,a.ayah,a.ibu,a.tempat,convert(varchar,a.tgl_lahir,103) as tgl_lahir,a.jk,a.kode_goldar,a.alamat,a.no_hp,a.no_tel,a.kerja "+
		             "from kli_reg x inner join kli_peserta a on a.no_peserta=x.no_peserta and a.kode_lokasi=x.kode_lokasi "+
					 "               inner join kli_mitra b on a.kode_mitra=b.kode_mitra and a.kode_lokasi=b.kode_lokasi "+					 
					 "where x.progress='0' and x.kode_pp='"+this.ppKlinik+"' and x.kode_lokasi='"+this.app._lokasi+"' order by x.tanggal";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
		this.doAntri();
	},	
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];																
			this.sg1.appendData([line.no_reg,line.tanggal,line.no_peserta,line.mitra,line.id_peserta,line.nama,line.ayah,line.ibu,line.tempat,line.tgl_lahir,line.jk,line.kode_goldar,line.alamat,line.no_hp,line.no_tel,line.kerja]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
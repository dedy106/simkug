window.app_saku3_transaksi_siaga_hris_adm_fAbsenHari2 = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_adm_fAbsenHari2.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_siaga_hris_adm_fAbsenHari2";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Absesi Harian : Load", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("saiGrid",true);		
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Presensi","List Data"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:3,tag:9,
					colTitle:["No Presensi","Tanggal","Deskripsi"],
					colWidth:[[2,1,0],[400,80,100]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		

		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Presensi", readOnly:true});					
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,520,20],caption:"Keterangan", maxLength:100});		
		this.cb_buat = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"NIK Verifikasi", multiSelection:false, maxLength:10, tag:2});
			
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,305], childPage:["Data Presensi","Validasi"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:9,
		            colTitle:["NIK","Nama","Tanggal","Jam Masuk","Jam Keluar","Validasi"],
					colWidth:[[5,4,3,2,1,0],[100,150,150,100,250,100]],
					readOnly:true,
					pasteEnable:true,autoPaging:true,rowPerPage:20,
		            afterPaste:[this,"doAfterPaste"], 
					autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager1"]});
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:1,tag:9,
				colTitle:["Baris INVALID"],
				colWidth:[[0],[200]],autoAppend:false,
				readOnly:true, defaultRow:1
		});		
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg2});		
		
		this.rearrangeChild(10,23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	

		setTipeButton(tbSimpan);
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_buat.setSQL("select nik, nama from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
			this.cb_app.setSQL("select nik, nama from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);			
			this.cb_buat.setText(this.app._userLog);
		}catch(e){
			systemAPI.alert(e);
		}				
	}
};
window.app_saku3_transaksi_siaga_hris_adm_fAbsenHari2.extend(window.portalui_childForm);
window.app_saku3_transaksi_siaga_hris_adm_fAbsenHari2.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();	

			var strSQL = "select nik from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'";			
			var dataS = this.dbLib.getDataProvider(strSQL,true);
			if (typeof dataS == "object" && dataS.rs.rows[0] != undefined){
				this.dataNIK = dataS;
			}	

			this.inValid = false;
			for (var i=0; i < this.sg1.getRowCount();i++){
				this.sg1.cells(5,i,"INVALID");
				for (var j=0;j < this.dataNIK.rs.rows.length;j++){
					if (this.sg1.cells(0,i) == this.dataNIK.rs.rows[j].nik) {
						this.sg1.cells(5,i,"VALID");				
					}
				}	
				if (this.sg1.cells(5,i) == "INVALID") this.inValid = true;									
			}

			if (this.inValid == false) setTipeButton(tbSimpan);	
			else {
				this.pc1.setActivePage(this.pc1.childPage[1]);	
				this.sg2.clear();
				setTipeButton(tbAllFalse);	
				for (var i=0; i < this.sg1.getRowCount();i++) {
					if (this.sg1.cells(5,i) == "INVALID") {
						var j = i+1;	
						this.sg2.appendData([j]);
					}
				}
			}								
		} catch(e) {alert(e);}
	},
	doPage1: function(sender,page){
		this.sg1.doSelectPage(page);
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
			if (this.stsSimpan == 1) this.doClick();								
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();	
										
					sql.add("insert into gr_absen_harian_m(no_load,kode_lokasi,periode,tanggal,keterangan,nik_buat,nik_app,nik_user,tgl_input) values "+ 
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.app._userLog+"',getdate())");						
					
					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){
								sql.add("insert into gr_absen_harian_d(no_load,kode_lokasi,nik,tanggal,jam,jenis,modul,no_bukti) values "+
										"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(2,i)+" "+this.sg1.cells(3,i)+"','I','LOAD', '"+this.e_nb.getText()+"')");
								sql.add("insert into gr_absen_harian_d(no_load,kode_lokasi,nik,tanggal,jam,jenis,modul,no_bukti) values "+
										"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(2,i)+" "+this.sg1.cells(4,i)+"','O','LOAD', '"+this.e_nb.getText()+"')");
							}
						}
					}		
					//sql.add("update gr_absen_harian_d set tanggal=dateadd(day,-1,tanggal),jam=dateadd(day,-1,jam) where no_load='"+this.e_nb.getText()+"'");
							
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
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, [0,1],undefined);				
					this.sg1.clear(1); this.sg2.clear(1); this.sg3.clear(1);
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
					if (this.stsSimpan == 1) this.doClick();
				}
			break;
			case "simpan" :										
				this.simpan();
			break;			
			case "hapus" :
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from gr_absen_harian_m where no_load='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from gr_absen_harian_d where no_load='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);
			break;
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
		if (this.stsSimpan == 1) this.doClick();
	},	
	doClick: function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'gr_absen_harian_m','no_load',this.app._lokasi+"-PRN"+this.e_periode.getText().substr(2,4)+".",'000'));
		this.e_ket.setFocus();
		this.stsSimpan = 1;
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.e_nb.getText()+")");
						this.app._mainForm.bClear.click();              
					}else
						system.info(this, result,"");											
				break;
			}
		}		
	},
	doLoad3:function(sender){	
		var strSQL = "select no_load,convert(varchar,tanggal,103) as tgl,keterangan "+
		             "from gr_absen_harian_m  "+					 					 
					 "where periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];																
			this.sg3.appendData([line.no_load,line.tgl,line.keterangan]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbHapus);				
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));																
		
				var strSQL = "select * from gr_absen_harian_m where no_load = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.e_ket.setText(line.keterangan);						
						this.cb_buat.setText(line.nik_buat);						
						this.cb_app.setText(line.nik_app);						
					}
				}		
				
				var strSQL = "select top 20 a.*,b.jam as jam_keluar ,c.nama "+
							 "from gr_absen_harian_d a "+
							 "		inner join gr_karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "left join gr_absen_harian_d b on a.no_load=b.no_load and a.nik=b.nik and a.tanggal=b.tanggal and b.jenis='O' "+
							 "where a.no_load='"+this.e_nb.getText()+"' and a.jenis='I' order by a.nik";	

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line2;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line2 = data.rs.rows[i];												
						this.sg1.appendData([line2.nik,line2.nama,line2.tanggal,line2.jam,line2.jam_keluar,'VALID']);
					}
				} else this.sg1.clear(1);				
			}									
		} catch(e) {alert(e);}
	}
});

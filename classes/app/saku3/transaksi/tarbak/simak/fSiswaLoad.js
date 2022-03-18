window.app_saku3_transaksi_tarbak_simak_fSiswaLoad = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tarbak_simak_fSiswaLoad.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_tarbak_simak_fSiswaLoad";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Siswa [Load]", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.cb_pp = new saiCBBL(this,{bound:[20,17,200,20],caption:"Sekolah", readOnly:true, tag:2, change:[this,"doChange"]});
		this.c_modul = new saiCB(this,{bound:[20,13,180,20],caption:"Jenis Input",items:["TAMBAH","UBAH"],readOnly:true,tag:2}); 
		this.bValid = new button(this,{bound:[220,13,80,20],caption:"Validasi",click:[this,"doValid"]});			
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,410], childPage:["Data Siswa","Error Msg"]});				
		this.sg1 = new portalui_saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:12,tag:9,
				colTitle:["NIS","Nama","Kelas","Angkatan","Status","Tgl. Lulus","ID Bank",  "VAL NIS","VAL Kelas","VAL Akt","VAL Status","VAL IDBank"],
				colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[80,80,80,80,80,100,120,100,100,100,250,120]],
				pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"],
				readOnly:true, defaultRow:1
		});		
		this.sgn1 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPage"]});		

		this.sg2 = new portalui_saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:1,tag:9,
				colTitle:["Baris INVALID"],
				colWidth:[[0],[200]],autoAppend:false,
				readOnly:true, defaultRow:1
		});		
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3, grid:this.sg2, pager:[this,"doPage2"]});		


		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		
		this.rearrangeChild(10,23);
		
		this.setTabChildIndex();				
		
		this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
		this.cb_pp.setText(this.app._kodePP);	
		setTipeButton(tbAllFalse);		

	}
};
window.app_saku3_transaksi_tarbak_simak_fSiswaLoad.extend(window.portalui_childForm);
window.app_saku3_transaksi_tarbak_simak_fSiswaLoad.implement({	
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();	
		} catch(e) {alert(e);}
	},
	doPage: function(sender,page){
		this.sg1.doSelectPage(page);
	},	
	doValid: function() {
		try {
			this.inValid = false;
			
			//cek data NIS dan ID Bank
			var strSQL = "select nis,id_bank from sis_siswa where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"' union select '-','-' as nis";			
			var dataS = this.dbLib.getDataProvider(strSQL,true);
			if (typeof dataS == "object" && dataS.rs.rows[0] != undefined){
				this.dataNIS = dataS;
			}		
			if (this.c_modul.getText() == "UBAH") {		
				for (var i=0; i < this.sg1.getRowCount();i++){
					this.sg1.cells(7,i,"INVALID");
					this.sg1.cells(11,i,"INVALID");
					
					if (this.dataNIS.rs.rows.length > 0) {
						for (var j=0;j < this.dataNIS.rs.rows.length;j++){				
							if (this.sg1.cells(0,i) == this.dataNIS.rs.rows[j].nis) {
								this.sg1.cells(7,i,"VALID");
								this.sg1.cells(11,i,"VALID");				
							}
							//if (this.sg1.cells(6,i) == this.dataNIS.rs.rows[j].id_bank) {
							//	this.sg1.cells(11,i,"VALID");				
							//}								
						}	
						if (this.sg1.cells(7,i) == "INVALID") this.inValid = true;			
						if (this.sg1.cells(11,i) == "INVALID") this.inValid = true;			
					}											
				}	
			}
			if (this.c_modul.getText() == "TAMBAH") {		
				for (var i=0; i < this.sg1.getRowCount();i++){
					this.sg1.cells(7,i,"VALID");
					this.sg1.cells(11,i,"VALID");

					if (this.dataNIS.rs.rows.length > 0) {
						for (var j=0;j < this.dataNIS.rs.rows.length;j++){				
							if (this.sg1.cells(0,i) == this.dataNIS.rs.rows[j].nis) {
								this.sg1.cells(7,i,"INVALID");				
							}
							if (this.sg1.cells(6,i) == this.dataNIS.rs.rows[j].id_bank) {
								this.sg1.cells(11,i,"INVALID");				
							}								
						}	
						if (this.sg1.cells(7,i) == "INVALID") this.inValid = true;				
						if (this.sg1.cells(11,i) == "INVALID") this.inValid = true;				
					}
				}	
			}

			//cek data kelas
			var strSQL = "select kode_kelas from sis_kelas where flag_aktif='1' and  kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'";
			var dataS = this.dbLib.getDataProvider(strSQL,true);
			if (typeof dataS == "object" && dataS.rs.rows[0] != undefined){
				this.dataKLS = dataS;
			}				
			for (var i=0; i < this.sg1.getRowCount();i++){
				this.sg1.cells(8,i,"INVALID");
				for (var j=0;j < this.dataKLS.rs.rows.length;j++){
					if (this.sg1.cells(2,i) == this.dataKLS.rs.rows[j].kode_kelas) {
						this.sg1.cells(8,i,"VALID");				
					}
				}	
				if (this.sg1.cells(8,i) == "INVALID") this.inValid = true;									
			}

			//cek angkatan
			var strSQL = "select kode_akt from sis_angkat where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'";			
			var dataS = this.dbLib.getDataProvider(strSQL,true);
			if (typeof dataS == "object" && dataS.rs.rows[0] != undefined){
				this.dataAKT = dataS;
			}						
			for (var i=0; i < this.sg1.getRowCount();i++){
				this.sg1.cells(9,i,"INVALID");
				for (var j=0;j < this.dataAKT.rs.rows.length;j++){
					if (this.sg1.cells(3,i) == this.dataAKT.rs.rows[j].kode_akt) {
						this.sg1.cells(9,i,"VALID");				
					}
				}	
				if (this.sg1.cells(9,i) == "INVALID") this.inValid = true;								
			}	

			//cek status siswa
			if (this.c_modul.getText() == "TAMBAH") 
				var strSQL = "select kode_ss from sis_siswa_status where flag_aktif='1' and  kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'";			
			else var strSQL = "select kode_ss from sis_siswa_status where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'";			

			var dataS = this.dbLib.getDataProvider(strSQL,true);
			if (typeof dataS == "object" && dataS.rs.rows[0] != undefined){
				this.dataStatus = dataS;
			}						
			for (var i=0; i < this.sg1.getRowCount();i++){
				this.sg1.cells(10,i,"INVALID");
				for (var j=0;j < this.dataStatus.rs.rows.length;j++){
					if (this.sg1.cells(4,i) == this.dataStatus.rs.rows[j].kode_ss) {
						this.sg1.cells(10,i,"VALID");				
					}
				}	
				if (this.sg1.cells(10,i) == "INVALID") this.inValid = true;							
			}


			if (this.inValid == false) setTipeButton(tbSimpan);	
			else {
				this.pc2.setActivePage(this.pc2.childPage[1]);	
				this.sg2.clear();
				for (var i=0; i < this.sg1.getRowCount();i++) {
					if (this.sg1.cells(11,i) == "INVALID" || this.sg1.cells(7,i) == "INVALID" || this.sg1.cells(8,i) == "INVALID" || this.sg1.cells(9,i) == "INVALID") {
						var j = i+1;
						this.sg2.appendData([j]);						
					}
				}
			}
		}
		catch(e) {
			alert(e);
		}
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, [0,1],undefined);				
					this.sg1.clear(1); 
					
					this.sg1.setTag("9");
					this.cb_pp.setText(this.app._kodePP);
					setTipeButton(tbSimpan);
				}
				break;
			case "simpan" :					
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();	
							if (this.c_modul.getText() == "TAMBAH") {	
								for (var i=0;i < this.sg1.getRowCount();i++){																										
									sql.add("insert into sis_siswa(nis,kode_lokasi,nama,flag_aktif,kode_kelas,kode_pp,kode_akt,id_bank) values "+
											"('"+this.sg1.cells(0,i)+"','"+this.app._lokasi+"','"+this.sg1.cells(1,i)+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(2,i)+"','"+this.cb_pp.getText()+"','"+this.sg1.cells(3,i)+"','"+this.sg1.cells(6,i)+"')");
																														
									sql.add("insert into sis_siswa_tarif(nis,kode_kelas,kode_param,per_awal,per_akhir,tarif,kode_lokasi,kode_pp,kode_akt) "+
											"select a.nis,a.kode_kelas,b.kode_param,b.bulan1,b.bulan2,b.tarif,a.kode_lokasi,a.kode_pp,a.kode_akt "+
											"from sis_siswa a "+
											"				  inner join sis_kelas c on a.kode_kelas=c.kode_kelas and a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
											"				  inner join sis_param_tarif b on a.kode_akt=b.kode_akt and a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.kode_tingkat=c.kode_tingkat and b.kode_jur=c.kode_jur "+							
											"				  inner join sis_siswa_status xx on a.flag_aktif=xx.kode_ss and a.kode_pp=xx.kode_pp and a.kode_lokasi=xx.kode_lokasi  "+
											"where a.nis='"+this.sg1.cells(0,i)+"' and xx.flag_aktif='1' and a.kode_pp='"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");						
								}
							}
							
							if (this.c_modul.getText() == "UBAH") {		
								for (var i=0;i < this.sg1.getRowCount();i++){																			
									sql.add("update sis_siswa set flag_aktif='"+this.sg1.cells(4,i)+"', kode_kelas='"+this.sg1.cells(2,i)+"', kode_akt='"+this.sg1.cells(3,i)+"',id_bank='"+this.sg1.cells(6,i)+"',tgl_lulus='"+this.sg1.cells(5,i)+"' "+
											"where nis = '"+this.sg1.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.cb_pp.getText()+"'");

									sql.add("delete from sis_siswa_tarif where nis='"+this.sg1.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.cb_pp.getText()+"'");							
									sql.add("insert into sis_siswa_tarif(nis,kode_kelas,kode_param,per_awal,per_akhir,tarif,kode_lokasi,kode_pp,kode_akt) "+
											"select a.nis,a.kode_kelas,b.kode_param,b.bulan1,b.bulan2,b.tarif,a.kode_lokasi,a.kode_pp,a.kode_akt "+
											"from sis_siswa a "+
											"				  inner join sis_kelas c on a.kode_kelas=c.kode_kelas and a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
											"				  inner join sis_param_tarif b on a.kode_akt=b.kode_akt and a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.kode_tingkat=c.kode_tingkat and b.kode_jur=c.kode_jur "+							
											"				  inner join sis_siswa_status xx on a.flag_aktif=xx.kode_ss and a.kode_pp=xx.kode_pp and a.kode_lokasi=xx.kode_lokasi  "+
											"where a.nis='"+this.sg1.cells(0,i)+"' and xx.flag_aktif='1' and a.kode_pp='"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");						
								}
							}
							setTipeButton(tbAllFalse);
							this.dbLib.execArraySQL(sql);
						}catch(e){
							systemAPI.alert(e);
						}
					}
				break;
				
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.app._mainForm.pesan(2,"Transaksi Sukses dieksekusi.");
						this.app._mainForm.bClear.click();              
					}else
						system.info(this, result,"");											
				break;
			}
		}		
	}
});

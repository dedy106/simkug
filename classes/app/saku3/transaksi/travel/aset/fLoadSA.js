window.app_saku3_transaksi_travel_aset_fLoadSA = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_travel_aset_fLoadSA.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_travel_aset_fLoadSA";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Load Saldo Awal FA", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode Akhir Susut",tag:2,maxLength:6});
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data Siswa","Error Msg"]});				
		this.sg1 = new portalui_saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:14,tag:0,
				colTitle:["No FA","No Dokumen","Nama","No Seri","Merk","Tipe","KodeKlp","TglPerolehan[yyyy-mm-dd]","TglSusut[yyyy-mm-dd]","Nilai","Nilai Residu","Tot AkumSusut","PPAktap","PPSusut"],
				colWidth:[[13,12,11,10,9,8,7,6,5,4,3,2,1,0],[100,100,100,100,100,140,140,100,100,100,100,200,100,100]],
				colFormat:[[9,10,11],[cfNilai,cfNilai,cfNilai]],	
				pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"],
				autoAppend:false,readOnly:true, defaultRow:1});		
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
		setTipeButton(tbSimpan);		

	}
};
window.app_saku3_transaksi_travel_aset_fLoadSA.extend(window.portalui_childForm);
window.app_saku3_transaksi_travel_aset_fLoadSA.implement({	
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
			/*
			this.inValid = false;
			
			//cek data NIS dan ID Bank
			var strSQL = "select no_fa from fa_asset where kode_lokasi='"+this.app._lokasi+"'";			
			var dataS = this.dbLib.getDataProvider(strSQL,true);
			if (typeof dataS == "object" && dataS.rs.rows[0] != undefined){
				this.dataFA = dataS;
			}		
			
			for (var i=0; i < this.sg1.getRowCount();i++){
				this.sg1.cells(7,i,"VALID");
				this.sg1.cells(11,i,"VALID");

				if (this.dataFA.rs.rows.length > 0) {
					for (var j=0;j < this.dataFA.rs.rows.length;j++){				
						if (this.sg1.cells(0,i) == this.dataFA.rs.rows[j].nis) {
							this.sg1.cells(7,i,"INVALID");				
						}
						if (this.sg1.cells(6,i) == this.dataFA.rs.rows[j].id_bank) {
							this.sg1.cells(11,i,"INVALID");				
						}								
					}	
					if (this.sg1.cells(7,i) == "INVALID") this.inValid = true;				
					if (this.sg1.cells(11,i) == "INVALID") this.inValid = true;				
				}
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

			*/
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
					setTipeButton(tbSimpan);
				}
				break;
			case "simpan" :					
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();	
							
							var perOleh = perSusut = "";
							for (var i=0;i < this.sg1.getRowCount();i++){																																		
								perOleh = this.sg1.cells(7,i).substr(0,4) + this.sg1.cells(7,i).substr(5,2); 
								perSusut = this.sg1.cells(8,i).substr(0,4) + this.sg1.cells(8,i).substr(5,2); 

								sql.add("insert into fa_asset(no_fa,kode_lokasi,kode_klpfa,kode_klpakun,kode_akun,umur,persen,nama,merk,tipe,no_seri,nilai,nilai_residu,kode_pp,kode_pp_susut,tgl_perolehan,tgl_susut,periode,periode_susut,progress,nik_user,tgl_input,catatan,kode_lokfa,nik_pnj,nilai_susut,jenis,akum_nilai) values "+
										"('"+this.sg1.cells(0,i)+"','"+this.app._lokasi+"','"+this.sg1.cells(6,i)+"','-','-',0,0,'"+this.sg1.cells(2,i)+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(5,i)+"','"+this.sg1.cells(3,i)+"',"+nilaiToFloat(this.sg1.cells(9,i))+","+nilaiToFloat(this.sg1.cells(10,i))+",'"+this.sg1.cells(12,i)+"','"+this.sg1.cells(13,i)+"','"+this.sg1.cells(7,i)+"','"+this.sg1.cells(8,i)+"','"+perOleh+"','"+perSusut+"','2','"+this.app._userLog+"',getdate(),'"+this.sg1.cells(1,i)+"','-','-',0,'A',0)");

								sql.add("insert into fa_nilai(no_fa,kode_lokasi,no_bukti,dc,nilai,periode) values "+
										"('"+this.sg1.cells(0,i)+"','"+this.app._lokasi+"','"+this.sg1.cells(1,i)+"','D',"+nilaiToFloat(this.sg1.cells(9,i))+",'"+perOleh+"')");													

								if (nilaiToFloat(this.sg1.cells(11,i)) != 0) {
									sql.add("insert into fasusut_d(no_fasusut,no_fa,periode,nilai,kode_lokasi,akun_bp,akun_ap,kode_akun,kode_pp,kode_drk,dc,no_del,nilai_aset,umur) values "+
											"('"+this.sg1.cells(0,i)+"','"+this.sg1.cells(0,i)+"','"+this.e_periode.getText()+"',"+nilaiToFloat(this.sg1.cells(11,i))+",'"+this.app._lokasi+"','-','-','-','"+this.sg1.cells(13,i)+"','-','D','-',"+nilaiToFloat(this.sg1.cells(9,i))+",0)")
								}	
							
							}
							
							sql.add("update a set a.kode_klpakun=c.kode_klpakun, a.kode_akun=c.kode_akun, a.umur=c.umur, a.persen=c.persen, a.nilai_susut=ceiling(a.nilai/c.umur) "+
									"from fa_asset a inner join fa_klp b on a.kode_klpfa=b.kode_klpfa and a.kode_lokasi=b.kode_lokasi "+
									"				 inner join fa_klpakun c on b.kode_klpakun=c.kode_klpakun and b.kode_lokasi=c.kode_lokasi "+
									"where a.kode_lokasi='"+this.app._lokasi+"'");
							
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

window.app_saku3_transaksi_tarbak_simak_fCaSiswaLoad = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tarbak_simak_fCaSiswaLoad.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_tarbak_simak_fCaSiswaLoad";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Calon Siswa Baru - PSB", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.cb_ta = new portalui_saiCBBL(this,{bound:[20,10,200,20],caption:"Tahun Ajaran",multiSelection:false,tag:2,change:[this,"doChange"],readOnly:true});			
		this.cb_pp = new saiCBBL(this,{bound:[20,17,200,20],caption:"Sekolah", readOnly:true, tag:2, change:[this,"doChange"]});
		this.c_modul = new saiCB(this,{bound:[20,13,180,20],caption:"Jenis Input",items:["TAMBAH","UBAH"],readOnly:true,tag:2}); 
		this.bValid = new button(this,{bound:[220,13,80,20],caption:"Validasi",click:[this,"doValid"]});			
		

		this.pc2 = new pageControl(this,{bound:[10,10,1000,390], childPage:["Data Siswa","Error Msg"]});				
		this.sg1 = new portalui_saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:9,
				colTitle:["No Reg","Nama","ID Bank",  "VAL Reg","VAL IDBank"],
				colWidth:[[4,3,2,1,0],[80,80,200,250,200]],
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
		this.cb_ta.setSQL("select kode_ta,nama from sis_ta where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["kode_ta","nama"],false,["Kode","Nama"],"and","Data TA",true);
		
		var strSQL = "select kode_ta from sis_ta where flag_aktif='1' and kode_pp = '"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'";						   
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object"){
			var line3 = data.rs.rows[0];							
			if (line3 != undefined){																			
				this.cb_ta.setText(line3.kode_ta);	
			}
		}

		setTipeButton(tbAllFalse);		

	}
};
window.app_saku3_transaksi_tarbak_simak_fCaSiswaLoad.extend(window.portalui_childForm);
window.app_saku3_transaksi_tarbak_simak_fCaSiswaLoad.implement({	
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
			
			//cek data NOREG dan ID Bank
			var strSQL = "select no_reg,id_bank from sis_siswareg where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"' union select '-','-' ";			
			var dataS = this.dbLib.getDataProvider(strSQL,true);
			if (typeof dataS == "object" && dataS.rs.rows[0] != undefined){
				this.dataREG = dataS;
			}		
					
			if (this.c_modul.getText() == "UBAH") {		
				for (var i=0; i < this.sg1.getRowCount();i++){
					this.sg1.cells(3,i,"INVALID");
					this.sg1.cells(4,i,"INVALID");
					
					if (this.dataREG.rs.rows.length > 0) {
						for (var j=0;j < this.dataREG.rs.rows.length;j++){				
							if (this.sg1.cells(0,i) == this.dataREG.rs.rows[j].nis) {
								this.sg1.cells(3,i,"VALID");				
							}
							if (this.sg1.cells(2,i) == this.dataREG.rs.rows[j].id_bank) {
								this.sg1.cells(4,i,"VALID");				
							}								
						}	
						if (this.sg1.cells(3,i) == "INVALID") this.inValid = true;			
						if (this.sg1.cells(4,i) == "INVALID") this.inValid = true;			
					}											
				}	
			}

			if (this.c_modul.getText() == "TAMBAH") {		
				for (var i=0; i < this.sg1.getRowCount();i++){
					this.sg1.cells(3,i,"VALID");
					this.sg1.cells(4,i,"VALID");

					if (this.dataREG.rs.rows.length > 0) {
						for (var j=0;j < this.dataREG.rs.rows.length;j++){				
							if (this.sg1.cells(0,i) == this.dataREG.rs.rows[j].nis) {
								this.sg1.cells(3,i,"INVALID");				
							}
							if (this.sg1.cells(2,i) == this.dataREG.rs.rows[j].id_bank) {
								this.sg1.cells(4,i,"INVALID");				
							}								
						}	
						if (this.sg1.cells(3,i) == "INVALID") this.inValid = true;				
						if (this.sg1.cells(4,i) == "INVALID") this.inValid = true;				
					}
				}	
			}

			if (this.inValid == false) setTipeButton(tbSimpan);	
			else {
				this.pc2.setActivePage(this.pc2.childPage[1]);	
				this.sg2.clear();
				for (var i=0; i < this.sg1.getRowCount();i++) {
					if (this.sg1.cells(3,i) == "INVALID" || this.sg1.cells(4,i) == "INVALID") {
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
									sql.add("insert into sis_siswareg(no_reg,kode_ta,kode_pp,nama,kode_lokasi,id_bank,tanggal, tgl_lahir,nilai_un,hasil_ayah,hasil_ibu) values "+
						    				"('"+this.sg1.cells(0,i)+"','"+this.cb_ta.getText()+"','"+this.cb_pp.getText()+"','"+this.sg1.cells(1,i)+"','"+this.app._lokasi+"','"+this.sg1.cells(2,i)+"',getdate(),getdate(),0,0,0)");

								}
							}
							
							if (this.c_modul.getText() == "UBAH") {		
								for (var i=0;i < this.sg1.getRowCount();i++){									
									sql.add("update sis_siswareg set id_bank='"+this.sg1.cells(2,i)+"',nama='"+this.sg1.cells(1,i)+"',kode_ta='"+this.cb_ta.getText()+"',tanggal = getdate() "+
											"where no_reg = '"+this.sg1.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.cb_pp.getText()+"'");
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

window.app_saku3_transaksi_ypt_ginas_fLoadPeg = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ypt_ginas_fLoadPeg.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_ypt_ginas_fLoadPeg";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Pegawai", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.c_modul = new saiCB(this,{bound:[20,13,180,20],caption:"Jenis Input",items:["TAMBAH","UBAH"],readOnly:true,tag:2}); 
		this.bValid = new button(this,{bound:[220,13,80,20],caption:"Validasi",click:[this,"doValid"]});			
		

		this.pc2 = new pageControl(this,{bound:[10,10,1000,410], childPage:["Data Pegawai","Error Msg"]});				
		this.sg1 = new portalui_saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:10,tag:9,
				colTitle:["NIK","Nama","Tgl Masuk [yyyy-mm-dd]","Loker/Kota","FM/BM","Jabatan","Bank","No Rekening","Atas Nama","Valid NIK"],
				colWidth:[[9,8,7,6,5,4,3,2,1,0],[80,150,100,100,100,100,100,150,200,100]],
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
		
		setTipeButton(tbAllFalse);		

	}
};
window.app_saku3_transaksi_ypt_ginas_fLoadPeg.extend(window.portalui_childForm);
window.app_saku3_transaksi_ypt_ginas_fLoadPeg.implement({	
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
			
			//cek data NIK
			var strSQL = "select nik from hr_karyawan where kode_lokasi='"+this.app._lokasi+"' union select '-' as nik ";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataNIK = data;
			}		

			
			if (this.c_modul.getText() == "UBAH") {		
				for (var i=0; i < this.sg1.getRowCount();i++){
					this.sg1.cells(9,i,"INVALID");
					
					if (this.dataNIK.rs.rows.length > 0) {
						for (var j=0;j < this.dataNIK.rs.rows.length;j++){				
							if (this.sg1.cells(0,i) == this.dataNIK.rs.rows[j].nik) {
								this.sg1.cells(9,i,"VALID");							
							}															
						}	
						if (this.sg1.cells(9,i) == "INVALID") this.inValid = true;									
					}											
				}	
			}
		

			if (this.c_modul.getText() == "TAMBAH") {		
				for (var i=0; i < this.sg1.getRowCount();i++){
					this.sg1.cells(9,i,"VALID");
					
					if (this.dataNIK.rs.rows.length > 0) {
						for (var j=0;j < this.dataNIK.rs.rows.length;j++){				
							if (this.sg1.cells(0,i) == this.dataNIK.rs.rows[j].nik) {
								this.sg1.cells(9,i,"INVALID");				
							}															
						}	
						if (this.sg1.cells(9,i) == "INVALID") this.inValid = true;										
					}
				}	
			}

			
			if (this.inValid == false) setTipeButton(tbSimpan);	
			else {
				this.pc2.setActivePage(this.pc2.childPage[1]);	
				this.sg2.clear();
				for (var i=0; i < this.sg1.getRowCount();i++) {
					if (this.sg1.cells(9,i) == "INVALID") {
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
									sql.add("insert into hr_karyawan(nik,kode_lokasi,nama,tgl_masuk,loker,bm,jabatan,bank,no_rek,nama_rek) values "+
											"('"+this.sg1.cells(0,i)+"','"+this.app._lokasi+"','"+this.sg1.cells(1,i)+"','"+this.sg1.cells(2,i)+"','"+
											this.sg1.cells(3,i)+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(5,i)+"','"+this.sg1.cells(6,i)+"','"+
											this.sg1.cells(7,i)+"','"+this.sg1.cells(8,i)+"')");
								}
							}
							
							if (this.c_modul.getText() == "UBAH") {		
								for (var i=0;i < this.sg1.getRowCount();i++){									
									sql.add("update hr_karyawan set nama='"+this.sg1.cells(1,i)+"',tgl_masuk='"+this.sg1.cells(2,i)+"',loker='"+this.sg1.cells(3,i)+"',bm='"+this.sg1.cells(4,i)+"',jabatan='"+this.sg1.cells(5,i)+"',bank='"+this.sg1.cells(6,i)+"',no_rek='"+this.sg1.cells(7,i)+"',nama_rek='"+this.sg1.cells(8,i)+"' "+
											"where nik = '"+this.sg1.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
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

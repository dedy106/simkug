window.app_saku3_transaksi_tpcc_kug_fGarLoad = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tpcc_kug_fGarLoad.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_tpcc_kug_fGarLoad";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Upload Data Budget", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.c_tahun = new saiCB(this,{bound:[20,11,200,20],caption:"Tahun",readOnly:true,tag:2});
		this.c_modul = new saiCB(this,{bound:[20,13,200,20],caption:"Mode Input",items:["REPLACE","ADD"],readOnly:true,tag:2}); 
		this.bValid = new button(this,{bound:[680,13,100,20],caption:"Validasi",click:[this,"doValid"]});	
		this.e_total = new saiLabelEdit(this,{bound:[810,13,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,410], childPage:["Data Budget","Error Msg"]});				
		this.sg1 = new portalui_saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:15,tag:9,
				colTitle:["Kode Akun","Kode PP","Kode DRK","Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"],
				colWidth:[[14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[100,100,100,100,100,100,100,100,100,100,100,100,100,100,100]],
				colFormat:[[3,4,5,6,7,8,9,10,11,12,13,14],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
				pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"],
				readOnly:true, defaultRow:1
		});		
		this.sgn1 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPage"]});		

		this.sg2 = new portalui_saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:1,tag:9,
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

		this.c_tahun.items.clear();
		var data = this.dbLib.getDataProvider("select year(getdate()) as tahun union select year(getdate())+1 as tahun order by tahun desc",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.c_tahun.addItem(i,line.tahun);
			}
		}

	}
};
window.app_saku3_transaksi_tpcc_kug_fGarLoad.extend(window.portalui_childForm);
window.app_saku3_transaksi_tpcc_kug_fGarLoad.implement({	
	doAfterPaste: function(sender,totalRow){
		try {
			setTipeButton(tbAllFalse);
			this.e_total.setText("0");
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();	
		} catch(e) {alert(e);}
	},
	doPage: function(sender,page){
		this.sg1.doSelectPage(page);
	},	
	doValid: function() {
		try {			
			var strSQL = "select kode_akun from masakun where block = '0' and kode_lokasi='"+this.app._lokasi+"'";			
			var dataS = this.dbLib.getDataProvider(strSQL,true);
			if (typeof dataS == "object" && dataS.rs.rows[0] != undefined){
				this.dataAkun = dataS;
			}
			var strSQL = "select kode_pp from pp where flag_aktif = '1' and kode_lokasi='"+this.app._lokasi+"'";			
			var dataS = this.dbLib.getDataProvider(strSQL,true);
			if (typeof dataS == "object" && dataS.rs.rows[0] != undefined){
				this.dataPP = dataS;
			}	
			var strSQL = "select kode_drk from drk where tahun = '"+this.c_tahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";			
			var dataS = this.dbLib.getDataProvider(strSQL,true);
			if (typeof dataS == "object" && dataS.rs.rows[0] != undefined){
				this.dataDRK = dataS;
			}	

			this.inValid = false;
			var total = 0;
			for (var i=0; i < this.sg1.getRowCount();i++){

				total += nilaiToFloat(this.sg1.cells(3,i))+nilaiToFloat(this.sg1.cells(4,i))+nilaiToFloat(this.sg1.cells(5,i))+
						 nilaiToFloat(this.sg1.cells(6,i))+nilaiToFloat(this.sg1.cells(7,i))+nilaiToFloat(this.sg1.cells(8,i))+nilaiToFloat(this.sg1.cells(9,i))+
						 nilaiToFloat(this.sg1.cells(10,i))+nilaiToFloat(this.sg1.cells(11,i))+nilaiToFloat(this.sg1.cells(12,i))+nilaiToFloat(this.sg1.cells(13,i))+nilaiToFloat(this.sg1.cells(14,i));

				this.sg1.cells(0,i,"INVALID | "+this.sg1.cells(0,i));
				this.sg1.cells(1,i,"INVALID | "+this.sg1.cells(1,i));
				this.sg1.cells(2,i,"INVALID | "+this.sg1.cells(2,i));
				
				if (this.dataAkun.rs.rows.length > 0) {
					for (var j=0;j < this.dataAkun.rs.rows.length;j++){				
						if (this.sg1.cells(0,i).substr(10,20) == this.dataAkun.rs.rows[j].kode_akun) {
							this.sg1.cells(0,i,this.dataAkun.rs.rows[j].kode_akun);										
						}						
					}	
					if (this.sg1.cells(0,i).substr(0,7) == "INVALID") this.inValid = true;							
				}

				if (this.dataPP.rs.rows.length > 0) {
					for (var j=0;j < this.dataPP.rs.rows.length;j++){				
						if (this.sg1.cells(1,i).substr(10,20) == this.dataPP.rs.rows[j].kode_pp) {
							this.sg1.cells(1,i,this.dataPP.rs.rows[j].kode_pp);										
						}						
					}	
					if (this.sg1.cells(1,i).substr(0,7) == "INVALID") this.inValid = true;							
				}	
				
				if (this.dataDRK.rs.rows.length > 0) {
					for (var j=0;j < this.dataDRK.rs.rows.length;j++){				
						if (this.sg1.cells(2,i).substr(10,20) == this.dataDRK.rs.rows[j].kode_drk) {
							this.sg1.cells(2,i,this.dataDRK.rs.rows[j].kode_drk);										
						}						
					}	
					if (this.sg1.cells(2,i).substr(0,7) == "INVALID") this.inValid = true;							
				}	
			}	
		
			if (!this.inValid) {
				setTipeButton(tbSimpan);	
				this.e_total.setText(floatToNilai(total));
			}
			else {
				this.e_total.setText("0");
				this.pc2.setActivePage(this.pc2.childPage[1]);	
				this.sg2.clear();
				for (var i=0; i < this.sg1.getRowCount();i++) {
					if (this.sg1.cells(0,i).substr(0,7) == "INVALID" || this.sg1.cells(1,i).substr(0,7) == "INVALID" || this.sg1.cells(2,i).substr(0,7) == "INVALID") {
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
				if (nilaiToFloat(this.e_total.getText()) == 0) {
					system.alert(this,"Data tidak valid.","Periksa Error Msg.");
					return false;
				}							
				if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
					try{
						var nb = this.standarLib.noBuktiOtomatis(this.dbLib,"anggaran_m","no_agg",this.app._lokasi+"-LGR"+this.c_tahun.getText()+".","0000");
						uses("server_util_arrayList");
						var sql = new server_util_arrayList();	
						if (this.c_modul.getText() == "REPLACE") sql.add("delete from anggaran_d where kode_lokasi='"+this.app._lokasi+"' and periode like '"+this.c_tahun.getText()+"%'");	
						
						sql.add("insert into anggaran_m (no_agg,kode_lokasi,no_dokumen,tanggal,keterangan,tahun,kode_curr,nilai,tgl_input,nik_user,posted,no_del,nik_buat,nik_setuju,jenis) values "+
								"('"+nb+"','"+this.app._lokasi+"','-',getdate(),'Load Budget','"+this.c_tahun.getText()+"','IDR',"+nilaiToFloat(this.e_total.getText())+",getdate(),'"+this.app._userLog+"','X','-','"+this.app._userLog+"','"+this.app._userLog+"','"+this.c_modul.getText()+"')");
							
						for (var i=0;i < this.sg1.getRowCount();i++){	
							for (var j=1; j <= 12; j++){
								if (nilaiToFloat(this.sg1.cells(j+2,i)) != 0) {
									sql.add("insert into anggaran_d(no_agg,kode_lokasi,no_urut,kode_pp,kode_akun,kode_drk,volume,periode,nilai,nilai_sat,dc,satuan,tgl_input,nik_user,modul,nilai_kas,no_sukka) values "+
											"('"+nb+"','"+this.app._lokasi+"',1,'"+this.sg1.cells(1,i)+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(2,i)+"',1,'"+this.c_tahun.getText()+(j<10?"0":"")+j+"',"+nilaiToFloat(this.sg1.cells(j+2,i))+","+nilaiToFloat(this.sg1.cells(j+2,i))+",'D','-',getdate(),'"+this.app._userLog+"','LOAD',0,'-')");
								}
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
						this.app._mainForm.pesan(2,"Transaksi sukses dieksekusi.");
						this.app._mainForm.bClear.click();              
					}else
						system.info(this, result,"");											
				break;
			}
		}		
	}
});

window.app_saku3_transaksi_fa_fUbahID = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_fa_fUbahID.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_fa_fUbahID";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Ubah ID Barang", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.c_modul = new saiCB(this,{bound:[20,13,180,20],caption:"Jenis Input",items:["LOAD","INPUT"],readOnly:true,tag:2,change:[this,"doChange"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Upload","Input"]});				
		this.sg1 = new portalui_saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:5,tag:9,
				colTitle:["Lokasi","ID Lama","ID Baru","Nama","Nilai"],
				colWidth:[[4,3,2,1,0],[100,300,150,150,60]],
				colFormat:[[4],[cfNilai]],
				pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"],
				readOnly:true, defaultRow:1
		});		
		this.sgn1 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPage"]});		
		
		this.cb_lokasi = new saiCBBL(this.pc2.childPage[1],{bound:[20,11,250,20],caption:"Lokasi",multiSelection:false,maxLength:10,change:[this,"doChange"]});
		this.cb_kode = new saiCBBL(this.pc2.childPage[1],{bound:[20,10,250,20],caption:"ID Lama",multiSelection:false,maxLength:20,change:[this,"doChange"]});
		this.e_nama = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,11,400,20],caption:"Deskripsi", readOnly:true});		
		this.e_tgl = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,12,400,20],caption:"Tgl Perolehan", readOnly:true});		
		this.e_merk = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,13,400,20],caption:"Merk", readOnly:true});		
		this.e_tipe = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,14,400,20],caption:"Tipe", readOnly:true});		
		this.e_noseri = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,15,400,20],caption:"No Seri", readOnly:true});	
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,20,230,20],caption:"Nilai", readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_idbaru = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,11,230,20],caption:"ID Baru", maxLength:19});		
				
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		
		this.rearrangeChild(10,23);
		this.pc2.childPage[1].rearrangeChild(10, 23);	
		
		this.setTabChildIndex();				
		setTipeButton(tbSimpan);		
		
		this.cb_lokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi<>'00'",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);		
		
	}
};
window.app_saku3_transaksi_fa_fUbahID.extend(window.portalui_childForm);
window.app_saku3_transaksi_fa_fUbahID.implement({	
	doAfterPaste: function(sender,totalRow){
		try {
			for (var i=0;i < this.sg1.getRowCount();i++){								
				var data = this.dbLib.getDataProvider("select nama,nilai from fa_asset where no_fa='"+this.sg1.cells(1,i)+"' and kode_lokasi='"+this.sg1.cells(0,i)+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.sg1.cells(3,i,line.nama);
						this.sg1.cells(4,i,line.nilai);
					}
					else {
						this.sg1.cells(3,i,"NOTVALID");
						this.sg1.cells(4,i,"0");
					}					
				}
			}
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();			
		} catch(e) {alert(e);}
	},
	doPage: function(sender,page){
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, [0,1],undefined);				
					this.sg1.clear(1); 
					
					this.cb_lokasi.setTag("0");
					this.cb_kode.setTag("0");
					this.e_nama.setTag("0");
					this.e_tgl.setTag("0");
					this.e_merk.setTag("0");
					this.e_tipe.setTag("0");
					this.e_noseri.setTag("0");
					this.e_nilai.setTag("0");
					this.e_idbaru.setTag("0");
		
					this.sg1.setTag("9");
					setTipeButton(tbSimpan);
				}
				break;
			case "simpan" :						
					if (this.c_modul.getText() == "INPUT") {
						this.cb_lokasi.setTag("0");
						this.cb_kode.setTag("0");
						this.e_nama.setTag("0");
						this.e_tgl.setTag("0");
						this.e_merk.setTag("0");
						this.e_tipe.setTag("0");
						this.e_noseri.setTag("0");
						this.e_nilai.setTag("0");
						this.e_idbaru.setTag("0");
						this.sg1.setTag("9");
					}
					else {
						this.cb_lokasi.setTag("9");
						this.cb_kode.setTag("9");
						this.e_nama.setTag("9");
						this.e_tgl.setTag("9");
						this.e_merk.setTag("9");
						this.e_tipe.setTag("9");
						this.e_noseri.setTag("9");
						this.e_nilai.setTag("9");
						this.e_idbaru.setTag("9");
						this.sg1.setTag("0");
					}
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();	
							if (this.c_modul.getText() == "INPUT") {
								sql.add("update fa_asset set no_fa='"+this.e_idbaru.getText()+"' where no_fa='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
								sql.add("update fasusut_d set no_fa='"+this.e_idbaru.getText()+"' where no_fa='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
							}
							else {							
								var line;
								for (var i=0;i < this.sg1.getRowCount();i++){	
									if (this.sg1.cells(3,i) == "NOTVALID")	{
										var j = i+1;
										system.alert(this,"Data Barang baris "+j+" tidak valid.","Data ID Lama tidak ditemukan.");
										return false;
									}						
									sql.add("update fa_asset set no_fa='"+this.sg1.cells(2,i)+"' where no_fa='"+this.sg1.cells(1,i)+"' and kode_lokasi='"+this.sg1.cells(0,i)+"'");
									sql.add("update fasusut_d set no_fa='"+this.sg1.cells(2,i)+"' where no_fa='"+this.sg1.cells(1,i)+"' and kode_lokasi='"+this.sg1.cells(0,i)+"'");
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
	doChange: function(sender){
		try{
			if (sender == this.cb_lokasi) {
				this.cb_kode.setText("","");
				this.e_nama.setText("");
				this.e_nilai.setText("0");
				
				if (this.cb_lokasi.getText() != "") {
					this.cb_kode.setSQL("select no_fa, nama from fa_asset where progress = '2' and kode_lokasi='"+this.cb_lokasi.getText()+"'",["no_fa","nama"],false,["No Barang","Deskripsi"],"and","Data Barang",true);		
				}
			}
			if (this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider("select nama,convert(varchar,tgl_perolehan,103) as tgl_oleh,merk,tipe,no_seri,nilai "+
						   "from fa_asset where no_fa='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_nama.setText(line.nama);
						this.e_tgl.setText(line.tgl_oleh);
						this.e_merk.setText(line.merk);
						this.e_tipe.setText(line.tipe);
						this.e_noseri.setText(line.no_seri);
						this.e_nilai.setText(floatToNilai(line.nilai));
					}					
				}
			}
			if (sender == this.c_modul) {
				if (this.c_modul.getText() == "LOAD") this.pc2.setActivePage(this.pc2.childPage[0]);
				else this.pc2.setActivePage(this.pc2.childPage[1]);
			}
		}catch(e){
			systemAPI.alert(e);
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

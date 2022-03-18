window.app_saku3_transaksi_sapyakes_fHargaSahamLoad = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sapyakes_fHargaSahamLoad.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_sapyakes_fHargaSahamLoad";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Harga Wajar Saham", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,410], childPage:["Data Harga"]});				
		this.sg1 = new portalui_saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:34,tag:0,
				colTitle:["Kode Saham","Nama","Periode",
						  "n1" ,"n2" ,"n3" ,"n4" ,"n5" ,"n6" ,"n7" ,"n8" ,"n9" ,"n10",
						  "n11","n12","n13","n14","n15","n16","n17","n18","n19","n20",
						  "n21","n22","n23","n24","n25","n26","n27","n28","n29","n30",
						  "n31"],
				colWidth:[[33
						   ,32,31,30,29,28,27,26,25,24,23
						   ,22,21,20,19,18,17,16,15,14,13
						   ,12,11,10,9,8,7,6,5,4,3
						   ,2,1,0],[ 
						   ,60,150,80]],
				pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"],
				readOnly:true, defaultRow:1
		});		
		this.sgn1 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPage"]});		
				
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		
		this.rearrangeChild(10,23);
		
		this.setTabChildIndex();				
	
		setTipeButton(tbAllFalse);				
	}
};
window.app_saku3_transaksi_sapyakes_fHargaSahamLoad.extend(window.portalui_childForm);
window.app_saku3_transaksi_sapyakes_fHargaSahamLoad.implement({	
	doAfterPaste: function(sender,totalRow){
		try {
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
							
							for (var i=0;i < this.sg1.getRowCount();i++){									
								sql.add("insert into sis_siswa(nis,kode_lokasi,nama,flag_aktif,kode_kelas,kode_pp,kode_akt) values "+
										"('"+this.sg1.cells(0,i)+"','"+this.app._lokasi+"','"+this.sg1.cells(1,i)+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(2,i)+"','"+this.cb_pp.getText()+"','"+this.sg1.cells(3,i)+"')");
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

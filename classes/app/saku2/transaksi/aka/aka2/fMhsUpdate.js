window.app_saku2_transaksi_aka_aka2_fMhsUpdate = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_aka_aka2_fMhsUpdate.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_aka_aka2_fMhsUpdate";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Update Status Mahasiswa", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Upload Data","Error Msg"]});				
		this.sg1 = new portalui_saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:3,tag:9,
				colTitle:["NIM","Status","Tertagih/Tidak"],
				colWidth:[[2,1,0],[150,150,150]],
				pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"],
				readOnly:true, defaultRow:1
		});		
		this.sgn1 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPage"]});		

		this.sg2 = new portalui_saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:1,tag:9,
				colTitle:["Baris Invalid"],
				colWidth:[[0],[150]],				
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
window.app_saku2_transaksi_aka_aka2_fMhsUpdate.extend(window.portalui_childForm);
window.app_saku2_transaksi_aka_aka2_fMhsUpdate.implement({	
	doAfterPaste: function(sender,totalRow){
		try {
			var stsValid = true;
			for (var i=0;i < this.sg1.getRowCount();i++){									
				this.sg1.cells(2,i,this.sg1.cells(2,i).toUpperCase());
				if (this.sg1.cells(2,i) != "TERTAGIH" && this.sg1.cells(2,i) != "TIDAK") {
					stsValid = false;
					this.sg1.cells(2,i,"INVALID-"+this.sg1.cells(2,i));
				}
			}
			if (!stsValid) {
				setTipeButton(tbAllFalse);
				this.sg2.clear();
				for (var i=0;i < this.sg1.getRowCount();i++){									
					if (this.sg1.cells(2,i).substr(0,7) == "INVALID") {
						var j = i+1;
						this.sg2.appendData([j]);
					}
				}
			}
			else setTipeButton(tbSimpan);

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
					setTipeButton(tbSimpan);
				}
				break;
			case "simpan" :					
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();	
							for (var i=0;i < this.sg1.getRowCount();i++){									
								sql.add("update aka_mahasiswa set flag_status = '"+this.sg1.cells(1,i)+"',sts_tagih='"+this.sg1.cells(2,i)+"' where nim = '"+this.sg1.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
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

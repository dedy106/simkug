window.app_saku3_transaksi_yspt_dikti_fCamabaLoad = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yspt_dikti_fCamabaLoad.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_yspt_dikti_fCamabaLoad";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Calon MHS", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.cb_ta = new portalui_saiCBBL(this,{bound:[20,10,200,20],caption:"Periode Akademik",multiSelection:false,tag:2,change:[this,"doChange"]});			
		this.c_modul = new saiCB(this,{bound:[20,13,180,20],caption:"Jenis Input",items:["TAMBAH","UBAH"],readOnly:true,tag:2}); 
		this.bValid = new button(this,{bound:[220,13,80,20],caption:"Validasi",click:[this,"doValid"]});			

		this.pc2 = new pageControl(this,{bound:[10,10,1000,390], childPage:["Data Siswa","Error Msg"]});				
		this.sg1 = new portalui_saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:2,tag:9,
				colTitle:["No Reg","Nama"],
				colWidth:[[1,0],[250,200]],
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
		
		this.cb_ta.setSQL("select distinct kode_ta, nama from dikti_ta where kode_lokasi='"+this.app._lokasi+"'",["kode_ta","nama"],false,["Kode","Deskripsi"],"and","Periode Akademik",true);			
		var data = this.dbLib.getDataProvider("select top 1 kode_ta from dikti_ta where kode_lokasi='"+this.app._lokasi+"' order by periode desc",true);
		if (typeof data == "object"){			
			var line = data.rs.rows[0];							
			if (line != undefined){
				this.cb_ta.setText(line.kode_ta);
			}
		}

		setTipeButton(tbAllFalse);		
	}
};
window.app_saku3_transaksi_yspt_dikti_fCamabaLoad.extend(window.portalui_childForm);
window.app_saku3_transaksi_yspt_dikti_fCamabaLoad.implement({	
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
			//cek data NOREG
			var strSQL = "select no_reg from dikti_camaba where kode_lokasi='"+this.app._lokasi+"' ";			
			var dataS = this.dbLib.getDataProvider(strSQL,true);
			if (typeof dataS == "object" && dataS.rs.rows[0] != undefined){
				this.dataREG = dataS;
			}		
					
			if (this.c_modul.getText() == "UBAH") {		
				for (var i=0; i < this.sg1.getRowCount();i++){
					this.sg1.cells(0,i,"INVALID-"+this.sg1.cells(0,i));					
					if (this.dataREG.rs.rows.length > 0) {
						for (var j=0;j < this.dataREG.rs.rows.length;j++){				
							if (this.sg1.cells(0,i).substr(8,30) == this.dataREG.rs.rows[j].no_reg) {
								this.sg1.cells(0,i,this.sg1.cells(0,i).substr(8,30));	
							}															
						}	
						if (this.sg1.cells(0,i).substr(0,7) == "INVALID") this.inValid = true;									
					}											
				}	
			}

			if (this.c_modul.getText() == "TAMBAH") {		
				for (var i=0; i < this.sg1.getRowCount();i++){					
					if (this.dataREG.rs.rows.length > 0) {
						for (var j=0;j < this.dataREG.rs.rows.length;j++){				
							if (this.sg1.cells(0,i) == this.dataREG.rs.rows[j].no_reg) {
								this.sg1.cells(0,i,"INVALID-"+this.sg1.cells(0,i));				
							}
						}	
						if (this.sg1.cells(0,i).substr(0,7) == "INVALID") this.inValid = true;										
					}
				}	
			}

			if (this.inValid == false) setTipeButton(tbSimpan);	
			else {
				this.pc2.setActivePage(this.pc2.childPage[1]);	
				this.sg2.clear();
				for (var i=0; i < this.sg1.getRowCount();i++) {
					if (this.sg1.cells(0,i).substr(0,7) == "INVALID") {
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
									sql.add("insert into dikti_camaba(no_reg,kode_ta,nama,kode_lokasi) values "+
						    				"('"+this.sg1.cells(0,i)+"','"+this.cb_ta.getText()+"','"+this.sg1.cells(1,i)+"','"+this.app._lokasi+"')");

								}
							}
							
							if (this.c_modul.getText() == "UBAH") {		
								for (var i=0;i < this.sg1.getRowCount();i++){									
									sql.add("update dikti_camaba set nama='"+this.sg1.cells(1,i)+"',kode_ta='"+this.cb_ta.getText()+"' "+
											"where no_reg = '"+this.sg1.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
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

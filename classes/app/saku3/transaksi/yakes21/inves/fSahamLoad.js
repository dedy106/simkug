/*
status replace: saham yg tidak ada di dalam SG(copy-paste), akan di nonaktifkan baik itu status_universe maupun aktifnya
				saham ada di SG(copy-paste) tp tidak ada di dtbase, akan insert otomatis

status tambah :	saham ada di SG(copy-paste) tp tidak ada di dtbase, akan insert otomatis			
*/

window.app_saku3_transaksi_yakes21_inves_fSahamLoad = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_inves_fSahamLoad.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_yakes21_inves_fSahamLoad";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Saham [Copy-Paste]", 0);	
		this.maximize();		

		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.c_mode = new saiCB(this,{bound:[20,13,200,20],caption:"Mode Input",items:["REPLACE","TAMBAH"],readOnly:true,tag:2}); 
		this.bValid = new button(this,{bound:[230,13,80,20],caption:"Validasi",click:[this,"doValid"]});			
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Saham","Error Msg"]});				
		this.sg1 = new portalui_saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:6,tag:1,
				colTitle:["Kd Saham","Nama Saham","Kd Sektor","Sts Universe","Sts Aktif","Status"],
				colWidth:[[5,4,3,2,1,0],[80,100,100,100,300,100]],
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
		
		this.sg3 = new portalui_saiGrid(this,{bound:[520,150,300,300],colCount:1,tag:9,visible:false,
				colTitle:["Kode Saham"],
				colWidth:[[0],[200]],autoAppend:false,
				readOnly:true, defaultRow:1
		});
		
		setTipeButton(tbAllFalse);		

	}
};
window.app_saku3_transaksi_yakes21_inves_fSahamLoad.extend(window.portalui_childForm);
window.app_saku3_transaksi_yakes21_inves_fSahamLoad.implement({	
	doAfterPaste: function(sender,totalRow){
		try {
			setTipeButton(tbAllFalse);	
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();	
		} catch(e) {alert(e);}
	},
	doPage: function(sender,page){
		this.sg1.doSelectPage(page);
	},	

	doValid: function() {
		try {		
			//saham
			var strSQL = "select kode_saham from inv_saham";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataSaham = data;
			}
			
			//sektor saham
			var strSQL = "select kode_sahamklp from inv_sahamklp";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataSektor = data;
			}	
				
			if (this.c_mode.getText() == "REPLACE") {
				this.sg3.clear();
				for (var j=0;j < this.dataSaham.rs.rows.length;j++){
					var temu = false;
					for (var i=0; i < this.sg1.getRowCount();i++){
						if (this.sg1.cells(0,i) == this.dataSaham.rs.rows[j].kode_saham) {	
							temu = true;
						}
					}
					if (!temu) {
						this.sg3.appendData([this.dataSaham.rs.rows[j].kode_saham]);
					}
				}
			}

			this.inValid = false;		
			for (var i=0; i < this.sg1.getRowCount();i++){
				this.sg1.cells(2,i,"INVALID | "+this.sg1.cells(2,i));	
				this.sg1.cells(5,i,"BARU");	

				if (this.sg1.cells(3,i) != "0" && this.sg1.cells(3,i) != "1" ) {
					this.sg1.cells(3,i,"INVALID | "+this.sg1.cells(3,i));	
					this.inValid = true;				
				}
				if (this.sg1.cells(4,i) != "0" && this.sg1.cells(4,i) != "1" ) {
					this.sg1.cells(4,i,"INVALID | "+this.sg1.cells(4,i));	
					this.inValid = true;				
				}

				//kode saham baru atau sudah ada
				for (var j=0;j < this.dataSaham.rs.rows.length;j++){
					if (this.sg1.cells(0,i) == this.dataSaham.rs.rows[j].kode_saham) {	
						this.sg1.cells(5,i,"TEMU");					
					}
				}
				
				//cek data sektor
				for (var j=0;j < this.dataSektor.rs.rows.length;j++){
					if (this.sg1.cells(2,i).substr(10,10) == this.dataSektor.rs.rows[j].kode_sahamklp) {	
						this.sg1.cells(2,i,this.dataSektor.rs.rows[j].kode_sahamklp);					
					}
				}	
				if (this.sg1.cells(2,i).substr(0,7) == "INVALID") this.inValid = true;								
			}	

			if (!this.inValid) setTipeButton(tbSimpan);	
			else {
				this.pc2.setActivePage(this.pc2.childPage[1]);	
				this.sg2.clear();
				for (var i=0; i < this.sg1.getRowCount();i++) {
					if (this.sg1.cells(0,i).substr(0,7) == "INVALID" || this.sg1.cells(3,i).substr(0,7) == "INVALID" || 
						this.sg1.cells(4,i).substr(0,7) == "INVALID" ) {

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
					this.sg2.clear(1); 		
					this.sg3.clear(1); 														
					setTipeButton(tbAllFalse);
				}
				break;
			case "simpan" :					
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();	
							if (this.c_mode.getText() == "REPLACE") {	
								for (var i=0;i < this.sg1.getRowCount();i++){																										
									if (this.sg1.cells() == "BARU") {
										sql.add("insert into inv_saham(kode_saham,nama,kode_sahamklp,flag_uni,flag_aktif) values "+
												"('"+this.sg1.cells(0,i)+"','"+this.sg1.cells(1,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(3,i)+"','"+this.sg1.cells(4,i)+"')");					
									}
									if (this.sg1.cells() == "TEMU") {	
										sql.add("update inv_saham set nama='"+this.sg1.cells(1,i)+"',kode_sahamklp='"+this.sg1.cells(2,i)+"',flag_uni='"+this.sg1.cells(3,i)+"',flag_aktif='"+this.sg1.cells(4,i)+"' where kode_saham='"+this.sg1.cells(0,i)+"'");
									}	
								
								}

								//inactive saham yg tiada ada dlm list (sg-copypaste)
								for (var i=0;i < this.sg3.getRowCount();i++){																																			
									sql.add("update inv_saham set flag_uni='0',flag_aktif='0' where kode_saham='"+this.sg3.cells(0,i)+"'");									
								}
							}
							
							if (this.c_mode.getText() == "TAMBAH") {		
								for (var i=0;i < this.sg1.getRowCount();i++) {	
									if (this.sg1.cells() == "BARU") {
										sql.add("insert into inv_saham(kode_saham,nama,kode_sahamklp,flag_uni,flag_aktif) values "+
												"('"+this.sg1.cells(0,i)+"','"+this.sg1.cells(1,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(3,i)+"','"+this.sg1.cells(4,i)+"')");					
									}
									if (this.sg1.cells() == "TEMU") {	
										sql.add("update inv_saham set nama='"+this.sg1.cells(1,i)+"',kode_sahamklp='"+this.sg1.cells(2,i)+"',flag_uni='"+this.sg1.cells(3,i)+"',flag_aktif='"+this.sg1.cells(4,i)+"' where kode_saham='"+this.sg1.cells(0,i)+"'");
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
						this.app._mainForm.pesan(2,"Transaksi Sukses dieksekusi.");
						this.app._mainForm.bClear.click();              
					}else
						system.info(this, result,"");											
				break;
			}
		}		
	}
});

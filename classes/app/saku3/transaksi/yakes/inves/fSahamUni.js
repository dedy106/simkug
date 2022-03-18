/*
status replace: saham yg tidak ada di dalam SG(copy-paste), akan di nonaktifkan baik itu status_universe maupun aktifnya
				saham ada di SG(copy-paste) tp tidak ada di dtbase, akan insert otomatis

status tambah :	saham ada di SG(copy-paste) tp tidak ada di dtbase, akan insert otomatis			
*/

window.app_saku3_transaksi_yakes_inves_fSahamUni = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes_inves_fSahamUni.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_yakes_inves_fSahamUni";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Saham Universe [Copy-Paste]", 0);	
		this.maximize();		

		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.cb_kelola = new saiCBBL(this,{bound:[20,12,220,20],caption:"Pengelola", multiSelection:false, maxLength:10, tag:2,change:[this,"doLoad"]});						
		this.bLoad = new button(this,{bound:[890,12,80,20],caption:"Load Data",click:[this,"doLoad"]});			

		this.pc2 = new pageControl(this,{bound:[10,10,1000,410], childPage:["Data Saham","Error Msg"]});				
		this.sg1 = new portalui_saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:1,tag:1,
				colTitle:["Kd Saham"],
				colWidth:[[0],[100]],
				pasteEnable:true,afterPaste:[this,"doAfterPaste"],
				defaultRow:1
		});		
		this.sgn1 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2, grid:this.sg1, pager:[this,"doPage"]});		

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
		
		setTipeButton(tbSimpan);		

		this.sg3 = new portalui_saiGrid(this,{bound:[520,150,300,300],colCount:1,tag:9,visible:false,
			colTitle:["Kode Saham"],
			colWidth:[[0],[200]],autoAppend:false,
			readOnly:true, defaultRow:1
		});
	

		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.sg1.clear(1);
			this.cb_kelola.setSQL("select kode_kelola, nama from inv_kelola where flag_aktif='1'",["kode_kelola","nama"],false,["Kode","Nama"],"and","Daftar Pengelola",true);							

		}catch(e){
			systemAPI.alert(e);
		}
		

	}
};
window.app_saku3_transaksi_yakes_inves_fSahamUni.extend(window.portalui_childForm);
window.app_saku3_transaksi_yakes_inves_fSahamUni.implement({	
	doAfterPaste: function(sender,totalRow){
		try {
			setTipeButton(tbAllFalse);	
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();	

			this.doValid();
		} catch(e) {alert(e);}
	},
	doPage: function(sender,page){
		this.sg1.doSelectPage(page);
	},	
	doLoad: function() {
		var data = this.dbLib.getDataProvider("select kode_saham from inv_saham_uni where kode_kelola='"+this.cb_kelola.getText()+"' order by kode_saham",true);	
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg1.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];																													
				this.sg1.appendData([line.kode_saham]);															
			}					
		} else this.sg1.clear(1);		
	},
	doValid: function() {
		try {		
			//saham
			var strSQL = "select kode_saham from inv_saham";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg3.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																													
					this.sg3.appendData([line.kode_saham]);															
				}				
			}
				
			this.sg2.clear();
			for (var j=0;j < this.sg1.getRowCount();j++){
				var temu = false;
				for (var i=0; i < this.sg3.getRowCount();i++){
					if (this.sg1.cells(0,j) == this.sg3.cells(0,i)) {	
						temu = true;
					}
				}				
				if (!temu) {
					this.sg2.appendData([this.sg1.cells(0,j)]);
				}
			}

			if (this.sg2.getRowCount() == 0) this.sg2.clear(1);
		
			if (this.sg2.cells(0,0) == "") {
				setTipeButton(tbSimpan);					
			}
			else {
				setTipeButton(tbAllFalse);		
				this.pc2.setActivePage(this.pc2.childPage[1]);	
				system.alert(this,"Kode Saham tidak terdaftar.","");
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
					setTipeButton(tbSimpan);
				}
				break;
			case "simpan" :					
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();	
							
							sql.add("delete from inv_saham_uni where kode_kelola='"+this.cb_kelola.getText()+"'");
							for (var i=0;i < this.sg1.getRowCount();i++){																										
								sql.add("insert into inv_saham_uni(kode_saham,kode_kelola) values "+
										"('"+this.sg1.cells(0,i)+"','"+this.cb_kelola.getText()+"')");													
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

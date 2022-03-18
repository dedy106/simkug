window.app_saku3_transaksi_yakes_inves_fROIrka = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes_inves_fROIrka.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes_inves_fROIrka";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form RKA Investasi", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		
		this.cb_plan = new saiCBBL(this,{bound:[20,15,220,20],caption:"Plan Asset", multiSelection:false, maxLength:10, tag:2,readOnly:true});		
		this.c_tahun = new saiCB(this,{bound:[20,10,200,20],caption:"Tahun",tag:2,change:[this,"doChange"]});		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,410], childPage:["Pendapatan","S P I","Beban","R O I","Plan Aset"]});				
		
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:14,tag:0,
				colTitle:["Kd Klp","Kelompok Aset","Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"],
				colWidth:[[13,12,11,10,9,8,7,6,5,4,3,2,1,0],[100,100,100,100,100,100,100,100,100,100,100,100,250,80]],		
				colFormat:[[2,3,4,5,6,7,8,9,10,11,12,13],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]], 		
				pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste1"],
				readOnly:true, defaultRow:1
		});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1});		

		this.sg2 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:14,tag:0,
				colTitle:["Kd Klp","Kelompok Aset","Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"],
				colWidth:[[13,12,11,10,9,8,7,6,5,4,3,2,1,0],[100,100,100,100,100,100,100,100,100,100,100,100,250,80]],		
				colFormat:[[2,3,4,5,6,7,8,9,10,11,12,13],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]], 		
				pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste2"],
				readOnly:true, defaultRow:1
		});		
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg2});		

		this.sg3 = new portalui_saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:14,tag:0,
				colTitle:["Kd Klp","Kelompok Aset","Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"],
				colWidth:[[13,12,11,10,9,8,7,6,5,4,3,2,1,0],[100,100,100,100,100,100,100,100,100,100,100,100,250,80]],		
				colFormat:[[2,3,4,5,6,7,8,9,10,11,12,13],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]], 		
				pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste3"],
				readOnly:true, defaultRow:1
		});				
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg3});		

		this.sg4 = new portalui_saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:14,tag:0,
				colTitle:["Kd Klp","Kelompok Aset","Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"],
				colWidth:[[13,12,11,10,9,8,7,6,5,4,3,2,1,0],[100,100,100,100,100,100,100,100,100,100,100,100,250,80]],		
				colFormat:[[2,3,4,5,6,7,8,9,10,11,12,13],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]], 		
				pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste4"],
				readOnly:true, defaultRow:1
		});		
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg4});		

		this.sg5 = new portalui_saiGrid(this.pc1.childPage[4],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:14,tag:0,
				colTitle:["Kd Klp","Kelompok Aset","Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"],
				colWidth:[[13,12,11,10,9,8,7,6,5,4,3,2,1,0],[100,100,100,100,100,100,100,100,100,100,100,100,250,80]],		
				colFormat:[[2,3,4,5,6,7,8,9,10,11,12,13],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]], 		
				pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste5"],
				readOnly:true, defaultRow:1
		});		
		this.sgn5 = new portalui_sgNavigator(this.pc1.childPage[4],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg5});		
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.cb_plan.setSQL("select kode_plan, nama from inv_plan",["kode_plan","nama"],false,["Kode","Nama"],"where","Daftar Plan Asset",true);						
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PLAN') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_spro == "PLAN") this.cb_plan.setText(line.flag);													
				}
			}

			this.c_tahun.items.clear();
			var str = "select max(substring(periode,1,4)) as tahun from periode where kode_lokasi ='"+this.app._lokasi+"' union select max(substring(periode,1,4))+1 as tahun from periode where kode_lokasi ='"+this.app._lokasi+"' order by tahun desc";
			var data = this.dbLib.getDataProvider(str,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													
					this.c_tahun.addItem(i,line.tahun);
				}
			} 

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes_inves_fROIrka.extend(window.childForm);
window.app_saku3_transaksi_yakes_inves_fROIrka.implement({
	doAfterPaste1: function(sender,totalRow){
		try {
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();	
			
			this.doValidasi();
		} catch(e) {alert(e);}
	},
	doPager1: function(sender,page){
		this.sg1.doSelectPage(page);
	},
	doAfterPaste2: function(sender,totalRow){
		try {
			this.sgn2.setTotalPage(sender.getTotalPage());
			this.sgn2.rearrange();	
			
			this.doValidasi();
		} catch(e) {alert(e);}
	},
	doPager2: function(sender,page){
		this.sg2.doSelectPage(page);
	},
	doAfterPaste3: function(sender,totalRow){
		try {
			this.sgn3.setTotalPage(sender.getTotalPage());
			this.sgn3.rearrange();	
			
			this.doValidasi();
		} catch(e) {alert(e);}
	},
	doPager3: function(sender,page){
		this.sg3.doSelectPage(page);
	},
	doAfterPaste4: function(sender,totalRow){
		try {
			this.sgn4.setTotalPage(sender.getTotalPage());
			this.sgn4.rearrange();	
			
			this.doValidasi();
		} catch(e) {alert(e);}
	},
	doPager4: function(sender,page){
		this.sg4.doSelectPage(page);
	},
	doAfterPaste5: function(sender,totalRow){
		try {
			this.sgn5.setTotalPage(sender.getTotalPage());
			this.sgn5.rearrange();	
			
			this.doValidasi();
		} catch(e) {alert(e);}
	},
	doPager5: function(sender,page){
		this.sg5.doSelectPage(page);
	},
	doValidasi: function() {		
		var dataS = this.dbLib.getDataProvider("select kode_kelas,nama from inv_batas_alokasi where tahun='"+this.c_tahun.getText()+"'",true);
		if (typeof dataS == "object" && dataS.rs.rows[0] != undefined){
			this.dataKelas = dataS;
		}					

		this.inValid = false;
		for (var i=0; i < this.sg1.getRowCount();i++){
			this.sg1.cells(0,i,"INVALID | "+this.sg1.cells(0,i));
			for (var j=0;j < this.dataKelas.rs.rows.length;j++){
				if (this.sg1.cells(0,i).substr(10,10) == this.dataKelas.rs.rows[j].kode_kelas) {
					this.sg1.cells(0,i,this.dataKelas.rs.rows[j].kode_kelas);	
					this.sg1.cells(1,i,this.dataKelas.rs.rows[j].nama);				
				}
			}	
			if (this.sg1.cells(0,i).substr(0,7) == "INVALID") this.inValid = true;								
		}	
		for (var i=0; i < this.sg2.getRowCount();i++){
			this.sg2.cells(0,i,"INVALID | "+this.sg2.cells(0,i));
			for (var j=0;j < this.dataKelas.rs.rows.length;j++){
				if (this.sg2.cells(0,i).substr(10,10) == this.dataKelas.rs.rows[j].kode_kelas) {
					this.sg2.cells(0,i,this.dataKelas.rs.rows[j].kode_kelas);	
					this.sg2.cells(1,i,this.dataKelas.rs.rows[j].nama);				
				}
			}	
			if (this.sg2.cells(0,i).substr(0,7) == "INVALID") this.inValid = true;								
		}
		for (var i=0; i < this.sg3.getRowCount();i++){
			this.sg3.cells(0,i,"INVALID | "+this.sg3.cells(0,i));
			for (var j=0;j < this.dataKelas.rs.rows.length;j++){
				if (this.sg3.cells(0,i).substr(10,10) == this.dataKelas.rs.rows[j].kode_kelas) {
					this.sg3.cells(0,i,this.dataKelas.rs.rows[j].kode_kelas);	
					this.sg3.cells(1,i,this.dataKelas.rs.rows[j].nama);				
				}
			}	
			if (this.sg3.cells(0,i).substr(0,7) == "INVALID") this.inValid = true;								
		}	
		for (var i=0; i < this.sg4.getRowCount();i++){
			this.sg4.cells(0,i,"INVALID | "+this.sg4.cells(0,i));
			for (var j=0;j < this.dataKelas.rs.rows.length;j++){
				if (this.sg4.cells(0,i).substr(10,10) == this.dataKelas.rs.rows[j].kode_kelas) {
					this.sg4.cells(0,i,this.dataKelas.rs.rows[j].kode_kelas);	
					this.sg4.cells(1,i,this.dataKelas.rs.rows[j].nama);				
				}

				if (this.sg4.cells(0,i).substr(10,10) == "ROITOTAL") {
					this.sg4.cells(0,i,"ROITOTAL");	
					this.sg4.cells(1,i,"ROI TOTAL");				
				}

			}	
			if (this.sg4.cells(0,i).substr(0,7) == "INVALID") this.inValid = true;								
		}
		for (var i=0; i < this.sg5.getRowCount();i++){
			this.sg5.cells(0,i,"INVALID | "+this.sg5.cells(0,i));
			for (var j=0;j < this.dataKelas.rs.rows.length;j++){
				if (this.sg5.cells(0,i).substr(10,10) == this.dataKelas.rs.rows[j].kode_kelas) {
					this.sg5.cells(0,i,this.dataKelas.rs.rows[j].kode_kelas);	
					this.sg5.cells(1,i,this.dataKelas.rs.rows[j].nama);				
				}
			}	
			if (this.sg5.cells(0,i).substr(0,7) == "INVALID") this.inValid = true;								
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
	simpan: function(){			
		try{		
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();	
					
					sql.add("delete from inv_rka where periode like '"+this.c_tahun.getText()+"%'");							 
					
					for (var i=0;i < this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i)) {			
							for (var j=1;j < 13;j++){	
								sql.add("insert into inv_rka(periode,kode_plan,kode_kelas,modul,nilai) values "+
										"('"+this.c_tahun.getText()+(j<10?"0":"")+j+"','"+this.cb_plan.getText()+"','"+this.sg1.cells(0,i)+"','PDPT',"+nilaiToFloat(this.sg1.cells(j+1,i))+")");
							}
						}	
					}
					
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i)) {			
							for (var j=1;j < 13;j++){	
								sql.add("insert into inv_rka(periode,kode_plan,kode_kelas,modul,nilai) values "+
										"('"+this.c_tahun.getText()+(j<10?"0":"")+j+"','"+this.cb_plan.getText()+"','"+this.sg2.cells(0,i)+"','SPI',"+nilaiToFloat(this.sg2.cells(j+1,i))+")");
							}
						}	
					}

					for (var i=0;i < this.sg3.getRowCount();i++){
						if (this.sg3.rowValid(i)) {			
							for (var j=1;j < 13;j++){	
								sql.add("insert into inv_rka(periode,kode_plan,kode_kelas,modul,nilai) values "+
										"('"+this.c_tahun.getText()+(j<10?"0":"")+j+"','"+this.cb_plan.getText()+"','"+this.sg3.cells(0,i)+"','BEBAN',"+nilaiToFloat(this.sg3.cells(j+1,i))+")");
							}
						}	
					}

					for (var i=0;i < this.sg4.getRowCount();i++){
						if (this.sg4.rowValid(i)) {			
							for (var j=1;j < 13;j++){	
								sql.add("insert into inv_rka(periode,kode_plan,kode_kelas,modul,nilai) values "+
										"('"+this.c_tahun.getText()+(j<10?"0":"")+j+"','"+this.cb_plan.getText()+"','"+this.sg4.cells(0,i)+"','ROI',"+nilaiToFloat(this.sg4.cells(j+1,i))+")");
							}
						}	
					}

					for (var i=0;i < this.sg5.getRowCount();i++){
						if (this.sg5.rowValid(i)) {			
							for (var j=1;j < 13;j++){	
								sql.add("insert into inv_rka(periode,kode_plan,kode_kelas,modul,nilai) values "+
										"('"+this.c_tahun.getText()+(j<10?"0":"")+j+"','"+this.cb_plan.getText()+"','"+this.sg5.cells(0,i)+"','PLAN',"+nilaiToFloat(this.sg5.cells(j+1,i))+")");
							}
						}	
					}
					
					setTipeButton(tbAllFalse);					
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_tab);
					this.sg1.clear(1);
					this.sg2.clear(1);
					this.sg3.clear(1);
					this.sg4.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);						
					setTipeButton(tbSimpan);
				break;
			case "simpan" :					
				if (this.inValid) {
					system.alert(this,"Transaksi tidak valid.","Terdapat Data Tidak Valid.");
					return false;
				}				
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							system.info(this,"Transaksi telah sukses tereksekusi","");
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
					break;					
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});
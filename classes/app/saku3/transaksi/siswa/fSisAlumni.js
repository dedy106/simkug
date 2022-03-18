window.app_saku3_transaksi_siswa_fSisAlumni = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siswa_fSisAlumni.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siswa_fSisAlumni";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Alumni", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);	
	
		this.pc2 = new pageControl(this,{bound:[1,13,1000,400], childPage:["Data Alumni","Error Msg"]});				
		this.sg2 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:7,tag:1,
		            colTitle:["NIS","Tgl Lulus","Status","Institusi","Penghasilan","Keterangan","Val. NIS"],
					colWidth:[[6,5,4,3,2,1,0],[80,350,100,250,80,120,120]],
					colFormat:[[4],[cfNilai]],
					ellipsClick:[this,"doEllipseClick"],
					buttonStyle:[[2],[bsAuto]],	
		            picklist:[[2],[new portalui_arrayMap({items:["SEKOLAH","KERJA","MAGANG","PELATIHAN"]})]],
					pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"], 		
					columnReadOnly:[true,[6]],
					autoAppend:true,defaultRow:1
					});		
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg2,pager:[this,"doPager2"]});

		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:1,tag:9,
				colTitle:["Baris INVALID"],
				colWidth:[[0],[200]],autoAppend:false,
				readOnly:true, defaultRow:1
		});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3, grid:this.sg3, pager:[this,"doPage3"]});		

		this.rearrangeChild(10, 23);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();	
		
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siswa_fSisAlumni.extend(window.childForm);
window.app_saku3_transaksi_siswa_fSisAlumni.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn2.setTotalPage(sender.getTotalPage());
			this.sgn2.rearrange();	

			var strSQL = "select nis from sis_siswa where kode_pp = '"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"' ";			
			var dataS = this.dbLib.getDataProvider(strSQL,true);
			if (typeof dataS == "object" && dataS.rs.rows[0] != undefined){
				this.dataNis = dataS;
			}
			
			this.inValid = false;
			for (var i=0; i < this.sg2.getRowCount();i++){
				this.sg2.cells(6,i,"INVALID");
				for (var j=0;j < this.dataNis.rs.rows.length;j++){
					if (this.sg2.cells(0,i) == this.dataNis.rs.rows[j].nis) {
						this.sg2.cells(6,i,"VALID");
					}
				}	
				if (this.sg2.cells(6,i) == "INVALID") this.inValid = true;									
			}

			if (this.inValid == false) setTipeButton(tbSimpan);	
			else {
				this.pc2.setActivePage(this.pc2.childPage[1]);	
				this.sg3.clear();
				setTipeButton(tbAllFalse);	
				for (var i=0; i < this.sg2.getRowCount();i++) {
					if (this.sg2.cells(6,i) == "INVALID") {
						var j = i+1;	
						this.sg3.appendData([j]);
					}
				}
			}									
		} catch(e) {alert(e);}
	},
	doPager2: function(sender,page){
		this.sg2.doSelectPage(page);
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();	
					for (var i=0; i < this.sg2.getRowCount();i++){			
						sql.add("insert into sis_alumni(nis,kode_pp,kode_lokasi,tanggal,status,institusi,penghasilan,keterangan) values "+
							    "	('"+this.sg2.cells(0,i)+"','"+this.app._kodePP+"','"+this.app._lokasi+"','"+this.sg2.cells(1,i)+"','"+this.sg2.cells(2,i)+"','"+this.sg2.cells(3,i)+"',"+nilaiToFloat(this.sg2.cells(4,i))+",'"+this.sg2.cells(5,i)+"')");
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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"));
				setTipeButton(tbAllFalse);
				this.pc2.setActivePage(this.pc2.childPage[0]);
				this.sg2.clear(1);	
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;						
		}
	},
	doEllipseClick: function(sender, col, row){
		try{			
			if (col == 0){
				this.standarLib.showListData(this, "Daftar NIS",sender,undefined, 
											  "select nis,nama from sis_siswa where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",
											  "select count(nis) from sis_siswa where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",
											  ["nis","nama"],"and",["Kode","Nama"],false);				
			}
		
		}catch(e){
			systemAPI.alert(e);
		}
	},

	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan");							
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

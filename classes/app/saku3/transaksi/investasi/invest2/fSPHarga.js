window.app_saku3_transaksi_investasi_invest2_fSPHarga = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_investasi_invest2_fSPHarga.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_investasi_invest2_fSPHarga";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Load Harga Saham Penyertaan Harian", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2});
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Harga SP","Error Msg"]});
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:32,
					colTitle:["Kode SP","n1","n2","n3","n4","n5","n6","n7","n8","n9","n10",
										   "n11","n12","n13","n14","n15","n16","n17","n18","n19","n20",
										   "n21","n22","n23","n24","n25","n26","n27","n28","n29","n30","n31"],
					colWidth:[[31,30,29,28,27,26,25,24,23,22,21, 20,19,18,17,16,15,14,13,12,11 ,10,9,8,7,6,5,4,3,2,1 ,0],
							  [80,80,80,80,80,80,80,80,80,80,80, 80,80,80,80,80,80,80,80,80,80 ,80,80,80,80,80,80,80,80,80,80,  80]],
					colFormat:[[1,2,3,4,5,6,7,8,9,10, 11,12,13,14,15,16,17,18,19,20, 21,22,23,24,25,26,27,28,29,30,31 ],
					          [cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai, 
							   cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,
							   cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"], 
					readOnly:true, defaultRow:1
					});							
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager1"]});		
		
		this.sg2 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-10],colCount:2,tag:9,
				colTitle:["ID INVALID","Pesan"],
				colWidth:[[1,0],[500,200]],autoAppend:false,
				readOnly:true, defaultRow:1
		});

		this.bRefresh = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn1.uploader.setParam3("object");
		this.sg1.setAllowBlank(true);

		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);			
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			var strSQL = "select convert(varchar,getdate(),112) as tgl";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){																			
					this.e_periode.setText(line.tgl.toUpperCase().substr(0,6));					
				}
			}
					
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_investasi_invest2_fSPHarga.extend(window.childForm);
window.app_saku3_transaksi_investasi_invest2_fSPHarga.implement({	
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();						

			this.doCekDataSP();				
		} catch(e) {alert(e);}
	},
	doPager1: function(sender,page){
		this.sg1.doSelectPage(page);
	},	
	doCekDataSP: function() {
		this.sg2.clear(); 	

		var strSQL = "select kode_mitra from inv_mitra";			
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataSP = data;
		}				
		
		for (var i=0; i < this.sg1.getRowCount();i++){
			var inValid = true;
			for (var j=0;j < this.dataSP.rs.rows.length;j++){
				if (this.sg1.cells(0,i) == this.dataSP.rs.rows[j].kode_mitra) {
					inValid = false;
				}
			}	
			if (inValid) {
				var k = i+1;
				this.sg2.appendData([this.sg1.cells(0,i) + " [Baris - " + k +"]","Kode SP tidak terdaftar di Sistem."]);						
			}
		}

		for (var i=0; i < this.dataSP.rs.rows.length;i++){
			var inValid = true;
			for (var j=0;j < this.sg1.getRowCount();j++){
				if (this.dataSP.rs.rows[i].kode_mitra == this.sg1.cells(0,j)) {
					inValid = false;
				}
			}	
			if (inValid) {				
				this.sg2.appendData([this.dataSP.rs.rows[i].kode_mitra,"Kode SP tidak ditemukan harganya."]);						
			}
		}		

		if (this.sg2.getRowCount() != 0) {
			system.alert(this,"Terdapat Data Tidak Valid","");
			this.pc1.setActivePage(this.pc1.childPage[1]);
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
					sql.add("delete from inv_sp_harga where periode='"+this.e_periode.getText()+"'");

					var strSQL = "select substring(convert(varchar,  dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.e_periode.getText().substr(0,4)+"-"+this.e_periode.getText().substr(4,2)+"-01')+1,0)) ,112),7,2) as tglakhir" ;
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){						
							var jmlHari = parseInt(line.tglakhir) +1;
						}
					}
		
					for (var i=0;i < this.sg1.getRowCount();i++){															
						for (var j=1;j < jmlHari;j++){	
							var	k = "-"+(j<10?"0":"")+j;							
							var tgl = this.e_periode.getText().substr(0,4)+"-"+this.e_periode.getText().substr(4,2)+k;
							var harga = nilaiToFloat(this.sg1.cells(j,i));

							sql.add("insert into inv_sp_harga (periode,tanggal,kode_mitra,h_wajar) values "+
									"('"+this.e_periode.getText()+"','"+tgl+"','"+this.sg1.cells(0,i)+"',"+harga+") ");									
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
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);
					this.sg1.clear(1); this.sg2.clear(1); 					
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.simpan();
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
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Periode : "+ this.e_periode.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}	
});
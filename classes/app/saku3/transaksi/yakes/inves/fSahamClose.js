window.app_saku3_transaksi_yakes_inves_fSahamClose = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes_inves_fSahamClose.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes_inves_fSahamClose";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Closing Harga Saham Harian", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;pageControl");
		this.e_periode = new saiCB(this,{bound:[20,11,200,20],caption:"Periode",tag:2,mustCheck:false});				

		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Harga Saham","Error Msg"]});
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-33],colCount:32,
					colTitle:["Kd Saham","TGL-1","TGL-2","TGL-3","TGL-4","TGL-5","TGL-6","TGL-7","TGL-8","TGL-9","TGL-10",
										 "TGL-11","TGL-12","TGL-13","TGL-14","TGL-15","TGL-16","TGL-17","TGL-18","TGL-19","TGL-20",
										 "TGL-21","TGL-22","TGL-23","TGL-24","TGL-25","TGL-26","TGL-27","TGL-28","TGL-29","TGL-30","TGL-31"],
					colWidth:[[31,30,29,28,27,26,25,24,23,22,21, 20,19,18,17,16,15,14,13,12,11 ,10,9,8,7,6,5,4,3,2,1 ,0],
							  [80,80,80,80,80,80,80,80,80,80,80, 80,80,80,80,80,80,80,80,80,80 ,80,80,80,80,80,80,80,80,80,80,  60]],
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
				colWidth:[[1,0],[300,100]],autoAppend:false,
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

			this.e_periode.items.clear();
			var data = this.dbLib.getDataProvider("select periode from periode where kode_lokasi='"+this.app._lokasi+"' order by periode desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													
					this.e_periode.addItem(i,line.periode);
				}
			}

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
window.app_saku3_transaksi_yakes_inves_fSahamClose.extend(window.childForm);
window.app_saku3_transaksi_yakes_inves_fSahamClose.implement({	
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();						

			this.doCekDataSaham();				
		} catch(e) {alert(e);}
	},
	doPager1: function(sender,page){
		this.sg1.doSelectPage(page);
	},	
	doCekDataSaham: function() {
		this.sg2.clear(); 	

		var strSQL = "select kode_saham from inv_saham";			
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataSaham = data;
		}				
		
		for (var i=0; i < this.sg1.getRowCount();i++){
			var inValid = true;
			for (var j=0;j < this.dataSaham.rs.rows.length;j++){
				if (this.sg1.cells(0,i) == this.dataSaham.rs.rows[j].kode_saham) {
					inValid = false;
				}
			}	
			if (inValid) {
				var k = i+1;
				this.sg2.appendData([this.sg1.cells(0,i) + " [Baris - " + k +"]","Kode Saham tidak terdaftar di Sistem."]);						
			}
		}

		for (var i=0; i < this.dataSaham.rs.rows.length;i++){
			var inValid = true;
			for (var j=0;j < this.sg1.getRowCount();j++){
				if (this.dataSaham.rs.rows[i].kode_saham == this.sg1.cells(0,j)) {
					inValid = false;
				}
			}	
			if (inValid) {				
				this.sg2.appendData([this.dataSaham.rs.rows[i].kode_saham,"Kode Saham tidak ditemukan harganya."]);						
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
					sql.add("delete from inv_shm_harga where periode='"+this.e_periode.getText()+"'");

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

							sql.add("insert into inv_shm_harga (periode,tanggal,kode_saham,h_wajar) values "+
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

							var strSql = "call sp_gen_saham_kkp ('"+this.e_periode.getText().substr(0,4)+"-"+this.e_periode.getText().substr(4,2)+"-01"+"')";					
							this.dbLib.execQuerySync(strSql);	

						}
						else system.info(this,result,"");
	    			break;	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}	
});
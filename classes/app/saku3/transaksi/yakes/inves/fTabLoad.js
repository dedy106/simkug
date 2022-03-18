window.app_saku3_transaksi_yakes_inves_fTabLoad = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes_inves_fTabLoad.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes_inves_fTabLoad";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Upload Tabungan", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		

		this.c_periode = new saiCB(this,{bound:[20,12,200,20],caption:"Periode",tag:2,change:[this,"doChange"]});		
		this.cb_tab = new portalui_saiCBBL(this,{bound:[20,13,220,20],caption:"ID Tabungan",tag:1,multiSelection:false,change:[this,"doChange"]}); 				
		this.e_nama = new saiLabelEdit(this,{bound:[20,25,450,20],caption:"Nama Rekening", readOnly:true});
		this.e_norek = new saiLabelEdit(this,{bound:[20,21,450,20],caption:"No Rekening", readOnly:true});
		this.e_bank = new saiLabelEdit(this,{bound:[20,23,450,20],caption:"Bank", readOnly:true});

		this.pc1 = new pageControl(this,{bound:[10,18,1000,350], childPage:["Data Tabungan"]});				
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:4,tag:9,
				colTitle:["Tanggal","Deskripsi","Debet","Kredit"],
				colWidth:[[3,2,1,0],[100,100,350,80]],				
				pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"],
				readOnly:true, defaultRow:1
		});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1});		
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

			this.c_periode.items.clear();
			var str = "select periode from periode where kode_lokasi ='"+this.app._lokasi+"' order by periode desc";
			var data = this.dbLib.getDataProvider(str,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													
					this.c_periode.addItem(i,line.periode);
				}
			} 

			this.cb_tab.setSQL("select kode_tab, nama_rek from inv_tabung",["kode_tab","nama_rek"],false,["Kode","Nama Rek"],"and","Daftar Tabungan",true);			

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes_inves_fTabLoad.extend(window.childForm);
window.app_saku3_transaksi_yakes_inves_fTabLoad.implement({
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
					
					sql.add("delete from inv_tabung_rek where kode_tab='"+this.cb_tab.getText()+"' and periode='"+this.c_periode.getText()+"'");							 

					var ix=0;
					for (var i=0;i < this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i)) {		
							var tglTrans = this.sg1.cells(0,i).substr(6,4)+"-"+this.sg1.cells(0,i).substr(3,2)+"-"+this.sg1.cells(0,i).substr(0,2);
							var periode = this.sg1.cells(0,i).substr(6,4)+this.sg1.cells(0,i).substr(3,2);

							if (nilaiToFloat(this.sg1.cells(2,i)) != 0) {
								var dc = "D";
								var nilai = nilaiToFloat(this.sg1.cells(2,i)); 
							}
							else {
								var dc = "C";
								var nilai = nilaiToFloat(this.sg1.cells(3,i)); 
							}
							 sql.add("insert into inv_tabung_rek(kode_tab,tanggal,keterangan,dc,nilai,jenis,periode) values "+							 
							 		 "('"+this.cb_tab.getText()+"','"+tglTrans+"','"+this.sg1.cells(1,i)+"','"+dc+"',"+nilai+",'MUTASI','"+periode+"')");															
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
					this.pc1.setActivePage(this.pc1.childPage[0]);						
					setTipeButton(tbSimpan);
				break;
			case "simpan" :									
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},	
	doChange:function(sender){	
		try {
			if (sender == this.cb_tab && this.cb_tab.getText()!="") {
				var strSQL = "select nama_rek,no_rek,bank from inv_tabung where kode_tab ='"+this.cb_tab.getText()+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama_rek);						
						this.e_norek.setText(line.no_rek);						
						this.e_bank.setText(line.bank);												
					}					
				}
			}	
		}
		catch{
			alert(e);
		}				
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.cb_tab.getText()+")","");
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
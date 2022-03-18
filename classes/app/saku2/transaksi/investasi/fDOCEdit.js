window.app_saku2_transaksi_investasi_fDOCEdit = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_investasi_fDOCEdit.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_investasi_fDOCEdit";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Edit Data DOC/Deposito", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.cb_bank = new saiCBBL(this,{bound:[20,18,222,20],caption:"Bank Deposito", multiSelection:false, maxLength:10, tag:1,change:[this,"doLoad"]});				
		
		this.p1 = new panel(this,{bound:[10,23,900,380],caption:"Daftar Deposito"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:8,tag:9,				
				colTitle:["No Deposito","Keterangan","Tgl Mulai","JthTempo","No Bilyet","Bank Depo","Nama Bank","Nominal"],
				colWidth:[[7,6,5,4,3,2,1,0],[100,250,60,100,80,80,250,100]],
				columnReadOnly:[true,[0,1,2,3,6,7],[4,5]],
				colFormat:[[7],[cfNilai]],buttonStyle:[[5],[bsEllips]],
				ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg});				
		
		this.rearrangeChild(10, 23);

		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
						
			this.cb_bank.setSQL("select kode_bank, nama+' - '+no_rek as nama from inv_bank",["kode_bank","nama"],false,["Kode","Nama"],"where","Daftar Bank",true);
			var sql = new server_util_arrayList();
			sql.add("select kode_bank, nama+' - '+no_rek as nama from inv_bank");			
			this.dbLib.getMultiDataProviderA(sql);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_investasi_fDOCEdit.extend(window.childForm);
window.app_saku2_transaksi_investasi_fDOCEdit.implement({
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
					if (this.sg.getRowValidCount() > 0){						
						for (var i=0;i < this.sg.getRowCount();i++){														   
							sql.add("update inv_depo_m set no_dokumen='"+this.sg.cells(4,i)+"',bsumber='"+this.sg.cells(5,i)+"' where no_depo='"+this.sg.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'");							
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);					
					this.sg.clear(1); 
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},		
	doLoad:function(sender){
		if (this.cb_bank.getText()!="") {
			var strSQL = "select a.no_depo,convert(varchar,a.tgl_mulai,103) as mulai,convert(varchar,a.tgl_selesai,103) as selesai,a.keterangan,a.bsumber,b.nama as nama_sumber,a.nilai,a.no_dokumen "+
			             "from inv_depo_m a inner join inv_bank b on a.bsumber=b.kode_bank where a.progress not in ('X','Z') and a.kode_lokasi = '"+this.app._lokasi+"' and a.bsumber='"+this.cb_bank.getText()+"' order by a.tgl_mulai";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.no_depo,line.keterangan,line.mulai,line.selesai,line.no_dokumen,line.bsumber,line.nama_sumber,floatToNilai(line.nilai)]);
				}
			} else this.sg.clear(1);			
		}
		else {
			system.alert(this,"Data tidak valid.","Bank harus diisi.");
		}
	},				
	doChangeCell: function(sender, col, row){		
		sender.onChange.set(undefined,undefined);
	    if (col == 5) {
			if (this.sg.cells(5,row) != "") {
				var bank = this.dataBank.get(sender.cells(5,row));
				if (bank) sender.cells(6,row,bank);
				else {                                    
					if (trim(sender.cells(5,row)) != "") system.alert(this,"Kode Bank "+sender.cells(5,row)+" tidak ditemukan","Inputkan kode lainnya.","checkBank");                
					sender.cells(5,row,"");
					sender.cells(6,row,"");
				}				
			}
		}			
		sender.onChange.set(this,"doChangeCell");		
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 5){
					this.standarLib.showListData(this, "Daftar Bank",sender,undefined, 
						    "select kode_bank, nama+' - '+no_rek as nama from inv_bank",
							"select count(kode_bank) from inv_bank",
							["kode_bank","nama"],"where",["Kode","Nama"],false);				
				}							
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
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataBank = new portalui_arrayMap();														
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataBank.set(line.kode_bank, line.nama);
								}
							}													
						}else throw result;
					break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});
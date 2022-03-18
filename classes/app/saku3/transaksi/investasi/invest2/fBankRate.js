window.app_saku3_transaksi_investasi_invest2_fBankRate = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_investasi_invest2_fBankRate.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_investasi_invest2_fBankRate";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Shopping Rate", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");		
		this.cb_bank = new saiCBBL(this,{bound:[20,15,200,20],caption:"Bank", multiSelection:false, maxLength:10, tag:1,change:[this,"doLoad"]});		
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});		
			
		this.p1 = new panel(this,{bound:[20,23,800,400],caption:"Daftar Rate"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:6,tag:9,
				colTitle:["Jenis","Satuan","JW 1","JW 2","Persen 1","Keterangan"],
				colWidth:[[5,4,3,2,1,0],[200,80,80,80,80,80]],								
				columnReadOnly:[true,[1],[0,2,3,4,5]],
				buttonStyle:[[0],[bsAuto]], 
				picklist:[[0],[new portalui_arrayMap({items:["DOC","DEPOSITO"]})]],checkItem: true,				
				colFormat:[[2,3,4],[cfNilai,cfNilai,cfNilai]],
				change:[this,"doChangeCell"],
				pasteEnable:true,autoPaging:true,rowPerPage:200,afterPaste:[this,"doAfterPaste"],
				defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:2,grid:this.sg});				
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		this.dataAkun = this.app._masakun;
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_bank.setSQL("select kode_bank, nama from inv_bank where kode_kelola ='YKT' and flag_bdepo='1' ",["kode_bank","nama"],false,["Kode","Nama"],"where","Data Bank",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_investasi_invest2_fBankRate.extend(window.childForm);
window.app_saku3_transaksi_investasi_invest2_fBankRate.implement({
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
					
					sql.add("delete from inv_bank_rate where kode_bank = '"+this.cb_bank.getText()+"' and tanggal = '"+this.dp_d1.getDateString()+"'");
					
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)) {
							sql.add("insert into inv_bank_rate (kode_bank,nu,tanggal,jk1,jk2,persen1,persen2,jenis,sat,keterangan) values "+
									"('"+this.cb_bank.getText()+"',"+i+",'"+this.dp_d1.getDateString()+"',"+nilaiToFloat(this.sg.cells(2,i))+","+nilaiToFloat(this.sg.cells(3,i))+","+nilaiToFloat(this.sg.cells(4,i))+","+nilaiToFloat(this.sg.cells(4,i))+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(5,i)+"')");
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
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
	doSelectDate: function(sender, y,m,d){
		this.doLoad();
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) 
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_bank);
					this.sg.clear(1); 
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doChange: function(sender){
		try{
			
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doChangeCell: function(sender, col, row){
		if (col == 0) {
			if (sender.cells(0,row) == "DOC") sender.cells(1,row,"HARI");
			else sender.cells(1,row,"BULAN");
		}
	},
	doLoad : function(){
		try {
			if (this.cb_bank.getText() != "") {
				var strSQL = "select jenis,sat,nu,jk1,jk2,persen1,keterangan from inv_bank_rate where kode_bank='"+this.cb_bank.getText()+"' and tanggal = '"+this.dp_d1.getDateString()+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.jenis,line.sat,floatToNilai(line.jk1),floatToNilai(line.jk2),floatToNilai(line.persen1),line.keterangan]);
					}
				} else this.sg.clear(1);									
			}
		}
		catch(e) {
			alert(e);
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_bank.getText()+")");							
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



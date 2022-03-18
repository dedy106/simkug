window.app_saku3_transaksi_travel_prod_fAgenda = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_travel_prod_fAgenda.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_travel_prod_fAgenda";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Agenda Kegiatan", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_paket = new saiCBBL(this,{bound:[20,15,220,20],caption:"Paket", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});
		this.cb_jadwal = new saiCBBL(this,{bound:[20,11,220,20],caption:"Jadwal", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});		
				
		this.p1 = new panel(this,{bound:[20,23,1000,410],caption:"Daftar Kegiatan"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:5,tag:9,				
				colTitle:["Tanggal","Jam","Lokasi","Kegiatan","PIC"],
				colWidth:[[4,3,2,1,0],[150,400,200,100,100]],	
				buttonStyle:[[0],[bsDate]],
				pasteEnable:true,											
				defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:2,grid:this.sg});				
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_paket.setSQL("select no_paket, nama from dgw_paket where kode_lokasi='"+this.app._lokasi+"' ",["no_paket","nama"],false,["Kode","Nama"],"and","Data Paket",true);
		
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_travel_prod_fAgenda.extend(window.childForm);
window.app_saku3_transaksi_travel_prod_fAgenda.implement({
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
					sql.add("delete from dgw_reg_agenda where no_paket='"+this.cb_paket.getText()+"' and no_jadwal='"+this.cb_jadwal.rightLabelCaption+"' and kode_lokasi='"+this.app._lokasi+"'");																										
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)) {
							sql.add("insert into dgw_reg_agenda (no_paket,no_jadwal,kode_lokasi,nu,tanggal,jam,lokasi,keterangan,pic,flag_status) values "+
									"('"+this.cb_paket.getText()+"','"+this.cb_jadwal.rightLabelCaption+"','"+this.app._lokasi+"',"+i+",'"+this.sg.getCellDateValue(0,i)+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(4,i)+"','-')");
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) 
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_paket);
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
			if (sender == this.cb_paket && this.cb_paket.getText() != "") {
				this.cb_jadwal.setSQL("select convert(varchar,tgl_berangkat,103) as tgl_berangkat,no_jadwal from dgw_jadwal where no_closing='-' and no_paket='"+this.cb_paket.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["tgl_berangkat","no_jadwal"],false,["Jadwal","ID Jadwal"],"and","Data Jadwal",true);
			}
			if ((sender == this.cb_paket || sender == this.cb_jadwal) && this.cb_paket.getText() != "" && this.cb_jadwal.getText() != ""){						
				var strSQL = "select convert(varchar,tanggal,103) as tgl,jam,lokasi,keterangan,pic from dgw_reg_agenda where no_paket='"+this.cb_paket.getText()+"' and no_jadwal='"+this.cb_jadwal.rightLabelCaption+"' and kode_lokasi='"+this.app._lokasi+"' order by nu";			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.tgl,line.jam,line.lokasi,line.keterangan,line.pic]);
					}
				} else this.sg.clear(1);									
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_paket.getText()+")");							
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
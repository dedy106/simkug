window.app_saku3_transaksi_dago_fPembimbingRelasi = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_dago_fPembimbingRelasi.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_dago_fPembimbingRelasi";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Mapping Pembimbing dan Hotel", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_paket = new saiCBBL(this,{bound:[20,15,220,20],caption:"Paket", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});
		this.cb_jadwal = new saiCBBL(this,{bound:[20,11,220,20],caption:"Jadwal", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});		
		this.cb_pbb = new saiCBBL(this,{bound:[20,12,220,20],caption:"Pembimbing", multiSelection:false, maxLength:10, tag:1});		
		
		this.pc1 = new pageControl(this,{bound:[5,13,990,350], childPage:["Data Hotel"]});		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:9,				
				colTitle:["Kode","Nama","Grade","Alamat","Kota"],
				colWidth:[[4,3,2,1,0],[100,300,150,230,80]],
				columnReadOnly:[true,[1,2,3,4],[0]],				
				buttonStyle:[[0],[bsEllips]], 
				ellipsClick:[this,"doEllipsClick1"],change:[this,"doChangeCell1"],
				defaultRow:1,autoAppend:true});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});	
		
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
			this.cb_pbb.setSQL("select id_pbb, nama from dgw_pbb where kode_lokasi='"+this.app._lokasi+"' ",["id_pbb","nama"],false,["Kode","Nama"],"and","Data Pembimbing",true);
		
			var sql = new server_util_arrayList();
			sql.add("select id_hotel,nama from dgw_hotel where kode_lokasi = '"+this.app._lokasi+"'");
			this.dbLib.getMultiDataProviderA(sql);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_dago_fPembimbingRelasi.extend(window.childForm);
window.app_saku3_transaksi_dago_fPembimbingRelasi.implement({	
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
					sql.add("delete from dgw_jadwal_hotel where no_paket='"+this.cb_paket.getText()+"' and no_jadwal='"+this.cb_jadwal.rightLabelCaption+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update dgw_jadwal set id_pbb='"+this.cb_pbb.getText()+"' where no_paket='"+this.cb_paket.getText()+"' and no_jadwal='"+this.cb_jadwal.rightLabelCaption+"' and kode_lokasi='"+this.app._lokasi+"'");																			
					
					for (var i=0;i < this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i)) {
							sql.add("insert into dgw_jadwal_hotel (no_paket,no_jadwal,kode_lokasi,id_hotel) values "+
									"('"+this.cb_paket.getText()+"','"+this.cb_jadwal.rightLabelCaption+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"')");
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_paket);
					this.sg1.clear(1); 
					setTipeButton(tbSimpan);
				break;
			case "simpan" :
			case "ubah" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;						
		}
	},
	doChange: function(sender){
		try{
			if (sender == this.cb_paket && this.cb_paket.getText() != "") {
				this.cb_jadwal.setSQL("select convert(varchar,tgl_berangkat,103) as tgl_berangkat,no_jadwal from dgw_jadwal where no_closing='-' and no_paket='"+this.cb_paket.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["tgl_berangkat","no_jadwal"],false,["Jadwal","ID Jadwal"],"and","Data Jadwal",true);
			}			
			if ((sender == this.cb_paket || sender == this.cb_jadwal) && this.cb_paket.getText() != "" && this.cb_jadwal.getText() != ""){						
				var strSQL = "select * from dgw_jadwal where no_paket = '"+this.cb_paket.getText()+"' and no_jadwal='"+this.cb_jadwal.rightLabelCaption+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.cb_pbb.setText(line.id_pbb);																						
					}
				}
				var strSQL = "select b.id_hotel,b.nama,b.alamat,b.grade,b.kota from dgw_jadwal_hotel a inner join dgw_hotel b on a.id_hotel=b.id_hotel and a.kode_lokasi=b.kode_lokasi where a.no_paket='"+this.cb_paket.getText()+"' and a.no_jadwal='"+this.cb_jadwal.rightLabelCaption+"' and a.kode_lokasi='"+this.app._lokasi+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													
						this.sg1.appendData([line.id_hotel,line.nama,line.grade,line.alamat,line.kota]);
					}
				} else this.sg1.clear(1);	
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doChangeCell1: function(sender, col, row){		
		sender.onChange.set(undefined,undefined);	   		
		if (col == 0) {
			if (sender.cells(0,row) != "") {
				var hotel = this.dataHotel.get(sender.cells(0,row));
				if (hotel) {
					sender.cells(1,row,hotel);					
					var strSQL = "select * from dgw_hotel where id_hotel = '"+sender.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'";						
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){							
							sender.cells(2,row,line.grade);
							sender.cells(3,row,line.alamat);
							sender.cells(4,row,line.kota);																							
						}
					}							
				}
				else {
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Hotel "+sender.cells(5,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
					sender.cells(2,row,"");
					sender.cells(3,row,"");
					sender.cells(4,row,"");
				}				
			}
		}		
		sender.onChange.set(this,"doChangeCell1");		
	},
	doEllipsClick1: function(sender, col, row){
		try{			
			if (sender == this.sg1) {				
				if (col == 0){					
					this.standarLib.showListData(this, "Daftar Hotel",sender,undefined, 
							"select id_hotel, nama  from dgw_hotel where kode_lokasi = '"+this.app._lokasi+"'",
							"select count(*) from dgw_hotel where kode_lokasi = '"+this.app._lokasi+"'",
							["id_hotel","nama"],"and",["Kode","Nama"],false);				
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_paket.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;	    
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataHotel = new portalui_arrayMap();																											
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataHotel.set(line.id_hotel, line.nama);										
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
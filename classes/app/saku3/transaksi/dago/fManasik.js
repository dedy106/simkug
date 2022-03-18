window.app_saku3_transaksi_dago_fManasik = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_dago_fManasik.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_dago_fManasik";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Manasik", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Jadwal Manasik","Data Manasik"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:2,tag:9,
		            colTitle:["Paket","Jadwal"],
					colWidth:[[1,0],[250,80]],						
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_paket = new saiCBBL(this.pc1.childPage[1],{bound:[20,12,250,20],caption:"No Paket", multiSelection:false, maxLength:20, tag:1,change:[this,"doChange"]});		
		this.cb_jadwal = new saiCBBL(this.pc1.childPage[1],{bound:[20,13,250,20],caption:"No Jadwal", multiSelection:false, maxLength:20, tag:1,change:[this,"doChange"]});

		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[20,30,450,250], childPage:["Data Jadwal Manasik"]});			

		this.sg4 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:2,tag:9,
		            colTitle:["Tanggal","Pembimbing"],
					colWidth:[[1,0],[80,150]],
					buttonStyle:[[0],[bsDate]],					
					change:[this,"doChangeCell4"],nilaiChange:[this,"doNilaiChange4"],
					autoAppend:true,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg4});
					
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		
		setTipeButton(tbSimpan);

		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.cb_paket.setSQL("select no_paket, nama from dgw_paket where kode_lokasi='"+this.app._lokasi+"' ",["no_paket","nama"],false,["No Paket","Nama"],"and","Data Paket",true);
			this.doLoad();	

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_dago_fManasik.extend(window.childForm);
window.app_saku3_transaksi_dago_fManasik.implement({
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
					
					if (this.sg4.getRowValidCount() > 0){
						for (var i=0;i < this.sg4.getRowCount();i++){
							if (this.sg4.rowValid(i)){
								sql.add("insert into dgw_manasik(no_urut,no_jadwal,no_paket,tgl,pembimbing,kode_lokasi) values "+
										"("+i+",'"+this.cb_jadwal.getText()+"','"+this.cb_paket.getText()+"','"+this.sg4.getCellDateValue(0,i)+"','"+this.sg4.cells(1,i)+"','"+this.app._lokasi+"')");
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					
					sql.add("delete from dgw_manasik where no_paket='"+this.cb_paket.getText()+"' and no_jadwal='"+this.cb_jadwal.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					if (this.sg4.getRowValidCount() > 0){
						for (var i=0;i < this.sg4.getRowCount();i++){
							if (this.sg4.rowValid(i)){
								sql.add("insert into dgw_manasik(no_urut,no_jadwal,no_paket,tgl,pembimbing,kode_lokasi) values "+
										"("+i+",'"+this.cb_jadwal.getText()+"','"+this.cb_paket.getText()+"','"+this.sg4.getCellDateValue(0,i)+"','"+this.sg4.cells(1,i)+"','"+this.app._lokasi+"')");
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from dgw_manasik where no_paket='"+this.cb_paket.getText()+"' and no_jadwal='"+this.cb_jadwal.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
				setTipeButton(tbAllFalse);
				this.doLoad();
				//mengatur tampilan pageindex
				this.pc1.setActivePage(this.pc1.childPage[1]);
				
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
				this.cb_jadwal.setSQL("select no_jadwal, tgl_berangkat, no_paket from dgw_jadwal where no_paket='"+this.cb_paket.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",["no_jadwal","tgl_berangkat","no_paket"],false,["No Jadwal","Tanggal","No Paket"],"and","Data Jadwal",true);
			}
			if ((sender == this.cb_paket || sender == this.cb_jadwal) && this.cb_paket.getText()!="" && this.cb_jadwal.getText()!="") {
				
				var data = this.dbLib.getDataProvider("select pembimbing from dgw_manasik where no_paket='"+this.cb_paket.getText()+"' and no_jadwal='"+this.cb_jadwal.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						//var temu = 1;
						var strSQL = "select convert(varchar,tgl,103) as tgl,pembimbing from dgw_manasik where  no_paket='"+this.cb_paket.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";		
						var data2 = this.dbLib.getDataProvider(strSQL,true);
					
						if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
							var line2;
							this.sg4.clear();
							for (var i in data2.rs.rows){
								line2 = data2.rs.rows[i];							
								this.sg4.appendData([line2.tgl,line2.pembimbing]);
							}
						} else this.sg4.clear(1);
						
						setTipeButton(tbUbahHapus);
					}
					else{
						//var temu = 0;
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}
				}
				/*
				if (temu == 1) {
					var strSQL = "select convert(varchar,tgl,103) as tgl,pembimbing from dgw_manasik where  no_paket='"+this.cb_paket.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";		
					var data2 = this.dbLib.getDataProvider(strSQL,true);
				
					if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
						var line2;
						this.sg4.clear();
						for (var i in data2.rs.rows){
							line2 = data2.rs.rows[i];							
							this.sg4.appendData([line2.tgl,line2.pembimbing]);
						}
					} else this.sg4.clear(1);	
				}
				else this.sg4.clear(1);
				*/
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},			
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_paket.setText(this.sg1.cells(0,row));	
				this.cb_jadwal.setText(this.sg1.cells(1,row));
													
			}
		} catch(e) {alert(e);}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doLoad:function(sender){						
			var strSQL = "select distinct no_paket, no_jadwal from dgw_manasik";			
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},		
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];	
			this.sg1.appendData([line.no_paket,line.no_jadwal]); 							
			}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});

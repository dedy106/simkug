window.app_saku3_transaksi_travel_prod_fUbahJadwal = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_travel_prod_fUbahJadwal.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_travel_prod_fUbahJadwal";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Ubah Jadwal", 0);	
		this.maximize();
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
				
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Paket","Data Paket"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:4,tag:9,
		            colTitle:["Kode Paket","Nama Paket","Curr","Jenis"],
					colWidth:[[3,2,1,0],[150,70,300,80]],						
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"No Paket", readOnly:true, maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"Nama Paket", maxLength:50,tag:1, readOnly:true});
		
		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[1,30,996,371], childPage:["Data Jadwal"]});							
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:3,tag:2,
		            colTitle:["ID","Jadwal Lama ","Jadwal Baru"],
					colWidth:[[2,1,0],[150,150,80]],					
					columnReadOnly:[true,[0,1]],	
					buttonStyle:[[2],[bsDate]],
					autoAppend:false,defaultRow:1});
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3});

		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		setTipeButton(tbUbah);
				
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.doLoad();
			this.cb_produk.setSQL("select kode_produk, nama from dgw_jenis_produk where kode_lokasi='"+this.app._lokasi+"'",["kode_produk","nama"],false,["Kode","Nama"],"and","Data Jenis Produk",true);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_travel_prod_fUbahJadwal.extend(window.childForm);
window.app_saku3_transaksi_travel_prod_fUbahJadwal.implement({
	doCellEnter3: function(sender, col, row){
		switch(col){		
			case 5 : 
					if (this.sg3.cells(5,row) == "") {						
						this.sg3.setCell(5,row,"ID");
					}
				break;
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();	
					
					if (this.sg3.getRowValidCount() > 0){
						for (var i=0;i < this.sg3.getRowCount();i++){
							if (this.sg3.rowValid(i)){								
								sql.add("update dgw_jadwal set tgl_berangkat='"+this.sg3.getCellDateValue(2,i)+"' where no_paket='"+this.cb_kode.getText()+"' and no_jadwal='"+this.sg3.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'");							
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.cb_kode);
					setTipeButton(tbAllFalse);
					this.doLoad();
					this.sg3.clear(1);					
				}
				break;			
			case "ubah" :	
				this.ubah();
				break;							
		}
	},	
	doChange: function(sender){
		try{			
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select * from dgw_paket where no_paket ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.e_nama.setText(line.nama);						
					}					
				}
				
				var strSQL = "select no_jadwal,convert (varchar, tgl_berangkat,103) as tgl_berangkat "+
							 "from dgw_jadwal where no_closing = '-' and no_paket='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";					
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg3.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg3.appendData([line.no_jadwal,line.tgl_berangkat,line.tgl_berangkat]);
					}
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
		try {
			var strSQL = "select a.no_paket, a.nama, a.kode_curr, b.nama as jenis from dgw_paket a inner join dgw_jenis_produk b on a.kode_produk = b.kode_produk where a.kode_lokasi='"+this.app._lokasi+"'" ;			
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.pc2.setActivePage(this.pc2.childPage[0]);			
		} 
		catch(e) {
			alert(e);
		}
	},			
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];	
			this.sg1.appendData([line.no_paket,line.nama,line.kode_curr,line.jenis]); 							
			}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));
			}			
		} catch(e) {alert(e);}
	}
});
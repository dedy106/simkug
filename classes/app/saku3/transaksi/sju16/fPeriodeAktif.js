window.app_saku3_transaksi_sju16_fPeriodeAktif = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sju16_fPeriodeAktif.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sju16_fPeriodeAktif";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Setting Periode Aktif", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.p1 = new panel(this,{bound:[20,23,1000,300],caption:"Periode Sistem"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:6,tag:0,				
				colTitle:["Kode Modul","Deskripsi","Periode Awal1","Periode Akhir1","Periode Awal2","Periode Akhir2"],
				colWidth:[[5,4,3,2,1,0],[100,100,100,100,250,100]],
				columnReadOnly:[true,[1,0],[2,3,4,5]],								
				defaultRow:1,autoAppend:false});
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
			
			var data = this.dbLib.getDataProvider("select * from periode_aktif where kode_lokasi='"+this.app._lokasi+"' order by modul",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													
					this.sg.appendData([line.modul.toUpperCase(),line.keterangan,line.per_awal1,line.per_akhir1,line.per_awal2,line.per_akhir2]);
				}
			} else this.sg.clear(1);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sju16_fPeriodeAktif.extend(window.childForm);
window.app_saku3_transaksi_sju16_fPeriodeAktif.implement({
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
					sql.add("delete from periode_aktif where kode_lokasi='"+this.app._lokasi+"'");
					for (var i=0;i < this.sg.getRowCount();i++){						
						sql.add("insert into periode_aktif(kode_lokasi,modul,keterangan,per_awal1,per_akhir1,per_awal2,per_akhir2, nik_user,tgl_input) values "+
								"('"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','"+this.app._userLog+"',getdate())");
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);					
					setTipeButton(tbSimpan);					
					var data = this.dbLib.getDataProvider("select * from periode_aktif where kode_lokasi='"+this.app._lokasi+"' order by modul",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];													
							this.sg.appendData([line.modul.toUpperCase(),line.keterangan,line.per_awal1,line.per_akhir1,line.per_awal2,line.per_akhir2]);
						}
					} else this.sg.clear(1);					
				break;
			case "simpan" :	
				for (var i=0;i < this.sg.getRowCount();i++){												
					if (nilaiToFloat(this.sg.cells(2,i)) > nilaiToFloat(this.sg.cells(3,i))) {
						var j = i+1;
						system.alert(this,"Periode tidak valid.","Periode Awal1 harus lebih kecil dari Periode Akhir1.[Baris "+j+"]");
						return false;
					} 
					if (nilaiToFloat(this.sg.cells(4,i)) > nilaiToFloat(this.sg.cells(5,i))) {
						var j = i+1;
						system.alert(this,"Periode tidak valid.","Periode Awal2 harus lebih kecil dari Periode Akhir2.[Baris "+j+"]");
						return false;
					} 	
				}	

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
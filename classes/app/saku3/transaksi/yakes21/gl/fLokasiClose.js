window.app_saku3_transaksi_yakes21_gl_fLokasiClose = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_gl_fLokasiClose.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_gl_fLokasiClose";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data  Periode Aktif Lokasi", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.p1 = new panel(this,{bound:[20,23,1000,300],caption:"Periode Sistem"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:3,tag:0,				
				colTitle:["Kode Lokasi","Nama","Periode Aktif"],
				colWidth:[[2,1,0],[100,250,100]],
				columnReadOnly:[true,[2,1,0],[]],								
				defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg});				
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			
			var data = this.dbLib.getDataProvider("select a.kode_lokasi,a.nama,b.periode from lokasi a inner join ( "+
												  "        select kode_lokasi,max(periode) as periode "+
												  "        from periode group by kode_lokasi "+
												  " ) b on a.kode_lokasi=b.kode_lokasi",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													
					this.sg.appendData([line.kode_lokasi,line.nama,line.periode]);
				}
			} else this.sg.clear(1);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_gl_fLokasiClose.extend(window.childForm);
window.app_saku3_transaksi_yakes21_gl_fLokasiClose.implement({
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
					var data = this.dbLib.getDataProvider("select a.kode_lokasi,a.nama,b.periode from lokasi a inner join ( "+
														"        select kode_lokasi,max(periode) as periode "+
														"        from periode group by kode_lokasi "+
														" ) b on a.kode_lokasi=b.kode_lokasi",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];													
							this.sg.appendData([line.kode_lokasi,line.nama,line.periode]);
						}
					} else this.sg.clear(1);				
				break;
			case "simpan" :					
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
window.app_saku3_transaksi_yakes_inves_fTier = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes_inves_fTier.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes_inves_fTier";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Tiering Discre", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");

		this.cb_kelola = new saiCBBL(this,{bound:[20,12,220,20],caption:"Manager Investasi", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});		
		this.p1 = new panel(this,{bound:[10,23,700,300],caption:"Daftar Formula Tiering"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,695,400],colCount:3,tag:0,
		            colTitle:["Batas Bawah","Batas Atas","Persentase"],
					colWidth:[[2,1,0],[150,150,150]],
					colFormat:[[0,1,2],[cfNilai,cfNilai,cfNilai]],
					defaultRow:1,
					autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,275,699,25],buttonStyle:2,grid:this.sg});
			
		this.rearrangeChild(10, 23);
		setTipeButton(tbUbah);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.cb_kelola.setSQL("select kode_kelola, nama from inv_kelola where flag_aktif='1' and jenis='MI' ",["kode_kelola","nama"],false,["Kode","Nama"],"and","Daftar Pengelola",true);												
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes_inves_fTier.extend(window.childForm);
window.app_saku3_transaksi_yakes_inves_fTier.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from inv_tier where kode_kelola='"+this.cb_kelola.getText()+"'");			
					if (this.sg.getRowValidCount() > 0){
						var totnilaiseb = totkurseb = 0;
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								if (i == 0) {
									var kurseb = 0;
									var nilaiseb = 0;
								}
								else {
									var kurseb = nilaiToFloat(this.sg.cells(1,i-1));
									var nilaiseb = (nilaiToFloat(this.sg.cells(2,i-1)) / 100) * kurseb;
								}
								totnilaiseb += nilaiseb;
								totkurseb += kurseb;
								sql.add("insert into inv_tier(kode_kelola,bawah,atas,persen,kurang_seb,nilai_seb) values "+
										"('"+this.cb_kelola.getText()+"',"+parseNilai(this.sg.cells(0,i))+","+parseNilai(this.sg.cells(1,i))+","+parseNilai(this.sg.cells(2,i))+","+totkurseb+","+totnilaiseb+")"); 
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
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
				this.sg.clear(1);
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
	doChange: function(sender) {
		if (sender == this.cb_kelola && this.cb_kelola.getText()!="") {
			var data = this.dbLib.getDataProvider("select bawah,atas,persen from inv_tier where kode_kelola='"+this.cb_kelola.getText()+"' order by bawah",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([floatToNilai(line.bawah),floatToNilai(line.atas),floatToNilai(line.persen)]);
				}
			} else this.sg.clear(1);
		}			
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)	{										
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan");																	
							this.app._mainForm.bClear.click();
							setTipeButton(tbUbah);
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
window.app_saku3_transaksi_ypt_logistik_fWenang = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ypt_logistik_fWenang.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ypt_logistik_fWenang";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Kewenangan Proses", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");				
		this.p1 = new panel(this,{bound:[20,23,500,450],caption:"Daftar Kewenangan"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:4,tag:9,				
				colTitle:["Nilai Awal","Nilai Akhir","PP Aju","PP Proses"],
				colWidth:[[3,2,1,0],[100,100,100,100]],			
				colFormat:[[0,1],[cfNilai,cfNilai]],	
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
			
			this.doLoad();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ypt_logistik_fWenang.extend(window.childForm);
window.app_saku3_transaksi_ypt_logistik_fWenang.implement({
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

					sql.add("delete from log_wenang where kode_lokasi = '"+this.app._lokasi+"'");																								
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)) 
							sql.add("insert into log_wenang (awal,akhir,pp_asal,pp_proses,kode_lokasi) values ("+nilaiToFloat(this.sg.cells(0,i))+","+nilaiToFloat(this.sg.cells(1,i))+",'"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"', '"+this.app._lokasi+"')");
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
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);
					this.doLoad();
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doLoad: function(sender){
		try{								
			var strSQL = "select * from log_wenang where kode_lokasi='"+this.app._lokasi+"' order by pp_asal,awal ";						
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([floatToNilai(line.awal),floatToNilai(line.akhir),line.pp_asal,line.pp_proses]);
				}
			} else this.sg.clear(1);												
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi");							
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
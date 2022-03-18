window.app_saku3_transaksi_yakes_inves_fTabRate = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes_inves_fTabRate.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes_inves_fTabRate";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Rate Tabungan", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_tab = new saiCBBL(this,{bound:[20,15,200,20],caption:"ID Tabungan", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});		
				
		this.p1 = new panel(this,{bound:[20,23,800,300],caption:"Data Rate"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:3,tag:9,				
				colTitle:["Saldo Min","Saldo Maks","% Bunga"],
				colWidth:[[2,1,0],[100,100,100]],				
				colFormat:[[0,1,2],[cfNilai,cfNilai,cfNilai]],						
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

			this.cb_tab.setSQL("select kode_tab, nama_rek from inv_tabung",["kode_tab","nama_rek"],false,["Kode","Nama Rek"],"and","Daftar Tabungan",true);			
			

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes_inves_fTabRate.extend(window.childForm);
window.app_saku3_transaksi_yakes_inves_fTabRate.implement({
	doLoad: function() {
		strSQL = "select * from inv_tab_tarif where kode_tab='"+this.cb_tab.getText()+"' order by s_min ";							
		var data1 = this.dbLib.getDataProvider(strSQL,true);	
		if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
			var line1;
			this.sg.clear();
			for (var i in data1.rs.rows){
				line1 = data1.rs.rows[i];																													
				this.sg.appendData([floatToNilai(line1.s_min),floatToNilai(line1.s_max), floatToNilai(line1.p_bunga)]);
			}
		} else this.sg.clear(1);
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
	simpan: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from inv_tab_tarif where kode_tab = '"+this.cb_tab.getText()+"'");			
					
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)) 
							sql.add("insert into inv_tab_tarif (kode_tab,s_min,s_max,p_bunga) values "+
									"('"+this.cb_tab.getText()+"',"+nilaiToFloat(this.sg.cells(0,i))+","+nilaiToFloat(this.sg.cells(1,i))+","+nilaiToFloat(this.sg.cells(2,i))+")");
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_tab);
					this.sg.clear(1); 
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
	doChange: function(sender){
		try{
			if (sender == this.cb_tab && this.cb_tab.getText() != ""){						
				this.doLoad();							
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_tab.getText()+")");							
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
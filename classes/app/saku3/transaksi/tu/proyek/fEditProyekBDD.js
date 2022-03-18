window.app_saku3_transaksi_tu_proyek_fEditProyekBDD = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_proyek_fEditProyekBDD.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_proyek_fEditProyekBDD";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Edit ID Project tabel BDD", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		
		this.c_periode = new saiCB(this,{bound:[20,12,200,20],caption:"Periode",readOnly:true,tag:2,change:[this,"doChange"]});
		this.cb_proyek = new saiCBBL(this,{bound:[20,15,220,20],caption:"ID Project", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});		
		
		this.p1 = new panel(this,{bound:[20,23,1000,400],caption:"Daftar BDD"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:7,tag:9,				
				colTitle:["ID Project","Deskripsi",  "No Bukti","Tanggal","Keterangan","DC","Nilai"],
				colWidth:[[6,5,4,3,2,1,0],[100,50,250,80,100,200,120]],
				columnReadOnly:[true,[0,1,2,3,4,5,6],[0]],				
				colFormat:[[6],[cfNilai]],
				buttonStyle:[[0],[bsEllips]], 
				ellipsClick:[this,"doEllipsClick"],
				defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:2,grid:this.sg});				
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);				
		this.setTabChildIndex();
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.cb_proyek.setSQL("select kode_proyek, nama from tu_proyek where kode_lokasi='"+this.app._lokasi+"'",["kode_proyek","nama"],false,["ID Proyek","Nama"],"and","Data Proyek",true);

			this.c_periode.items.clear();
			var data = this.dbLib.getDataProvider("select distinct periode from tu_prbdd_d where kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													
					this.c_periode.addItem(i,line.periode);
				}
			} 

			this.c_periode.setText("");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_proyek_fEditProyekBDD.extend(window.childForm);
window.app_saku3_transaksi_tu_proyek_fEditProyekBDD.implement({
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
					
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.cells(0,i) != this.cb_proyek.getText()) {
							sql.add("update tu_prbdd_d set kode_proyek='"+this.sg.cells(0,i)+"' where kode_proyek='"+this.cb_proyek.getText()+"' and no_bukti='"+this.sg.cells(2,i)+"' and dc='"+this.sg.cells(5,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_proyek);
					this.sg.clear(1); 
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
			if (sender == this.cb_proyek || sender == this.c_periode) {
				if (this.cb_proyek.getText() != "" && this.c_periode.getText() != ""){						
					var strSQL = "select *,convert(varchar,tanggal,103) as tgl from tu_prbdd_d where kode_proyek = '"+this.cb_proyek.getText()+"' and periode='"+this.c_periode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' order by tanggal";						
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];								
							this.sg.appendData([line.kode_proyek,this.cb_proyek.rightLabelCaption,line.no_bukti, line.tgl,line.keterangan,line.dc,floatToNilai(line.nilai)]);
						}
					} else this.sg.clear(1);									
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},			
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Proyek",sender,undefined, 
												  "select kode_proyek,nama    from tu_proyek where kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_proyek)  from tu_proyek where kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_proyek","nama"],"and",["ID","Deskripsi"],false);				
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_proyek.getText()+")");							
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
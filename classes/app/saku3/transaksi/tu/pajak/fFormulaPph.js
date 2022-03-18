window.app_saku3_transaksi_tu_pajak_fFormulaPph = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_pajak_fFormulaPph.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_pajak_fFormulaPph";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Batas Parameter PPh21", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.c_jenis = new saiCB(this,{bound:[20,22,200,20],caption:"Jenis",items:["PROGRESIF","FINAL"],readOnly:true,tag:2,change:[this,"doChange"]});

		this.p1 = new panel(this,{bound:[10,23,1000,400],caption:"Daftar Batas Parameter PPh21"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,995,350],colCount:8,tag:0,
		            colTitle:["Batas Bawah","Batas Atas","Persentase","Pengurang","Nilai PPh Seb",  "% NonNPWP","Pengurang NonNPWP","PPh NonNPWP Seb"],
					colWidth:[[7,6,5, 4,3,2,1,0],[100,120,100, 100,100,100,100,100]],
					colFormat:[[0,1,2,3,4,5,6,7],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai ,cfNilai,cfNilai,cfNilai]],
					defaultRow:1,
					autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,375,999,25],buttonStyle:2,grid:this.sg});
			
		this.rearrangeChild(10, 23);
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.doChange(this.c_jenis);
							
		}catch(e){
			systemAPI.alert(e);			
		}
	}
};
window.app_saku3_transaksi_tu_pajak_fFormulaPph.extend(window.childForm);
window.app_saku3_transaksi_tu_pajak_fFormulaPph.implement({
	doChange: function(sender) {
		if (sender == this.c_jenis && this.c_jenis.getText()) {
			var data = this.dbLib.getDataProvider("select bawah,atas,persen,kurang_seb,nilai_seb,persen2,kurang_seb2,nilai_seb2 from pjk_pph21 where jenis='"+this.c_jenis.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by bawah",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([floatToNilai(line.bawah),floatToNilai(line.atas),floatToNilai(line.persen),floatToNilai(line.kurang_seb),floatToNilai(line.nilai_seb), floatToNilai(line.persen2),floatToNilai(line.kurang_seb2),floatToNilai(line.nilai_seb2)]);
				}
			} else this.sg.clear(1);
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from pjk_pph21 where kode_lokasi='"+this.app._lokasi+"' and jenis='"+this.c_jenis.getText()+"'");			
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into pjk_pph21(jenis,bawah,atas,persen,kurang_seb,nilai_seb,kode_lokasi, persen2,kurang_seb2,nilai_seb2) values "+
										"('"+this.c_jenis.getText()+"',"+parseNilai(this.sg.cells(0,i))+","+parseNilai(this.sg.cells(1,i))+","+parseNilai(this.sg.cells(2,i))+","+parseNilai(this.sg.cells(3,i))+","+parseNilai(this.sg.cells(4,i))+",'"+this.app._lokasi+"' ,"+parseNilai(this.sg.cells(5,i))+","+parseNilai(this.sg.cells(6,i))+","+parseNilai(this.sg.cells(7,i))+")"); 
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
				if (modalResult == mrOk)
				break;
			case "ubah" :	
				this.ubah();
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
							var data = this.dbLib.getDataProvider("select bawah,atas,persen,kurang_seb,nilai_seb,persen2,kurang_seb2,nilai_seb2 from pjk_pph21 where jenis='"+this.c_jenis.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by bawah",true);
							if (typeof data == "object" && data.rs.rows[0] != undefined){
								var line;
								this.sg.clear();
								for (var i in data.rs.rows){
									line = data.rs.rows[i];							
									this.sg.appendData([floatToNilai(line.bawah),floatToNilai(line.atas),floatToNilai(line.persen),floatToNilai(line.kurang_seb),floatToNilai(line.nilai_seb),floatToNilai(line.persen2),floatToNilai(line.kurang_seb2),floatToNilai(line.nilai_seb2)]);
								}
							} else this.sg.clear(1);				
							setTipeButton(tbUbahHapus);
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
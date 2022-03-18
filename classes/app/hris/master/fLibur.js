window.app_hris_master_fLibur = function(owner)
{
	if (owner)
	{
		window.app_hris_master_fLibur.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hris_master_fLibur";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Hari Libur Tahunan", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.e_tahun = new saiLabelEdit(this,{bound:[20,09,150,20],caption:"Tahun", maxLength:4, change:[this,"doChange"]});		
		this.p1 = new panel(this,{bound:[10,23,560,433],caption:"Daftar Hari Libur"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,555,380],colCount:4,tag:0,
		            colTitle:["Kode","Nama","Tgl Mulai","Tgl Akhir"],
					colWidth:[[3,2,1,0],[80,80,200,70]],
					//columnReadOnly:[true,[0,1],[2,3]],
					buttonStyle:[[2,3],[bsDate,bsDate]],										
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick"],autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,410,699,25],buttonStyle:2,grid:this.sg});
			
		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_hris_master_fLibur.extend(window.childForm);
window.app_hris_master_fLibur.implement({
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
					sql.add("delete from gr_libur where kode_lokasi='"+this.app._lokasi+"' and tahun = '"+this.e_tahun.getText()+"'");			
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into gr_libur(kode_libur,kode_lokasi,nama,tahun,tgl_mulai,tgl_akhir) values "+
										"('"+this.sg.cells(0,i)+"','"+this.app._lokasi+"','"+this.sg.cells(1,i)+"','"+this.e_tahun.getText()+"','"+this.sg.getCellDateValue(2,i)+"','"+this.sg.getCellDateValue(3,i)+"')");
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {		
					/*
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("delete from gr_libur where kode_lokasi='"+this.app._lokasi+"' and tahun = '"+this.e_tahun.getText()+"'");			
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into gr_libur(kode_libur,kode_lokasi,nama,tahun,tgl_mulai,tgl_akhir) values "+
										"('"+this.sg.cells(0,i)+"','"+this.app._lokasi+"','"+this.sg.cells(1,i)+"','"+this.e_tahun.getText()+"','"+this.sg.getCellDateValue(2,i)+"','"+this.sg.getCellDateValue(3,i)+"')");
							}
						}
					}
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
					*/
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
					sql.add("delete from gr_libur where kode_lokasi='"+this.app._lokasi+"' and tahun = '"+this.e_tahun.getText()+"'");			
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
					this.standarLib.clearByTag(this, new Array("0"),this.e_tahun);
					this.sg.clear(1);
				setTipeButton(tbUbahHapus);
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
			if (this.e_tahun.getText() != ""){
				var data = this.dbLib.getDataProvider(
				            "select kode_libur,nama,convert(varchar,tgl_mulai,103) as tgl_awal,convert(varchar,tgl_akhir,103) as tgl_akhir "+
							"from gr_libur "+							
							"where kode_lokasi='"+this.app._lokasi+"' and tahun = '"+this.e_tahun.getText()+"' order by tgl_mulai asc",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_libur,line.nama,line.tgl_awal,line.tgl_akhir]);
					}
				} else this.sg.clear(1);	
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Tahun : "+ this.e_tahun.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});
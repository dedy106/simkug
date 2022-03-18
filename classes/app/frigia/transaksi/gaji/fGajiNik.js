window.app_frigia_transaksi_gaji_fGajiNik = function(owner)
{
	if (owner)
	{
		window.app_frigia_transaksi_gaji_fGajiNik.prototype.parent.constructor.call(this,owner);
		this.className  = "app_frigia_transaksi_gaji_fGajiNik";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Tarif Gaji per Karyawan", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"NIK",maxLength:10,multiSelection:false,change:[this,"doChange"]});
		this.p1 = new panel(this,{bound:[10,23,500,433],caption:"Daftar Tarif Gaji per Karyawan"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,495,380],colCount:3,tag:0,
		            colTitle:["Kode Param","Nama","Tarif"],
					colWidth:[[2,1,0],[80,300,70]],
					columnReadOnly:[true,[0,1],[2]],
					buttonStyle:[[0],[bsEllips]], 
					colFormat:[[2],[cfNilai]],
					defaultRow:1,
					change:[this,"doCellChange"],ellipsClick:[this,"doEllipsClick"],autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,410,499,25],buttonStyle:2,grid:this.sg});
			
		this.rearrangeChild(10, 23);
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_kode.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data Karyawan",true);
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_frigia_transaksi_gaji_fGajiNik.extend(window.childForm);
window.app_frigia_transaksi_gaji_fGajiNik.implement({
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
					sql.add("delete from fri_gaji_nik where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into fri_gaji_nik(nik,kode_param,kode_lokasi,nilai) values "+
										"	('"+this.cb_kode.getText()+"','"+this.sg.cells(0,i)+"','"+this.app._lokasi+"',"+parseNilai(this.sg.cells(2,i))+")");
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
					sql.add("delete from fri_gaji_nik where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
					this.standarLib.clearByTag(this, new Array("0"),this.cb_kode);
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
			if (this.cb_kode.getText() != ""){
				this.grade = this.cb_kode.dataFromList[2];
				var data = this.dbLib.getDataProvider(
				            "select a.kode_param,b.nama,a.nilai "+
				            "from  fri_gaji_nik a inner join fri_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi where a.nik='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_param,line.nama,floatToNilai(line.nilai)]);
					}
				} else this.sg.clear(1);	
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	/*
	doCellChange: function(sender, col, row) {
		if (col == 0) {
			var data = this.dbLib.getDataProvider(
				"select nilai from gr_gaji_fix where kode_param='"+this.sg.cells(0,row)+"' and kode_grade='"+this.grade+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined) this.sg.setCell(2,row,floatToNilai(line.nilai));
				else this.sg.setCell(2,row,"0");
			} else this.sg.setCell(2,row,"0");
		}
	},
	*/
	doEllipsClick: function(sender, col, row) {
		try
		{
			switch(col){
				case 0 :
						this.standarLib.showListDataForSG(this, "Daftar Parameter",this.sg, this.sg.row, this.sg.col, 
														"select kode_param, nama  from fri_gaji_param where kode_lokasi='"+this.app._lokasi+"'",
														"select count(kode_param) from fri_gaji_param where kode_lokasi='"+this.app._lokasi+"'",
														 new Array("kode_param","nama"),"and",new Array("Kode","Nama"),false);					
						break;					
			}						
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
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
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});
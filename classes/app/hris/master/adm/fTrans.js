window.app_hris_master_adm_fTrans = function(owner)
{
	if (owner)
	{
		window.app_hris_master_adm_fTrans.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hris_master_adm_fTrans";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Tarif Transportasi SPPD", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"Rute",maxLength:10,multiSelection:false,change:[this,"doChange"]});
		this.p1 = new panel(this,{bound:[10,23,800,433],caption:"Daftar Tarif Transportasi per Grade"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,795,380],colCount:8,tag:0,
		            colTitle:["Kode Grade","Nama","Tarif","PP","Airport Tax","Taksi","KA","Total"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,80,80,80,80,80,180,70]],
					columnReadOnly:[true,[0,1,3,7],[2,4,5,6]],
					buttonStyle:[[0],[bsEllips]], 
					colFormat:[[2,3,4,5,6,7],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,410,799,25],buttonStyle:2,grid:this.sg});
			
		this.rearrangeChild(10, 23);
		setTipeButton(tbUbah);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_kode.setSQL("select kode_rute, nama from gr_spj_rute where kode_lokasi='"+this.app._lokasi+"'",["kode_rute","nama"],false,["Kode","Nama"],"and","Data Rute SPPD",true);
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_hris_master_adm_fTrans.extend(window.childForm);
window.app_hris_master_adm_fTrans.implement({
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
					sql.add("delete from gr_spj_transport where kode_rute = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into gr_spj_transport(kode_rute,kode_grade,kode_lokasi,tarif,pp,airtax,taxi,ka) values "+
										"	('"+this.cb_kode.getText()+"','"+this.sg.cells(0,i)+"','"+this.app._lokasi+"',"+parseNilai(this.sg.cells(2,i))+","+parseNilai(this.sg.cells(3,i))+","+parseNilai(this.sg.cells(4,i))+","+parseNilai(this.sg.cells(5,i))+","+parseNilai(this.sg.cells(6,i))+")");
							}
						}
					}					
					//setTipeButton(tbAllFalse);
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
					sql.add("delete from gr_spj_transport where kode_rute = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
				//setTipeButton(tbUbahHapus);
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
				var data = this.dbLib.getDataProvider(
				            "select a.kode_grade,b.nama,a.tarif,a.pp,a.airtax,a.taxi,a.ka,(a.pp+a.airtax+a.taxi+a.ka) as total "+
				            "from gr_spj_transport a inner join gr_grade b on a.kode_grade=b.kode_grade and a.kode_lokasi=b.kode_lokasi where a.kode_rute='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_grade,line.nama,floatToNilai(line.tarif),floatToNilai(line.pp),floatToNilai(line.airtax),floatToNilai(line.taxi),floatToNilai(line.ka),floatToNilai(line.total)]);
					}
				} else this.sg.clear(1);	
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doEllipsClick: function(sender, col, row) {
		try
		{
			switch(col){
				case 0 :
						this.standarLib.showListDataForSG(this, "Daftar Grade",this.sg, this.sg.row, this.sg.col, 
														"select kode_grade, nama  from gr_grade where kode_lokasi='"+this.app._lokasi+"'",
														"select count(kode_grade) from gr_grade where kode_lokasi='"+this.app._lokasi+"'",
														 new Array("kode_grade","nama"),"and",new Array("Kode","Nama"),false);					
						break;					
			}						
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
		}
	},	
	doChangeCell: function(sender, col, row){
		if (col == 0) {
			if (this.sg.cells(7,row) == "") {
				for (var i=2;i < 8;i++) this.sg.setCell(i,row,"0");
			}
		}
		if (col == 2) {
			if (this.sg.cells(2,row) != "") {
				var pp = nilaiToFloat(this.sg.cells(2,row)) * 2;
				this.sg.setCell(3,row,floatToNilai(pp));
			}
		}
		if (col == 3 || col == 4 || col == 5 || col == 6) {
			if (this.sg.cells(3,row) != "" && this.sg.cells(4,row) != "" && this.sg.cells(5,row) != "" && this.sg.cells(6,row) != "") {
				var tot = nilaiToFloat(this.sg.cells(3,row))+nilaiToFloat(this.sg.cells(4,row))+nilaiToFloat(this.sg.cells(5,row))+nilaiToFloat(this.sg.cells(6,row));				
				this.sg.setCell(7,row,floatToNilai(tot));
			}
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
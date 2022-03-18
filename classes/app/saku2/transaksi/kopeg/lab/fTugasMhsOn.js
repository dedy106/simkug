window.app_saku2_transaksi_kopeg_lab_fTugasMhsOn = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_lab_fTugasMhsOn.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_lab_fTugasMhsOn";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Tugas", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		
		this.cb_tugas = new saiCBBL(this,{bound:[20,15,250,20],caption:"Tugas", multiSelection:false, maxLength:10, tag:1,change:[this,"doLoad"]});		
		this.e_kajian = new saiLabelEdit(this,{bound:[20,21,450,20],caption:"Kajian", readOnly:true});
		this.e_matkul = new saiLabelEdit(this,{bound:[520,21,400,20],caption:"Mata Kuliah", readOnly:true});
		
		this.p1 = new panel(this,{bound:[20,23,1000,450],caption:"Daftar Tugas"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:5,tag:9,				
				colTitle:["Status","NPM","Nama","No Close","No Eval"],
				colWidth:[[4,3,2,1,0],[100,100,300,100,80]],
				readOnly:true,picklist:[[0],[new portalui_arrayMap({items:["OPEN","CLOSE"]})]],
				buttonStyle:[[0],[bsAuto]], 
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
			
			this.cb_tugas.setSQL("select a.no_tugas, a.nama from lab_tugas a "+			                     
								 "where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_dosen='"+this.app._userLog+"'",["no_tugas","nama"],false,["Kode","Nama"],"and","Daftar Tugas",true);
		
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_lab_fTugasMhsOn.extend(window.childForm);
window.app_saku2_transaksi_kopeg_lab_fTugasMhsOn.implement({
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
						if (this.sg.rowValid(i) && this.sg.cells(0,i) == "OPEN") 
							sql.add("delete from lab_close where no_close='"+this.sg.cells(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
							if (this.sg.cells(4,i) != "-") {
								sql.add("delete from lab_eval where no_eval='"+this.sg.cells(4,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
								sql.add("update lab_close set no_eval='-', nilai='-',evaluasi='-' where no_close='"+this.sg.cells(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");										
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
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);
					this.sg.clear(1); 
					setTipeButton(tbSimpan);
					this.doLoad();
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
			var data = this.dbLib.getDataProvider("select c.matkul,c.nama+' - '+c.keterangan as kajian "+
			           "from lab_tugas a inner join lab_dosen b on a.kode_dosen = b.kode_dosen and a.kode_lokasi=b.kode_lokasi "+
					   "                 inner join lab_matkul c on a.kode_matkul=c.kode_matkul "+
					   "                 inner join lab_kelas d on a.kode_kelas=d.kode_kelas "+
			           "where a.no_tugas='"+this.cb_tugas.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.e_kajian.setText(line.kajian);
					this.e_matkul.setText(line.matkul);					
				} 
			}
			var strSQL = "select 'CLOSE' as status,b.nim,b.nama,b.no_close,b.no_eval "+
			             "from lab_tugas a inner join ("+
						 "   select a.no_tugas,a.kode_lokasi,b.nim,b.nama,a.no_close,a.no_eval "+
						 "   from lab_close a inner join lab_mhs b on a.nik_user=b.nim and a.kode_lokasi=b.kode_lokasi "+
						 "   where a.no_tugas='"+this.cb_tugas.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"') b on a.no_tugas=b.no_tugas and a.kode_lokasi=b.kode_lokasi "+						 
						 "where a.kode_lokasi = '"+this.app._lokasi+"' and a.no_tugas='"+this.cb_tugas.getText()+"' order by b.nim";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.status.toUpperCase(),line.nim,line.nama,line.no_close,line.no_eval]);
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
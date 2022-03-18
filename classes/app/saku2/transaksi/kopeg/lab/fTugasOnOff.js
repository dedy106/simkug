window.app_saku2_transaksi_kopeg_lab_fTugasOnOff = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_lab_fTugasOnOff.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_lab_fTugasOnOff";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Tugas", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.p1 = new panel(this,{bound:[20,23,1000,450],caption:"Daftar Tugas"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:7,tag:9,				
				colTitle:["Status","No Tugas","Tanggal","Deskripsi","Mata Kuliah","Kajian","Kelas"],
				colWidth:[[6,5,4,3,2,1,0],[100,300,200,300,80,100,80]],
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
			
			this.doLoad();
		
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_lab_fTugasOnOff.extend(window.childForm);
window.app_saku2_transaksi_kopeg_lab_fTugasOnOff.implement({
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
						if (this.sg.rowValid(i)) 
							if (this.sg.cells(2,i) == "OPEN") vFlag = "1";
							else vFlag = "0";							
							sql.add("update lab_tugas set flag_aktif='"+vFlag+"' where no_tugas ='"+this.sg.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'");							
							if (vFlag == "0") {
								sql.add("insert into lab_closetugas(no_close,kode_lokasi,tanggal,no_tugas,nik_user,catatan) values "+
										"('"+this.sg.cells(1,i)+"','"+this.app._lokasi+"',getdate(),'"+this.sg.cells(1,i)+"','"+this.app._userLog+"','ONOFF')");
							} 
							else {
								sql.add("delete from lab_closetugas where no_tugas='"+this.sg.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
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
			var strSQL = "select case when a.flag_aktif ='1' then 'OPEN' else 'CLOSE' end as status,a.no_tugas,convert(varchar,a.tanggal,103) as tgl, a.nama, b.nama as kajian, d.nama as matkul,c.nama  as kelas "+
			             "from lab_tugas a inner join lab_matkul b on a.kode_matkul = b.kode_matkul and a.kode_lokasi=b.kode_lokasi "+
						 "                 inner join lab_kelas c on a.kode_kelas = c.kode_kelas and a.kode_lokasi=c.kode_lokasi "+
						 "                 inner join lab_matkul_m d on b.matkul = d.matkul and b.kode_lokasi=d.kode_lokasi "+
						 "where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_dosen='"+this.app._userLog+"' order by a.no_tugas";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.status.toUpperCase(),line.no_tugas,line.tgl,line.nama,line.matkul,line.kajian,line.kelas]);
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
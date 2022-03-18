window.app_saku3_transaksi_siaga_hris_adm_fCutiNik = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_adm_fCutiNik.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_adm_fCutiNik";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Cuti Karyawan", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.e_tahun = new saiLabelEdit(this,{bound:[20,09,180,20],caption:"Tahun", maxLength:4});
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"Status Cuti",maxLength:10,multiSelection:false,change:[this,"doChange"]});		
		this.e_jml = new saiLabelEdit(this,{bound:[20,11,180,20],caption:"Jumlah Hari", tipeText:ttNilai, text:"0",readOnly:true});
		this.bPost = new button(this,{bound:[20,12,80,18],caption:"Generate",click:[this,"doHitung"]});	
		
		this.p1 = new panel(this,{bound:[10,23,1000,433],caption:"Daftar Cuti Karyawan"});		
		this.sg = new saiGrid(this.p1,{bound:[1,20,995,383],colCount:7,tag:0,
		            colTitle:["NIK","Nama","Bulan","Jumlah","Tambah","Kurang","Keterangan"],
					colWidth:[[6,5,4,3,2,1,0],[300,80,80,80,80,230,100]],
					columnReadOnly:[true,[0,1],[2,3,4,5,6]],
					buttonStyle:[[0,2],[bsEllips,bsAuto]],checkItem:true,
					picklist:[[2],[new portalui_arrayMap({items:["01","02","03","04","05","06","07","08","09","10","11","12"]})]],
					colFormat:[[3,4,5],[cfNilai,cfNilai,cfNilai]],
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick"],autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:2,grid:this.sg});
			
		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_kode.setSQL("select sts_cuti, nama from gr_status_cuti where kode_lokasi='"+this.app._lokasi+"'",["sts_cuti","nama"],false,["Kode","Nama"],"and","Data Status Cuti",true);			
			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.e_tahun.setText(line.tahun);
			} 			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_adm_fCutiNik.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_adm_fCutiNik.implement({
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
					sql.add("delete from gr_cuti_karyawan where sts_cuti = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and periode LIKE '"+this.e_tahun.getText()+"%'");			
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into gr_cuti_karyawan(sts_cuti,nik, periode,  jumlah, tambah, kurang, kode_lokasi,keterangan) values "+
										"	('"+this.cb_kode.getText()+"','"+this.sg.cells(0,i)+"','"+this.e_tahun.getText()+this.sg.cells(2,i)+"',"+parseNilai(this.sg.cells(3,i))+","+parseNilai(this.sg.cells(4,i))+","+parseNilai(this.sg.cells(5,i))+",'"+this.app._lokasi+"','"+this.sg.cells(6,i)+"')");
							}
						}
					}		
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
					sql.add("delete from gr_cuti_karyawan where sts_cuti = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and periode='"+this.e_tahun.getText()+this.c_bulan.getText()+"'");			
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into gr_cuti_karyawan(sts_cuti,nik, periode,  jumlah, tambah, kurang, kode_lokasi,keterangan) values "+
										"	('"+this.cb_kode.getText()+"','"+this.sg.cells(0,i)+"','"+this.e_tahun.getText()+this.c_bulan.getText()+"',"+parseNilai(this.sg.cells(3,i))+","+parseNilai(this.sg.cells(4,i))+","+parseNilai(this.sg.cells(5,i))+",'"+this.app._lokasi+"','"+this.sg.cells(6,i)+"')");
							}
						}
					}	
					*/
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
					sql.add("delete from gr_cuti_karyawan where sts_cuti = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and periode LIKE '"+this.e_tahun.getText()+"%'");			
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
	doChange:function(sender){	
		
		if (sender == this.cb_kode && this.cb_kode.getText() != "") {
			var data = this.dbLib.getDataProvider(
			           "select hari "+
					   "from gr_status_cuti  "+
					   "where sts_cuti = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",true);

			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.e_jml.setText(floatToNilai(line.hari));				
				} 
			} 
		}

	},
	doLoad: function(sender){
	if (this.cb_kode.getText() != "" && this.e_jml.getText() !=""){
			var data = this.dbLib.getDataProvider(
						"select a.nik,a.nama,b.jumlah as jumlah,CASE when datediff(year,tgl_masuk,getdate()) > 1 then '01' else substring(convert(varchar,dateadd(year,1,tgl_masuk),112),5,2) end as bulan,isnull(b.tambah,0) as tambah,isnull(b.kurang,0) as kurang,isnull(b.jumlah+b.tambah-b.kurang,0) as jml_akhir,isnull(b.keterangan,'-') as keterangan "+
						"from gr_karyawan a "+
						"left join ( select nik,kode_lokasi,jumlah,tambah,keterangan,kurang,periode from gr_cuti_karyawan where sts_cuti='"+this.cb_kode.getText()+"' and substring(periode,1,4) = '"+this.e_tahun.getText()+"') b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
						"where a.kode_lokasi='"+this.app._lokasi+"' ",true);

			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.nik,line.nama,line.bulan,floatToNilai(line.jumlah),floatToNilai(line.tambah),floatToNilai(line.kurang),line.keterangan]);
				}
			} else this.sg.clear(1);	
		}
	},
	doHitung: function(sender){
	try{
		if (this.cb_kode.getText() != "" && this.e_tahun.getText() !=""){
			var strSQL2 ="select*from gr_cuti_karyawan where periode like '"+this.e_tahun.getText()+"%' and sts_cuti='"+this.cb_kode.getText()+"'";
			var data2 = this.dbLib.getDataProvider(strSQL2,true);	
			if (typeof data2 == "object" && data2.rs.rows.length > 0){
				alert("Data Cuti tahun '"+this.e_tahun.getText()+"' sudah digenerate ");
				this.sg.clear(1);	
				return false;
			}

			var tahunSeb = nilaiToFloat(this.e_tahun.getText()) - 1;									
			if (this.cb_kode.getText() == "1") { 
				var strSQL ="select b.nik,b.nama,12 as jumlah,CASE when datediff(year,b.tgl_masuk,'"+this.e_tahun.getText()+"-01-01') > 1 then '01' else substring(convert(varchar,dateadd(year,1,b.tgl_masuk),112),5,2) end as bulan,'-' as keterangan, isnull(xx.sisa,0) as sisa "+
				"from  gr_karyawan b "+
				"left join ( select a.nik,a.kode_lokasi,a.ini,isnull(b.pakai,0) as cuti,isnull(bb.pakai,0) as cuti_sama, "+
							"a.ini-isnull(b.pakai,0)-isnull(bb.pakai,0) as sisa "+
							"from  ( select nik,kode_lokasi,sum(jumlah-kurang) as ini "+
									"from gr_cuti_karyawan  "+
									"where sts_cuti = '"+this.cb_kode.getText()+"' and kode_lokasi='01' and periode like '"+tahunSeb+"%' "+
									"group by nik,kode_lokasi ) a  "+
							"left join  ( select nik_buat as nik,kode_lokasi,sum(lama) as pakai "+
										"from gr_cuti where sts_cuti='"+this.cb_kode.getText()+"' and kode_lokasi = '01' and "+ "periode like '"+tahunSeb+"%' "+
										"group by nik_buat,kode_lokasi ) b on a.nik=b.nik and "+ "a.kode_lokasi=b.kode_lokasi "+
							"left join  ( select nik,kode_lokasi,sum(lama) as pakai from gr_cuti_d "+
										" where sts_cuti='"+this.cb_kode.getText()+"' and kode_lokasi = '01' and periode like '"+tahunSeb+"%'  "+
										"group by nik,kode_lokasi "+
										") bb on a.nik=bb.nik and a.kode_lokasi=bb.kode_lokasi "+
							"where a.kode_lokasi='"+this.app._lokasi+"' "+
				") xx on b.nik=xx.nik "+
				"where b.flag_aktif='0' and b.kode_lokasi='"+this.app._lokasi+"'";
			}else 
			if (this.cb_kode.getText() == "2") { 
				var strSQL ="select x.nik,x.nama,x.jumlah,x.bulan,x.keterangan,isnull(xx.sisa,0) as sisa from ( "+
					"select nik,nama,tgl_masuk,kode_lokasi, "+
					"case when (cast(datediff(year,tgl_masuk,'"+this.e_tahun.getText()+"-01-01')as int) % 6) = 0 then "+this.e_jml.getText()+" "+
					"else 0 end as jumlah, "+
					"case when (cast(datediff(year,tgl_masuk,'"+this.e_tahun.getText()+"-01-01')as int) % 6) = 0 then substring(convert(varchar,tgl_masuk,112),5,2) "+
					"else '-' end as bulan,0 as tambah,0 kurang,"+this.e_jml.getText()+"+0 as jml_akhir,'-' as keterangan "+
					"from gr_karyawan where flag_aktif='0' and cast(datediff(year,tgl_masuk,'"+this.e_tahun.getText()+"-01-01')as int) > 0 "+
				"	) x "+
				"left join ( select a.nik,a.kode_lokasi,a.ini,isnull(b.pakai,0) as cuti,isnull(bb.pakai,0) as cuti_sama, "+
							"a.ini-isnull(b.pakai,0)-isnull(bb.pakai,0) as sisa "+
							"from  ( select nik,kode_lokasi,sum(jumlah-kurang) as ini "+
							"		from gr_cuti_karyawan  "+
							"		where sts_cuti = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and periode like '"+tahunSeb+"%' "+  
							"		group by nik,kode_lokasi ) a  "+
							"left join  ( select nik_buat as nik,kode_lokasi,sum(lama) as pakai "+
							"			from gr_cuti where sts_cuti='"+this.cb_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and periode like '"+tahunSeb+"%' "+
							"			group by nik_buat,kode_lokasi ) b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"left join  ( select nik,kode_lokasi,sum(lama) as pakai from gr_cuti_d "+
							"			where sts_cuti='"+this.cb_kode.getText()+"' and kode_lokasi = '01' and periode like '"+tahunSeb+"%'  "+
							"			group by nik,kode_lokasi "+
							"			) bb on a.nik=bb.nik and a.kode_lokasi=bb.kode_lokasi "+ 
							"where a.kode_lokasi='"+this.app._lokasi+"' "+
				") xx on x.nik=xx.nik and x.kode_lokasi=xx.kode_lokasi "+
				"where x.jumlah > 0 and x.kode_lokasi='"+this.app._lokasi+"'";
			} 
			var data = this.dbLib.getDataProvider(strSQL,true);	

			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if(line.sisa >= 0){
						var tambah = line.sisa;
						var kurang = 0;
					}else{
						var tambah = 0;
						var kurang = Math.abs(line.sisa);
					}						
					this.sg.appendData([line.nik,line.nama,line.bulan,floatToNilai(line.jumlah),floatToNilai(tambah),floatToNilai(kurang),line.keterangan]);
				}
			} else this.sg.clear(1);				
		}
	} catch(e) {alert(e);}
	},	
	doEllipsClick: function(sender, col, row) {
		try
		{
			switch(col){
				case 0 :
						this.standarLib.showListDataForSG(this, "Daftar Karyawan",this.sg, this.sg.row, this.sg.col, 
														"select nik, nama  from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",
														"select count(nik) from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",
														 new Array("nik","nama"),"and",new Array("Kode","Nama"),false);					
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
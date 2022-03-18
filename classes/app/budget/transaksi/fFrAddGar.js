/**
 * @author mr
 */
window.app_budget_transaksi_fFrAddGar = function(owner)
{
	if (owner)
	{
		window.app_budget_transaksi_fFrAddGar.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_transaksi_fFrAddGar";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Load Data Aktiva Tetap Belum Terealisasi : Input/Koreksi",0);
		
		this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,22,180,20],tag:2,caption:"Tahun Anggaran",tipeText: ttAngka,maxLength:4,change:[this,"doChange"]});								
		this.ePeriode = new portalui_saiLabelEdit(this,{bound:[20,23,180,20],tag:2,caption:"Periode CutOff",tipeText: ttAngka,maxLength:6,change:[this,"doChange"]});								
		this.bTampil = new portalui_button(this, {bound: [835, 23, 80, 20],caption: "Tampil"});
		this.i_viewer = new portalui_imageButton(this,{bound:[200,23,20,20],hint:"Load Data",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doLoadData"]});
		
		uses("portalui_saiGrid");
		this.p1 = new portalui_panel(this,{bound:[20,10,900,this.height - 60],caption:"Daftar Aktiva Tetap Tahun Angg. [n-1] Belum Terealisasi"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,898,this.p1.height - 45], colCount:21,rowCount:1,
			colTitle:"Status,No Aktap,Nama Asset,Periode Perolehan,Kode PP,Nama PP,Kelompok Aktap,Nama Kelompok Aktap,Kelompok Akun,Nama Kelompok Akun, Periode Susut, Nilai Perolehan, Kode Akun, Nama Akun, Umur Ekon.[Bln], %Susut[Thn],Kode RKA BP, Nama RKA BP,Kode RKA BPP, Nama RKA BPP,Jumlah",
			colWidth:[[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],[80,100,150,100,70,100,90,110,90,120,100,100,70,100,100,70,100,150,100,150,80]],
			colFormat:[[15,14,11,20],[cfNilai, cfNilai, cfNilai, cfNilai]],readOnly:true,
			buttonStyle:[[0,16,18],[bsAuto,bsEllips,bsEllips]],readOnly:true,
			ellipsClick: [this,"doEllipsClick"],
			picklist:[[0],[new portalui_arrayMap({items:["APP","NONAPP"]})]]
		});
		this.sgn = new portalui_sgNavigator(this.p1, {bound: [1,this.sg1.height + 20, 898, 25],grid: this.sg1,border: 0,buttonStyle: 3});		
		this.rearrangeChild(10,23);
		setTipeButton(tbSimpan);
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    uses("util_standar");
		    this.standarLib = new util_standar();
			uses("util_addOnLib");
		    this.addOnLib = new util_addOnLib();
			uses("util_gridLib");
			this.gridLib=new util_gridLib();
			
			this.bTampil.onClick.set(this, "doTampil");			
			var data = this.dbLib.getDataProvider("select year(getdate()) +1 as tahun ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				line = data.rs.rows[0];							
				this.eTahun.setText(line.tahun);
			}

		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_transaksi_fFrAddGar.extend(window.portalui_childForm);
window.app_budget_transaksi_fFrAddGar.implement({
	mainButtonClick :function(sender){
		if (sender == this.app._mainForm.bClear)
		{
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
		}
		if (sender == this.app._mainForm.bSimpan)
		{
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");
		}
		if (sender == this.app._mainForm.bEdit)
		{
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");
		}
		if (sender == this.app._mainForm.bHapus)
		{
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");
		}
	},
	simpan: function(){	
		if (this.standarLib.checkEmptyByTag(this, new Array("0","1","2"))){
			if (this.prog != "0") {
				system.alert(this,"Transaksi tidak valid.","Transaksi Aktiva tetap telah di Close.");
				return false;
			}
			try{
				var tgl = new Date();
				uses("server_util_arrayList");
				sql = new server_util_arrayList();
				//mesti hitung ulang
				sql.add("delete from agg_d where modul in ('ASSET','BP','BPP') and tahun = '"+this.eTahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from agg_fasusut_d where tahun= '"+this.eTahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from agg_fasusut_m where tahun ='"+this.eTahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

				sql.add("delete from agg_fa_asset where tahun_agg = '"+this.eTahun.getText()+"' and jenis_agg = 'P' and kode_lokasi = '"+this.app._lokasi+"' ");
				for (var i=0; i < this.sg1.getRowCount();i++){									
					if (this.sg1.rowValid(i) && this.sg1.cells(0,i).toUpperCase() == "APP"){
						var tglOleh = this.sg1.cells(3,i).substr(0,4)+'-'+this.sg1.cells(3,i).substr(4,2)+'-01';
						var tglSusut = this.sg1.cells(10,i).substr(0,4)+'-'+this.sg1.cells(10,i).substr(4,2)+'-01';
						sql.add("insert into agg_fa_asset(no_fa,barcode,kode_lokasi,kode_pp,kode_klpfa,kode_klpakun,kode_lokfa,nik_pnj,kode_brg,nama,kode_curr,kurs,nilai,nilai_residu,kode_drk,catatan,"+
								"                     progress,tgl_perolehan,periode,tgl_susut,nik_user,tgl_input,umur,persen,periode_susut,merk,tipe,no_seri,kode_status,kode_akun,jenis,jenis_agg,status_aktif,tahun_agg,kode_rka2,kode_rka3,jumlah) values "+ //field progress dipakai utk jurnal assetnya --->dr 0 ke 1
								"('"+
								this.sg1.cells(1,i)+"','"+this.sg1.cells(1,i)+"','"+this.app._lokasi+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(6,i)+"','"+this.sg1.cells(8,i)+"','-','-','-','"+
								this.sg1.cells(2,i)+"','IDR',1,"+parseNilai(this.sg1.cells(11,i))+","+
								"0,'-','-','0','"+tglOleh+"','"+this.sg1.cells(3,i)+"','"+tglSusut+"','"+
								this.app._userLog+"',now(),"+parseNilai(this.sg1.cells(14,i))+","+parseNilai(this.sg1.cells(15,i))+",'"+this.sg1.cells(10,i)+"','-','"+
								"-','-','-','"+this.sg1.cells(12,i)+"','-','P','1','"+this.eTahun.getText()+"','"+this.sg1.cells(16,i)+"','"+this.sg1.cells(18,i)+"',"+parseNilai(this.sg1.cells(20,i))+")"); //P = Prediksi
					}
				}
				this.dbLib.execArraySQL(sql);					
			}
			catch(e)
			{
				system.alert(this, e,"");
			}
		}
	},
	doTampil: function(sender){	
		//lihat data yg telah masuk sebelumnya
		if (this.eTahun.getText() != "") {
			var data = this.dbLib.getDataProvider("select a.no_fa,a.nama,periode as tgl_perolehan,a.kode_pp,b.nama as nama_pp,a.kode_klpfa,c.nama as nama_klp,a.kode_klpakun,d.nama as nama_klpakun,periode_susut as tgl_susut,a.nilai,a.kode_akun,e.nama as nama_akun,a.umur,a.persen,a.kode_rka2,f.nama as nama_rka2,a.kode_rka3,g.nama as nama_rka3,a.jumlah "+
												  "from agg_fa_asset a inner join agg_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
												  "                    inner join agg_fa_klp c on a.kode_klpfa=c.kode_klpfa and a.kode_lokasi=c.kode_lokasi "+
												  "                    inner join agg_fa_klpakun d on a.kode_klpakun=d.kode_klpakun and a.kode_lokasi=d.kode_lokasi "+
												  "                    inner join agg_masakun e on a.kode_akun=e.kode_akun and a.kode_lokasi=e.kode_lokasi "+
												  "                    inner join agg_rka f on a.kode_rka2=f.kode_rka and f.tahun=a.tahun_agg "+
												  "                    inner join agg_rka g on a.kode_rka3=g.kode_rka and g.tahun=a.tahun_agg "+
												  "where a.tahun_agg = '"+this.eTahun.getText()+"' and jenis_agg = 'P' and a.kode_lokasi='"+this.app._lokasi+"' and a.status_aktif ='1'");
			eval("data = "+data+";");				
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData(['APP',line.no_fa,line.nama, line.tgl_perolehan,line.kode_pp,line.nama_pp,line.kode_klpfa,line.nama_klp,line.kode_klpakun,line.nama_klpakun,line.tgl_susut, 
										floatToNilai(line.nilai),line.kode_akun,line.nama_akun,line.umur,floatToNilai(line.persen),line.kode_rka2,line.nama_rka2,line.kode_rka3,line.nama_rka3,floatToNilai(line.jumlah)]);
				}
			} else systemAPI.alert(data);
		}
	},
	doLoadData: function(sender){	
		if (this.ePeriode.getText() != "") {
			var data = this.dbLib.getDataProvider("select a.no_fa,a.nama,periode as tgl_perolehan,a.kode_pp,b.nama as nama_pp,a.kode_klpfa,c.nama as nama_klp,a.kode_klpakun,d.nama as nama_klpakun,periode_susut as tgl_susut,a.nilai,a.kode_akun,e.nama as nama_akun,a.umur,a.persen,a.kode_rka2,f.nama as nama_rka2,a.kode_rka3,g.nama as nama_rka3,a.jumlah "+
												  "from agg_fa_asset a inner join agg_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
												  "                    inner join agg_fa_klp c on a.kode_klpfa=c.kode_klpfa and a.kode_lokasi=c.kode_lokasi "+
												  "                    inner join agg_fa_klpakun d on a.kode_klpakun=d.kode_klpakun and a.kode_lokasi=d.kode_lokasi "+
												  "                    inner join agg_masakun e on a.kode_akun=e.kode_akun and a.kode_lokasi=e.kode_lokasi "+
												  "                    inner join agg_rka f on a.kode_rka2=f.kode_rka and f.tahun=a.tahun_agg "+
												  "                    inner join agg_rka g on a.kode_rka3=g.kode_rka and g.tahun=a.tahun_agg "+
												  "where a.tahun_agg = '"+this.ePeriode.getText().substr(0,4)+"' and jenis_agg = 'T' and a.periode between '"+this.ePeriode.getText()+"' and '"+this.ePeriode.getText().substr(0,4)+'12'+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.status_aktif ='1'");
			eval("data = "+data+";");				
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData(['NONAPP',line.no_fa,line.nama, line.tgl_perolehan,line.kode_pp,line.nama_pp,line.kode_klpfa,line.nama_klp,line.kode_klpakun,line.nama_klpakun,line.tgl_susut, 
										floatToNilai(line.nilai),line.kode_akun,line.nama_akun,line.umur,floatToNilai(line.persen),line.kode_rka2,line.nama_rka2,line.kode_rka3,line.nama_rka3,floatToNilai(line.jumlah)]);
				}
			} else systemAPI.alert(data);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);						
					this.sg1.clear(1);
				}
				break;
			case "simpan" :	
				this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;
		}
	},	
	doChange: function(sender)	{
		if (sender == this.eTahun) {
			var thn = parseFloat(this.eTahun.getText()) - 1;
			this.ePeriode.setText(thn+"12");
		
			var data = this.dbLib.getDataProvider("select progress from agg_close where kode_lokasi = '"+this.app._lokasi+"' and modul = 'AKTAP' and tahun = '"+this.eTahun.getText()+"'",true);
			if (typeof data == "object"){
				this.prog = data.rs.rows[0].progress;
			}
		}
		this.sg1.clear(1);
	},
	doEllipsClick: function(sender, col, row) {
		try
		{
			switch(col){
				case 16 : 
						this.standarLib.showListDataForSG(this, "Daftar RKA",this.sg1, this.sg1.row, this.sg1.col, 
														"select kode_rka,nama   from agg_rka where tahun = '"+this.eTahun.getText()+"'",
														"select count(kode_rka) from agg_rka where tahun = '"+this.eTahun.getText()+"'",
														 new Array("kode_rka","nama"),"and",new Array("Kode","Nama"),false);					
						break;
				case 18 : 
						this.standarLib.showListDataForSG(this, "Daftar RKA",this.sg1, this.sg1.row, this.sg1.col, 
														"select kode_rka,nama   from agg_rka where tahun = '"+this.eTahun.getText()+"'",
														"select count(kode_rka) from agg_rka where tahun = '"+this.eTahun.getText()+"'",
														 new Array("kode_rka","nama"),"and",new Array("Kode","Nama"),false);					
						break;
			}
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			try
			{   
				switch(methodName)
				{
					case "execArraySQL" :
						step="info";
					if (result.toLowerCase().search("error") == -1)					
					{
						this.app.alert(this,"transaksi telah sukses tersimpan "+this.eTahun.getText(),"");
						this.app._mainForm.bClear.click();              
					}else system.info(this,result,"");
					break;
				break;
				}    		
			}
			catch(e)
			{
				alert("step : "+step+"; error = "+e);
			}
		}
	}
});

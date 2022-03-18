/**
 * @author mr
 */
window.app_budget_transaksi_fKarAddGar = function(owner)
{
	if (owner)
	{
		window.app_budget_transaksi_fKarAddGar.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_transaksi_fKarAddGar";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Load Data Karyawan Belum Terealisasi : Input/Koreksi",0);
		
		this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,22,180,20],tag:2,caption:"Tahun Anggaran",tipeText:ttAngka,maxLength:4,change:[this,"doChange"]});								
		this.ePeriode = new portalui_saiLabelEdit(this,{bound:[20,23,180,20],tag:2,caption:"Periode CutOff",tipeText:ttAngka,maxLength:6});								
		this.bTampil = new portalui_button(this, {bound: [835, 23, 80, 20],caption: "Tampil"});
		this.i_viewer = new portalui_imageButton(this,{bound:[200,23,20,20],hint:"Load Data",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doLoadData"]});
		
		uses("portalui_saiGrid");
		this.p1 = new portalui_panel(this,{bound:[20,10,900,this.height - 60],caption:"Daftar Karyawan Tahun Angg. [n-1] Belum Terealisasi"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,898,this.p1.height - 45], colCount:13,rowCount:1,
			colTitle:"Status, NIK, Nama Karyawan, Tgl Masuk, Status Kary., Kode Band, Nama Band, Kode Jab, Nama Jabatan, Kode PP, Nama PP, Kode Kota, Nama Kota",
			colWidth:[[0,1,2,3,4,5,6,7,8,9,10,11,12],[70,80,150,80,80,80,80,80,120,80,120,80,120]],readOnly:true,
			buttonStyle:[[0],[bsAuto]],readOnly:true,
			picklist:[[0],[new portalui_arrayMap({items:["APP","NONAPP"]})]]
		});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.sg1.height + 20, 898, 25], grid:this.sg1,buttonStyle:bsTrans});
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
window.app_budget_transaksi_fKarAddGar.extend(window.portalui_childForm);
window.app_budget_transaksi_fKarAddGar.implement({
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
				system.alert(this,"Transaksi tidak valid.","Transaksi SDM telah di Close.");
				return false;
			}
			try{
				var tgl = new Date();
				uses("server_util_arrayList");
				sql = new server_util_arrayList();
				sql.add("delete from agg_karyawan where tahun = '"+this.eTahun.getText()+"' and jenis_agg = 'P' and kode_lokasi = '"+this.app._lokasi+"' ");
				var statusOrg = "";
				//Status, NIK, Nama Karyawan, Tgl Masuk, Status Kary., Kode Band, Nama Band, Kode Jab, Nama Jabatan, Kode PP, Nama PP, Kode Kota, Nama Kota
				for (var i=0; i < this.sg1.getRowCount();i++){			
					if (this.sg1.rowValid(i) && this.sg1.cells(0,i).toUpperCase() == "APP"){
						if (this.sg1.cells(4,i).toUpperCase() == "ORGANIK") statusOrg = "8"; else statusOrg = "9";
						var periode = this.sg1.cells(3,i).split("/");
						if (parseFloat(periode[1]) < 10) periode[1] = "0"+parseFloat(periode[1]);
						periode = periode[2]+periode[1];
						sql.add("insert into agg_karyawan(nik,kode_lokasi,kode_jab,kode_band,kode_kota,nama,tgl_lahir,tgl_masuk,status_org,status,tahun,kode_pp,jenis_agg) values "+ 
								"('"+
								this.sg1.cells(1,i)+"','"+this.app._lokasi+"','"+this.sg1.cells(7,i)+"','"+this.sg1.cells(5,i)+"','"+
								this.sg1.cells(11,i)+"','"+this.sg1.cells(2,i)+"','1900-01-01','"+this.sg1.getCellDateValue(3,i)+"','"+
								statusOrg+"','-','"+this.eTahun.getText()+"','"+this.sg1.cells(9,i)+"','P'"+ 
								")");
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
	},
	doTampil: function(sender){	
		//lihat data yg telah masuk sebelumnya
		if (this.eTahun.getText() != "") {
			var data = this.dbLib.getDataProvider("select a.nik,a.nama, convert(varchar,a.tgl_masuk,103) as tgl_masuk,case when a.status_org='8' then 'ORGANIK' else 'NONORGANIK' end as status_org,a.kode_band,b.nama as nama_band,a.kode_jab,c.nama as nama_jab,a.kode_pp,d.nama as nama_pp,a.kode_kota,f.nama as nama_kota "+
												  "from agg_karyawan a inner join agg_band b on a.kode_band=b.kode_band "+
												  "					   inner join agg_jab c on a.kode_jab=c.kode_jab "+
												  "					   inner join agg_pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi "+
												  "					   inner join agg_kota f on a.kode_kota=f.kode_kota "+
												  "where a.tahun = '"+this.eTahun.getText()+"' and a.jenis_agg = 'P' and a.kode_lokasi='"+this.app._lokasi+"'");
			eval("data = "+data+";");				
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData(['APP',line.nik,line.nama,line.tgl_masuk,line.status_org.toUpperCase(),line.kode_band,line.nama_band,line.kode_jab,line.nama_jab,line.kode_pp,line.nama_pp,line.kode_kota,line.nama_kota]);
				}
			} else systemAPI.alert(data);
		}
	},
	doLoadData: function(sender){	
		if (this.ePeriode.getText() != "") {
			//"Status, NIK, Nama Karyawan, Tgl Masuk, Status Kary., Kode Band, Nama Band, Kode Jab, Nama Jabatan, Kode PP, Nama PP, Kode Kota, Nama Kota
			var data = this.dbLib.getDataProvider("select a.nik,a.nama, convert(varchar,a.tgl_masuk,103) as tgl_masuk,case when a.status_org='8' then 'ORGANIK' else 'NONORGANIK' end as status_org,a.kode_band,b.nama as nama_band,a.kode_jab,c.nama as nama_jab,a.kode_pp,d.nama as nama_pp,a.kode_kota,f.nama as nama_kota "+
												  "from agg_karyawan a inner join agg_band b on a.kode_band=b.kode_band "+
												  "					   inner join agg_jab c on a.kode_jab=c.kode_jab "+
												  "					   inner join agg_pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi "+
												  "					   inner join agg_kota f on a.kode_kota=f.kode_kota "+
												  "where a.tahun = '"+this.ePeriode.getText().substr(0,4)+"' and a.jenis_agg = 'T' and substring(convert(varchar,a.tgl_masuk,112),1,6) between '"+this.ePeriode.getText()+"' and '"+this.ePeriode.getText().substr(0,4)+'12'+"' and a.kode_lokasi='"+this.app._lokasi+"'");
			eval("data = "+data+";");				
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData(['NONAPP',line.nik,line.nama,line.tgl_masuk,line.status_org.toUpperCase(),line.kode_band,line.nama_band,line.kode_jab,line.nama_jab,line.kode_pp,line.nama_pp,line.kode_kota,line.nama_kota]);
				}
			} else systemAPI.alert(data);
		}
	},
	doChange: function(sender)	{
		var thn = parseFloat(this.eTahun.getText()) - 1;
		this.ePeriode.setText(thn+"12");
		var data = this.dbLib.getDataProvider("select progress from agg_close where kode_lokasi = '"+this.app._lokasi+"' and modul = 'SDM' and tahun = '"+this.eTahun.getText()+"'",true);
		if (typeof data == "object"){
			this.prog = data.rs.rows[0].progress;
		}
	}
});

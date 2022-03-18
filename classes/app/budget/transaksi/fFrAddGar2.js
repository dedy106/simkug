/**
 * @author mr
 */
window.app_budget_transaksi_fFrAddGar2 = function(owner)
{
	if (owner)
	{
		window.app_budget_transaksi_fFrAddGar2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_transaksi_fFrAddGar2";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Input Data Aktiva Tetap Belum Terealisasi : Input/Koreksi",0);
		
		this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,23,180,20],tag:2,caption:"Tahun Anggaran",tipeText: ttAngka,maxLength:4,change:[this,"doChange"]});								
		this.bTampil = new portalui_button(this, {bound: [835, 23, 80, 20],caption: "Tampil"});
		
		uses("portalui_saiGrid");
		this.p1 = new portalui_panel(this,{bound:[20,10,900,this.height - 50],caption:"Daftar Aktiva Tetap Tahun Angg. [n-1] Belum Terealisasi"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,898,this.p1.height - 45], colCount:26,rowCount:1,
			colTitle:"No Aktap, Nama Asset, Bulan Perolehan, Kode PP, Nama PP, Kelompok Aktap, Nama Kelompok Aktap, Kelompok Akun, Nama Kelompok Akun, Bulan Susut, Nilai Perolehan, Kode Akun, Nama Akun, Umur Ekon.[Bln], %Susut[Thn],Kode RKA, Nama RKA,Kode RKA BP, Nama RKA BP,Kode RKA BPP, Nama RKA BPP,Kode PP BP,Nama PP BP,Kode PP BPP, Nama PP BPP,Jumlah",
			colWidth:[[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],[80,150,100,70,100,90,110,90,120,100,100,70,100,100,70,100,150,100,150,100,150,100,150,100,150,80]],
			colFormat:[[14,13,10,25],[cfNilai, cfNilai, cfNilai, cfNilai]],
			colReadOnly:[true,[0,4,6,7,8,11,12,13,14,16,18,20,22,24],[]],
			buttonStyle:[[2,3,5,9,15,17,19,21,23],[bsAuto, bsEllips, bsEllips, bsAuto, bsEllips, bsEllips, bsEllips, bsEllips, bsEllips]],
			picklist:[[2,9],[new portalui_arrayMap({items:["01","02","03","04","05","06","07","08","09","10","11","12"]}),new portalui_arrayMap({items:["01","02","03","04","05","06","07","08","09","10","11","12"]})]],
			ellipsClick: [this,"doEllipsClick"],change:[this,"doSgChange"]
		});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.sg1.height + 20, 898, 25], grid:this.sg1,buttonStyle:bsTrans});
		this.rearrangeChild(10,23);
		setTipeButton(tbSimpan);
		this.setTabChildIndex();
		this.sg1.onCellEnter.set(this, "doCellEnter");
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
window.app_budget_transaksi_fFrAddGar2.extend(window.portalui_childForm);
window.app_budget_transaksi_fFrAddGar2.implement({
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
				sql.add("delete from agg_fasusut_d where tahun= '"+this.eTahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from agg_fasusut_m where tahun ='"+this.eTahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from agg_d where modul in ('ASSET','BP','BPP') and tahun = '"+this.eTahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

				sql.add("delete from agg_fa_asset where tahun_agg = '"+this.eTahun.getText()+"' and jenis_agg = 'P' and kode_lokasi = '"+this.app._lokasi+"' ");				
				var periode = this.eTahun.getText()+"XX";
				var format = this.app._lokasi+"-AG"+periode+".";
				var nb = this.standarLib.noBuktiOtomatis(this.dbLib,'agg_fa_asset','no_fa',format,'0000');
				var lastId = parseFloat(nb.substr(format.length),10);			
				var thnBefore = nilaiToFloat(this.eTahun.getText()) -1;
				for (var i=0; i < this.sg1.getRowCount();i++){			
					if (this.sg1.rowValid(i)) {						
						var tglOleh = thnBefore+'-'+this.sg1.cells(2,i)+'-01';
						var tglSusut = thnBefore+'-'+this.sg1.cells(9,i)+'-01';
						sql.add("insert into agg_fa_asset(no_fa,barcode,kode_lokasi,kode_pp,kode_klpfa,kode_klpakun,kode_lokfa,nik_pnj,kode_brg,nama,kode_curr,kurs,nilai,nilai_residu,kode_drk,catatan,"+
									"                     progress,tgl_perolehan,periode,tgl_susut,nik_user,tgl_input,umur,persen,periode_susut,merk,tipe,no_seri,kode_status,kode_akun,jenis,jenis_agg,status_aktif,tahun_agg,kode_rka2,kode_rka3,kode_pp2,kode_pp3,jumlah) values "+ //field progress dipakai utk jurnal assetnya --->dr 0 ke 1
									"('"+
									nb+"','"+nb+"','"+this.app._lokasi+"','"+this.sg1.cells(3,i)+"','"+this.sg1.cells(5,i)+"','"+this.sg1.cells(7,i)+"','-','-','-','"+
									this.sg1.cells(1,i)+"','IDR',1,"+parseNilai(this.sg1.cells(10,i))+","+
									"0,'"+this.sg1.cells(15,i)+"','-','0','"+tglOleh+"','"+thnBefore+this.sg1.cells(2,i)+"','"+tglSusut+"','"+
									this.app._userLog+"',now(),"+parseNilai(this.sg1.cells(13,i))+","+parseNilai(this.sg1.cells(14,i))+",'"+thnBefore+this.sg1.cells(9,i)+"','-','"+
									"-','-','-','"+this.sg1.cells(11,i)+"','-','P','1','"+this.eTahun.getText()+"','"+this.sg1.cells(17,i)+"','"+this.sg1.cells(19,i)+"','"+this.sg1.cells(21,i)+"','"+this.sg1.cells(23,i)+"',"+parseNilai(this.sg1.cells(25,i))+")");
						lastId++;
						this.sg1.cells(0,i, nb);
						nb = format + formatNumeric("0000",lastId.toString());
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
	doChange: function(sender){	
		this.bTampil.click();
		var data = this.dbLib.getDataProvider("select progress from agg_close where kode_lokasi = '"+this.app._lokasi+"' and modul = 'AKTAP' and tahun = '"+this.eTahun.getText()+"'",true);
		if (typeof data == "object"){
			this.prog = data.rs.rows[0].progress;
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
	doCellEnter: function(sender, col, row){
		try{
			switch(col){
				case 0 : 
					var lastId = row+1;
					var nb = this.eTahun.getText() + '.' + formatNumeric("0000",lastId.toString());;
					this.sg1.setCell(0,row,nb);
					break;
			}
		}catch(e){
			alert("doFindBtnClick : " + e);
		}	
	},
	doTampil: function(sender){	
		if (this.eTahun.getText() != "") {
			var data = this.dbLib.getDataProvider("select a.no_fa,a.nama,substring(periode,5,2) as tgl_perolehan,a.kode_pp,b.nama as nama_pp,a.kode_klpfa,c.nama as nama_klp,a.kode_klpakun,d.nama as nama_klpakun,substring(periode_susut,5,2) as tgl_susut,a.nilai,a.kode_akun,e.nama as nama_akun,a.umur,a.persen,a.kode_drk,f.nama as nama_rka,a.kode_rka2,ff.nama as nama_rka2,a.kode_rka3,fff.nama as nama_rka3,a.kode_pp2,a.kode_pp3,bb.nama as nama_pp2,bbb.nama as nama_pp3,a.jumlah "+
												  "from agg_fa_asset a inner join agg_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
												  "                    inner join agg_fa_klp c on a.kode_klpfa=c.kode_klpfa "+
												  "                    inner join agg_fa_klpakun d on a.kode_klpakun=d.kode_klpakun "+
												  "                    inner join agg_masakun e on a.kode_akun=e.kode_akun and a.kode_lokasi=e.kode_lokasi "+
												  "                    inner join agg_rka f on a.kode_drk=f.kode_rka and f.tahun=a.tahun_agg "+
												  "                    inner join agg_rka ff on a.kode_rka2=ff.kode_rka and ff.tahun=a.tahun_agg "+
												  "                    inner join agg_rka fff on a.kode_rka3=fff.kode_rka and fff.tahun=a.tahun_agg "+
												  "					   inner join agg_pp bb on a.kode_pp2=bb.kode_pp and a.kode_lokasi=bb.kode_lokasi "+
												  "					   inner join agg_pp bbb on a.kode_pp3=bbb.kode_pp and a.kode_lokasi=bbb.kode_lokasi "+
												  "where a.tahun_agg = '"+this.eTahun.getText()+"' and a.jenis_agg = 'P' and a.kode_lokasi='"+this.app._lokasi+"' and a.status_aktif ='1'");
			eval("data = "+data+";");				
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData([line.no_fa,line.nama, line.tgl_perolehan,line.kode_pp,line.nama_pp,line.kode_klpfa,line.nama_klp,line.kode_klpakun,line.nama_klpakun,line.tgl_susut, 
										floatToNilai(line.nilai),line.kode_akun,line.nama_akun,line.umur,floatToNilai(line.persen),line.kode_drk,line.nama_rka,line.kode_rka2,line.nama_rka2,line.kode_rka3,line.nama_rka3,line.kode_pp2,line.nama_pp2,line.kode_pp3,line.nama_pp3,floatToNilai(line.jumlah)]);
				}
			} //else systemAPI.alert(data);
		}
	},
	doEllipsClick: function(sender, col, row){
		switch(col){
			case 3:
				this.standarLib.showListDataForSG(this, "Daftar PP",this.sg1, this.sg1.row, this.sg1.col, 
											  "select kode_pp,nama   from agg_pp where kode_lokasi='"+this.app._lokasi+"' and tipe= 'posting'",
											  "select count(kode_pp) from agg_pp where kode_lokasi='"+this.app._lokasi+"' and tipe= 'posting'",
											  new Array("kode_pp","nama"),"and",new Array("Kode","Nama"),false);
			break;
			case 5:
				this.standarLib.showListDataForSG(this, "Daftar Kelompok Aktiva Tetap",this.sg1, this.sg1.row, this.sg1.col, 
											  "select kode_klpfa,nama,kode_klpakun,nilai   from agg_fa_klp where tipe='posting'",
											  "select count(kode_klpfa) from agg_fa_klp where tipe='posting'",
											  new Array("kode_klpfa","nama","kode_klpakun","nilai"),"and",new Array("Kode","Deskripsi","Klp Akun","Nilai Ref"),false);
			break;
			case 15:
				this.standarLib.showListDataForSG(this, "Daftar RKA",this.sg1, this.sg1.row, this.sg1.col, 
											  "select kode_rka,nama   from agg_rka where tahun='"+this.eTahun.getText()+"'",
											  "select count(kode_rka) from agg_rka where tahun='"+this.eTahun.getText()+"'",
											  new Array("kode_rka","nama"),"and",new Array("Kode RKA","Nama"),false);
			break;
			case 17:
				this.standarLib.showListDataForSG(this, "Daftar RKA BP",this.sg1, this.sg1.row, this.sg1.col, 
											  "select kode_rka,nama   from agg_rka where tahun='"+this.eTahun.getText()+"'",
											  "select count(kode_rka) from agg_rka where tahun='"+this.eTahun.getText()+"'",
											  new Array("kode_rka","nama"),"and",new Array("Kode RKA","Nama"),false);
			break;
			case 19:
				this.standarLib.showListDataForSG(this, "Daftar RKA BPP",this.sg1, this.sg1.row, this.sg1.col, 
											  "select kode_rka,nama   from agg_rka where tahun='"+this.eTahun.getText()+"'",
											  "select count(kode_rka) from agg_rka where tahun='"+this.eTahun.getText()+"'",
											  new Array("kode_rka","nama"),"and",new Array("Kode RKA","Nama"),false);
			break;
			case 21:
				this.standarLib.showListDataForSG(this, "Daftar PP Beban Penyusutan",this.sg1, this.sg1.row, this.sg1.col, 
											  "select kode_pp,nama   from agg_pp where kode_lokasi='"+this.app._lokasi+"' and tipe= 'posting'",
											  "select count(kode_pp) from agg_pp where kode_lokasi='"+this.app._lokasi+"' and tipe= 'posting'",
											  new Array("kode_pp","nama"),"and",new Array("Kode","Nama"),false);
			break;
			case 23:
				this.standarLib.showListDataForSG(this, "Daftar PP Beban Pemeliharaan",this.sg1, this.sg1.row, this.sg1.col, 
											  "select kode_pp,nama   from agg_pp where kode_lokasi='"+this.app._lokasi+"' and tipe= 'posting'",
											  "select count(kode_pp) from agg_pp where kode_lokasi='"+this.app._lokasi+"' and tipe= 'posting'",
											  new Array("kode_pp","nama"),"and",new Array("Kode","Nama"),false);
			break;			
		}
	},
	doSgChange: function(sender,col, row){
		switch(col){
			case 2:
				this.sg1.cells(9,row,this.sg1.cells(2,row));
			break;	
			case 5:
				this.sg1.cells(10,row,sender.dataFromList[3]);
				var data = this.dbLib.getDataProvider("select a.*,b.nama as nmakun from agg_fa_klpakun a "+
													  "inner join agg_masakun b on b.kode_lokasi = '"+this.app._lokasi+"' and b.kode_akun = a.kode_akun where a.kode_klpakun = '"+sender.dataFromList[2]+"' ",true);
				if (typeof data != "string"){
					if (data.rs.rows[0] != undefined){
						var line = data.rs.rows[0];
						this.sg1.cells(7,row,line.kode_klpakun);
						this.sg1.cells(8,row,line.nama);
						this.sg1.cells(11,row, line.kode_akun);
						this.sg1.cells(12,row,line.nmakun);
						this.sg1.cells(13,row,line.umur);
						this.sg1.cells(14,row,floatToNilai(line.persen));
					}
				}
			break;
		}
	}
});

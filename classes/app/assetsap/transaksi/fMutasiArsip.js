window.app_assetsap_transaksi_fMutasiArsip = function(owner)
{
	if (owner)
	{
		window.app_assetsap_transaksi_fMutasiArsip.prototype.parent.constructor.call(this,owner);
		this.className  = "app_assetsap_transaksi_fMutasiArsip";
		this.maximize();
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Mutasi Arsip", 0);	
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		try
		{		
			uses("saiCBBL;util_standar;label;datePicker");
			this.ed_kode = new saiLabelEdit(this, {
				bound: [20, 10, 200, 20],
				caption: "No Mutasi"				
			});			
			this.bGen = new button(this,{bound:[230,10,80,20],caption:"Generate",click:"doClick"});		
			this.ed_ba = new saiLabelEdit(this, {
				bound: [20, 32, 600, 20],
				caption: "No. BA"
			});							
			this.lbl1 = new label(this, {
				bound: [20, 33, 100, 20],
				caption: "Tanggal",
				underline : true
			});					
			this.dp_tgl1 = new datePicker(this,{
				bound:[120,33,100,18]
			});		
			this.lbl2 = new label(this, {
				bound: [20, 34, 100, 20],
				caption: "Tanggal Balik",
				underline : true
			});					
			this.dp_tgl2 = new datePicker(this,{
				bound:[120,34,100,18]
			});		
			this.ed_ket = new saiLabelEdit(this,{
				bound:[20,24,600,20],
				caption:"Keterangan"				
			});
			this.ed_setuju = new saiCBBL(this, {
				bound:[20,36,200,20],
				caption:"Disetujui oleh",
				multiSelection:false, 
				sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' ",["nik","nama"], false, ["NIK","Nama"], "and", "Daftar Karyawan", true]
			});
			this.ed_terima = new saiCBBL(this, {
				bound:[20,37,200,20],
				caption:"Diterima oleh",
				multiSelection:false, 
				sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' ",["nik","nama"], false, ["NIK","Nama"], "and", "Daftar Karyawan", true]
			});
			this.ed_buat = new saiCBBL(this, {
				bound:[20,38,200,20],
				caption:"Pembuat",
				multiSelection:false, 
				sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' ",["nik","nama"], false, ["NIK","Nama"], "and", "Daftar Karyawan", true]
			});
			
			this.p1 = new panel(this,{
				bound:[20,39, 900,300],
				caption:"Data Arsip"
			});
			
			this.sg1 = new saiGrid(this.p1,{bound:[1,20,898,250],colCount:9,
					colTitle:"No Arsip,No Sertifikat,Alamat, Propinsi, Kodya, Kecamatan, Kelurahan, Luas Tanah, Luas Bangunan ",
					buttonStyle:[[0],[bsEllips]],colReadOnly:[true,[1,2,3,4,5,6],[]],change:[this, "doSgChange"],ellipsClick:[this,"doEllipsClick"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,150,150,150,150,150,120,80]], rowCount:1,tag:9});			
			this.sgn = new sgNavigator(this.p1,{bound:[1,this.p1.height - 25,898,25],buttonStyle:1, grid:this.sg1});
			
			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);							
			
			this.setTabChildIndex();		
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_assetsap_transaksi_fMutasiArsip.extend(window.childForm);
//------------------------------------------------------------------ event
window.app_assetsap_transaksi_fMutasiArsip.implement({
	mainButtonClick : function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	doModalResult: function(event, modalResult){			
		try{					
			switch (event)
			{
				case "clear" :
					if (modalResult == mrOk)
					{
						this.standarLib.clearByTag(this, new Array("0"),this.ed_kode);				
					}
					break;
				case "simpan" :
					if (modalResult == mrOk)
					{
						
							uses("server_util_arrayList");
							sql = new server_util_arrayList();
							sql.add("insert into amu_mutasi_m(no_mutasi, tanggal, no_ba, keterangan, tgl_balik, nik_setuju, nik_terima, nik_buat, kode_lokasi,nik_user,tgl_input)  values "+
									"('"+this.ed_kode.getText()+"','"+this.dp_tgl1.getDateString()+"','"+this.ed_ba.getText()+"', '"+this.ed_ket.getText()+"' ,'"+this.dp_tgl2.getDateString()+"','"+this.ed_setuju.getText()+"','"+this.ed_terima.getText()+"','"+this.ed_buat.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"',now())");
							var ix;
							for (var i=0; i < this.sg1.getRowCount();i++){
								if (this.sg1.rowValid(i)){
									sql.add("insert into amu_mutasi_d values(no_mutasi, no_arsip, nu) values ('"+this.ed_kode.getText()+"', '"+this.sg1.cells(0,i)+"','"+ix+"'");
								}
							}
							this.dbLib.execArraySQL(sql);							
					}
					break;
				case "ubah" :
					if (modalResult == mrOk)
					{
							uses("server_util_arrayList");					
							var sql = new server_util_arrayList();
							sql.add(" ");
							this.dbLib.execArraySQL(sql);	
					}
					break;
				case "hapus" :
				   if (modalResult == mrOk)
				   {
						uses("server_util_arrayList");					
							var sql = new server_util_arrayList();
							sql.add("delete from amu_mutasi_m where kode_rak='"+this.ed_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
							this.dbLib.execArraySQL(sql);	
				   }
					break;
			}
			this.ed_kode.setFocus();
		}
		catch(e)
		{
			system.alert(this, e,"");
		}	
	},
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'amu_mutasi_m','no_mutasi',this.app._lokasi+"-MTS",'0000000'));
	},
	doSgChange: function(sender, col, row){
		try{
			if (col == 0){
				var data = this.dbLib.getDataProvider("select a.no_surat, a.keterangan, b.alamat, b.kel, b.kec, b.tanah, b.bangun, c.nama as nmprop, d.nama as nmkodya "+
					"	from amu_arsip a inner join amu_lokfa b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi "+
					"	inner join amu_propinsi c on c.kode_prop = b.kode_prop and c.kode_lokasi = b.kode_lokasi "+
					"	inner join amu_kodya d on d.kode_kodya = b.kode_kodya and d.kode_prop = c.kode_prop and d.kode_lokasi=b.kode_lokasi "+
					"where a.no_arsip = '"+sender.cells(0, row)+"' ",true);
				if (typeof data != "string"){
					if (data.rs.rows[0]){
						var line = data.rs.rows[0];					
						sender.editData(row,[line.alamat, line.nmprop, line.nmkodya, line.kec, line.kel, line.tanah, line.bangun], [2,3,4,5,6,7,8]);
					}
				}
			}
		}catch(e){
			alert(e);
		}
	},
	doEllipsClick: function(sender, col, row){
		
		if (col == 0)
			this.standarLib.showListDataForSG(this, "Daftar Arsip",sender, sender.row, col, 
													  "select no_arsip, no_surat, keterangan from amu_arsip a where a.kode_lokasi = '"+this.app._lokasi+"'",
													  "select count(a.no_surat)  from amu_arsip a where a.kode_lokasi = '"+this.app._lokasi+"'",
													  ["a.no_arsip","a.no_surat","keterangan"],"and",["No Arsip","No Sertifikat","Keterangan"],false);
		
	},
	FindBtnClick: function(sender, event){				
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			switch	(methodName)
			{
				case "execArraySQL" :
					if (result.toLowerCase().search("error") == -1)					
					{
					  this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.ed_nama.getText()+")");
					  this.app._mainForm.bClear.click();              
					}else
						 system.alert(this, result,"");
					break;
			}
		}
	}
});

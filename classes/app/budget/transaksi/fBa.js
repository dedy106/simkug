/**
 * @author dweexfuad,dedy,mr
 */
window.app_budget_transaksi_fBa = function(owner)
{
	if (owner)
	{
		window.app_budget_transaksi_fBa.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_transaksi_fBa";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Berita Acara Klarifikasi dan Negosiasi", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("portalui_saiCBBL;portalui_datePicker;util_standar");
			this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,20,180,20],tag:2,caption:"Tahun Anggaran",maxLength:4,change:[this,"doEditChange"]});								
			this.eKode = new portalui_saiLabelEdit(this,{bound:[20,21,200,20],caption:"No BA",tag:7,readOnly:true});									
			this.lTgl = new portalui_label(this,{bound:[20,22,100,18],caption:"Tanggal BA",underline:true});
			this.dTgl = new portalui_datePicker(this,{bound:[120,22,100,18],selectDate:[this,"doSelectDate"]});
			this.lTgl2 = new portalui_label(this,{bound:[20,23,100,18],caption:"Tanggal Mulai",underline:true});
			this.dTgl2 = new portalui_datePicker(this,{bound:[120,23,100,18],selectDate:[this,"doSelectDate"]});
			this.lTgl3 = new portalui_label(this,{bound:[20,24,100,18],caption:"Tanggal Selesai",underline:true});
			this.dTgl3 = new portalui_datePicker(this,{bound:[120,24,100,18],selectDate:[this,"doSelectDate"]});
			
			this.eTempat = new portalui_saiLabelEdit(this,{bound:[20,25,400,20],caption:"Tempat",tag:"1"});									
			this.eKota = new portalui_saiLabelEdit(this,{bound:[20,26,400,20],caption:"Kota",tag:"1"});									
			this.bGen = new portalui_button(this,{bound:[230,33,80,18],caption:"Hitung", click:[this,"doClick"]});			
			/*
			this.eNik1 = new portalui_saiCBBL(this,{bound:[20,27,200,20],caption:"Manajer Area", multiSelection:false,tag:1});					
			this.eNik2 = new portalui_saiCBBL(this,{bound:[20,28,200,20],caption:"Direktur Yakes", multiSelection:false,tag:1});					
			this.eNik3 = new portalui_saiCBBL(this,{bound:[20,29,200,20],caption:"KABID KUG", multiSelection:false,tag:1});					
			this.eNik4 = new portalui_saiCBBL(this,{bound:[20,30,200,20],caption:"KABID UMUM", multiSelection:false,tag:1});					
			this.eNik5 = new portalui_saiCBBL(this,{bound:[20,31,200,20],caption:"KABID YANKESTA", multiSelection:false,tag:1});					
			this.eNik6 = new portalui_saiCBBL(this,{bound:[20,32,200,20],caption:"KABID INVESTASI", multiSelection:false,tag:1});					
			*/
			
			this.eCapex = new portalui_saiLabelEdit(this,{bound:[20,33,200,20], caption:"Nilai Capex",tipeText:ttNilai,readOnly:true,text:"0",tag:"1"});			
			this.ePdpt = new portalui_saiLabelEdit(this,{bound:[20,34,200,20], caption:"Nilai Pendapatan",tipeText:ttNilai,readOnly:true,text:"0",tag:"1"});			
			this.eBeban = new portalui_saiLabelEdit(this,{bound:[20,35,200,20], caption:"Nilai Beban",tipeText:ttNilai,readOnly:true,text:"0",tag:"1"});			
			this.eBP = new portalui_saiLabelEdit(this,{bound:[20,36,200,20], caption:"Nilai BP",tipeText:ttNilai,readOnly:true,text:"0",tag:"1"});			
			this.eCC = new portalui_saiLabelEdit(this,{bound:[20,37,200,20], caption:"Nilai CC",tipeText:ttNilai,readOnly:true,text:"0",tag:"1"});			
			
			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);
			this.maximize();		
			this.setTabChildIndex();				
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();	
			
			var data = this.dbLib.getDataProvider("select year(getdate()) +1 as tahun ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				line = data.rs.rows[0];							
				this.eTahun.setText(line.tahun);
			}
			/*
			this.eNik1.setSQL("select nik, nama from karyawan where jabatan = 'MAN' and kode_lokasi = '"+this.app._lokasi+"' ",["nik","nama"],undefined,["NIK","Nama"],"and","Manajer Area",false);
			this.eNik2.setSQL("select nik, nama from karyawan where jabatan = 'DIR' ",["nik","nama"],undefined,["NIK","Nama"],"and","Direktur",false);
			this.eNik3.setSQL("select nik, nama from karyawan where jabatan = 'KUG' ",["nik","nama"],undefined,["NIK","Nama"],"and","Direktur",false);
			this.eNik4.setSQL("select nik, nama from karyawan where jabatan = 'UM' ",["nik","nama"],undefined,["NIK","Nama"],"and","Direktur",false);
			this.eNik5.setSQL("select nik, nama from karyawan where jabatan = 'YAN' ",["nik","nama"],undefined,["NIK","Nama"],"and","Direktur",false);
			this.eNik6.setSQL("select nik, nama from karyawan where jabatan = 'INV' ",["nik","nama"],undefined,["NIK","Nama"],"and","Direktur",false);
			*/
			
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_transaksi_fBa.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_transaksi_fBa.implement({
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return;
		try{
			
			switch (event)
			{
				case "clear" :
					this.standarLib.clearByTag(this, new Array("0","1"),this.eNik);												
					break;
				case "simpan" :
					if (this.standarLib.checkEmptyByTag(this, [0,1]))
					{
						uses("server_util_arrayList");
						sql = new server_util_arrayList();						 
						sql.add("delete from agg_ba where kode_lokasi = '"+this.app._lokasi+"' and tahun='"+this.eTahun.getText()+"'");
						sql.add("insert into agg_ba(no_ba,kode_lokasi,tahun,tgl_ba,tgl_mulai,tgl_selesai,tempat,kota,nik1,nik2,nik3,nik4,nik5,nik6,n1,n2,n3,n4,n5) values "+
								"('"+this.eKode.getText()+"','"+this.app._lokasi+"','"+this.eTahun.getText()+"','"+this.dTgl.getDateString()+"','"+this.dTgl2.getDateString()+"','"+this.dTgl3.getDateString()+"','"+this.eTempat.getText()+"','"+this.eKota.getText()+"','"+this.nik1+"','"+this.nik2+"','"+this.nik3+"','"+this.nik4+"','"+this.nik5+"','"+this.nik6+"',"+parseNilai(this.eCapex.getText())+","+parseNilai(this.ePdpt.getText())+","+parseNilai(this.eBeban.getText())+","+parseNilai(this.eBP.getText())+","+parseNilai(this.eCC.getText())+")");				

						this.dbLib.execArraySQL(sql);					
						this.standarLib.clearByTag(this, new Array("0","1"),this.eTahun);	
					}
					break;
				/*
				case "ubah" :	
					if (this.standarLib.checkEmptyByTag(this, [0,1]))
					{	
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
					
						sql.add("delete from agg_d where no_bukti = '"+this.eKode.getText()+"' and modul='BTPKU' and kode_lokasi='"+this.app._lokasi+"' and tahun= '"+this.eTahun.getText()+"' ");
						sql.add("update agg_tpku set kode_tpku='"+this.eJenis.getText()+"',p_derita="+parseNilai(this.ePderita.getText())+",p_kunjungan="+parseNilai(this.ePkunj.getText())+",jml_kunjungan="+parseNilai(this.eKunj.getText())+",p_diskon="+parseNilai(this.eDiskon.getText())+",tarif_final="+parseNilai(this.eTarifFinal.getText())+",tarif="+parseNilai(this.eTarif.getText())+",nilai_final="+parseNilai(this.eFinal.getText())+",jumlah="+parseNilai(this.eJml.getText())+",kode_akun='"+this.eAkun.getText()+"',kode_rka='"+this.eRka.getText()+"',kode_pp='"+this.ePP.getText()+"',nilai="+parseNilai(this.eNilai.getText())+",kode_kota='"+this.eKota.getText()+"',alamat='"+this.eAlamat.getText()+"',dokter='"+this.eNama.getText()+"'  "+
							    "where no_kontrak = '"+this.eKode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and tahun='"+this.eTahun.getText()+"'");
						
						sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul,keterangan,progress) "+
								"		select a.kode_lokasi,c.kode_pk,b.kode_drk,b.kode_rka,a.kode_akun,a.kode_pp,a.periode,substring(a.periode,5,2),1,1,a.nilai_final,'"+this.eKode.getText()+"','"+this.eTahun.getText()+"','BTPKU',b.nama,'0' "+  
								"		from agg_tpku a "+
								"					   inner join agg_rka b on a.kode_rka=b.kode_rka and substring(a.periode,1,4)=b.tahun "+
								"					   inner join agg_drk c on b.kode_drk=c.kode_drk and b.tahun=c.tahun "+						
								"		where no_kontrak = '"+this.eKode.getText()+"' and a.nilai<> 0 and a.periode like '"+this.eTahun.getText()+"%' and a.kode_lokasi='"+this.app._lokasi+"'");				
						
						this.dbLib.execArraySQL(sql);	
						this.standarLib.clearByTag(this, new Array("0","1"),this.eTahun);
					}
					break;
				case "hapus" :
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("delete from agg_tpku where no_kontrak = '"+this.eKode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and tahun='"+this.eTahun.getText()+"'");
					sql.add("delete from agg_d where  no_bukti = '"+this.eKode.getText()+"' and modul='BTPKU' and kode_lokasi='"+this.app._lokasi+"' and tahun= '"+this.eTahun.getText()+"' ");
					this.dbLib.execArraySQL(sql);	
					this.standarLib.clearByTag(this, new Array("0","1"),this.eTahun);	
					break;
					*/
			}
			
		}catch(e){
			system.alert(this, e,"");
		}
	},
	keyPress: function(sender, charCode, buttonState ){
	},
	doClick: function(sender){
		try{			
			var data = this.dbLib.getDataProvider("select nik from karyawan where jabatan = 'MAN' and kode_lokasi = '"+this.app._lokasi+"' ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					this.nik1 = line.nik; 
				}
			}
			var data = this.dbLib.getDataProvider("select nik,jabatan from karyawan where jabatan in ('DIR','KUG','UM','YAN','INV') ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					if (line.jabatan == "DIR") this.nik2 = line.nik; 
					if (line.jabatan == "KUG") this.nik3 = line.nik; 
					if (line.jabatan == "UM") this.nik4 = line.nik; 
					if (line.jabatan == "YAN") this.nik5 = line.nik; 
					if (line.jabatan == "INV") this.nik6 = line.nik; 
				}
			}
			sql="call sp_agg_rkap ('FS1','0','"+this.eTahun.getText()+"','"+this.app._lokasi+"','"+this.app._lokasi+"','"+this.app._lokasi+"','"+this.app._nikUser+"')";
			this.dbLib.execQuerySync(sql);	
			
			var data = this.dbLib.getDataProvider(
				"select kode_neraca,kode_lokasi,n5  "+
				"from agg_neraca_tmp where kode_neraca in ('1412','31T','41T','115T','5302T') and nik_user='"+this.app._nikUser+"' ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					if (line.kode_neraca == "1412") this.eCapex.setText(floatToNilai(line.n5)); 
					if (line.kode_neraca == "31T") this.ePdpt.setText(floatToNilai(line.n5));
					if (line.kode_neraca == "41T") this.eBeban.setText(floatToNilai(line.n5));
					if (line.kode_neraca == "115T") this.eBP.setText(floatToNilai(line.n5));
					if (line.kode_neraca == "5302T") this.eCC.setText(floatToNilai(line.n5));
				}
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doEditChange: function(sender){
		this.eKode.setText("BA-"+this.eTahun.getText()+'.'+this.app._lokasi);
	},
	doRequestReady: function(sender, methodName, result){	
		if (sender == this.dbLib)
		{
			switch	(methodName)
			{
				case "execArraySQL" :
					if (result.toLowerCase().search("error") == -1)
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.eKode.getText()+")");
					else this.app._mainForm.pesan(0, result); 
					break;
			}
		}
	}
});
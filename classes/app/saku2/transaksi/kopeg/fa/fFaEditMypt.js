window.app_saku2_transaksi_kopeg_fa_fFaEditMypt = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_fa_fFaEditMypt.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_fa_fFaEditMypt";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Edit Data Aktiva Tetap : Edit", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;");		
		this.cb_fa = new saiCBBL(this,{bound:[20,10,220,20],caption:"No Aktap",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});
		this.e_nama = new portalui_saiLabelEdit(this,{bound:[20,18,432,20],caption:"Deskripsi",maxLength:150, tag:1});		
		this.e_seri = new portalui_saiLabelEdit(this,{bound:[20,19,432,20],caption:"Nomor Seri",maxLength:50, tag:1});
		this.e_merk = new portalui_saiLabelEdit(this,{bound:[20,17,432,20],caption:"Merk",maxLength:100, tag:1});
		this.e_tipe = new portalui_saiLabelEdit(this,{bound:[20,16,432,20],caption:"Tipe",maxLength:100, tag:1});		
		this.e_nilai = new saiLabelEdit(this,{bound:[20,18,202,20],caption:"Nilai Perolehan", tag:1, tipeText:ttNilai, text:"0",readOnly:true});		
		this.e_residu = new saiLabelEdit(this,{bound:[250,18,202,20],caption:"Nilai Residu", tag:1, tipeText:ttNilai, text:"0"});		
		this.e_totSusut = new saiLabelEdit(this,{bound:[20,19,202,20],caption:"Total Penyusutan", tag:1, tipeText:ttNilai, text:"0", readOnly:true});		
		this.e_buku = new saiLabelEdit(this,{bound:[20,20,202,20],caption:"Nilai Buku", tag:1, tipeText:ttNilai, text:"0", readOnly:true});		
		this.l_tgl2 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Perolehan", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,11,100,18]}); 
		this.l_tgl3 = new portalui_label(this,{bound:[20,12,100,18],caption:"Tgl Awal Susut", underline:true});
		this.dp_d3 = new portalui_datePicker(this,{bound:[120,12,100,18]}); 
		this.cb_lokasi = new saiCBBL(this,{bound:[20,19,205,20],caption:"Lokasi", multiSelection:false, maxLength:10, tag:1});
		this.cb_pp1 = new saiCBBL(this,{bound:[20,18,205,20],caption:"PP Aktap", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});
		this.cb_pp2 = new saiCBBL(this,{bound:[20,19,205,20],caption:"PP Penyusutan", multiSelection:false, maxLength:10, tag:1});
		this.cb_buat = new saiCBBL(this,{bound:[20,18,205,20],caption:"NIK Pnj", multiSelection:false, maxLength:10, tag:1});		
		this.cb_klp = new saiCBBL(this,{bound:[20,13,205,20],caption:"Kelompok Aktap", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});
		this.cb_klpakun = new saiCBBL(this,{bound:[20,14,205,20],caption:"Kelompok Akun", readOnly:true, tag:1});
		this.e_akun = new portalui_saiLabelEdit(this,{bound:[20,15,432,20],caption:"Akun Aktap",readOnly:true});
		this.e_bp = new portalui_saiLabelEdit(this,{bound:[20,16,432,20],caption:"Akun Bbn Susut",readOnly:true});
		this.e_ap = new portalui_saiLabelEdit(this,{bound:[20,17,432,20],caption:"Akun Akum Susut",readOnly:true});
		this.e_umur = new saiLabelEdit(this,{bound:[20,16,180,20],caption:"Umur [Bulan]", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_persen = new saiLabelEdit(this,{bound:[272,16,180,20],caption:"% Susut [Tahun]", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
						
			this.cb_lokasi.setSQL("select kode_lokfa, nama from fa_lokasi where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",["kode_lokfa","nama"],false,["Kode","Nama"],"and","Data Lokasi Aktap",true);
			this.cb_klp.setSQL("select kode_klpfa, nama from fa_klp where kode_lokasi='"+this.app._lokasi+"'",["kode_klpfa","nama"],false,["Kode","Nama"],"and","Data Kelompok Aktap",true);
			this.cb_pp1.setSQL("select kode_pp, nama from pp where tipe = 'posting' and flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_pp2.setSQL("select kode_pp, nama from pp where tipe = 'posting' and flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_fa_fFaEditMypt.extend(window.childForm);
window.app_saku2_transaksi_kopeg_fa_fFaEditMypt.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					var periode = this.dp_d2.getDateString().substr(0,4)+this.dp_d2.getDateString().substr(5,2);
					var periodeSusut = this.dp_d3.getDateString().substr(0,4)+this.dp_d3.getDateString().substr(5,2);
					
					var nsusut = Math.round(nilaiToFloat(this.e_nilai.getText()) / nilaiToFloat(this.e_umur.getText()));
					sql.add("update fa_asset set nilai_susut="+nsusut+",kode_lokfa='"+this.cb_lokasi.getText()+"',nik_pnj='"+this.cb_buat.getText()+"',kode_klpfa='"+this.cb_klp.getText()+"',kode_klpakun='"+this.cb_klpakun.getText()+"',kode_akun='"+this.kodeakun+"',umur="+parseNilai(this.e_umur.getText())+",persen="+parseNilai(this.e_persen.getText())+",nama='"+this.e_nama.getText()+"',merk='"+this.e_merk.getText()+"',tipe='"+this.e_tipe.getText()+"',no_seri='"+this.e_seri.getText()+"',nilai="+parseNilai(this.e_nilai.getText())+",nilai_residu="+parseNilai(this.e_residu.getText())+",kode_pp='"+this.cb_pp1.getText()+"',kode_pp_susut='"+this.cb_pp2.getText()+"',tgl_perolehan='"+this.dp_d2.getDateString()+"',tgl_susut='"+this.dp_d3.getDateString()+"',periode='"+periode+"',periode_susut='"+periodeSusut+"',nik_user='"+this.app._userLog+"',tgl_input=getdate() where no_fa='"+this.cb_fa.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
										
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_fa);
					setTipeButton(tbUbahHapus);
				break;
			case "ubah" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (Math.abs(nilaiToFloat(this.e_nilai.getText())) < Math.abs(nilaiToFloat(this.e_totSusut.getText()))){
					system.alert(this,"Transaksi tidak valid.","Nilai Perolehan kurang dari Total Penyusutan.");
					return false;
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :	
					this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
					if (nilaiToFloat(this.e_totSusut.getText())!=0){
						system.alert(this,"Transaksi tidak valid.","No FA sudah pernah disusutkan.");
						return false;
					}
					else {
						var sql = new server_util_arrayList();
						sql.add("delete from fa_asset where no_fa='"+this.cb_fa.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
						setTipeButton(tbAllFalse);					
						this.dbLib.execArraySQL(sql);
					}
				break;				
		}
	},
	doChange:function(sender){	
		if (sender == this.cb_fa && this.cb_fa.getText() != ""){
			this.standarLib.clearByTag(this, new Array("1"),undefined);
			var strSQL = "select a.nama,a.no_seri,a.merk,a.tipe,a.nilai,a.nilai_residu,isnull(d.tot_susut,0) as tot_susut,(a.nilai-a.nilai_residu-isnull(d.tot_susut,0)) as nilai_buku,convert(varchar,a.tgl_perolehan,103) as tgl_perolehan,convert(varchar,a.tgl_susut,103) as tgl_susut,a.kode_klpakun,a.kode_klpfa, "+
						 "  b.kode_akun,x.nama as nama_akun,b.akun_bp,z.nama as nama_bp,b.akun_deprs,y.nama as nama_deprs,a.kode_pp,c.nama as nama_pp,a.umur,a.kode_pp_susut,c.nama as nama_pp_susut,bb.nama as nama_klp,b.nama as nama_klpakun,a.persen, "+
						 "  a.kode_lokfa,zz.nama as nama_lokfa,a.nik_pnj,zzz.nama as nama_pnj "+
						 "from fa_asset a  "+
						 "inner join fa_klpakun b on a.kode_klpakun=b.kode_klpakun and a.kode_lokasi=b.kode_lokasi "+
						 "inner join fa_klp bb on a.kode_klpfa=bb.kode_klpfa and a.kode_lokasi=bb.kode_lokasi "+
						 "inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						 "inner join pp cc on a.kode_pp_susut=cc.kode_pp and a.kode_lokasi=cc.kode_lokasi "+
						 "inner join masakun x on b.kode_akun=x.kode_akun and b.kode_lokasi=x.kode_lokasi "+
						 "inner join masakun y on b.akun_deprs=y.kode_akun and b.kode_lokasi=y.kode_lokasi "+
						 "inner join masakun z on b.akun_bp=z.kode_akun and b.kode_lokasi=z.kode_lokasi "+
						 "inner join fa_lokasi zz on a.kode_lokfa=zz.kode_lokfa and a.kode_lokasi=zz.kode_lokasi "+
						 "inner join karyawan zzz on a.nik_pnj=zzz.nik and a.kode_lokasi=zzz.kode_lokasi "+
						 "left join "+
						 "   (select no_fa,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_susut "+
						 "	  from fasusut_d group by no_fa,kode_lokasi) d on a.no_fa=d.no_fa and a.kode_lokasi=d.kode_lokasi "+
						 "where a.no_fa='"+this.cb_fa.getText()+"' and a.progress in ('1','2') and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){	
					this.e_nama.setText(line.nama);
					this.e_seri.setText(line.no_seri);
					this.e_tipe.setText(line.tipe);
					this.e_merk.setText(line.merk);
					this.e_nilai.setText(floatToNilai(line.nilai));
					this.e_residu.setText(floatToNilai(line.nilai_residu));
					this.e_totSusut.setText(floatToNilai(line.tot_susut));
					this.e_buku.setText(floatToNilai(line.nilai_buku));
					this.dp_d2.setText(line.tgl_perolehan);
					this.dp_d3.setText(line.tgl_susut);
					this.cb_pp1.setText(line.kode_pp,line.nama_pp);
					this.cb_pp2.setText(line.kode_pp_susut,line.nama_pp_susut);
					this.cb_klp.setText(line.kode_klpfa,line.nama_klp);
					this.cb_klpakun.setText(line.kode_klpakun,line.nama_klpakun);
					this.cb_lokasi.setText(line.kode_lokfa,line.nama_lokfa);
					this.cb_buat.setText(line.nik_pnj,line.nama_pnj);
					this.e_akun.setText(line.kode_akun+ " - " + line.nama_akun);
					this.e_bp.setText(line.akun_bp+ " - " + line.nama_bp);
					this.e_ap.setText(line.akun_deprs+ " - " + line.nama_deprs);
					this.e_umur.setText(floatToNilai(line.umur));
					this.e_persen.setText(floatToNilai(line.persen));
				}
			}
		}
		if (sender == this.cb_klp && this.cb_klp.getText() != "") {
			var data = this.dbLib.getDataProvider(
			           "select a.kode_klpakun,b.nama,b.kode_akun,c.nama as nama_akun,b.umur,b.persen "+
					   "from fa_klp a "+
			           "	 inner join fa_klpakun b on a.kode_klpakun=b.kode_klpakun and a.kode_lokasi=b.kode_lokasi "+
					   "	 inner join masakun c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi "+
					   "where a.kode_klpfa = '"+this.cb_klp.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.cb_klpakun.setText(line.kode_klpakun,line.nama);
					this.e_akun.setText(line.kode_akun + " - "+line.nama_akun);
					this.kodeakun = line.kode_akun;
					this.e_umur.setText(floatToNilai(line.umur));
					this.e_persen.setText(floatToNilai(line.persen));
				} 
			} 
		}
		if (sender == this.cb_pp1 && this.cb_pp1.getText() != "") {
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_pp='"+this.cb_pp1.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pnj",true);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_fa) {   
			    this.standarLib.showListData(this, "Daftar Aktiva Tetap",sender,undefined, 
											  "select no_fa, nama  from fa_asset where progress in ('1','2') and kode_lokasi='"+this.app._lokasi+"'",
											  "select count(no_fa) from fa_asset where progress in ('1','2') and kode_lokasi='"+this.app._lokasi+"'",
											  ["no_fa","nama"],"and",["No FA","Deskripsi"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.cb_fa.getText()+")","");							
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
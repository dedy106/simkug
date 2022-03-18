window.app_saku3_transaksi_bangtel_aset_fFaEdit = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_bangtel_aset_fFaEdit.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_bangtel_aset_fFaEdit";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Edit Data Barang", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		
		this.cb_fa = new saiCBBL(this,{bound:[20,18,250,20],caption:"Data Barang", multiSelection:false, maxLength:10, tag:9,change:[this,"doLoad"]});
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Akiva Tetap"]});			
		this.e_periode = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"Periode Perolehan",tag:2,readOnly:true});
		this.e_persusut = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,200,20],caption:"Flag Susut",tag:2,readOnly:true});
		this.e_tgloleh = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,200,20],caption:"Tgl Perolehan",tag:2,readOnly:true});		
		this.e_nama = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,432,20],caption:"Deskripsi",maxLength:150,tag:1});				
		this.e_seri = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,19,432,20],caption:"Nomor Seri",maxLength:50, tag:1});
		this.e_merk = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,432,20],caption:"Merk",maxLength:100, tag:1});
		this.e_tipe = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,432,20],caption:"Tipe",maxLength:100, tag:1});		
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,200,20],caption:"Nilai Perolehan", tag:1, tipeText:ttNilai, text:"0",readOnly:true});				
		this.e_residu = new saiLabelEdit(this.pc2.childPage[0],{bound:[252,18,200,20],caption:"Nilai Residu", tag:1, tipeText:ttNilai, text:"0"});		
		this.e_akum = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,20,200,20],caption:"Total Akumulasi", tag:1, tipeText:ttNilai, text:"0", readOnly:true});				
		this.cb_pp1 = new saiCBBL(this.pc2.childPage[0],{bound:[20,18,220,20],caption:"PP Aktap-Barang", multiSelection:false, maxLength:10, tag:1});
		this.cb_pp2 = new saiCBBL(this.pc2.childPage[0],{bound:[20,19,220,20],caption:"PP Penyusutan", multiSelection:false, maxLength:10, tag:1});				
		this.e_klpfa = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,432,20],caption:"Kelompok Barang",readOnly:true});
		this.e_klpakun = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,432,20],caption:"Kelompok Akun",readOnly:true});
		this.e_akun = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,432,20],caption:"Akun Aktap",readOnly:true});
		this.e_umur = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"Umur [Bulan]", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_persen = new saiLabelEdit(this.pc2.childPage[0],{bound:[272,16,180,20],caption:"% Susut [Tahun]", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,432,20],caption:"No Bukti Jurnal",readOnly:true});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
									
			this.cb_pp1.setSQL("select kode_pp, nama from pp where tipe = 'posting' and flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_pp2.setSQL("select kode_pp, nama from pp where tipe = 'posting' and flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);			

			this.cb_fa.setSQL("select no_fa, nama from fa_asset where jenis in ('A','I') and kode_lokasi='"+this.app._lokasi+"'",["no_fa","nama"],false,["No Barang","Nama"],"and","Data FA",true);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_bangtel_aset_fFaEdit.extend(window.childForm);
window.app_saku3_transaksi_bangtel_aset_fFaEdit.implement({
	doLoad: function(sender) {
		if (this.cb_fa.getText() != "") {			
			var strSQL = "select a.periode,a.periode_susut,convert(varchar,a.tgl_perolehan,103) as tgl_perolehan,a.nama,a.no_seri,a.merk,a.tipe,a.nilai_residu,a.kode_pp,a.kode_pp_susut "+
					     ",c.kode_klpfa+'-'+c.nama as klpfa,d.kode_klpakun+'-'+d.nama as klpakun,d.kode_akun+'-'+e.nama as akun, a.umur,a.persen,a.catatan "+
						 ",zz.nilai as holeh, isnull(b.susut,0) as susut,c.jenis as jenis_klp "+
						 "from fa_asset a "+
						 "     inner join (select no_fa,sum(case dc when 'D' then nilai else -nilai end) as nilai "+
						 "                 from fa_nilai where kode_lokasi='"+this.app._lokasi+"' "+
						 "				   group by kode_lokasi,no_fa) zz on a.no_fa=zz.no_fa  "+
						 "		inner join fa_klp c on a.kode_klpfa=c.kode_klpfa and a.kode_lokasi=c.kode_lokasi "+
						 "		inner join fa_klpakun d on a.kode_klpakun=d.kode_klpakun and a.kode_lokasi=d.kode_lokasi "+
						 "		inner join masakun e on d.kode_akun=e.kode_akun and d.kode_lokasi=e.kode_lokasi "+
						 "   	left join (select no_fa,sum(case dc when 'D' then nilai else -nilai end) as susut "+
						 "				   from fasusut_d where kode_lokasi ='"+this.app._lokasi+"' "+
						 "				   group by no_fa) b on a.no_fa=b.no_fa "+
						 "where a.no_fa='"+this.cb_fa.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){		
					this.jenis = line.jenis_klp;						
					if (this.jenis == "A") {
						this.cb_pp2.setTag("1");
						this.cb_pp2.setReadOnly(false);
						this.cb_pp2.setSQL("select kode_pp, nama from pp where tipe = 'posting' and flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
					}
					else {
						this.cb_pp2.setTag("9");
						this.cb_pp2.setReadOnly(true);
						this.cb_pp2.setSQL("select '-' as kode_pp, '-' as nama",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
					}
								
					this.e_periode.setText(line.periode);
					this.e_persusut.setText(line.periode_susut);
					this.e_tgloleh.setText(line.tgl_perolehan);
					this.e_nama.setText(line.nama);
					this.e_seri.setText(line.no_seri);
					this.e_merk.setText(line.merk);
					this.e_tipe.setText(line.tipe);
					this.e_nilai.setText(floatToNilai(line.holeh));
					this.e_residu.setText(floatToNilai(line.nilai_residu));					
					this.e_akum.setText(floatToNilai(line.susut));	
					this.e_umur.setText(floatToNilai(line.umur));
					this.e_persen.setText(floatToNilai(line.persen));						
					this.cb_pp1.setText(line.kode_pp);
					this.cb_pp2.setText(line.kode_pp_susut);					
					this.e_klpfa.setText(line.klpfa);
					this.e_klpakun.setText(line.klpakun);
					this.e_akun.setText(line.akun);
					this.e_nb.setText(line.catatan);					
				} 
			}
		}		
	},
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
					sql.add("update fa_asset set nama='"+this.e_nama.getText()+"',no_seri='"+this.e_seri.getText()+"',merk='"+this.e_merk.getText()+"',tipe='"+this.e_tipe.getText()+"',nilai_residu="+nilaiToFloat(this.e_residu.getText())+",kode_pp='"+this.cb_pp1.getText()+"',kode_pp_susut='"+this.cb_pp2.getText()+"' where no_fa='"+this.cb_fa.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
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
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
				case "hapus" :					
					uses("server_util_arrayList");
					var data2 = this.dbLib.getDataProvider("select isnull(count(*),0)  as jml from fasusut_d where no_fa='"+this.cb_fa.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
						var line2 = data2.rs.rows[0];
						if (line2.jml != 0 ) {
							system.alert(this,"Transaksi tidak valid.","Sudah pernah disusutkan, data tidak bisa dihapus.");
							return false;						
						}
					}	
					var sql = new server_util_arrayList();
					sql.add("delete from fa_asset where no_fa='"+this.cb_fa.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from fa_nilai where no_fa='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);				
				break;
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
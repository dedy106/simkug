window.app_saku3_transaksi_ypt_logistik_fFaEdit = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ypt_logistik_fFaEdit.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ypt_logistik_fFaEdit";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Edit Data Aktiva Tetap", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;");		
		
		this.e_fa = new saiCBBL(this,{bound:[20,10,220,20],caption:"ID Barang", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"],rightLabelVisible:false});
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,12,200,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl2 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Perolehan", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_tgl2 = new saiEdit(this,{bound:[120,11,100,20],tag:9,text:"",readOnly:true,visible:false});		

		this.e_nama = new portalui_saiLabelEdit(this,{bound:[20,18,430,20],caption:"Deskripsi",maxLength:150,tag:1});				
		this.e_seri = new portalui_saiLabelEdit(this,{bound:[20,19,430,20],caption:"Nomor Seri",maxLength:50, tag:1});
		this.e_merk = new portalui_saiLabelEdit(this,{bound:[20,17,430,20],caption:"Merk",maxLength:100, tag:1});
		this.e_tipe = new portalui_saiLabelEdit(this,{bound:[20,16,430,20],caption:"Tipe",maxLength:100, tag:1});
		this.e_nilai = new saiLabelEdit(this,{bound:[20,18,200,20],caption:"Nilai Perolehan", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.e_residu = new saiLabelEdit(this,{bound:[250,18,200,20],caption:"Nilai Residu", tag:1, tipeText:ttNilai, text:"0"});		
		this.e_akum = new saiLabelEdit(this,{bound:[20,19,200,20],caption:"Total Susut", tag:1, tipeText:ttNilai, text:"0",readOnly:true});		
		this.l_tgl3 = new portalui_label(this,{bound:[20,12,100,18],caption:"Tgl Awal Susut", underline:true});
		this.dp_d3 = new portalui_datePicker(this,{bound:[120,12,98,18]}); 				
		this.e_tgl3 = new saiEdit(this,{bound:[120,12,100,20],tag:9,text:"",readOnly:true,visible:false});		

		this.cb_pp1 = new saiCBBL(this,{bound:[20,18,220,20],caption:"PP Aktap", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});
		this.cb_pp2 = new saiCBBL(this,{bound:[20,19,220,20],caption:"PP Penyusutan", multiSelection:false, maxLength:10, tag:1});		
		this.cb_klp = new saiCBBL(this,{bound:[20,13,220,20],caption:"Kelompok Aktap", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});
		this.cb_klpakun = new saiCBBL(this,{bound:[20,14,220,20],caption:"Kelompok Akun", readOnly:true, tag:1});
		this.e_akun = new portalui_saiLabelEdit(this,{bound:[20,15,432,20],caption:"Akun Aktap",readOnly:true});
		this.e_umur = new saiLabelEdit(this,{bound:[20,16,200,20],caption:"Umur [Bulan]", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.e_persen = new saiLabelEdit(this,{bound:[272,16,180,20],caption:"% Susut [Tahun]", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,18,200,20],caption:"No Bukti",maxLength:50});
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d2,this.dp_d2.year,this.dp_d2.month,this.dp_d2.day);
								
			this.e_fa.setSQL("select a.no_fa, a.nama from fa_asset a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.kode_lokasi='"+this.app._lokasi+"'",["no_fa","nama"],false,["ID","Nama"],"where","Data Barang",true);

			this.cb_klp.setSQL("select kode_klpfa, nama from fa_klp where jenis='A' and kode_lokasi='"+this.app._lokasi+"'",["kode_klpfa","nama"],false,["Kode","Nama"],"where","Data Kelompok Aktap",true);
			this.cb_pp1.setSQL("select kode_pp, nama from pp where tipe = 'posting' and flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_pp2.setSQL("select kode_pp, nama from pp where tipe = 'posting' and flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ypt_logistik_fFaEdit.extend(window.childForm);
window.app_saku3_transaksi_ypt_logistik_fFaEdit.implement({
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
					if (this.e_akum.getText() == "0") {
						var periode = this.dp_d2.getDateString().substr(0,4)+this.dp_d2.getDateString().substr(5,2);
						var periodeSusut = this.dp_d3.getDateString().substr(0,4)+this.dp_d3.getDateString().substr(5,2);
					}
					else {
						var periode = this.periode;
						var periodeSusut = this.periodeSusut;
					}
					
					var nsusut = Math.round(nilaiToFloat(this.e_nilai.getText()) / nilaiToFloat(this.e_umur.getText()));
					
					if (this.e_akum.getText() == "0") {
						sql.add("delete from fa_asset where no_fa='"+this.e_fa.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from fa_nilai where no_fa='"+this.e_fa.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

						sql.add("insert into fa_asset(no_fa,kode_lokasi,kode_klpfa,kode_klpakun,kode_akun,umur,persen,nama,merk,tipe,no_seri,nilai,nilai_residu,kode_pp,kode_pp_susut,tgl_perolehan,tgl_susut,periode,periode_susut,progress,nik_user,tgl_input,catatan,kode_lokfa,nik_pnj,nilai_susut,jenis,akum_nilai) values "+
								"('"+this.e_fa.getText()+"','"+this.app._lokasi+"','"+this.cb_klp.getText()+"','"+this.cb_klpakun.getText()+"','"+this.kodeakun+"',"+parseNilai(this.e_umur.getText())+","+parseNilai(this.e_persen.getText())+",'"+this.e_nama.getText()+"','"+this.e_merk.getText()+"','"+this.e_tipe.getText()+"','"+this.e_seri.getText()+"',"+parseNilai(this.e_nilai.getText())+","+parseNilai(this.e_residu.getText())+",'"+this.cb_pp1.getText()+"','"+this.cb_pp2.getText()+"','"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"','"+periode+"','"+periodeSusut+"','2','"+this.app._userLog+"',getdate(),'"+this.e_nb.getText()+"','-','-',"+nsusut+",'A',0)");						
						sql.add("insert into fa_nilai(no_fa,kode_lokasi,no_bukti,dc,nilai,periode) values "+
								"('"+this.e_fa.getText()+"','"+this.app._lokasi+"','"+this.e_nb.getText()+"','D',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.e_periode.getText()+"')");
					}
					else {
						sql.add("update fa_asset set kode_klpfa='"+this.cb_klp.getText()+"',kode_klpakun='"+this.cb_klpakun.getText()+"',kode_akun='"+this.kodeakun+"', "+
								"umur="+nilaiToFloat(this.e_umur.getText())+",persen="+nilaiToFloat(this.e_persen.getText())+",nilai_residu="+nilaiToFloat(this.e_residu.getText())+", "+
								"nama='"+this.e_nama.getText()+"',merk='"+this.e_merk.getText()+"',tipe='"+this.e_tipe.getText()+"',no_seri='"+this.e_seri.getText()+"',kode_pp='"+this.cb_pp1.getText()+"',kode_pp_susut='"+this.cb_pp2.getText()+"',nik_user='"+this.app._userLog+"',tgl_input=getdate() "+
								"where no_fa='"+this.e_fa.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");											
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_fa);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :					
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
		}
	},	
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);		
	},
	doChange:function(sender){	
		if (sender == this.e_fa && this.e_fa.getText()!="") {
			var strSQL = "select a.*,isnull(b.susut,0) as susut,c.nilai_oleh "+
						 "from fa_asset a "+
						 
						 "inner join ( "+
						 "select no_fa,kode_lokasi,sum(nilai) as nilai_oleh "+
						 "from fa_nilai where kode_lokasi='"+this.app._lokasi+"' group by no_fa,kode_lokasi "+
						 ") c on c.no_fa=c.no_fa and a.kode_lokasi=c.kode_lokasi "+

						 "left join ("+
						 "select no_fa,kode_lokasi,sum(nilai) as susut "+
						 "from fasusut_d group by no_fa,kode_lokasi "+
						 ") b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi "+
						 
						 "where a.no_fa='"+this.e_fa.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";
			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.e_akum.setText(floatToNilai(line.susut));
					if (this.e_akum.getText()=="0") {
						this.e_nilai.setReadOnly(false);
						this.e_tgl2.hide();
						this.e_tgl3.hide();						
					}
					else{
						this.e_nilai.setReadOnly(true);
						this.e_tgl2.show();
						this.e_tgl3.show();
					}

					this.e_periode.setText(line.periode);
					this.periode = line.periode;
					this.dp_d2.setText(line.tgl_perolehan);
					this.e_tgl2.setText(this.dp_d2.getText());

					this.e_nama.setText(line.nama);
					this.e_seri.setText(line.no_seri);
					this.e_merk.setText(line.merk);
					this.e_tipe.setText(line.tipe);
					this.e_nilai.setText(floatToNilai(line.nilai_oleh));
					this.e_residu.setText(floatToNilai(line.nilai_residu));					
					
					this.periodeSusut = line.periode_susut;
					this.dp_d3.setText(line.tgl_susut);		
					this.e_tgl3.setText(this.dp_d3.getText());

					this.cb_pp1.setText(line.kode_pp);
					this.cb_pp2.setText(line.kode_pp_susut);					
					this.cb_klp.setText(line.kode_klpfa);
					this.cb_klpakun.setText(line.kode_klpakun);
					this.e_nb.setText(line.catatan);			
				} 
			}		
		}
		if (sender == this.e_umur && this.e_umur.getText()!="") {
			var persen = Math.abs(((100 / (nilaiToFloat(this.e_umur.getText()) / 12)) * 100)) / 100 ;
			this.e_persen.setText(floatToNilai(persen));
		}
		if (sender == this.e_nilai || sender == this.e_jml) {
			if (this.e_nilai.getText() != "" && this.e_jml.getText() != "") {
				var tot = nilaiToFloat(this.e_nilai.getText()) * nilaiToFloat(this.e_jml.getText());
				this.e_total.setText(floatToNilai(tot));				
			}
		}
		if (sender == this.cb_klp && this.cb_klp.getText() != "") {
			var data = this.dbLib.getDataProvider(
			           "select a.kode_klpakun,b.nama,b.kode_akun,c.nama as nama_akun,b.umur,b.persen "+
					   "from fa_klp a "+
			           "	 inner join fa_klpakun b on a.kode_klpakun=b.kode_klpakun and a.kode_lokasi=b.kode_lokasi "+
					   "	 inner join masakun c on b.kode_akun=c.kode_akun and c.kode_lokasi = '"+this.app._lokasi+"' "+
					   "where a.kode_klpfa = '"+this.cb_klp.getText()+"'",true);
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
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.e_fa.getText()+")","");							
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
window.app_saku3_transaksi_ypt_tpcc_fFaInput = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ypt_tpcc_fFaInput.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ypt_tpcc_fFaInput";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Aktiva Tetap", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;");		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,12,200,20],caption:"Periode Perolehan",tag:2,readOnly:true});
		this.l_tgl2 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Perolehan", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 		
		this.l_tgl3 = new portalui_label(this,{bound:[20,12,100,18],caption:"Tgl Awal Susut", underline:true});
		this.dp_d3 = new portalui_datePicker(this,{bound:[120,12,98,18]}); 				
		this.cb_klp = new saiCBBL(this,{bound:[20,13,220,20],caption:"Kelompok Barang", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});
		this.cb_klpakun = new saiCBBL(this,{bound:[20,14,220,20],caption:"Kelompok Akun", readOnly:true, tag:1});
		this.e_akun = new portalui_saiLabelEdit(this,{bound:[20,15,432,20],caption:"Deskripsi Akun",readOnly:true});	
		this.e_umur = new saiLabelEdit(this,{bound:[20,16,200,20],caption:"Umur [Bulan]", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_persen = new saiLabelEdit(this,{bound:[272,16,180,20],caption:"% Susut [Tahun]", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_fa = new saiLabelEdit(this,{bound:[20,10,250,20],caption:"Format ID",readOnly:true});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,18,250,20],caption:"No Bukti Jurnal",maxLength:50});
		this.e_nama = new portalui_saiLabelEdit(this,{bound:[20,14,432,20],caption:"Deskripsi",maxLength:150,tag:1});				
		this.e_seri = new portalui_saiLabelEdit(this,{bound:[20,19,432,20],caption:"Nomor Seri",maxLength:50, tag:1});
		this.e_merk = new portalui_saiLabelEdit(this,{bound:[20,17,432,20],caption:"Merk",maxLength:100, tag:1});
		this.e_tipe = new portalui_saiLabelEdit(this,{bound:[20,16,432,20],caption:"Tipe",maxLength:100, tag:1});
		this.e_jml = new saiLabelEdit(this,{bound:[20,17,200,20],caption:"Jumlah Item", tag:1, tipeText:ttNilai, text:"1",change:[this,"doChange"]});		
		this.e_nilai = new saiLabelEdit(this,{bound:[20,18,200,20],caption:"Nilai Perolehan", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.e_residu = new saiLabelEdit(this,{bound:[251,18,200,20],caption:"Nilai Residu", tag:1, tipeText:ttNilai, text:"0"});		
		this.e_total = new saiLabelEdit(this,{bound:[20,19,200,20],caption:"Total Perolehan", tag:1, tipeText:ttNilai, text:"0",readOnly:true});		
		this.cb_pp1 = new saiCBBL(this,{bound:[20,18,220,20],caption:"PP Aktap", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});
		this.cb_pp2 = new saiCBBL(this,{bound:[20,19,220,20],caption:"PP Penyusutan", multiSelection:false, maxLength:10, tag:1});				
		
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
									
			this.cb_klp.setSQL("select kode_klpfa, nama from fa_klp where jenis='A' and kode_lokasi='"+this.app._lokasi+"'",["kode_klpfa","nama"],false,["Kode","Nama"],"where","Data Kelompok Aktap",true);
			this.cb_pp1.setSQL("select kode_pp, nama from pp where tipe = 'posting' and flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_pp2.setSQL("select kode_pp, nama from pp where tipe = 'posting' and flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ypt_tpcc_fFaInput.extend(window.childForm);
window.app_saku3_transaksi_ypt_tpcc_fFaInput.implement({
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
					
					var formatID = this.e_fa.getText();
					formatID = formatID.substr(0,formatID.length - 4)

					var nuAkhir = 0;														
					var strSQL = "select isnull(max(no_fa),0) as no_fa from fa_asset where no_fa like '"+formatID+"____%'";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){						
							nuAkhir = parseFloat(line.no_fa.substr(line.no_fa.length-4,4));						
						}
					}	
					
					var jml = nilaiToFloat(this.e_jml.getText());									
					var nsusut = Math.round(nilaiToFloat(this.e_nilai.getText()) / nilaiToFloat(this.e_umur.getText()));

					var idx = 0;
					var noFA = "";
					for (var i=0;i < jml;i++){	
						idx = nuAkhir + i + 1;							
						idx2 = idx.toString();
						
						if (idx2.length == 1) var nu = "000"+idx2;
						if (idx2.length == 2) var nu = "00"+idx2;
						if (idx2.length == 3) var nu = "0"+idx2;
						if (idx2.length == 4) var nu = idx2;
						
						noFA = formatID + nu;									
						sql.add("insert into fa_asset(no_fa,kode_lokasi,kode_klpfa,kode_klpakun,kode_akun,umur,persen,nama,merk,tipe,no_seri,nilai,nilai_residu,kode_pp,kode_pp_susut,tgl_perolehan,tgl_susut,periode,periode_susut,progress,nik_user,tgl_input,catatan,kode_lokfa,nik_pnj,nilai_susut,jenis,akum_nilai) values "+
								"('"+noFA+"','"+this.app._lokasi+"','"+this.cb_klp.getText()+"','"+this.cb_klpakun.getText()+"','"+this.kodeakun+"',"+parseNilai(this.e_umur.getText())+","+parseNilai(this.e_persen.getText())+",'"+this.e_nama.getText()+"','"+this.e_merk.getText()+"','"+this.e_tipe.getText()+"','"+this.e_seri.getText()+"',"+parseNilai(this.e_nilai.getText())+","+parseNilai(this.e_residu.getText())+",'"+this.cb_pp1.getText()+"','"+this.cb_pp2.getText()+"','"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"','"+periode+"','"+periodeSusut+"','2','"+this.app._userLog+"',getdate(),'"+this.e_nb.getText()+"','-','-',"+nsusut+",'A',0)");						
						sql.add("insert into fa_nilai(no_fa,kode_lokasi,no_bukti,dc,nilai,periode) values "+
								"('"+noFA+"','"+this.app._lokasi+"','"+this.e_nb.getText()+"','D',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.e_periode.getText()+"')");											
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
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				}
				else this.simpan();
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
		if (sender == this.e_nilai || sender == this.e_jml) {
			if (this.e_nilai.getText() != "" && this.e_jml.getText() != "") {
				var tot = nilaiToFloat(this.e_nilai.getText()) * nilaiToFloat(this.e_jml.getText());
				this.e_total.setText(floatToNilai(tot));				
			}
		}
		if ((sender == this.cb_klp || sender == this.e_periode) && this.cb_klp.getText() != "" && this.e_periode.getText() != "") {
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
					
					this.e_fa.setText(this.e_periode.getText().substr(2,2)+"-"+this.app._lokasi+ "-"+this.cb_klp.getText()+"-XXXX"); 					
					this.e_nb.setFocus();
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
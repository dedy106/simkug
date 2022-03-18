window.app_saku2_transaksi_kopeg_fa_fFaInputVEAT = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_fa_fFaInputVEAT.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_fa_fFaInputVEAT";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Input Data Aktiva Tetap : Input", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;wysiwyg;portalui_saiMemo");
					
		this.cb_klp = new saiCBBL(this,{bound:[20,15,220,20],caption:"Kelompok Aktap", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});
		//hide
		this.cb_klpakun = new saiCBBL(this,{bound:[20,15,220,20],caption:"Kelompok Akun", readOnly:true, tag:1,visible:false});
		this.e_akun = new portalui_saiLabelEdit(this,{bound:[20,15,432,20],caption:"Akun Aktap",readOnly:true,visible:false});
		this.e_umur = new saiLabelEdit(this,{bound:[20,15,180,20],caption:"Umur [Bulan]", tag:1, readOnly:true, tipeText:ttNilai, text:"0",visible:false});		
		this.e_persen = new saiLabelEdit(this,{bound:[272,15,180,20],caption:"% Susut [Tahun]", tag:1, readOnly:true, tipeText:ttNilai, text:"0",visible:false});									
		
		this.c_perGL = new saiCB(this,{bound:[20,17,220,20],caption:"Periode Bukti",tag:2,change:[this,"doChange"]});
		this.e_nb = new saiCBBL(this,{bound:[20,19,220,20],caption:"Bukti Jurnal", multiSelection:false, maxLength:10, tag:1, rightLabelVisible:false,change:[this,"doChange"]});		
		this.e_jurnal = new saiLabelEdit(this,{bound:[418,19,202,20],caption:"Nilai Jurnal", tag:1, tipeText:ttNilai, text:"0",readOnly:true});		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl2 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Perolehan", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],readOnly:true}); 	
		
		this.e_fa = new saiLabelEdit(this,{bound:[20,10,202,20],caption:"No Aktap",readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		//this.e_jml = new saiLabelEdit(this,{bound:[418,10,202,20],caption:"Jumlah", tag:1, tipeText:ttNilai, text:"1",change:[this,"doChange"]});
		this.e_jml = new saiLabelEdit(this,{bound:[418,10,202,20],caption:"Jumlah", tag:1, tipeText:ttNilai, text:"1"});			
		this.e_barcode = new portalui_saiLabelEdit(this,{bound:[20,11,600,20],caption:"Barcode",maxLength:50, tag:1});
		this.e_nama = new portalui_saiLabelEdit(this,{bound:[20,19,600,20],caption:"Deskripsi",readOnly:true});
		this.e_catat = new saiMemo(this,{bound:[20,20,600,180],caption:"Catatan Detail",tag:1});								
		this.e_nilai = new saiLabelEdit(this,{bound:[20,18,200,20],caption:"Nilai Perolehan", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.e_total = new saiLabelEdit(this,{bound:[418,18,202,20],caption:"Total", tag:1, tipeText:ttNilai, text:"0",readOnly:true});		
		this.cb_lokasi = new saiCBBL(this,{bound:[20,19,220,20],caption:"Lokasi", multiSelection:false, maxLength:10, tag:1});
		this.cb_pp1 = new saiCBBL(this,{bound:[20,20,220,20],caption:"PP Aktap", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});
		this.cb_buat = new saiCBBL(this,{bound:[20,18,220,20],caption:"NIK Pnj", multiSelection:false, maxLength:10, tag:1});		
				
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
						
			this.cb_lokasi.setSQL("select kode_lokfa, nama from fa_lok where kode_lokasi='"+this.app._lokasi+"' ",["kode_lokfa","nama"],false,["Kode","Nama"],"and","Data Lokasi Aktap",true);
			this.cb_klp.setSQL("select kode_klpfa, nama from fa_klp where kode_lokasi='"+this.app._lokasi+"'",["kode_klpfa","nama"],false,["Kode","Nama"],"and","Data Kelompok Aktap",true);
			this.cb_pp1.setSQL("select kode_pp, nama from pp where tipe = 'posting' and flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_buat.setSQL("select kode_pnj, nama from fa_pnj where kode_lokasi='"+this.app._lokasi+"' ",["kode_pnj","nama"],false,["Kode","Nama"],"and","Data Penanggung Jawab",true);
			
			this.c_perGL.items.clear();
			var data = this.dbLib.getDataProvider("select distinct periode from gl_fa_asset where kode_lokasi ='"+this.app._lokasi+"' order by periode desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_perGL.addItem(i,line.periode);
				}
			}		
			this.c_perGL.setText("");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_fa_fFaInputVEAT.extend(window.childForm);
window.app_saku2_transaksi_kopeg_fa_fFaInputVEAT.implement({
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
					
					var nbfa = nbfa2 = this.standarLib.noBuktiOtomatis(this.dbLib,"fa_asset","no_fa",this.app._lokasi+"-FA"+this.e_periode.getText().substr(2,4)+".","000");
					nbfa = nbfa.substr(0,10);
					var idx = parseFloat(nbfa2.substr(10,3));
					var nu = idx2 = "";
					
					var jml = nilaiToFloat(this.e_jml.getText());
					for (var i=0;i < jml;i++){								
						idx2 = idx.toString();
						if (idx2.length == 1) var nu = "00"+idx2;
						if (idx2.length == 2) var nu = "0"+idx2;
						if (idx2.length == 3) var nu = idx2;
					
						nbfa2 = nbfa+nu;						
						sql.add("insert into fa_asset(no_fa,barcode,kode_lokasi,kode_klpfa,kode_klpakun,kode_akun,umur,persen,nama,merk,tipe,no_seri,nilai,nilai_residu,kode_pp,kode_pp_susut,tgl_perolehan,tgl_susut,periode,periode_susut,progress,nik_user,tgl_input,catatan,kode_lokfa,nik_pnj,nilai_susut,no_ba) values "+
								"('"+nbfa2+"','"+this.e_barcode.getText()+"','"+this.app._lokasi+"','"+this.cb_klp.getText()+"','"+this.cb_klpakun.getText()+"','"+this.kodeakun+"',"+parseNilai(this.e_umur.getText())+","+parseNilai(this.e_persen.getText())+",'"+this.e_nama.getText()+"','-','-','-',"+parseNilai(this.e_nilai.getText())+",0,'"+this.cb_pp1.getText()+"','"+this.cb_pp1.getText()+"','"+this.dp_d2.getDateString()+"','"+this.dp_d2.getDateString()+"','"+periode+"','"+this.c_perGL.getText()+"','1','"+this.app._userLog+"',getdate(),'"+this.e_catat.getText()+"','"+this.cb_lokasi.getText()+"','"+this.cb_buat.getText()+"',0,'"+this.e_nb.getText()+"')");
						var idx = idx + 1;						
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
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (nilaiToFloat(this.e_total.getText()) >  nilaiToFloat(this.e_jurnal.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Aset melebihi Nilai Jurnal.");
					return false;						
				}
				if (nilaiToFloat(this.e_total.getText()) <=  0) {
					system.alert(this,"Transaksi tidak valid.","Total Aset tidak boleh kurang dari sama dengan nol.");
					return false;						
				}
				else 
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
		this.e_fa.setText("");
	},
	doClick:function(sender){
		this.e_fa.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fa_asset","no_fa",this.app._lokasi+"-FA"+this.e_periode.getText().substr(2,4)+".","000"));
		this.e_jml.setFocus();
	},
	doChange:function(sender){					
		if (sender == this.cb_klp && this.cb_klp.getText() != "") {
			this.kodeakun = "";
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
		if (sender == this.c_perGL || sender == this.cb_klp) {
			if (this.c_perGL.getText()!="" && this.cb_klp.getText()!="") {
				var strSQL = "select no_ref,nama from gl_fa_asset where kode_akun='"+this.kodeakun+"' and periode = '"+this.c_perGL.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				this.e_nb.setSQL(strSQL,["no_ref","nama"],false,["Bukti","Nama"],"and","Data FA GL",true);			
			}
		}
		if (sender == this.e_nb || this.e_nb.getText()!="") {
			this.e_nama.setText(this.e_nb.rightLabelCaption);
			var strSQL = "select a.nilai - isnull(b.hp,0) as sisa,a.tgl_perolehan from gl_fa_asset a left join ("+
					     "select no_ba,kode_akun,kode_lokasi,sum(nilai) as hp from fa_asset where kode_lokasi='"+this.app._lokasi+"' and no_ba='"+this.e_nb.getText()+"' group by no_ba,kode_akun,kode_lokasi "+
						 ") b on a.no_ref=b.no_ba and a.kode_lokasi=b.kode_lokasi and a.kode_akun=b.kode_akun "+
			             "where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_akun='"+this.kodeakun+"' and a.no_ref = '"+this.e_nb.getText()+"'";			
			var data = this.dbLib.getDataProvider(strSQL,true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					this.e_jurnal.setText(floatToNilai(line.sisa));
					this.dp_d2.setText(line.tgl_perolehan);
				}
			}
		}		
		if (sender == this.e_nilai || sender == this.e_jml) {
			if (this.e_nilai.getText() != "" && this.e_jml.getText() != "") {
				var tot = nilaiToFloat(this.e_nilai.getText()) * nilaiToFloat(this.e_jml.getText());
				this.e_total.setText(floatToNilai(tot));
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
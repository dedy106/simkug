window.app_saku3_transaksi_fa_fFaBaru = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_fa_fFaBaru.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_fa_fFaBaru";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Input Data Barang", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;");		
		this.cb_lokasi = new saiCBBL(this,{bound:[20,18,220,20],caption:"Lokasi", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
	
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Barang","Filter Data"]});		
		
		this.e_periode = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,202,20],caption:"Periode",tag:2,visible:false});
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[20,11,100,18],caption:"Tgl Perolehan", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.c_tahun = new saiCB(this.pc2.childPage[0],{bound:[20,13,200,20],caption:"Tahun Inventaris",readOnly:true,tag:2});	
		
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,11,200,20],caption:"Jenis",items:["ASSET","INVESTARIS"], readOnly:true,tag:9,change:[this,"doChange"]});	
		
		this.cb_lokfa = new saiCBBL(this.pc2.childPage[0],{bound:[20,18,220,20],caption:"Lok. Barang", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});
		this.cb_klp = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Kelompok Aktap", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});
		
		this.e_fa = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,10,230,20],caption:"No Barang",readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[255,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_jml = new saiLabelEdit(this.pc2.childPage[0],{bound:[298,10,172,20],caption:"Jumlah", tag:1, tipeText:ttNilai, text:"1",change:[this,"doChange"]});		
		
		this.e_nama = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"Deskripsi",maxLength:150,tag:1});				
		this.e_seri = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[520,18,450,20],caption:"Nomor Seri",maxLength:50, tag:1});
		this.e_merk = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Merk",maxLength:100, tag:1});
		this.e_tipe = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[520,17,450,20],caption:"Tipe",maxLength:100, tag:1});
		
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,200,20],caption:"Nilai Perolehan", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.e_residu = new saiLabelEdit(this.pc2.childPage[0],{bound:[268,18,202,20],caption:"Nilai Residu", tag:1, tipeText:ttNilai, text:"0"});		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[520,18,450,20],caption:"No Bukti",maxLength:50});
		
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,19,200,20],caption:"Total", tag:1, tipeText:ttNilai, text:"0",readOnly:true});		
		this.l_tgl3 = new portalui_label(this.pc2.childPage[0],{bound:[20,12,100,18],caption:"Tgl Awal Susut", underline:true});
		this.dp_d3 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,12,98,18]}); 				
		
		this.cb_status = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"Status Barang", multiSelection:false, maxLength:10, tag:1});		
		this.cb_pp1 = new saiCBBL(this.pc2.childPage[0],{bound:[20,18,220,20],caption:"PP Aktap", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});		
		this.cb_pp2 = new saiCBBL(this.pc2.childPage[0],{bound:[20,19,220,20],caption:"PP Penyusutan", multiSelection:false, maxLength:10, tag:1});		
		this.cb_klpakun = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Kelompok Akun", readOnly:true, tag:1});
		this.e_akun = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,15,450,20],caption:"Akun Aktap",readOnly:true});
		this.e_umur = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"Umur [Bulan]", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_persen = new saiLabelEdit(this.pc2.childPage[0],{bound:[272,16,198,20],caption:"% Susut [Tahun]", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
			
		this.cb_fa = new saiCBBL(this.pc2.childPage[1],{bound:[20,18,250,20],caption:"Data FA", multiSelection:false, maxLength:10, tag:9});
		this.bTampil = new button(this.pc2.childPage[1],{bound:[120,17,100,18],caption:"Cari Data",click:[this,"doCari"]});							
		
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc2.childPage[1].rearrangeChild(10, 23);	
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d2,this.dp_d2.year,this.dp_d2.month,this.dp_d2.day);
			
			this.cb_status.setSQL("select kode_status, nama from fa_status ",["kode_status","nama"],false,["Kode","Nama"],"where","Data Status",true);
			
			if (this.app._lokasi == "99") this.cb_lokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi<>'00'",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);
			else this.cb_lokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi='"+this.app._lokasi+"'",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);
			
			this.c_tahun.items.clear();
			var data = this.dbLib.getDataProvider("select distinct substring(periode,1,4) as tahun from periode where kode_lokasi='"+this.app._lokasi+"' order by tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun.addItem(i,line.tahun);
				}
			}
			
			this.cb_lokasi.setText("");
			this.cb_lokasi.setText(this.app._lokasi);
			
			
			this.c_jenis.setText("");
			this.c_jenis.setText("ASSET");
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_fa_fFaBaru.extend(window.childForm);
window.app_saku3_transaksi_fa_fFaBaru.implement({
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
					var nbfa2 = "";
					
					if (this.stsSimpan == 1) { 
						var nuAkhir = 0;	
						var formatIDMaster = this.c_tahun.getText().substr(2,2)+"-"+this.cb_lokfa.getText() + "-"+ this.cb_klp.getText()+"-"; 			
						var formatID = this.c_tahun.getText().substr(2,2)+"-"+this.cb_lokfa.getText()+ "-"+ this.cb_klp.getText().substr(0,2)+"____-"; 
						var strSQL = "select isnull(max(no_fa),0) as no_fa from fa_asset where no_fa like '"+formatID+"____%'";
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){						
								nuAkhir = parseFloat(line.no_fa.substr(line.no_fa.length-4,4));						
							}
						}		
					
						var jml = nilaiToFloat(this.e_jml.getText());									
						for (var i=0;i < jml;i++){								
						
							var k = nuAkhir+i+1;
							var idx = k.toString();
							if (idx.length == 1) var nu = "000"+idx;
							if (idx.length == 2) var nu = "00"+idx;
							if (idx.length == 3) var nu = "0"+idx;
							if (idx.length == 4) var nu = idx;
						
							nbfa2 = formatIDMaster+nu;
										
							sql.add("insert into fa_asset(no_fa,barcode,kode_lokasi,kode_klpfa,kode_klpakun,kode_akun,umur,persen,nama,merk,tipe,no_seri,nilai,nilai_residu,kode_pp,kode_pp_susut,tgl_perolehan,tgl_susut,periode,periode_susut,progress,nik_user,tgl_input,no_baps,kode_lokfa,nik_pnj,no_po,id_pesan,kode_vendor,tgl_baps,kode_unit,jenis,catatan,kode_status) values "+
									"('"+nbfa2+"','"+nbfa2+"','"+this.cb_lokasi.getText()+"','"+this.cb_klp.getText()+"','"+this.cb_klpakun.getText()+"','"+this.kodeakun+"',"+parseNilai(this.e_umur.getText())+","+parseNilai(this.e_persen.getText())+",'"+this.e_nama.getText()+"','"+this.e_merk.getText()+"','"+this.e_tipe.getText()+"','"+this.e_seri.getText()+"',"+parseNilai(this.e_nilai.getText())+","+parseNilai(this.e_residu.getText())+",'"+this.cb_pp1.getText()+"','"+this.cb_pp2.getText()+"','"+
										this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"','"+periode+"','"+periodeSusut+"','2','"+this.app._userLog+"',getdate(),'"+this.e_nb.getText()+"','"+this.cb_lokfa.getText()+"','-','-','"+this.e_nb.getText()+"','-','"+this.dp_d2.getDateString()+"','-','"+this.c_jenis.getText().substr(0,1)+"','"+this.e_nb.getText()+"','"+this.cb_status.getText()+"')");																					
							sql.add("insert into fa_nilai(no_fa,kode_lokasi,no_bukti,dc,nilai,periode) values "+
									"('"+nbfa2+"','"+this.cb_lokasi.getText()+"','"+this.e_nb.getText()+"','D',"+nilaiToFloat(this.e_nilai.getText())+",'"+periode+"')");
								
						}	
					}
					else {
							sql.add("delete from fa_asset where no_fa='"+this.e_fa.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
							sql.add("delete from fa_nilai where no_fa='"+this.e_fa.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
							
							nbfa2 = this.e_fa.getText();
							sql.add("insert into fa_asset(no_fa,barcode,kode_lokasi,kode_klpfa,kode_klpakun,kode_akun,umur,persen,nama,merk,tipe,no_seri,nilai,nilai_residu,kode_pp,kode_pp_susut,tgl_perolehan,tgl_susut,periode,periode_susut,progress,nik_user,tgl_input,no_baps,kode_lokfa,nik_pnj,no_po,id_pesan,kode_vendor,tgl_baps,kode_unit,jenis,catatan,kode_status) values "+
									"('"+nbfa2+"','"+nbfa2+"','"+this.cb_lokasi.getText()+"','"+this.cb_klp.getText()+"','"+this.cb_klpakun.getText()+"','"+this.kodeakun+"',"+parseNilai(this.e_umur.getText())+","+parseNilai(this.e_persen.getText())+",'"+this.e_nama.getText()+"','"+this.e_merk.getText()+"','"+this.e_tipe.getText()+"','"+this.e_seri.getText()+"',"+parseNilai(this.e_nilai.getText())+","+parseNilai(this.e_residu.getText())+",'"+this.cb_pp1.getText()+"','"+this.cb_pp2.getText()+"','"+
										this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"','"+periode+"','"+periodeSusut+"','2','"+this.app._userLog+"',getdate(),'"+this.e_nb.getText()+"','"+this.cb_lokfa.getText()+"','-','-','"+this.e_nb.getText()+"','-','"+this.dp_d2.getDateString()+"','-','"+this.c_jenis.getText().substr(0,1)+"','"+this.e_nb.getText()+"','"+this.cb_status.getText()+"')");																					
							sql.add("insert into fa_nilai(no_fa,kode_lokasi,no_bukti,dc,nilai,periode) values "+
									"('"+nbfa2+"','"+this.cb_lokasi.getText()+"','"+this.e_nb.getText()+"','D',"+nilaiToFloat(this.e_nilai.getText())+",'"+periode+"')");
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
			case "ubah" :					
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
			
			case "hapus" : 
					sql.add("delete from fa_asset where no_fa='"+this.e_fa.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from fa_nilai where no_fa='"+this.e_fa.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
				break;	
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
	},
	doClick:function(sender){
		if (this.c_tahun.getText() != "" && this.cb_lokfa.getText() != "" && this.cb_klp.getText() != "") {
			if (this.stsSimpan == 0) {
				setTipeButton(tbSimpan);
				this.stsSimpan = 1;			
			}
			var nuAkhir = 0;	
			var formatIDMaster = this.c_tahun.getText().substr(2,2)+"-"+this.cb_lokfa.getText() + "-"+ this.cb_klp.getText()+"-"; 			
			var formatID = this.c_tahun.getText().substr(2,2)+"-"+this.cb_lokfa.getText()+ "-"+ this.cb_klp.getText().substr(0,2)+"____-"; 
			var strSQL = "select isnull(max(no_fa),0) as no_fa from fa_asset where no_fa like '"+formatID+"____%'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					nuAkhir = parseFloat(line.no_fa.substr(line.no_fa.length-4,4));						
				}
			}		
			var k = nuAkhir+1;
			var idx = k.toString();
			if (idx.length == 1) var nu = "000"+idx;
			if (idx.length == 2) var nu = "00"+idx;
			if (idx.length == 3) var nu = "0"+idx;
			if (idx.length == 4) var nu = idx;
			this.e_fa.setText(formatIDMaster+nu);
		
			this.e_jml.setFocus();
		}
	},
	doChange:function(sender){	
		if (sender == this.c_jenis && this.c_jenis.getText() != "") {
			this.cb_klp.setSQL("select kode_klpfa, nama from fa_klp where jenis='"+this.c_jenis.getText().substr(0,1)+"'",["kode_klpfa","nama"],false,["Kode","Nama"],"where","Data Kelompok Aktap",true);
		}
		if (sender == this.cb_lokasi) {
			if (this.stsSimpan == 1) {
				this.cb_lokfa.setText("","");
				this.cb_pp1.setText("","");
				this.cb_pp2.setText("","");
			}
			if (this.cb_lokasi.getText()!="") {
				this.cb_fa.setSQL("select a.no_fa, a.nama from fa_asset a "+
				                  "left join ( "+
				                  "   select distinct no_fa,kode_lokasi from fasusut_d where kode_lokasi='"+this.cb_lokasi.getText()+"' "+
				                  ") b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi "+
				                  "where b.no_fa is null and a.kode_lokasi='"+this.cb_lokasi.getText()+"'",["no_fa","nama"],false,["Kode","Nama"],"and","Data Barang",true);		
				
				this.cb_lokfa.setSQL("select kode_lok, nama from fa_lokasi where kode_lokasi='"+this.cb_lokasi.getText()+"' ",["kode_lok","nama"],false,["Kode","Nama"],"where","Data Lokasi Barang",true);
				this.cb_pp1.setSQL("select kode_pp, nama from pp where tipe = 'posting' and flag_aktif ='1' and kode_lokasi='"+this.cb_lokasi.getText()+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
				this.cb_pp2.setSQL("select kode_pp, nama from pp where tipe = 'posting' and flag_aktif ='1' and kode_lokasi='"+this.cb_lokasi.getText()+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);			
			
				var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PPSUSUT') and kode_lokasi = '"+this.cb_lokasi.getText()+"'",true);			
				if (typeof data == "object"){
					var line;
					for (var i in data.rs.rows){
						line = data.rs.rows[i];																			
						if (line.kode_spro == "PPSUSUT") this.ppSusut = line.flag;	
					}
				}	
			}
		}
		if (sender == this.e_nilai || sender == this.e_jml) {
			if (this.e_nilai.getText() != "" && this.e_jml.getText() != "") {
				var tot = nilaiToFloat(this.e_nilai.getText()) * nilaiToFloat(this.e_jml.getText());
				this.e_total.setText(floatToNilai(tot));				
			}
		}
		if (sender == this.cb_klp && this.cb_klp.getText() != "") {
			if (this.stsSimpan == 1) this.e_fa.setText("");
			var data = this.dbLib.getDataProvider(
			           "select a.kode_klpakun,b.nama,b.kode_akun,c.nama as nama_akun,b.umur,b.persen "+
					   "from fa_klp a "+
			           "	 inner join fa_klpakun b on a.kode_klpakun=b.kode_klpakun "+
					   "	 inner join masakun c on b.kode_akun=c.kode_akun and c.kode_lokasi = '"+this.cb_lokasi.getText()+"' "+
					   "where a.kode_klpfa = '"+this.cb_klp.getText()+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					if (this.c_jenis.getText() == "ASSET") {
						this.cb_klpakun.setText(line.kode_klpakun,line.nama);
						this.e_akun.setText(line.kode_akun + " - "+line.nama_akun);
						this.kodeakun = line.kode_akun;
						this.e_umur.setText(floatToNilai(line.umur));
						this.e_persen.setText(floatToNilai(line.persen));	
					}
					else {
						this.cb_klpakun.setText("-","-");
						this.e_akun.setText("-");
						this.kodeakun = "-";
						this.e_umur.setText("0");
						this.e_persen.setText("0");
					}				
				} 
			}
		}
		if (sender == this.cb_lokfa && this.cb_lokfa.getText() !="") {
			if (this.stsSimpan == 1) this.e_fa.setText("");
			var data = this.dbLib.getDataProvider("select kode_pp from fa_lokasi where kode_lok='"+this.cb_lokfa.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					if (this.cb_lokfa.getText() == "0000") this.cb_pp1.setText("993000");
					else this.cb_pp1.setText(line.kode_pp+"00");
						
					this.cb_pp2.setText(this.ppSusut );					
				} 
			} 	
		}
		if (sender == this.c_tahun && this.c_tahun.getText() != "") this.e_fa.setText(""); 
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
	},
	doCari:function(sender){
		this.pc2.setActivePage(this.pc2.childPage[0]);		
		this.stsSimpan = 0;
		setTipeButton(tbUbahHapus);
		
		var strSQL = "select * from fa_asset where no_fa='"+this.cb_fa.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line != undefined){
				this.e_fa.setText(line.no_fa);	
				
				this.e_periode.setText(line.periode);	
				this.dp_d2.setText(line.tgl_perolehan);	
				this.c_tahun.setText("20"+line.no_fa.substr(0,2));	
		
				if (line.jenis == "A") this.c_jenis.setText("ASSET");
				else this.c_jenis.setText("INVENTARIS");
				
				this.cb_lokfa.setText(line.kode_lokfa);
				this.cb_klp.setText(line.kode_klpfa);
				
				this.e_fa.setText(line.no_fa);
				this.e_jml.setText("1");
				this.e_nama.setText(line.nama);
				this.e_seri.setText(line.no_seri);
				this.e_merk.setText(line.merk);
				this.e_tipe.setText(line.tipe);
				this.e_nilai.setText(floatToNilai(line.nilai));
				this.e_residu.setText(floatToNilai(line.nilai_residu));
				this.e_nb.setText(line.no_baps);
				this.dp_d3.setText(line.tgl_susut);
		
				this.cb_status.setText(line.kode_status);
				this.cb_pp1.setText(line.kode_pp);
				this.cb_pp2.setText(line.kode_pp_susut);
					
			} 
		}
			
	}
});
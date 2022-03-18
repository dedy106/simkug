window.app_saku2_transaksi_siaga_fLoadTeCCxml = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_siaga_fLoadTeCCxml.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_siaga_fLoadTeCCxml";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Biling TeCC xml: Load", 0);	
		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		uses("util_dbLib",true);		
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.cb_pp = new saiCBBL(this,{bound:[20,16,200,20],caption:"PP", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});						
		this.cb_drk = new saiCBBL(this,{bound:[20,13,200,20],caption:"DRK", multiSelection:false, maxLength:10, tag:2});		
		this.cb_buat = new saiCBBL(this,{bound:[20,14,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});				
		this.cb_app = new saiCBBL(this,{bound:[20,15,200,20],caption:"NIK Mengetahui", multiSelection:false, maxLength:10, tag:2});				
		this.cb_cabang = new saiCBBL(this,{bound:[20,13,200,20],caption:"Cabang", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,16,220,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[245,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});						
		this.e_ket = new saiLabelEdit(this,{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});				
		this.bGet = new button(this,{bound:[920,18,80,20],caption:"Get Data", click:[this,"doGetFile"]});
		//this.bUpload = new portalui_uploader(this,{bound:[620,18,100,20],param3:"json",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});		
		
		this.pc1 = new pageControl(this,{bound:[20,20,980,310], childPage:["Rekapitulasi Nilai","Detail Data Billing"]});		
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"Total Nilai", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_diskon = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"Total Diskon", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_neto = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Total Netto", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_ppn = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Total PPN", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_biaya = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"Total Biaya", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_materai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Total Materai", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_total = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:0,
				colTitle:["No Invoice","Customer","Nilai","Diskon","Netto","PPN","Biaya","Materai","Total"],
				colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,100,100,100,100,100,200,100]],
				colFormat:[[2,3,4,5,6,7,8],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],readOnly:true, defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"selectPage"]});		
		
		this.bRefresh = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");		
		this.sg1.setAllowBlank(true);
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		try {			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = "1";
			this.cb_pp.setText(this.app._kodePP,this.app._namaPP);						
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);									
						
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Mengetahui",true);			
			this.cb_pp.setSQL("select kode_pp, nama from pp where tipe='posting' and flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_cabang.setSQL("select a.kode_cabang,a.nama from gr_cabang a where a.kode_lokasi='"+this.app._lokasi+"'",["kode_cabang","nama"],false,["Kode","Nama"],"and","Data Cabang",true);
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");												
			var data = this.dbLib.getDataProvider("select a.kode_cabang,b.nama from gr_karyawan_cab a inner join gr_cabang b on a.kode_cabang=b.kode_cabang and a.kode_lokasi=b.kode_lokasi where a.flag_aktif ='1' and a.nik='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_cabang.setText(line.kode_cabang,line.nama);
			} else this.cb_cabang.setText("","");	
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('XMLTAG') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "XMLTAG") this.alamatXml = line.flag;							
				}
			}
		
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_siaga_fLoadTeCCxml.extend(window.childForm);
window.app_saku2_transaksi_siaga_fLoadTeCCxml.implement({
	doGetFile: function(sender){
		try{						
			this.dbLib.getXMLDataViaURL(this.alamatXml);
		}catch(e){
			alert(e);
		}
	},
	doHitung: function(sender){		
		var line;
		var nilai = diskon = neto = ppn = biaya = materai = total = 0;
		for (var i=0; i < this.dataUpload.rows.length;i++){
			line = this.dataUpload.rows[i];												
			nilai += Math.round(parseFloat(line.nilai));
			diskon += Math.round(parseFloat(line.diskon));
			//neto += parseFloat(line.neto);
			neto += Math.round(parseFloat(line.nilai)) - Math.round(parseFloat(line.diskon));
			ppn += Math.round(parseFloat(line.ppn));
			biaya += Math.round(parseFloat(line.biaya));
			materai += Math.round(parseFloat(line.materai));				
			//total += parseFloat(line.total);				
			total += Math.round(parseFloat(line.nilai))-Math.round(parseFloat(line.diskon))+Math.round(parseFloat(line.ppn))+Math.round(parseFloat(line.biaya))+Math.round(parseFloat(line.materai));
		}			
		this.e_nilai.setText(floatToNilai(nilai));
		this.e_diskon.setText(floatToNilai(diskon));
		this.e_neto.setText(floatToNilai(neto));
		this.e_ppn.setText(floatToNilai(ppn));
		this.e_biaya.setText(floatToNilai(biaya));
		this.e_materai.setText(floatToNilai(materai));
		this.e_total.setText(floatToNilai(total));			
	},	
	selectPage: function(sender,page){
		var start = (page - 1) * 20;
		var finish = start + 20;
		finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);
		this.sg1.clear();
		for (var i=start; i < finish;i++){
			line = this.dataUpload.rows[i];			
			this.sg1.appendData([line.no_inv,line.cust,floatToNilai(line.nilai),floatToNilai(line.diskon),floatToNilai(line.neto),floatToNilai(line.ppn),floatToNilai(line.biaya),floatToNilai(line.materai),floatToNilai(line.total)]);
		}
		this.sg1.setNoUrut(start);
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
			this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into gr_tecc_m(no_tecc,tanggal,keterangan,kode_cabang,nik_buat,nik_app,kode_lokasi,kode_pp,kode_curr,kurs,nilai_curr,nilai,posted,periode,nik_user,tgl_input,kode_drk) values "+
						    "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_cabang.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','IDR',1,"+parseNilai(this.e_total.getText())+","+parseNilai(this.e_total.getText())+",'F','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.cb_drk.getText()+"')");
					
					var data = this.dbLib.getDataProvider("select akun_ar,akun_pot_pend,akun_pend,akun_ppn,akun_biaya,akun_materai from gr_tecc where kode_cabang = '"+this.cb_cabang.getText()+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){	
							var akun_ar = line.akun_ar;
							if (this.e_total.getText() != "0")
							sql.add("insert into gr_tecc_j(no_tecc,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
									"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+line.akun_ar+"','"+this.e_ket.getText()+"','D','IDR',1,"+parseNilai(this.e_total.getText())+","+parseNilai(this.e_total.getText())+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','TECC','PIUTANG','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
							if (this.e_diskon.getText() != "0")
							sql.add("insert into gr_tecc_j(no_tecc,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
									"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+line.akun_pot_pend+"','"+this.e_ket.getText()+"','D','IDR',1,"+parseNilai(this.e_diskon.getText())+","+parseNilai(this.e_diskon.getText())+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','TECC','DISKON','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
							if (this.e_nilai.getText() != "0")
							sql.add("insert into gr_tecc_j(no_tecc,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
									"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',2,'"+line.akun_pend+"','"+this.e_ket.getText()+"','C','IDR',1,"+parseNilai(this.e_nilai.getText())+","+parseNilai(this.e_nilai.getText())+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','TECC','PEND','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
							if (this.e_biaya.getText() != "0")
							sql.add("insert into gr_tecc_j(no_tecc,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
									"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',3,'"+line.akun_biaya+"','"+this.e_ket.getText()+"','C','IDR',1,"+parseNilai(this.e_biaya.getText())+","+parseNilai(this.e_biaya.getText())+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','TECC','BIAYA','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
							if (this.e_materai.getText() != "0")
							sql.add("insert into gr_tecc_j(no_tecc,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
									"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',4,'"+line.akun_materai+"','"+this.e_ket.getText()+"','C','IDR',1,"+parseNilai(this.e_materai.getText())+","+parseNilai(this.e_materai.getText())+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','TECC','MATERAI','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
							if (this.e_ppn.getText() != "0")
							sql.add("insert into gr_tecc_j(no_tecc,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
									"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',5,'"+line.akun_ppn+"','"+this.e_ket.getText()+"','C','IDR',1,"+parseNilai(this.e_ppn.getText())+","+parseNilai(this.e_ppn.getText())+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','TECC','PPN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
						} 
					}
					var line;					
					for (var i=0; i < this.dataUpload.rows.length;i++){
						line = this.dataUpload.rows[i];
						var nilai = Math.round(parseFloat(line.nilai));
						var diskon = Math.round(parseFloat(line.diskon));						
						var neto = Math.round(parseFloat(line.nilai)) - Math.round(parseFloat(line.diskon));
						var ppn = Math.round(parseFloat(line.ppn));
						var biaya = Math.round(parseFloat(line.biaya));
						var materai = Math.round(parseFloat(line.materai));										
						var neto = Math.round(parseFloat(line.nilai)) - Math.round(parseFloat(line.diskon));
						var total = Math.round(parseFloat(line.nilai)) - Math.round(parseFloat(line.diskon)) + Math.round(parseFloat(line.ppn)) + Math.round(parseFloat(line.biaya)) + Math.round(parseFloat(line.materai));
						
						sql.add("insert into gr_tecc_d(no_tecc,kode_lokasi,no_invoice,nama_cust,nilai,diskon,neto,ppn,biaya,materai,total,akun_piutang,periode) values "+
						        "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.no_inv+"','"+line.cust+"',"+nilai+","+diskon+","+neto+","+ppn+","+biaya+","+materai+","+total+",'"+akun_ar+"','"+this.e_periode.getText()+"')");
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg1.clear(1); 										
					setTipeButton(tbSimpan);
					this.doClick();
				break;
			case "simpan" :										
				var totDebet = nilaiToFloat(this.e_total.getText()) + nilaiToFloat(this.e_diskon.getText());
				var totKredit = nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_biaya.getText()) + nilaiToFloat(this.e_materai.getText()) + nilaiToFloat(this.e_ppn.getText());
				if (totDebet != totKredit) {
					system.alert(this,"Transaksi tidak valid.","Total Debet dan Kredit tidak sama.");
					return false;
				}				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg1.validasi();				
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;						
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
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
		if (parseFloat(this.app._periode.substr(4,2)) <= 12){
			this.e_periode.setText(y+""+m);
			if (m=="01") this.Aperiode = "A";
			if (m=="02") this.Aperiode = "B";
			if (m=="03") this.Aperiode = "C";
			if (m=="04") this.Aperiode = "D";
			if (m=="05") this.Aperiode = "E";
			if (m=="06") this.Aperiode = "F";
			if (m=="07") this.Aperiode = "G";
			if (m=="08") this.Aperiode = "H";
			if (m=="09") this.Aperiode = "I";
			if (m=="10") this.Aperiode = "J";
			if (m=="11") this.Aperiode = "K";
			if (m=="12") this.Aperiode = "L";			
		}
		else {
			this.e_periode.setText(this.app._periode);		
			if (m=="13") this.Aperiode = "M";			
			if (m=="14") this.Aperiode = "N";			
			if (m=="15") this.Aperiode = "O";			
			if (m=="16") this.Aperiode = "P";						
		}	
		this.cb_drk.setSQL("select kode_drk, nama from drk where tahun = '"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);			
		this.doClick();
	},
	doChange:function(sender){		
		if (sender == this.cb_pp && this.cb_pp.getText()!="")
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_pp='"+this.cb_pp.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);					
		if (sender == this.cb_cabang) {
			this.doClick();				
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "" && this.cb_cabang.getText()!= "") {				
			var AddFormat = "/"+this.Aperiode+"/"+this.e_periode.getText().substr(2,2)+"/"+this.cb_cabang.getText();
			var data = this.dbLib.getDataProvider("select isnull(max(substring(no_tecc,5,20)),0) as no_tecc from gr_tecc_m where no_tecc like '_______"+AddFormat+"%' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					if (line.no_tecc == "0") this.e_nb.setText("TECC001"+AddFormat);
					else {
						var idx = parseFloat(line.no_tecc.substr(0,3)) + 1;
						idx = idx.toString();
						if (idx.length == 1) var nu = "00"+idx;
						if (idx.length == 2) var nu = "0"+idx;
						if (idx.length == 3) var nu = idx;
						this.e_nb.setText("TECC"+nu+AddFormat);
					}
				} 
			}
			this.e_ket.setFocus();
		}
	},			
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "getXMLDataViaURL":		
					eval("this.dataUpload = "+result);					
					if (result) {								
						this.sg1.clear();				
						this.selectPage(undefined, 1);
						this.sgn.setTotalPage(Math.ceil(this.dataUpload.rows.length / 20));				
						this.sgn.rearrange();
						this.sgn.activePage = 0;								
					}else throw(result);							
					this.doHitung();
				break;
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){						
						if (this.stsSimpan=="1") {							
							//this.nama_report="server_report_saku2_kopeg_aka_rptAkBillJurnal";
							//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill='"+this.e_nb.getText()+"' ";
							this.filter = this.filter2;
							this.viewer.prepare();
							this.viewer.setVisible(true);
							this.app._mainForm.pButton.setVisible(false);
							this.app._mainForm.reportNavigator.setVisible(true);
							this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
							this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
							this.app._mainForm.reportNavigator.rearrange();
							this.showFilter = undefined;
							this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
							this.page = 1;
							this.allBtn = false;
							this.pc1.hide();							
						}
					}else
						system.info(this, result,"");											
				break;
			}
		}		
	},
	doCloseReportClick: function(sender){
		switch(sender.getName()){
			case "PreviewBtn" :        
				window.open(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
			break;
			case "PrintBtn" :
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
				try
				{
					window.frames[this.viewer.getFullId() +"_iframe"].focus();
					window.frames[this.viewer.getFullId() +"_iframe"].print();
				}catch(e)
				{alert(e);}
			break;
			default :
				this.pc1.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();			
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, [0,1],undefined);				
			this.sg1.clear(1); 
			setTipeButton(tbAllFalse);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} catch(e) {
			alert(e);
		}
	}	
});




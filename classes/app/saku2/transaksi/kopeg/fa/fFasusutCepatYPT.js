window.app_saku2_transaksi_kopeg_fa_fFasusutCepatYPT = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_fa_fFasusutCepatYPT.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_fa_fFasusutCepatYPT";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Percepatan Penyusutan Aktiva Tetap", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2 });
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		
		this.cb_fa = new saiCBBL(this,{bound:[20,18,250,20],caption:"No Aktiva Tetap", multiSelection:false, maxLength:10, tag:0, change:[this,"doChange"]});		
		this.cb_drk = new saiCBBL(this,{bound:[20,20,200,20],caption:"DRK Penyusutan", readOnly:true});
		this.e_pp = new portalui_saiLabelEdit(this,{bound:[20,17,432,20],caption:"PP",readOnly:true});		
		this.e_bp = new portalui_saiLabelEdit(this,{bound:[20,19,432,20],caption:"Akun Beban",readOnly:true, tag:3});
		this.e_ap = new portalui_saiLabelEdit(this,{bound:[20,21,432,20],caption:"Akun Akumulasi", tag:3, readOnly:true});		
		this.e_hp = new saiLabelEdit(this,{bound:[20,18,202,20],caption:"Nilai Perolehan", readOnly: true, tag:3, tipeText:ttNilai, text:"0"});		
		this.e_residu = new saiLabelEdit(this,{bound:[250,18,202,20],caption:"Nilai Residu",readOnly: true,  tag:3, tipeText:ttNilai, text:"0"});		
		this.e_totSusut = new saiLabelEdit(this,{bound:[20,20,202,20],caption:"Total Penyusutan", readOnly: true, tag:3, tipeText:ttNilai, text:"0"});		
		this.e_buku = new saiLabelEdit(this,{bound:[250,20,202,20],caption:"Nilai Buku", tag:3, readOnly: true, tipeText:ttNilai, text:"0"});						
		this.e_susut = new saiLabelEdit(this,{bound:[20,22,202,20],caption:"Nilai Ref. Susut", tag:3, readOnly: true, tipeText:ttNilai, text:"0"});		
		this.e_gar = new saiLabelEdit(this,{bound:[20,25,202,20],caption:"Saldo Anggaran", tag:3, readOnly: true, tipeText:ttNilai, text:"0"});		
		this.e_jml = new saiLabelEdit(this,{bound:[20,23,202,20],caption:"Jumlah Penyusutan", tag:3, tipeText:ttNilai, text:"0", change:[this,"doChange"]});		
		this.e_nilai = new saiLabelEdit(this,{bound:[20,24,202,20],caption:"Nilai Penyusutan", tag:0,  tipeText:ttNilai, text:"0"});		
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);		
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_fa.setSQL("select a.no_fa, a.nama from gl_fa_asset a "+
					"    left join (select no_fa,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_susut "+
					"	             from fasusut_d group by no_fa,kode_lokasi) b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi "+
			        "                where a.progress ='2' and a.nilai-a.nilai_residu > isnull(tot_susut,0) and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_fa","a.nama"],false,["No Aktap","Nama"],"and","Daftar Aktiva Tetap",true);
			
			
			this.cb_buat.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_app.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='FAAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
			
			this.flagGarFree = "0"; 
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('GARFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;								
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_fa_fFasusutCepatYPT.extend(window.childForm);
window.app_saku2_transaksi_kopeg_fa_fFasusutCepatYPT.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fasusut_m","no_fasusut",this.app._lokasi+"-RSU"+this.e_periode.getText().substr(2,4)+".","000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2,3])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into fasusut_m(no_fasusut,no_dokumen,tanggal,keterangan,kode_curr,kurs,nilai,kode_pp,kode_drk,posted,modul,nik_buat,nik_setuju,kode_lokasi,periode,no_del,no_link,nik_user,tgl_input) values "+
						    "('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",'-','"+this.cb_drk.getText()+"','F','FACPT','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','-','-','"+this.app._userLog+"',getdate())");					
					
					sql.add("insert into fasusut_j(no_fasusut,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.akunbp+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.e_nilai.getText())+",'"+this.pp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','FACPT','BP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
					sql.add("insert into fasusut_j(no_fasusut,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+this.akunap+"','"+this.e_ket.getText()+"','C',"+parseNilai(this.e_nilai.getText())+",'"+this.pp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','FACPT','AP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
					
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
							"select no_fasusut,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode,periode,dc,"+nilaiToFloat(this.e_gar.getText())+",nilai "+
							"from fasusut_j where dc= 'D' and no_fasusut = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

					sql.add("insert into fasusut_d(no_fasusut,no_fa,periode,nilai,kode_lokasi,akun_bp,akun_ap,kode_akun,kode_pp,kode_drk,dc,no_del,nilai_aset,umur) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_fa.getText()+"','"+this.e_periode.getText()+"',"+parseNilai(this.e_nilai.getText())+",'"+this.app._lokasi+"','"+this.akunbp+"','"+this.akunap+"','"+this.kodeakun+"','"+this.pp+"','"+this.cb_drk.getText()+"','D','-',"+parseNilai(this.e_hp.getText())+","+this.umur+")");
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
					this.standarLib.clearByTag(this, new Array("0","1","3"),this.e_nb);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (this.flagGarFree == "0") {					
					if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_gar.getText())) {
						system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi.");
						return false;						
					}					
				}
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai penyusutan tidak boleh nol atau kurang.");
					return false;						
				}
				if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_buku.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai penyusutan tidak boleh melebihi nilai buku.");
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
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		this.e_nb.setText("");
	},
	doChange:function(sender){
		if (sender == this.e_jml && this.e_jml.getText()!="" && this.e_susut.getText()!="") {
			var nilai = nilaiToFloat(this.e_jml.getText()) * nilaiToFloat(this.e_susut.getText());
			if (nilai == nilaiToFloat(this.e_buku.getText()) + nilaiToFloat(this.e_residu.getText())) nilai = nilai - nilaiToFloat(this.e_residu.getText());
			else { 
				if (nilai > nilaiToFloat(this.e_buku.getText()) + nilaiToFloat(this.e_residu.getText())) {
					this.e_jml.setText("0");
					system.alert(this,"Nilai penyusutan melebihi nilai buku","");
				}
			}
			this.e_nilai.setText(floatToNilai(nilai));
		}
		if (sender == this.cb_fa && this.cb_fa.getText()!="") {
			var strSQL = "select a.nilai,a.nilai_residu,isnull(d.tot_susut,0) as tot_susut,(a.nilai-a.nilai_residu-isnull(d.tot_susut,0)) as nilai_buku, "+
						 "  case when (a.nilai-a.nilai_residu-isnull(d.tot_susut,0)) > a.nilai_susut "+
						 "		 then a.nilai_susut  "+
						 "		 else ceiling(a.nilai-a.nilai_residu-isnull(d.tot_susut,0)) end as nilai_susut, "+
						 "  b.akun_bp,x.nama as nama_bp,b.akun_deprs,y.nama as nama_deprs,a.kode_pp_susut,c.nama as nama_pp,b.kode_akun,a.umur,aa.kode_drk,aa.nama as nama_drk "+
						 "from gl_fa_asset a  "+
						 "inner join fa_klpakun b on a.kode_klpakun=b.kode_klpakun and a.kode_lokasi=b.kode_lokasi "+
						 "inner join pp c on a.kode_pp_susut=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						 "inner join masakun x on b.akun_bp=x.kode_akun and b.kode_lokasi=x.kode_lokasi "+
						 "inner join masakun y on b.akun_deprs=y.kode_akun and b.kode_lokasi=y.kode_lokasi "+
						 "inner join drk aa on b.kode_drk=aa.kode_drk and b.kode_lokasi=aa.kode_lokasi and b.tahun=aa.tahun "+
						 "left join "+
						 "   (select no_fa,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_susut "+
						 "	  from fasusut_d group by no_fa,kode_lokasi) d on a.no_fa=d.no_fa and a.kode_lokasi=d.kode_lokasi "+
						 "where a.no_fa='"+this.cb_fa.getText()+"' and a.progress = '2' and a.kode_lokasi='"+this.app._lokasi+"'";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){	
					this.e_pp.setText(line.kode_pp_susut+ " - " + line.nama_pp);
					this.e_bp.setText(line.akun_bp+ " - " + line.nama_bp);
					this.e_ap.setText(line.akun_deprs+ " - " + line.nama_deprs);
					this.e_hp.setText(floatToNilai(line.nilai));
					this.e_residu.setText(floatToNilai(line.nilai_residu));
					this.e_totSusut.setText(floatToNilai(line.tot_susut));
					this.e_buku.setText(floatToNilai(line.nilai_buku));
					this.e_susut.setText(floatToNilai(line.nilai_susut));
					this.cb_drk.setText(line.kode_drk,line.nama_drk);
					
					this.akunbp = line.akun_bp;
					this.akunap = line.akun_deprs;
					this.pp = line.kode_pp_susut;
					this.kodeakun = line.kode_akun;
					this.umur = line.umur;
										
					var data2 = this.dbLib.getDataProvider("select fn_cekagg2('"+this.pp+"','"+this.app._lokasi+"','"+this.akunbp+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"') as gar ",true);
					if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
						var line2 = data2.rs.rows[0];						
						data2 = line2.gar.split(";");
						this.e_gar.setText(floatToNilai(parseFloat(data2[0]) - parseFloat(data2[1])));						
					}					
				}
			} else this.standarLib.clearByTag(this, new Array("3"),undefined);
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fasusut_m","no_fasusut",this.app._lokasi+"-RSU"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_ket.setFocus();
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							this.nama_report="server_report_saku2_fa_rptBuktiJurnal";
							this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_fasusut='"+this.e_nb.getText()+"' ";
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
						}else system.info(this,result,"");
	    			break;					
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
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
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1","3"),this.e_nb);
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});
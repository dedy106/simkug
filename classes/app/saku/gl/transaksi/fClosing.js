window.app_saku_gl_transaksi_fClosing = function(owner)
{
	if (owner)
	{
		window.app_saku_gl_transaksi_fClosing.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku_gl_transaksi_fClosing";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Closing Transaksi", 8);	
		
		this.maximize();		
		this.elokasi = new portalui_saiLabelEdit(this);
		this.elokasi.setTop(25);
		this.elokasi.setLeft(20);
		this.elokasi.setWidth(400);
		this.elokasi.setCaption("Lokasi");		
		this.elokasi.setText(this.app._lokasi);
		this.elokasi.setReadOnly(true);
				
		this.ePeriode = new portalui_saiLabelEdit(this);
		this.ePeriode.setTop(50);
		this.ePeriode.setLeft(20);
		this.ePeriode.setWidth(200);
		this.ePeriode.setCaption("Periode Closing");
		this.ePeriode.setReadOnly(true);
		this.ePeriode.setText(this.app._periode);
		
		this.eNoBukti = new portalui_saiLabelEdit(this);
		this.eNoBukti.setTop(75);
		this.eNoBukti.setLeft(20);
		this.eNoBukti.setWidth(200);
		this.eNoBukti.setCaption("No Bukti");
		this.eNoBukti.setReadOnly(true);
		
		this.btn = new portalui_button(this);
		this.btn.setTop(75);
		this.btn.setLeft(230);
		this.btn.setCaption("Generate");
		this.btn.onClick.set(this,"doClick");
		
		this.eKeterangan = new portalui_saiLabelEdit(this);
		this.eKeterangan.setTop(100);
		this.eKeterangan.setLeft(20);
		this.eKeterangan.setWidth(400);
		this.eKeterangan.setCaption("Keterangan");
		
		uses("portalui_saiCBBL");
		this.eNik = new portalui_saiCBBL(this);
		this.eNik.setTop(125);
		this.eNik.setLeft(20);
		this.eNik.setWidth(200);
		this.eNik.setCaption("Diclosing oleh");
		this.eNik.onBtnClick.set(this,"FindBtnClick");		
				
		this.eMgr = new portalui_saiCBBL(this);
		this.eMgr.setTop(150);
		this.eMgr.setLeft(20);
		this.eMgr.setWidth(200);
		this.eMgr.setCaption("Disetujui oleh");
		this.eMgr.onBtnClick.set(this,"FindBtnClick");
		
		this.p1 = new portalui_panel(this);
		this.p1.setTop(175);
		this.p1.setLeft(20);
		this.p1.setWidth(400);
		this.p1.setHeight(200);		
		this.p1.setCaption("Status");
		
		uses("portalui_saiMemo");
		this.eMemo = new portalui_saiMemo(this.p1);
		this.eMemo.setTop(25);
		this.eMemo.setLeft(0);
		this.eMemo.setWidth(399);
		this.eMemo.setHeight(170);
		this.eMemo.setLabelWidth(0);		
		this.eMemo.setReadOnly(true);
		this.eMemo.setTag(9);
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.menuStr = "";
		
		uses("util_standar");
		this.standarLib = new util_standar();
		
		setTipeButton(tbSimpan);				
		
		this.rowIndex = -1;
		this.setTabChildIndex();		
		this.elokasi.setText(this.app._lokasi +"-"+this.app._namalokasi);						
		this.maxPeriode = this.dbLib.loadQuery("select value1 from spro where kode_lokasi = '"+this.app._lokasi+"' and kode_spro = 'MAXPRD'");	
		this.maxPeriode = this.maxPeriode.split("\r\n");
		this.maxPeriode = parseInt(this.maxPeriode[1]);
		this.eNik.setText(this.app._userLog, this.app._namaUser);
		this.eNik.setSQL("select nik, nama from karyawan where kode_lokasi = '"+this.app._lokasi+"' ",["nik","nama"],true);
		this.eMgr.setSQL("select nik, nama from karyawan where kode_lokasi = '"+this.app._lokasi+"' ",["nik","nama"],true);		
		if (this.app._periode == this.app._periode.substr(0,4) +this.maxPeriode){
			systemAPI.alert("Gunakan Closing Akhir Tahun karena sudah diakhir periode keuangan("+this.app._periode+").","Transaksi tidak bisa dilakukan.");
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Closing Transaksi", 99);			
			return;
		}
	}
};
window.app_saku_gl_transaksi_fClosing.extend(window.portalui_childForm);
window.app_saku_gl_transaksi_fClosing.implement({
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","");	
		if (sender == this.app._mainForm.bSimpan || sender == this.app._mainForm.bExec){
			try{
			system.confirm(this, "simpan", "Closing "+(parseInt(this.app._periode.substr(4),10) >= 12 ? "Desember "+(parseInt(this.app._periode.substr(4),10) - 12 + 1): window.monthName.ID[this.app._periode.substr(4)]) +" "+this.app._periode.substr(0,4)+" ("+this.app._periode +") akan dilakukan ?","");
			}catch(e){alert(e);}
		}
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","");	
	},
	FindBtnClick: function(sender){
		this.standarLib.showListData(this, "Data Karyawan",sender,undefined, 
											  "select nik, nama from karyawan where kode_lokasi = '"+this.app._lokasi+"' ",
											  "select count(*) from karyawan where kode_lokasi = '"+this.app._lokasi+"' ",
											  ["nik","nama"],"and",["NIK","Nama"]);			
	},
	doClick: function(sender){	
		this.eNoBukti.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "gl_closing", "no_bukti", "CL"+this.ePeriode.getText().substr(2),"00", " and kode_lokasi = '"+this.app._lokasi+"' "));
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch (methodName)
				{
					case "execArraySQL" :
					case "execQueary" :
						if (result.toLowerCase().search("error") == -1){
							this.app._periode = closePeriode(this.app._periode,this.maxPeriode);
							system.info(this,"Closing berhasil dilakukan. [No Bukti : "+this.nobukti+"]","Sekarang Periode Aktif adalah "+monthName.ID[this.app._periode.substr(4)]+" "+this.app._periode.substr(0,4)+"( "+this.app._periode+")");
							this.app._mainForm.lPrd1.setCaption(this.app._periode);
							this.ePeriode.setText(this.app._periode); 							
							this.eNoBukti.setText(""); 							
							this.eKeterangan.setText(""); 							
						}else system.alert(this,result,""); 
						break;
				}
		}
	},
	doModalResult: function(event, modalResult, value){
		try
		{
			switch (event)
			{
				case "clear" :
					if (modalResult == mrOk)
					{
						this.e0.clear();
					}
					break;
				case "simpan" :
					if (modalResult == mrOk)
					{
						try{
							if (this.standarLib.checkEmptyByTag(this, new Array("0","1","2"))){
								if (this.isPostedAll(this.app._periode)){
									this.nobukti = this.eNoBukti.getText();
									sql = new server_util_arrayList();
									sql.add("insert into periode(periode, keterangan, kode_lokasi)values('"+closePeriode(this.app._periode,this.maxPeriode)+"','"+this.eKeterangan.getText()+"','"+this.app._lokasi+"')");							
									sql.add("insert into gldt_h select * from gldt where kode_lokasi ='"+this.app._lokasi+"' and periode = '"+this.app._periode+"' ");
									sql.add("delete from gldt where kode_lokasi ='"+this.app._lokasi+"' and periode = '"+this.app._periode+"' ");
									sql.add("insert into gl_closing(no_bukti, keterangan, periode, user_id,tanggal,kode_lokasi,nik_setuju)values "+
											"	('"+this.eNoBukti.getText()+"','"+this.eKeterangan.getText()+"','"+this.app._periode+"','"+this.app._userId+"',now(),'"+this.app._lokasi+"','"+this.eMgr.getText()+"')");							
									this.dbLib.execArraySQL(sql);	
								}else system.alert(this,"Closing tidak dapat dilanjutkan","Semua modul harus sudah terposting");
							}
						}
						catch(e)
						{
							system.alert(this,e,"");
						}
					}
					break;
				
			}
		}catch(e){
			systemAPI.alert("[fNeraca]::doModalResult:"+e);
		}
	},
	isPostedAll: function(periode){
		system.showProgress();
		var result = true;
		var msg  = "";
		var scriptAsset = "select count(x.no_bukti) "+
				   "from ( "+
				   "  select no_faapp as no_bukti from fa_app where posted = 'F' and periode <='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+
				   "union "+
				   "  select no_fasusut as no_bukti from fasusut_m where posted = 'F' and periode<='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+
				   "union "+
				   "  select no_kirim as no_bukti from famutkirim_m where kode_lokasi <> lokasi_tuj and posted = 'F' and periode<='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+
				   "union "+
				   "  select no_terima as no_bukti from famutterima_m where kode_lokasi <> lokasi_asal and posted = 'F' and periode<='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+
				   "union "+
				   "  select no_woapp as no_bukti from fawoapp_m where posted = 'F' and periode<='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+
				   ") x";	
		var data,ck = this.dbLib.loadQuery(scriptAsset);
		if (ck != "") { 
			data = ck.split("\r\n"); 
			if (data[1] != "0"){
				result = result && false;
				msg+= "Data Asset masih ada yang belum diposting.("+data[1]+" data)\n";//return false;
			}
		}		
		var scriptSPB = "select count(a.no_spb) "+
					   "from spb_m a "+
					   "where a.posted = 'F' and a.periode<='"+periode+
					   "' and a.kode_lokasi='"+this.app._lokasi+"'";													   
		var ck = this.dbLib.loadQuery(scriptSPB);	
		if (ck != "") { 
			data = ck.split("\r\n"); 
			if (data[1] != "0") {
				result = result && false;
				msg+= "Data SPB masih ada yang belum diposting.("+data[1]+" data)\n";//return false;
			}
		}
		var scriptFPTG = " select count(a.no_ffptg) "+
					   " from ffptg_m a "+
					   " where a.posted = 'F' and a.periode<='"+periode+"' and "+
					   "       a.progress = '2' and a.kode_lokasi='"+this.app._lokasi+"'";
		var ck = this.dbLib.loadQuery(scriptFPTG);	
		if (ck != "") { 
			data = ck.split("\r\n"); 
			if (data[1] != "0") {
				result = result && false;
				msg+= "Data fluktuatif fund masih ada yang belum diposting.("+data[1]+" data)\n";//return false;
			}
		}		
		var scriptIPTG = " select count(a.no_ifptg) "+
					   " from ifptg_m a "+
					   " where a.posted = 'F' and a.periode<='"+periode+"' and "+
					   "       a.progress = '2' and a.kode_lokasi='"+this.app._lokasi+"'";
		var ck = this.dbLib.loadQuery(scriptIPTG);	
		if (ck != "") { 
			data = ck.split("\r\n"); 
			if (data[1] != "0") {
				result = result && false;
				msg+= "Data IF masih ada yang belum diposting.("+data[1]+" data)\n";//return false;
			}
		}		
		var scriptPJPTG = " select count(a.no_ptg) "+
					   " from ptg_m a "+
					   " where a.posted = 'F' and a.periode<='"+periode+"' and "+
					   "       a.progress = '2' and a.kode_lokasi='"+this.app._lokasi+"'";
		var ck = this.dbLib.loadQuery(scriptPJPTG);	
		if (ck != "") { 
			data = ck.split("\r\n"); 
			if (data[1] != "0") {
				result = result && false;
				msg+= "Data Panjar masih ada yang belum diposting.("+data[1]+" data)\n";//return false;
			}
		}		
		var scriptKas = " select count(a.no_kas) "+
					   " from kas_m a  "+
					   " where a.posted = 'F' and a.periode<='"+periode+"' and "+
					   "       a.kode_lokasi='"+this.app._lokasi+"'";
		var ck = this.dbLib.loadQuery(scriptKas);	
		if (ck != "") { 
			data = ck.split("\r\n"); 
			if (data[1] != "0") {
				result = result && false;
				msg+= "Data Kas masih ada yang belum diposting.("+data[1]+" data)\n";//return false;
			}
		}		
		var scriptJU = "select count(a.no_ju) "+
					   "from ju_m a "+
					   "where a.posted = 'F' and a.periode<='"+periode+
					   "' and a.kode_lokasi='"+this.app._lokasi+"'";
		var ck = this.dbLib.loadQuery(scriptJU);	
		if (ck != "") { 
			data = ck.split("\r\n"); 
			if (data[1] != "0") {
				result = result && false;
				msg+= "Data JU masih ada yang belum diposting.("+data[1]+" data)\n";//return false;			
			}
		}
		var scriptAR = "select count(a.no_ar) "+
					   "from kop_ar_m a "+
					   "where a.posted = 'F' and a.periode<='"+periode+
					   "' and a.kode_lokasi='"+this.app._lokasi+"'";
		var ck = this.dbLib.loadQuery(scriptAR);	
		if (ck != "") { 
			data = ck.split("\r\n"); 
			if (data[1] != "0") {
				result = result && false;
				msg+= "Data AR masih ada yang belum diposting.("+data[1]+" data)\n";//return false;			
			}
		}
		
		this.eMemo.setText(msg);
		system.hideProgress();
		return result;
	}
});

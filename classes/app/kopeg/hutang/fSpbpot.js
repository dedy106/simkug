window.app_kopeg_hutang_fSpbpot = function(owner)
{
	if (owner)
	{
		window.app_kopeg_hutang_fSpbpot.prototype.parent.constructor.call(this,owner);
		this.className  = "app_kopeg_hutang_fSpbpot";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form SPB Potongan Gaji: Input", 0);	
		
		uses("portalui_checkBox;portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_saiTable");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,change:[this,"doChange"]});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No SPB",maxLength:30,readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[280,13,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});		
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,14,343,20],caption:"No Dokumen", maxLength:100,tag:1});		
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,15,500,20],caption:"Keterangan", maxLength:150,tag:1});						
		this.l_tgl2 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Jth Tempo", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,11,100,18],date:new Date().getDateStr()});		
		this.cb_ap = new portalui_saiCBBL(this,{bound:[20,19,200,20],caption:"Akun Hutang",btnClick:[this,"doBtnClick"],tag:2});				
		this.cb_buat = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Dibuat Oleh",btnClick:[this,"doBtnClick"],tag:2});				
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,17,200,20],caption:"Disetujui Oleh",btnClick:[this,"doBtnClick"],tag:2});		
		this.cb_vendor = new portalui_saiCBBL(this,{bound:[20,18,200,20],caption:"Vendor",btnClick:[this,"doBtnClick"],tag:2,change:[this,"doChange"]});		
		this.cb_spb = new portalui_saiCBBL(this,{bound:[20,19,200,20],caption:"No SPB Potongan",btnClick:[this,"doBtnClick"],tag:2,change:[this,"doChange"]});		
		this.bTampil = new portalui_button(this,{bound:[600,19,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
		this.e_spp = new portalui_saiLabelEdit(this,{bound:[700,19,200,20],caption:"Nilai SPB",tipeText:ttNilai,readOnly: true, tag:1,text:"0"});
		this.i_gar = new portalui_imageButton(this,{bound:[900,19,20,20],hint:"Hitung Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"garClick"]});	
			
		this.p2 = new portalui_panel(this,{bound:[20,30,900,240],caption:"Daftar Item Jurnal SPB"});
		this.sg2 = new portalui_saiGrid(this.p2,{bound:[0,20,895,200],colCount:10,tag:1,
		            colTitle:["Status","Kode Akun","Nama Akun","Keterangan","DC","Nilai","Kode PP","Nama PP","Kode RKM","Nama RKM"],
					colWidth:[[0,1,2,3,4,5,6,7,8,9],[60,80,100,200,50,100,60,100,60,100]],colFormat:[[5],[cfNilai]],
					buttonStyle:[[0],[bsAuto]], picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
					columnReadOnly:[true,[1,2,3,4,5,6,7,8,9],[0]],nilaiChange:[this,"doNilaiChange2"],change:[this,"doChangeCell2"],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.p2,{bound:[0,215,900,25],buttonStyle:2,grid:this.sg2});		
		this.cb1 = new portalui_checkBox(this.sgn2,{bound:[840,5,100,25],caption:"Preview",selected:true});
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.sg2.onCellEnter.set(this,"doCellEnter2");

			uses("app_saku_fJurnalViewer",true);			
			this.jurnal = new app_saku_fJurnalViewer(this.app);
			this.jurnal.sg.setColTitle(["Kode Akun","Kode PP","Kode RKM","Nilai","Saldo Anggaran"]);
			this.jurnal.p.setCaption('Data Anggaran');		

			
			this.cb_ap.setSQL("select kode_akun, nama from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",["kode_akun","nama"],true);
			this.cb_buat.setSQL("select nik,nama from karyawan where kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],true);
			this.cb_app.setSQL("select nik,nama from karyawan where kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],true);
			this.cb_vendor.setSQL("select kode_vendor,nama from vendor where kode_lokasi = '"+this.app._lokasi+"'",["kode_vendor","nama"],true);
			this.cb_spb.setSQL("select no_spb,keterangan from spb_m where kode_lokasi = '"+this.app._lokasi+"' and jenis='APUMUM'",["no_spb","keterangan"],true);
			
			uses("server_report_report;portalui_reportViewer");
			this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
			this.viewer.hide();
			this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
			this.report = new server_report_report();
			this.report.addListener(this);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_kopeg_hutang_fSpbpot.extend(window.portalui_childForm);
window.app_kopeg_hutang_fSpbpot.implement({
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
			this.hitungGar();
			for (var i in this.gridJurnal.objList)
			{
				line = this.gridJurnal.get(i);
				if ((line.get("kode_drk") == "-") && (line.get("kode_akun").substr(0,1) == "5"))
				{
					system.alert(this,"Akun Beban harus diisi DRKnya.","Periksa kembali data akun.");
					return false;
				}			
				if ((line.get("kode_drk") != "-") && (parseFloat(line.get("nilai")) > parseFloat(line.get("saldo_gar"))) && (parseFloat(line.get("nilai"))>0))
				{
					system.alert(this,"Nilai transaksi melebihi saldo anggaran.","Periksa kembali data anggaran.");
					return false;
				}
			}
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					this.akunAP = this.cb_ap.getText();
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'spb_m','no_spb',this.app._lokasi+"-SPB"+this.e_periode.getText().substr(2,4)+".",'0000'));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					var total = nilaiToFloat(this.e_spp.getText());
					sql.add("insert into spb_m (no_spb,no_dokumen,tanggal,due_date,akun_hutang,keterangan,catatan,kode_curr,kurs,nik_buat,nik_setuju,kode_terima,kode_lokasi,kode_pp,"+
							"modul,jenis,nilai,nilai_ppn,nilai_pot,posted,progress,periode,no_del,no_link,nik_user,tgl_input)  values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+
							"','"+this.akunAP+"','"+this.e_desc.getText()+"','-','IDR',1,'"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.cb_vendor.getText()+"','"+this.app._lokasi+"','"+this.app._kodePP+
							"','SPB','APPOT',"+total+",0,0,'F','0','"+this.e_periode.getText()+"','-','-','"+this.app._userLog+"',now())");					
					var idx = 0;
					var scr1 = "";
					var baris1 = true; 
					for (var i=0; i < this.sg2.rows.getLength(); i++){
						if (this.sg2.rowValid(i) && this.sg2.cells(0,i)=="APP") {
							sql.add("insert into kop_gajispb_d (no_spb,no_gaji,periode,kode_akun,nilai,kode_lokasi,dc) values "+
								    "('"+this.e_nb.getText()+"','"+this.cb_spb.getText()+"','"+this.e_periode.getText()+"','"+this.sg2.cells(1,i)+"',"+parseNilai(this.sg2.cells(5,i))+",'"+this.app._lokasi+"','D')");
										
							scr1 = "insert into spb_j (no_spb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
							   "kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";
							scr1 += "('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDate()+"',"+idx+",'"+this.sg2.getCell(1,i)+
									"','"+this.sg2.getCell(3,i)+"','D',"+parseNilai(this.sg2.getCell(5,i))+",'"+this.sg2.getCell(6,i)+"','"+this.sg2.getCell(8,i)+"',"+
									"'"+this.app._lokasi+"','SPB','TTP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
							baris1 = false;
							idx++;
							sql.add(scr1);
						}
					}	
					idx++;
					scr1 = "insert into spb_j (no_spb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
							   "kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";
					scr1 += "('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDate()+"',"+idx+",'"+this.akunAP+
							"','"+this.e_desc.getText()+"','C',"+parseNilai(this.e_spp.getText())+",'"+this.app._kodePP+"','-',"+
							"'"+this.app._lokasi+"','SPB','AP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
					sql.add(scr1);
					
					//------------------------------------------------------------------------------------------ ANGGARAN ------------------------------------------------------------------------------
					if (this.gridJurnal.getLength() > 0)
					{
						var scr1 = "";
						var baris1 = true;
						var line = undefined;
						var DC = "";
						for (var i in this.gridJurnal.objList)
						{						
							line = this.gridJurnal.get(i);
							if (parseFloat(line.get("nilai")) < 0) {DC = "C";}
							else {DC = "D";}
							scr1 = "insert into angg_r (no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values ";
							scr1 += "('"+this.e_nb.getText()+"','SPBPOT','"+this.app._lokasi+"','"+line.get("kode_akun")+"','"+line.get("kode_pp")+"','"+line.get("kode_drk")+
									"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+DC+"',"+parseFloat(line.get("saldo_gar"))+","+Math.abs(parseFloat(line.get("nilai")))+")";
							sql.add(scr1);
						}						
					}
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
				if (modalResult == mrOk) {
					this.app._mainForm.setActiveControl(this.app._mainForm.cb1);
					this.standarLib.clearByTag(this, new Array("1","3"),this.e_nb);		
					this.sg2.clear(1); 
				}
				break;
			case "simpan" :
                this.sg2.validasi();
				if ((new Date()).strToDate(this.dp_d1.getDate())  > (new Date()).strToDate(this.dp_d2.getDate())){
					system.alert(this,"Tanggal tidak valid."," Tanggal SPB melebihi Tgl Jatuh Temponya.");
					return false;
				}
				if (nilaiToFloat(this.e_spp.getText()) <= 0){
					system.alert(this,"Transaksi tidak valid.","Nilai SPB tidak boleh kurang atau sama dengan nol.");
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
	doChange:function(sender){
		this.sg2.clear(1);
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'spb_m','no_spb',this.app._lokasi+"-SPB"+this.e_periode.getText().substr(2,4)+".",'0000'));
		this.e_dok.setFocus();
	},
	doTampilClick: function(sender){
		try{			
			if (this.cb_spb.getText() != ""){
				var data = this.dbLib.getDataProvider("select x.kode_akun,y.nama as nama_akun,x.keterangan as ket,x.dc,x.nilai-ifnull(c.totpakai,0) as sisa,x.kode_pp,ifnull(z.nama,'-') as nama_pp,x.kode_drk,ifnull(zz.nama,'-') as nama_drk "+
												  "from spb_j x "+
												  "             inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi "+
												  "             left outer join pp z on x.kode_pp=z.kode_pp and x.kode_lokasi=z.kode_lokasi "+
												  "             left outer join drk zz on x.kode_drk=zz.kode_drk and x.kode_lokasi=zz.kode_lokasi and zz.tahun=substring(x.periode,1,4) "+
												  "             left outer join (select no_gaji,kode_akun,kode_lokasi, sum(case dc when 'D' then nilai else -nilai end) as totpakai "+
												  "                              from kop_gajispb_d where kode_lokasi='"+this.app._lokasi+"' group by no_gaji,kode_akun,kode_lokasi) c on c.kode_akun=x.kode_akun and c.no_gaji=x.no_spb and x.kode_lokasi=c.kode_lokasi "+
												  "where x.jenis='BBN' and x.dc='C' and x.no_spb='"+this.cb_spb.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"'");
				eval("data = "+data+";");				
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData(["INPROG",line.kode_akun,line.nama_akun,line.ket,line.dc.toUpperCase(),floatToNilai(line.sisa),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
					}
				}
				this.sg2.validasi();
			}
			else {
				system.alert(this,"SPB Gaji tidak valid.","No SPB harus dipilih.");
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_spb) {   
			    this.standarLib.showListData(this, "Daftar SPB",sender,undefined, 
											  "select no_spb,keterangan from spb_m where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"' and no_del='-' and progress in ('1','2') and modul='SPB' and jenis='APUMUM'", 
											  "select count(no_spb)     from spb_m where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"' and no_del='-' and progress in ('1','2') and modul='SPB' and jenis='APUMUM'", 
											  ["no_spb","keterangan"],"and",["No SPB","Keterangan"],false);				
				this.sg2.clear(1);
			}
			if (sender == this.cb_buat) {   
			    this.standarLib.showListData(this, "Dibuat Oleh",sender,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  ["nik","nama"],"and",["NIK","Nama"],false);				
			}
			if (sender == this.cb_app) {   
			    this.standarLib.showListData(this, "Disetujui Oleh",sender,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  ["nik","nama"],"and",["NIK","Nama"],false);				
			}
			if (sender == this.cb_vendor) {   
			    this.standarLib.showListData(this, "Daftar Vendor",sender,undefined, 
											  "select kode_vendor, nama  from vendor where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_vendor) from vendor where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_vendor","nama"],"and",["Kode","Nama"],false);				
			}
			if (sender == this.cb_ap) {   
			    this.standarLib.showListData(this, "Daftar Akun Hutang",sender,undefined, 
											  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='024'",
											  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='024'",
											  ["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		this.e_nb.setText("");
	},
	doChangeCell2: function(sender, col, row){
	   try{
           if (col == 0) sender.validasi();
        }catch(e){
            alert(e);
        }
    },
	doNilaiChange2: function(){
		try{
			var tot1 = tot2 = 0;
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.getCell(5,i) != ""){
					if (this.sg2.getCell(0,i).toUpperCase() == "APP") tot1 += nilaiToFloat(this.sg2.getCell(5,i));			
				}
			}
			this.e_spp.setText(floatToNilai(tot1));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	hitungGar: function(){
		var row,dtJurnal = new portalui_arrayMap();
		var nemu = false;
		var nreal,ix,dtJrnl = 0;
		
	    for (var i=0; i < this.sg2.rows.getLength(); i++)
		{
			if (!this.sg2.rowValid(i)) continue;
			kdAkun = this.sg2.getCell(1,i);
			kdPP = this.sg2.getCell(6,i);
			kdDRK = this.sg2.getCell(8,i);
			
			if (this.sg2.getCell(4,i) == "D") {nreal = nilaiToFloat(this.sg2.getCell(5,i));}
			else {nreal = nilaiToFloat(this.sg2.getCell(5,i)) * -1;}
			
			nemu = false;
			ix = 0;
						
			for (var j in dtJurnal.objList)
			{		
			  if ((kdAkun == dtJurnal.get(j).get("kode_akun")) && (kdPP == dtJurnal.get(j).get("kode_pp")) && (kdDRK == dtJurnal.get(j).get("kode_drk")))
			  {
				nemu = true;
				row = dtJurnal.get(j);
				ix = j;
				break;
			  }
			}
			
			if (!nemu){
				row = new portalui_arrayMap();
				row.set("kode_akun",kdAkun);
				row.set("kode_pp",kdPP);
				row.set("kode_drk",kdDRK);
				row.set("nilai",nreal);
				row.set("saldo_gar",0);
				dtJrnl++;
				dtJurnal.set(dtJrnl,row);						
			}else {
				dtJurnal.get(ix).set("nilai",row.get("nilai") + nreal);				
			}
		}
		
		if (dtJurnal.getLength() > 0){
			var desc1 = new portalui_arrayMap();
			desc1.set("kode_akun",150);
			desc1.set("kode_pp",150);
			desc1.set("kode_drk",150);
			desc1.set("nilai",150);
			desc1.set("saldo_gar",150);
			
			var desc2 = new portalui_arrayMap();
			desc2.set("kode_akun","S");
			desc2.set("kode_pp","S");
			desc2.set("kode_drk","S");	
			desc2.set("nilai","N");
			desc2.set("saldo_gar","N");
			
			var dataDesc = new portalui_arrayMap();
			dataDesc.set(0,desc1);
			dataDesc.set(1,desc2);
			dtJurnal.setTag2(dataDesc);
		}
		this.gridJurnal = dtJurnal;
		//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		
		var line = undefined;
		var sls = 0;
		for (var i in this.gridJurnal.objList)
		{
			line = this.gridJurnal.get(i);
			var baris,data = this.dbLib.runSQL("select fn_cekagg2('"+line.get("kode_pp")+"','"+this.app._lokasi+"','"+line.get("kode_akun")+"','"+line.get("kode_drk")+"','"+this.e_periode.getText()+"') as gar ");
			if (data instanceof portalui_arrayMap)
			{
				baris = data.get(0);
				if (baris != undefined)
				{
					baris = baris.get("gar");
					data = baris.split(";");
					sls = parseFloat(data[0]) - parseFloat(data[1]);
					line.set("saldo_gar",sls);
					this.gridJurnal.set(i,line);		
				} 
			} else alert(data);
		}	
	},
	garClick: function(sender){
		try
		{
			if (this.e_spp.getText() != "0")
			{
				this.jurnal.sg.clear();
				this.hitungGar();
				if (this.gridJurnal != undefined){				
					this.jurnal.setData(this.gridJurnal);
					this.jurnal.showModal();
				}
			}
		} catch	(e)
		{
			systemAPI.alert(e);
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No : "+ this.e_nb.getText()+")");	
							if (this.cb1.isSelected()) {
								this.nama_report="server_report_kopeg_rptSpbH";
								this.filter1 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_spb='"+this.e_nb.getText()+"' ";			
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter1,1,this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.report.preview(this.nama_report,this.filter1,1,1,this.showFilter, this.app._namalokasi,this.filter2);
								this.page = 1;
								this.allBtn = false;
							} else this.clearLayar(); //this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
		if (methodName === "preview"){
			this.viewer.preview(result);
		}
	},
	doCloseReportClick: function(sender)
	{
		switch(sender.getName())
		{
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
				this.clearLayar();//this.app._mainForm.bClear.click();    
			break;
		}
	},	
	clearLayar : function(){
		this.standarLib.clearByTag(this, new Array("1","3"),this.e_nb);		
		this.sg2.clear(1); 
	}
});

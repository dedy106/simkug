window.app_saku3_transaksi_siswa_fKbBillYpt = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siswa_fKbBillYpt.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siswa_fKbBillYpt";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Load Pelunasan Tagihan TK", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_titip = new saiCBBL(this,{bound:[20,18,220,20],caption:"Akun Titipan", multiSelection:false, maxLength:10, tag:2 });
		//this.cb_app = new saiCBBL(this,{bound:[20,17,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.e_piutang = new saiLabelEdit(this,{bound:[720,18,200,20],caption:"Total Tagihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.cb_pp = new saiCBBL(this,{bound:[20,17,220,20],caption:"Kode PP", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});
		this.e_nilai = new saiLabelEdit(this,{bound:[720,17,200,20],caption:"Total Pelunasan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bTampil = new button(this,{bound:[500,17,80,20],caption:"Data Bill",click:[this,"doLoad"]});			
		this.bUpload = new portalui_uploader(this,{bound:[600,17,100,20],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});		
		
		this.pc1 = new pageControl(this,{bound:[20,12,900,300], childPage:["Data Tagihan","Data Pelunasan"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:10,tag:0,
		            colTitle:["NIS","Nama","No Bill","Periode","Akun Piutang","Saldo Tagihan","Nilai Pelunasan","Sisa","ID Bank","Kode Param"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[80,60,80,100,100,70,60,100,150,80]],
					colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9],[]],
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg,pager:[this,"doPager"]});	
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:19,
					colTitle:["NIS","Nama","No Bill",  "DSP","SPP","Praktikum","JOB","PAK","EVALUASI","ULUM","EKS","PERPUS","KARYA", "OSIS", "MOS", "ASUR", "WIS", "LAIN", "ID Bank"],
					colWidth:[[18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[60, 80,80,80,80,80,  80,80,80,80,80,80,80,80,80,80,  150,100,80]],
					colFormat:[[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					readOnly:true, defaultRow:1
					});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"selectPage"]});		
		this.bRefresh = new portalui_imageButton(this.sgn1,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");
		this.sg1.setAllowBlank(true);

		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_titip.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Daftar Akun Pelunasan",true);
			//this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_pp.setText(this.app._kodePP);
			/*
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='ARAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
			*/
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siswa_fKbBillYpt.extend(window.childForm);
window.app_saku3_transaksi_siswa_fKbBillYpt.implement({
	doAfterUpload: function(sender, result, data){		
	    try{   			
			
			this.dataUpload = data;
			if (result) {								
				this.sg1.clear();				
				this.selectPage(undefined, 1);
				this.sgn1.setTotalPage(Math.ceil(this.dataUpload.rows.length / 20));				
				this.sgn1.rearrange();
				this.sgn1.activePage = 0;								
			}else throw(data);		
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				this.dataJU.rs.rows[i].lunas=0;
				
				
			}					
			
			var line; var line2;
			for (var i=0; i < this.dataUpload.rows.length;i++){
				line = this.dataUpload.rows[i];
				for (var j=0;j < this.dataJU.rs.rows.length;j++){
					if (line.no_invoice == this.dataJU.rs.rows[j].no_inv) {
						if (this.dataJU.rs.rows[j].kode_param.toUpperCase() == "DSP") this.dataJU.rs.rows[j].lunas += parseFloat(line.dsp);
						if (this.dataJU.rs.rows[j].kode_param.toUpperCase() == "SPP") this.dataJU.rs.rows[j].lunas += parseFloat(line.spp);
						if (this.dataJU.rs.rows[j].kode_param.toUpperCase() == "PRAK") this.dataJU.rs.rows[j].lunas += parseFloat(line.prak);
						if (this.dataJU.rs.rows[j].kode_param.toUpperCase() == "JOB") this.dataJU.rs.rows[j].lunas += parseFloat(line.job);
						if (this.dataJU.rs.rows[j].kode_param.toUpperCase() == "PAK") this.dataJU.rs.rows[j].lunas += parseFloat(line.pak);
						if (this.dataJU.rs.rows[j].kode_param.toUpperCase() == "EVALUASI") this.dataJU.rs.rows[j].lunas += parseFloat(line.evaluasi);
						if (this.dataJU.rs.rows[j].kode_param.toUpperCase() == "ULUM") this.dataJU.rs.rows[j].lunas += parseFloat(line.ulum);
						if (this.dataJU.rs.rows[j].kode_param.toUpperCase() == "EKS") this.dataJU.rs.rows[j].lunas += parseFloat(line.eks);
						if (this.dataJU.rs.rows[j].kode_param.toUpperCase() == "PERPUS") this.dataJU.rs.rows[j].lunas += parseFloat(line.perpus);
						if (this.dataJU.rs.rows[j].kode_param.toUpperCase() == "KARYA") this.dataJU.rs.rows[j].lunas += parseFloat(line.karya);
						if (this.dataJU.rs.rows[j].kode_param.toUpperCase() == "OSIS") this.dataJU.rs.rows[j].lunas += parseFloat(line.osis);
						if (this.dataJU.rs.rows[j].kode_param.toUpperCase() == "MOS") this.dataJU.rs.rows[j].lunas += parseFloat(line.mos);
						if (this.dataJU.rs.rows[j].kode_param.toUpperCase() == "ASUR") this.dataJU.rs.rows[j].lunas += parseFloat(line.asur);
						if (this.dataJU.rs.rows[j].kode_param.toUpperCase() == "WIS") this.dataJU.rs.rows[j].lunas += parseFloat(line.wis);
						if (this.dataJU.rs.rows[j].kode_param.toUpperCase() == "LAIN") this.dataJU.rs.rows[j].lunas += parseFloat(line.lain);
						this.dataJU.rs.rows[j].id_bank = line.id_bank;
					}
				}
			}
			var tot = 0;
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];
				tot = tot + parseFloat(line.lunas);
			}
			this.e_nilai.setText(floatToNilai(tot));
			
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.doTampilData(1);
   		}catch(e){
   		   this.sg1.hideLoading();
   		   systemAPI.alert(e,"Proses Berhenti.");
        }
	},
	selectPage: function(sender,page){
		var start = (page - 1) * 20;
		var finish = start + 20;
		finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);
		this.sg1.clear();
		
		for (var i=start; i < finish;i++){
			line = this.dataUpload.rows[i];			
			this.sg1.appendData([line.nis,line.nama,line.no_bill,floatToNilai(line.dsp),floatToNilai(line.spp),floatToNilai(line.prak),floatToNilai(line.job),floatToNilai(line.pak),
								floatToNilai(line.evaluasi),floatToNilai(line.ulum),floatToNilai(line.eks),floatToNilai(line.perpus),floatToNilai(line.karya),
								floatToNilai(line.osis),floatToNilai(line.mos),floatToNilai(line.asur),floatToNilai(line.wis),floatToNilai(line.lain),line.id_bank]);
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sis_rekon_m","no_rekon",this.app._lokasi+"-REK"+this.e_periode.getText().substr(2,4)+".","0000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into sis_rekon_m(no_rekon,no_dokumen,tanggal,keterangan,nilai,posted,modul,akun_titip,nis,nik_buat,nik_app,kode_lokasi,periode,nik_user,tgl_input,kode_pp) values "+
						    "('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',"+parseNilai(this.e_nilai.getText())+",'F','LOAD','"+this.cb_titip.getText()+"','-','"+this.app._userLog+"','"+this.app._userLog+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.cb_pp.getText()+"')");
										
					sql.add("insert into sis_rekon_j(no_rekon,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.cb_titip.getText()+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','LOAD','TTP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");					
					this.doHitungAR();
					var line = undefined;
					for (var i in this.gridAR.objList){
						line = this.gridAR.get(i);
						sql.add("insert into sis_rekon_j(no_rekon,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
								"	('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+line.get("kode_akun")+"','"+this.e_ket.getText()+"','C',"+parseFloat(line.get("nilai"))+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','LOAD','PIUT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
					}		
					
					
										
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						var total = parseFloat(line.lunas) + parseFloat(line.sisa);
						if (parseFloat(line.lunas) != 0){							
							sql.add("insert into sis_rekon_d(no_rekon,nis,no_bill,periode,nilai,kode_lokasi,akun_titip,akun_piutang,kode_param,dc,modul,id_bank,kode_pp) values "+
									"	('"+this.e_nb.getText()+"','"+line.nis+"','"+line.no_bill+"','"+this.e_periode.getText()+"',"+parseFloat(line.lunas)+",'"+this.app._lokasi+"','"+this.cb_titip.getText()+"','"+line.akun_piutang+"','"+line.kode_param+"','D','LOAD','"+line.id_bank+"','"+this.cb_pp.getText()+"')");
						}
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
					this.sg.clear(1); 
					this.cb_pp.setText(this.app._kodePP);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					line = this.dataJU.rs.rows[i];
					if (parseFloat(line.lunas) < parseFloat(line.saldo)){
						system.alert(this,"Transaksi tidak valid.","Nilai pelunasan lebih kecil saldo. Bill : "+line.no_bill+"");
						return false;						
					}
				}
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai pelunasan tidak boleh nol atau kurang.");
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
		else this.e_periode.setText(this.app._periode);
		this.e_nb.setText("");
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sis_rekon_m","no_rekon",this.app._lokasi+"-REK"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
		}
		if (sender == this.bRefresh) this.sg1.clear(1);
	},
	doLoad: function(sender){
		
		if (this.cb_pp.getText()!="") {
			this.e_piutang.setText("0");
			this.e_nilai.setText("0");	
			
			var strSQL = "select aa.nis,aa.nama as siswa,a.no_bill,a.periode,a.akun_piutang,sum((a.nilai-isnull(b.tot_lunas,0))) as saldo,0 as lunas, '-' as id_bank,0 as sisa,a.kode_param "+
						 "from sis_bill_d a "+
						 "inner join sis_bill_m e on a.no_bill=e.no_bill and a.kode_lokasi=e.kode_lokasi "+
						 "      inner join sis_siswa aa on aa.nis=a.nis and a.kode_lokasi=aa.kode_lokasi and e.kode_pp=aa.kode_pp "+
						 "      inner join sis_kelas d on a.kode_kelas=d.kode_kelas and a.kode_lokasi=d.kode_lokasi and e.kode_pp=d.kode_pp "+
						 "      left join (select no_bill,nis,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_lunas "+
						 "                 from sis_rekon_d group by nis,no_bill,kode_lokasi) b on a.nis=b.nis and a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi "+						 
						 "where a.periode<='"+this.e_periode.getText()+"' and (a.nilai-isnull(b.tot_lunas,0)) > 0 and e.kode_pp= '"+this.cb_pp.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' "+
						 "group by aa.nis,aa.nama,a.no_bill,a.periode,a.akun_piutang,a.kode_param order by aa.nis";
			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				var line;
				var tot = 0;
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					line = this.dataJU.rs.rows[i];
					tot = tot + parseFloat(line.saldo);
				}		
				this.e_piutang.setText(floatToNilai(tot));
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);	
		}
	},
	doTampilData: function(page) {
		var line;
		this.sg.clear();
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.nis,line.siswa,line.no_bill,line.periode,line.akun_piutang,floatToNilai(line.saldo),floatToNilai(line.lunas),floatToNilai(line.sisa),line.id_bank,line.kode_param]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},		
	doHitungAR: function() {
		var row,dtJurnal = new portalui_arrayMap();
		var nemu = false;
		var ix,dtJrnl = 0;
		for (var i=0;i < this.dataJU.rs.rows.length;i++){
			line = this.dataJU.rs.rows[i];
			if (parseFloat(line.lunas) != 0){
				kdAkun = line.akun_piutang;
				nemu = false;
				ix = 0;
				for (var j in dtJurnal.objList){		
				  if ((kdAkun == dtJurnal.get(j).get("kode_akun"))){
					nemu = true;
					row = dtJurnal.get(j);
					ix = j;
					break;
				  }
				}
				if (!nemu){
					row = new portalui_arrayMap();
					row.set("kode_akun",kdAkun);
					row.set("nilai",parseFloat(line.lunas));
					dtJrnl++;
					dtJurnal.set(dtJrnl,row);						
				}else dtJurnal.get(ix).set("nilai",row.get("nilai") + parseFloat(line.lunas));
			}
		}
		this.gridAR = dtJurnal;
	}, 
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							this.nama_report="server_report_saku3_siswa_rptSisJurnalRekonYpt";
							this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_rekon='"+this.e_nb.getText()+"' ";
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); 
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});
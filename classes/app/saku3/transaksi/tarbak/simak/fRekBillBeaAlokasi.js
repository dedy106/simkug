window.app_saku3_transaksi_tarbak_simak_fRekBillBeaAlokasi = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tarbak_simak_fRekBillBeaAlokasi.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tarbak_simak_fRekBillBeaAlokasi";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pelunasan Tagihan Beasiswa", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;pageControl");
		this.cb_pp = new saiCBBL(this,{bound:[20,17,220,20],caption:"Kode PP", readOnly:true, maxLength:10, tag:2, change:[this,"doChange"]});
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 
		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,16,450,20],caption:"Deskripsi", maxLength:150});								
		this.e_piutang = new saiLabelEdit(this,{bound:[790,16,200,20],caption:"Total Tagihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					
		this.cb_beban = new saiCBBL(this,{bound:[20,17,220,20],caption:"Akun Beban",  multiSelection:false, maxLength:10, tag:2});
		this.e_nilai = new saiLabelEdit(this,{bound:[790,17,200,20],caption:"Total Beasiswa", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.bTampil = new button(this,{bound:[670,17,100,20],caption:"Data Bill& Bea",click:[this,"doLoad"]});			
		
		this.pc1 = new pageControl(this,{bound:[1,12,995,337], childPage:["Billing - Beasiswa","Del Trans"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:10,tag:0,
		            colTitle:["NIS","Nama","No Bill","Periode","Akun Piutang","Saldo Tagihan","Ni Beasiswa","Sisa Tagih","ID Bank","Kode Param"],
					colHide:[[7,8],[true,true]],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[80,1,1,100,100,80,80,150,200,120]],					
					colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]],					
		            columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9],[]],
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});	

		this.cb_bukti = new saiCBBL(this.pc1.childPage[1],{bound:[20,17,220,20],caption:"No Bukti",  multiSelection:false, maxLength:10, tag:9});
		this.bHapus = new button(this.pc1.childPage[1],{bound:[120,18,98,20],caption:"Hapus Data",click:[this,"doHapus"]});				

		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	

		setTipeButton(tbSimpan);		
		
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
			
			this.cb_beban.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag='061' where a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Daftar Akun Pelunasan",true);
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_pp.setText(this.app._kodePP);
			
			var data = this.dbLib.getDataProvider("select akun_cd from pp where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.akunCD = line.akun_cd;
			} else this.akunCD = "";

			if (this.akunCD == "" || this.akunCD == "-") {
				system.alert(this,"Akun CD belum di seting di Form PP.","");
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tarbak_simak_fRekBillBeaAlokasi.extend(window.childForm);
window.app_saku3_transaksi_tarbak_simak_fRekBillBeaAlokasi.implement({	
	isiCBbukti: function() {
		this.cb_bukti.setSQL("select no_rekon, keterangan from sis_rekon_m where modul='LOADBEA' and posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",["no_rekon","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti Beasiswa",true);												
	},
	doHapus: function(sender){	
		try {
			this.preView = "0";
			uses("server_util_arrayList");
			var sql = new server_util_arrayList();

			sql.add("delete from sis_rekon_m where no_rekon='"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
			sql.add("delete from sis_rekon_j where no_rekon='"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
			sql.add("delete from sis_rekon_d where no_rekon='"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");


			setTipeButton(tbAllFalse);					
			this.dbLib.execArraySQL(sql);
		}
		catch(e) {
			alert(e);
		}
	},
	doLoad: function(sender){	
		if (this.cb_pp.getText()!="") {
			this.e_piutang.setText("0");
			this.e_nilai.setText("0");	
			
			this.nik_user=this.app._nikUser;						
			var sql = "exec sp_bill_saldo '"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','"+this.nik_user+"'";
			this.dbLib.execQuerySync(sql);	

			var strSQL = "select a.nis,a.siswa,a.no_bill,a.periode,a.akun_piutang,a.saldo,a.id_bank,a.kode_param, b.kode_kelas, "+
						"case when a.saldo <= c.nilai then a.saldo else c.nilai end as bayar "+
						"from sis_bill_saldo a "+
						"inner join sis_siswa b on a.nis=b.nis and b.kode_pp='"+this.cb_pp.getText()+"' "+
						"inner join sis_bea_d c on b.nis=c.nis and b.kode_kelas=c.kode_kelas and a.kode_param=c.kode_param and a.periode between c.per_awal and c.per_akhir "+ 
						"where a.nik_user='"+this.nik_user+"' and a.periode='"+this.e_periode.getText()+"' ";

			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				var line;
				var tot = byr = 0;
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					line = this.dataJU.rs.rows[i];
					tot = tot + parseFloat(line.saldo);
					byr = byr + parseFloat(line.bayar);
				}		
				this.e_piutang.setText(floatToNilai(tot));
				this.e_nilai.setText(floatToNilai(byr));
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
			this.sg.appendData([line.nis,line.siswa,line.no_bill,line.periode,line.akun_piutang,floatToNilai(line.saldo),floatToNilai(line.bayar),"0",line.id_bank,line.kode_param]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
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
					var total = nilaiToFloat(this.e_nilai.getText());
					sql.add("insert into sis_rekon_m(no_rekon,no_dokumen,tanggal,keterangan,nilai,posted,modul,akun_titip,nis,nik_buat,nik_app,kode_lokasi,periode,nik_user,tgl_input,kode_pp) values "+
						    "('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',"+total+",'F','LOADBEA','"+this.cb_beban.getText()+"','-','"+this.app._userLog+"','"+this.app._userLog+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.cb_pp.getText()+"')");
										
					sql.add("insert into sis_rekon_j(no_rekon,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.cb_beban.getText()+"','"+this.e_ket.getText()+"','D',"+total+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','LOADBEA','BEBAN','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");					
					
					this.doHitungAR();
					var line = undefined;
					for (var i in this.gridAR.objList){
						line = this.gridAR.get(i);
						sql.add("insert into sis_rekon_j(no_rekon,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
								"	('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+line.get("kode_akun")+"','"+this.e_ket.getText()+"','C',"+parseFloat(line.get("nilai"))+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','LOADBEA','PIUT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
					}		
						
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						var total = parseFloat(line.bayar);
						if (parseFloat(line.bayar) != 0){							
							sql.add("insert into sis_rekon_d(no_rekon,nis,no_bill,periode,nilai,kode_lokasi,akun_titip,akun_piutang,kode_param,dc,modul,id_bank,kode_pp, nilai_cd,periode_bill) values "+
									"	('"+this.e_nb.getText()+"','"+line.nis+"','"+line.no_bill+"','"+this.e_periode.getText()+"',"+parseFloat(line.bayar)+",'"+this.app._lokasi+"','"+this.cb_beban.getText()+"','"+line.akun_piutang+"','"+line.kode_param+"','D','LOADBEA','"+line.id_bank+"','"+this.cb_pp.getText()+"',0,'"+line.periode+"')");							
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
					this.isiCBbukti();
				break;
			case "simpan" :	
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai Beasiswa tidak boleh nol atau kurang.");
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
		this.e_periode.setText(y+""+m)
		this.e_nb.setText("");
		this.isiCBbukti();
	},
	doChange:function(sender){
		
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sis_rekon_m","no_rekon",this.app._lokasi+"-BEA"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
		}
		if (sender == this.bRefresh) this.sg1.clear(1);
	},
	doHitungAR: function() {
		var row,dtJurnal = new portalui_arrayMap();
		var nemu = false;
		var ix,dtJrnl = 0;
		for (var i=0;i < this.dataJU.rs.rows.length;i++){
			line = this.dataJU.rs.rows[i];
			if (parseFloat(line.bayar) != 0){
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
					row.set("nilai",parseFloat(line.bayar));
					dtJrnl++;
					dtJurnal.set(dtJrnl,row);						
				}else dtJurnal.get(ix).set("nilai",row.get("nilai") + parseFloat(line.bayar));
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
							if (this.preView == "1") {						
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
							}
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.cb_bukti.getText()+")","");							
								this.clearLayar();
							}
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
			this.isiCBbukti();
		} catch(e) {
			alert(e);
		}
	}
});
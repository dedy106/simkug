window.app_saku3_transaksi_yspt_dikti_fRekBillDiktiCD = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yspt_dikti_fRekBillDiktiCD.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yspt_dikti_fRekBillDiktiCD";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Load Pelunasan Tagihan CD (NONCASH)", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;pageControl");
		this.cb_pp = new saiCBBL(this,{bound:[20,17,220,20],caption:"Sekolah", readOnly:true, maxLength:10, tag:2, change:[this,"doChange"]});
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});				
		this.e_piutang = new saiLabelEdit(this,{bound:[790,18,200,20],caption:"Total Tagihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.cb_titip = new saiCBBL(this,{bound:[20,17,220,20],caption:"Akun PDD", multiSelection:false, maxLength:10, tag:2 });		
		this.e_nilai = new saiLabelEdit(this,{bound:[790,17,200,20],caption:"Total Pelunasan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.bTampil = new button(this,{bound:[550,17,80,20],caption:"Load Bill",click:[this,"doLoad"]});			
		this.bRekon = new button(this,{bound:[650,17,100,20],caption:"Rekon Pelunasan", click:[this,"doRekon"]});
		
		this.pc1 = new pageControl(this,{bound:[5,12,1000,330], childPage:["Data Tagihan","Data PDD"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:10,tag:0,
		            colTitle:["NIS","Nama","No Bill","Periode","Akun Piutang","Saldo Tagihan","Nilai Pelunasan","Sisa Tagih","ID Bank","Kode Param"],
					colHide:[[7,8],[true,true]],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[100,1,1,100,100,80,80,150,200,120]],					
					colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9],[]],
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});	

		this.sg1 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:2,
					colTitle:["NIS","Saldo PDD"],
					colWidth:[[1,0],[150,150]],
					colFormat:[[1],[cfNilai]],
					autoPaging:true,rowPerPage:20, 
					readOnly:true, defaultRow:1
					});							
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager1"]});		
		this.bLoadCD = new portalui_button(this.sgn1,{bound:[860,1,100,18],caption:"Load Saldo PDD",click:[this,"doLoadCD"]});		
		
		this.bRefresh = new portalui_imageButton(this.sgn1,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");
		this.sg1.setAllowBlank(true);

		this.rearrangeChild(10, 23);
		
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
			
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_pp.setText(this.app._kodePP);
			
			var data = this.dbLib.getDataProvider("select flag from spro where kode_spro='SISCD' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.akunCD = line.flag;
				this.cb_titip.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"' and kode_akun='"+this.akunCD+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Daftar Akun Pelunasan",true);
				this.cb_titip.setText(this.akunCD);
			} else this.akunCD = "";
			
			if (this.akunCD == "") {
				system.alert(this,"SPRO CD (SISCD) tidak ditemukan.","");
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yspt_dikti_fRekBillDiktiCD.extend(window.childForm);
window.app_saku3_transaksi_yspt_dikti_fRekBillDiktiCD.implement({
	doLoadCD: function(sender,totalRow){
		try {
			var strSQL = "select * from  ("+
			
						 "	select a.nis,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as saldo_cd "+
						 "	from sis_cd_d a inner join sis_siswa b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp "+
						 "	where a.nilai <> 0 and a.periode <= '"+this.e_periode.getText()+"' and a.kode_pp='"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						 "	group by a.nis "+

						 ") a where a.saldo_cd > 0 ";								

			var data1 = this.dbLib.getDataProvider(strSQL,true);	
			
			if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
				this.dataJU1 = data1;
				this.sgn1.setTotalPage(Math.ceil(data1.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData1(1);				
								
			} else this.sg1.clear(1);	
											
		} catch(e) {alert(e);}
	},
	doTampilData1: function(page) {
		this.sg1.clear();
		var line1;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU1.rs.rows.length? this.dataJU1.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line1 = this.dataJU1.rs.rows[i];		
			this.sg1.appendData([line1.nis,floatToNilai(line1.saldo_cd)]);		
		}
		this.sg1.setNoUrut(start);
	},
	doPager1: function(sender, page) {
		this.doTampilData1(page);
	},		
	doRekon:	function(sender){				
		try {
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				this.dataJU.rs.rows[i].lunas = 0;				
			}	
			
			for (var i=0; i < this.dataJU1.rs.rows.length;i++){				
				var nilaiBayar = parseFloat(this.dataJU1.rs.rows[i].saldo_cd);					
				for (var j=0;j < this.dataJU.rs.rows.length;j++){
					if (this.dataJU1.rs.rows[i].nis == this.dataJU.rs.rows[j].nis) {
						if (nilaiBayar >= (parseFloat(this.dataJU.rs.rows[j].saldo)-parseFloat(this.dataJU.rs.rows[j].lunas))) {
							nilaiBayar = nilaiBayar - (parseFloat(this.dataJU.rs.rows[j].saldo) - parseFloat(this.dataJU.rs.rows[j].lunas));
							this.dataJU.rs.rows[j].lunas += (parseFloat(this.dataJU.rs.rows[j].saldo)-parseFloat(this.dataJU.rs.rows[j].lunas));
						}
						else {
							this.dataJU.rs.rows[j].lunas += nilaiBayar;
							nilaiBayar = 0;							
							break;
						}						
						this.dataJU.rs.rows[j].id_bank = "CD";												
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
		}
		catch(e) {
			alert(e);
		}
	},
	selectPage: function(sender,page){
		var start = (page - 1) * 20;
		var finish = start + 20;
		finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);
		this.sg1.clear();
		
		for (var i=start; i < finish;i++){
			line = this.dataUpload.rows[i];			
			this.sg1.appendData([line.nis,floatToNilai(line.bayar),line.id_bank]);
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
					var total = nilaiToFloat(this.e_nilai.getText());
					sql.add("insert into sis_rekon_m(no_rekon,no_dokumen,tanggal,keterangan,nilai,posted,modul,akun_titip,nis,nik_buat,nik_app,kode_lokasi,periode,nik_user,tgl_input,kode_pp) values "+
						    "('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',"+total+",'F','LOADCD','"+this.cb_titip.getText()+"','-','"+this.app._userLog+"','"+this.app._userLog+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.cb_pp.getText()+"')");
										
					sql.add("insert into sis_rekon_j(no_rekon,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.cb_titip.getText()+"','"+this.e_ket.getText()+"','D',"+total+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','LOADCD','TTP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");					
					
					this.doHitungAR();
					var line = undefined;
					for (var i in this.gridAR.objList){
						line = this.gridAR.get(i);
						sql.add("insert into sis_rekon_j(no_rekon,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
								"	('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+line.get("kode_akun")+"','"+this.e_ket.getText()+"','C',"+parseFloat(line.get("nilai"))+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','LOADCD','PIUT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
					}		
										
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						var total = parseFloat(line.lunas) + parseFloat(line.sisa);
						if (parseFloat(line.lunas) != 0){							
							sql.add("insert into sis_rekon_d(no_rekon,nis,no_bill,periode,nilai,kode_lokasi,akun_titip,akun_piutang,kode_param,dc,modul,id_bank,kode_pp, nilai_cd,periode_bill) values "+
									"	('"+this.e_nb.getText()+"','"+line.nis+"','"+line.no_bill+"','"+this.e_periode.getText()+"',"+parseFloat(line.lunas)+",'"+this.app._lokasi+"','"+this.cb_titip.getText()+"','"+line.akun_piutang+"','"+line.kode_param+"','D','LOADCD','"+line.id_bank+"','"+this.cb_pp.getText()+"',"+parseFloat(line.sisa)+",'"+line.periode+"')");							
							
							sql.add("insert into sis_cd_d(no_bukti,nis,periode,nilai,kode_lokasi,akun_cd,kode_param,dc,modul,kode_pp,no_ref1) values "+
									"('"+this.e_nb.getText()+"','"+line.nis+"','"+this.e_periode.getText()+"',"+parseFloat(line.lunas)+",'"+this.app._lokasi+"','"+this.cb_titip.getText()+"','"+line.kode_param+"','C','LOADCD','"+this.cb_pp.getText()+"','-')");							
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
					this.sg1.clear();
					this.cb_pp.setText(this.app._kodePP);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
								
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
		//lama
		//if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		//else this.e_periode.setText(this.app._periode);

		//baru
		this.e_periode.setText(y+""+m)
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
			
			var strSQL = "select a.nis,a.siswa,a.no_bill,a.periode,a.akun_piutang,a.tot_bill-isnull(b.tot_lunas,0) as saldo,0 as lunas,'-' as id_bank, 0 as sisa,a.kode_param,a.idx "+
						 "from ("+

						 "		select aa.nis,aa.nama as siswa,aa.id_bank, a.no_bill,a.periode,a.akun_piutang,sum(a.nilai) as tot_bill,a.kode_param,c.idx "+
						 "		from sis_bill_d a "+
						 "			inner join sis_bill_m e on a.no_bill=e.no_bill and a.kode_lokasi=e.kode_lokasi "+
						 "      	inner join sis_siswa aa on aa.nis=a.nis and a.kode_lokasi=aa.kode_lokasi and e.kode_pp=aa.kode_pp "+
						 "      	inner join sis_kelas d on a.kode_kelas=d.kode_kelas and a.kode_lokasi=d.kode_lokasi and e.kode_pp=d.kode_pp "+						
						 "      	inner join sis_param_idx c on a.kode_param = c.kode_param and a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp and c.kode_pp='"+this.cb_pp.getText()+"' "+						
						 "		where a.periode<='"+this.e_periode.getText()+"' and e.kode_pp= '"+this.cb_pp.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' "+
						 "		group by aa.id_bank,aa.nis,aa.nama,a.no_bill,a.periode,a.akun_piutang,a.kode_param,c.idx "+
						 ") a "+
						 
						 "left join ( "+
						 "		select no_bill,nis,kode_lokasi,kode_param,sum(case dc when 'D' then nilai else -nilai end) as tot_lunas "+
						 "      from sis_rekon_d "+
						 "		where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"' "+
						 "		group by nis,no_bill,kode_lokasi,kode_param "+

						 ") b on a.nis=b.nis and a.no_bill=b.no_bill and a.kode_param=b.kode_param "+						 

						 "where (a.tot_bill-isnull(b.tot_lunas,0)) > 0 "+
						 "order by a.nis,a.idx";

			
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
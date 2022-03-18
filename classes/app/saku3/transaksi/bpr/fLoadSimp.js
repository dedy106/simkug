window.app_saku3_transaksi_bpr_fLoadSimp = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_bpr_fLoadSimp.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_bpr_fLoadSimp";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Load Rekonsiliasi Pembayaran Simpanan", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;pageControl;portalui_saiMemo");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.c_status = new saiCB(this,{bound:[820,17,202,20],caption:"Status Rekon",items:["LOAD"], readOnly:true,tag:8,visible:false});
		this.cb_titip = new saiCBBL(this,{bound:[20,14,220,20],caption:"Akun Ttp Terima", multiSelection:false, maxLength:10, tag:2 });
		this.e_piutang = new saiLabelEdit(this,{bound:[820,14,200,20],caption:"Total Tagihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});										
		this.cb_app = new saiCBBL(this,{bound:[20,18,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});						
		this.e_nilai = new saiLabelEdit(this,{bound:[820,18,200,20],caption:"Nilai Rekon", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.bTampil = new button(this,{bound:[580,18,100,20],caption:"Data Tagihan", click:[this,"doLoad"]});		
		this.bRekon = new button(this,{bound:[700,18,100,20],caption:"Rekon", click:[this,"doRekon"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,340], childPage:["Data Tagihan","Data Pembayaran"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:10,tag:0,
		            colTitle:["No Agg","Nama","No Akru","No Kartu","Jenis","Deskripsi","Akun AR","Periode","Tagihan","Nilai Bayar"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[80,80,70,70,150,60,100,100,150,80]],					
					colFormat:[[8,9],[cfNilai,cfNilai]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9],[]], autoPaging:true, rowPerPage:20,
					nilaiChange:[this,"doNilaiChange"],					
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});	
		
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:3,
					colTitle:["No Agg","Nilai Bayar","Nilai Rekon"],
					colWidth:[[2,1,0],[100,100,100]],
					colFormat:[[1,2],[cfNilai,cfNilai]],
					pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"], 
					readOnly:true, defaultRow:1
					});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager1"]});		
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_titip.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag='036' where a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Daftar Akun Pelunasan",true);			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join masakun b on a.flag=b.kode_akun and a.kode_lokasi=b.kode_lokasi where kode_spro='KBTTP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_titip.setText(line.flag,line.nama);
			} else this.cb_titip.setText("","");									
			
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='ARAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
			
			uses("server_report_report;portalui_reportViewer");
			this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
			this.viewer.hide();
			this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
			this.report = new server_report_report();
			this.report.addListener(this);
			
			this.c_status.setText("LOAD");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_bpr_fLoadSimp.extend(window.childForm);
window.app_saku3_transaksi_bpr_fLoadSimp.implement({	
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
				  if (kdAkun == dtJurnal.get(j).get("kode_akun")){
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
				}
				else dtJurnal.get(ix).set("nilai",row.get("nilai") + parseFloat(line.lunas));
			}
		}
		this.gridAR = dtJurnal;
	}, 		
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();										
		} catch(e) {alert(e);}
	},
	doPager1: function(sender,page){
		this.sg1.doSelectPage(page);
	},	
	doRekon:	function(sender){				
		try {
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				this.dataJU.rs.rows[i].lunas = 0;
			}													
			
			var totPdd = 0;
			for (var i=0; i < this.sg1.getRowCount();i++){
				var terpakai = 0;
				var nilaiAwal = nilaiToFloat(this.sg1.cells(1,i));				
				var nilaiBayar = nilaiToFloat(this.sg1.cells(1,i));					
				
				this.sg1.cells(2,i,"0");	
				for (var j=0;j < this.dataJU.rs.rows.length;j++){
					if (nilaiBayar > 0) {
						if (this.sg1.cells(0,i) == this.dataJU.rs.rows[j].no_agg) {
							if (nilaiBayar >= (parseFloat(this.dataJU.rs.rows[j].saldo)-parseFloat(this.dataJU.rs.rows[j].lunas))) {
								nilaiBayar = nilaiBayar - (parseFloat(this.dataJU.rs.rows[j].saldo)-parseFloat(this.dataJU.rs.rows[j].lunas));
								this.dataJU.rs.rows[j].lunas += (parseFloat(this.dataJU.rs.rows[j].saldo)-parseFloat(this.dataJU.rs.rows[j].lunas));
							}
							else {
								this.dataJU.rs.rows[j].lunas += nilaiBayar;
								nilaiBayar = 0;
								this.sg.cells(9,j,floatToNilai(this.dataJU.rs.rows[j].lunas));
								break;
							}
							this.sg.cells(9,j,floatToNilai(this.dataJU.rs.rows[j].lunas));
						}
					}
				}								
				terpakai = nilaiAwal - nilaiBayar;
				totPdd += terpakai;
				this.sg1.cells(2,i,floatToNilai(terpakai))				
			}
			this.e_nilai.setText(floatToNilai(totPdd));				
			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			this.doTampilData(1);			
		}
		catch(e) {
			alert(e);
		}
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-STP"+this.e_periode.getText().substr(2,4)+".","0000"));

			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','KP','LOAD','F','0','0','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+
							"','IDR',1,"+nilaiToFloat(this.e_nilai.getText())+",0,0,'-','-','-','"+this.cb_titip.getText()+"','-','-','"+this.cb_app.getText()+"','-','-')");
					
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.cb_titip.getText()+"','D',"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_nilai.getText())+",'"+this.e_ket.getText()+"','LOAD','TTP','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");
					
					this.doHitungAR();
					var line = undefined;
					for (var i in this.gridAR.objList){
						line = this.gridAR.get(i);
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+line.get("kode_akun")+"','C',"+parseFloat(line.get("nilai"))+","+parseFloat(line.get("nilai"))+",'"+this.e_ket.getText()+"','LOAD','PIUT','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");
					}											
					
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						if (parseFloat(line.lunas) != 0){
							sql.add("insert into kop_simpangs_d (no_angs,no_simp,no_bill,akun_piutang,nilai,kode_lokasi,dc,periode,modul,no_agg,jenis) values "+
									"('"+this.e_nb.getText()+"','"+line.no_simp+"','"+line.no_bill+"','"+line.akun_piutang+"',"+line.lunas+",'"+this.app._lokasi+"','D','"+this.e_periode.getText()+"','LOAD','"+line.no_agg+"','SIMP')");
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
					this.sg.clear(1); this.sg1.clear(1); 
					setTipeButton(tbSimpan);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					this.c_status.setText("LOAD");
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					line = this.dataJU.rs.rows[i];
					if (parseFloat(line.lunas) > parseFloat(line.saldo)){
						system.alert(this,"Transaksi tidak valid.","Nilai pelunasan tidak boleh melebihi saldo. Bill: "+line.no_bill + " - " +line.no_simp);
						return false;						
					}
				}
				var totLunas = nilaiToFloat(this.e_nilai.getText());
				if (totLunas <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai pelunasan tidak boleh nol atau kurang.");
					return false;						
				}
				if (this.standarLib.doCekPeriode(this.dbLib,"KP",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (KP - LOCKED).","Hubungi Administrator Sistem.");
					return false;
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
		this.doClick(this.i_gen);
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-STP"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
		}
		if (sender == this.bRefresh) this.sg1.clear(1);
	},
	doLoad: function(sender){		
		if (this.e_periode.getText() != "") {
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.e_piutang.setText("0");
			this.e_nilai.setText("0");		
						
			var strSQL = "select f.no_agg,f.nama as nama_agg,b.no_bill,a.no_simp,a.jenis,e.nama,b.akun_piutang,b.periode,b.nilai-isnull(d.bayar,0) as saldo,0 as lunas "+
						 "from  kop_simp_m a inner join kop_simp_d b on a.no_simp=b.no_simp  and a.kode_lokasi=b.kode_lokasi and b.modul <> 'BSIMP' "+
						 "                   inner join trans_m c on b.no_bill=c.no_bukti and b.kode_lokasi=c.kode_lokasi "+
						 "                   inner join kop_simp_param e on a.kode_param=e.kode_param and a.kode_lokasi=e.kode_lokasi "+
						 "                   inner join kop_agg f on b.no_agg=f.no_agg and a.kode_lokasi=f.kode_lokasi "+						 
						 "      left outer join "+  
						 "              (select y.no_simp, y.no_bill, y.kode_lokasi, sum(case dc when 'D' then y.nilai else -y.nilai end) as bayar "+
						 "               from kop_simpangs_d y inner join trans_m x on y.no_angs=x.no_bukti and y.kode_lokasi=x.kode_lokasi "+
						 "               where y.periode<='"+this.e_periode.getText()+"' and y.kode_lokasi='"+this.app._lokasi+"' and y.modul <> 'BSIMP' "+
						 "               group by y.no_simp, y.no_bill, y.kode_lokasi) d on b.no_simp=d.no_simp and b.no_bill=d.no_bill and b.kode_lokasi=d.kode_lokasi "+
						 "where a.status_bayar = 'PGAJI' and b.periode<='"+this.e_periode.getText()+"' and b.nilai-isnull(d.bayar,0)>0 and a.kode_lokasi= '"+this.app._lokasi+"' order by f.no_agg,e.nu"; 
			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.sg.clear();
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
				
				for (var i=0;i<this.dataJU.rs.rows.length;i++){
					line = this.dataJU.rs.rows[i];												
					this.sg.appendData([line.no_agg,line.nama_agg,line.no_bill,line.no_simp,line.jenis,line.nama,line.akun_piutang,line.periode,floatToNilai(line.saldo),floatToNilai(line.lunas)]);
				}
				
			} else this.sg.clear(1);			
		}
		else {
			system.alert(this,"Data Fakultas tidak valid.","Data fakultas harus terisi.");
		}
	},
	doTampilData: function(page) {
		this.sg.doSelectPage(page);				
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){				
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
						  this.nama_report="server_report_saku2_kopeg_aka_rptAkRekonJurnal";
						  this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_angs='"+this.e_nb.getText()+"' ";
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
			this.sg.clear(1); this.sg1.clear(1); 
			setTipeButton(tbSimpan);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.c_status.setText("LOAD");
		} catch(e) {
			alert(e);
		}
	}
});
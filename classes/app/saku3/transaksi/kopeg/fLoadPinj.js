window.app_saku3_transaksi_kopeg_fLoadPinj = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_kopeg_fLoadPinj.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_kopeg_fLoadPinj";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Load Rekonsiliasi Pelunasan Pinjaman", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;pageControl;portalui_saiMemo");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.c_status = new saiCB(this,{bound:[820,17,202,20],caption:"Status Rekon",items:["LOAD"], readOnly:true,tag:8,visible:false});
		this.cb_titip = new saiCBBL(this,{bound:[20,14,220,20],caption:"Akun Pelunasan", multiSelection:false, maxLength:10, tag:2 });
		this.e_piutang = new saiLabelEdit(this,{bound:[820,14,200,20],caption:"Total Tagihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});										
		this.cb_app = new saiCBBL(this,{bound:[20,18,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});						
		this.e_nilai = new saiLabelEdit(this,{bound:[820,18,200,20],caption:"Nilai Rekon", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.bTampil = new button(this,{bound:[580,18,100,20],caption:"Data Tagihan", click:[this,"doLoad"]});		
		this.bRekon = new button(this,{bound:[700,18,100,20],caption:"Rekon", click:[this,"doRekon"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,340], childPage:["Data Tagihan","Data Pembayaran"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:13,tag:0,		            
					colTitle:["No Agg","Nama","No Akru","No Kartu","Deskripsi","Akun Pokok","Akun PJasa","Periode","Cil Ke-","N Pokok","N Jasa","Tagihan","Bayar"],
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,70,70,50,50,80,80,200,100,100,150,80]],
					colFormat:[[9,10,11,12],[cfNilai,cfNilai,cfNilai,cfNilai]],								
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9,10,11,12],[]], autoPaging:true, rowPerPage:20,
					nilaiChange:[this,"doNilaiChange"],					
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});	
		
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:3,
					colTitle:["No Agg","Nilai Bayar","Nilai Rekon"],
					colWidth:[[2,1,0],[100,100,100]],
					colFormat:[[1,2],[cfNilai,cfNilai]],
					pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"], 
					readOnly:true, defaultRow:1
					});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll, grid:this.sg1, pager:[this,"doPager1"]});		
		
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
			
			this.cb_titip.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Daftar Akun Pelunasan",true);			
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
window.app_saku3_transaksi_kopeg_fLoadPinj.extend(window.childForm);
window.app_saku3_transaksi_kopeg_fLoadPinj.implement({			
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
							/* kalo bayar kurang dr nilai tagihan, tidak bisa.. krn ada nilaipokok dan nilaibunga, yg dilunasi yg mana dulu
							else {
								this.dataJU.rs.rows[j].lunas += nilaiBayar;
								nilaiBayar = 0;
								this.sg.cells(12,j,floatToNilai(this.dataJU.rs.rows[j].lunas));
								break;
							}
							*/
							this.sg.cells(12,j,floatToNilai(this.dataJU.rs.rows[j].lunas));
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_pinjangs_m","no_angs",this.app._lokasi+"-PTP"+this.e_periode.getText().substr(2,4)+".","0000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					sql.add("insert into kop_pinjangs_m(no_angs,no_dokumen,keterangan,tanggal,nilai,nilai_lain,nilai_sls,modul,periode,kode_lokasi,posted,kode_pp,nik_app,nik_user,tgl_input,no_kas) values  "+
							"('"+this.e_nb.getText()+"','"+this.cb_titip.getText()+"','"+this.e_ket.getText()+"','"+this.dp_d1.getDateString()+"',"+nilaiToFloat(this.e_nilai.getText())+",0,0,'LOAD','"+this.e_periode.getText()+"','"+this.app._lokasi+"','F','"+this.app._kodePP+"','"+this.cb_app.getText()+"','"+this.app._userLog+"',getdate(),'"+this.e_nb.getText()+"')");
							
					sql.add("insert into kop_pinjangs_j (no_angs,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.cb_titip.getText()+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','LOAD','TTP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");							
					
					this.doHitungAR();
					var line = undefined;
					for (var i in this.gridAR.objList){
						line = this.gridAR.get(i);
						sql.add("insert into kop_pinjangs_j(no_angs,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+line.get("kode_akun")+"','"+this.e_ket.getText()+"','C',"+parseFloat(line.get("nilai"))+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','"+this.c_status.getText()+"','PIUT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
					}											
					
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						if (parseFloat(line.lunas) != 0){
							sql.add("insert into kop_pinjangs_d (no_angs,no_pinj,no_bill,akun_piutang,akun_pjasa,npokok,nbunga,kode_lokasi,dc,periode,cicilan_ke,modul,no_agg) values "+
									"('"+this.e_nb.getText()+"','"+line.no_pinj+"','"+line.no_bill+"','"+line.akun_piutang+"','"+line.akun_pjasa+"',"+line.npokok+","+line.nbunga+",'"+this.app._lokasi+"','D','"+this.e_periode.getText()+"',"+line.cicilan_ke+",'LOAD','"+line.no_agg+"')");
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
						system.alert(this,"Transaksi tidak valid.","Nilai pelunasan tidak boleh melebihi saldo. Bill: "+line.no_bill + " - " +line.no_pinj);
						return false;						
					}
				}
				var totLunas = nilaiToFloat(this.e_nilai.getText());
				if (totLunas <= 0) {
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_pinjangs_m","no_angs",this.app._lokasi+"-PTP"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
		}
		if (sender == this.bRefresh) this.sg1.clear(1);
	},
	doLoad: function(sender){		
		if (this.e_periode.getText() != "") {
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.e_piutang.setText("0");
			this.e_nilai.setText("0");		
							
			var strSQL = "select a.no_agg,e.nama,b.no_bill,a.no_pinj,c.keterangan,a.akun_piutang,a.akun_pjasa,b.periode,b.cicilan_ke,b.npokok,b.nbunga,(b.npokok+b.nbunga)-isnull(d.bayar,0) as saldo,0 as lunas "+
						 "from  kop_pinj_m a inner join kop_pinj_sch b on a.no_pinj=b.no_pinj  and a.kode_lokasi=b.kode_lokasi "+
						 "                   inner join kop_pinjbill_m c on b.no_bill=c.no_bill and b.kode_lokasi=c.kode_lokasi "+							 
						 "                   inner join kop_agg e on a.no_agg=e.no_agg and a.kode_lokasi=e.kode_lokasi "+							 
						 "      left outer join "+  
						 "              (select y.no_pinj, y.no_bill, y.kode_lokasi, sum(case dc when 'D' then y.npokok+nbunga else -(y.npokok+nbunga) end) as bayar "+
						 "               from kop_pinjangs_d y inner join kop_pinjangs_m x on y.no_angs=x.no_angs and y.kode_lokasi=x.kode_lokasi "+
						 "               where y.periode<='"+this.e_periode.getText()+"' and y.kode_lokasi='"+this.app._lokasi+"' "+
						 "               group by y.no_pinj, y.no_bill, y.kode_lokasi) d on b.no_pinj=d.no_pinj and b.no_bill=d.no_bill and b.kode_lokasi=d.kode_lokasi "+
						 "where d.no_pinj is null and a.status_bayar = 'PGAJI' and b.periode<='"+this.e_periode.getText()+"'  and a.kode_lokasi= '"+this.app._lokasi+"' order by a.no_agg,b.periode"; //and (b.npokok+b.nbunga)-isnull(d.bayar,0)>0 tidak boleh nyicil						
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
					this.sg.appendData([line.no_agg,line.nama,line.no_bill,line.no_pinj,line.keterangan,line.akun_piutang,line.akun_pjasa,line.periode,line.cicilan_ke,floatToNilai(line.npokok),floatToNilai(line.nbunga),floatToNilai(line.saldo),floatToNilai(line.lunas)]);
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
					row.set("nilai",parseFloat(line.npokok));
					dtJrnl++;
					dtJurnal.set(dtJrnl,row);						
				}
				else dtJurnal.get(ix).set("nilai",row.get("nilai") + parseFloat(line.npokok));
			}
		}
		
		for (var i=0;i < this.dataJU.rs.rows.length;i++){
			line = this.dataJU.rs.rows[i];
			if (parseFloat(line.lunas) != 0){
				kdAkun = line.akun_pjasa;								
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
					row.set("nilai",parseFloat(line.nbunga));
					dtJrnl++;
					dtJurnal.set(dtJrnl,row);						
				}
				else dtJurnal.get(ix).set("nilai",row.get("nilai") + parseFloat(line.nbunga));
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
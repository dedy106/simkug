window.app_saku3_transaksi_bpr_fKbPinjLunas = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_bpr_fKbPinjLunas.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_bpr_fKbPinjLunas";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank Pelunasan", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:4,tag:9,
		            colTitle:["No KasBank","Tanggal","No Dokumen","Deskripsi"],
					colWidth:[[3,2,1,0],[400,200,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,16,210,20],caption:"Status",items:["BM"], readOnly:true,tag:2,visible:false});
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});								
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,300,20],caption:"No Dokumen", maxLength:50});						
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});						
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,18,200,20],caption:"Nilai KasBank", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Akun KasBank", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});							
		this.e_saldo = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,15,200,20],caption:"Total Tagihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});			
		this.cb_pinj = new saiCBBL(this.pc2.childPage[0],{bound:[20,19,220,20],caption:"No Pinjaman", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});							
		this.e_beban = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,19,200,20],caption:"Nilai Sisa", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});	
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,20,990,282], childPage:["Data Tagihan","Jurnal Sisa"]});		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:0,
				colTitle:["Akun Pokok","Akun PJasa","Periode","Cil Ke-","N Pokok","N Jasa","Tagihan","No Akru"],
				colWidth:[[7,6,5,4,3,2,1,0],[100,100,100,100,100,100,100,100]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7],[]],
				colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],												
				nilaiChange:[this,"doNilaiChange1"],
				defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});
		this.cb1 = new portalui_checkBox(this.sgn1,{bound:[920,5,100,25],caption:"Preview",selected:true,visible:false});
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP"],
					colWidth:[[6,5,4,3,2,1,0],[150,60,100,300,50,200,80]],										
					columnReadOnly:[true,[1,6],[0,2,3,4,5]],
					buttonStyle:[[0,2,5],[bsEllips,bsAuto,bsEllips]], 
					colFormat:[[4],[cfNilai]],checkItem:true,
					picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});	
		this.i_denda = new portalui_imageButton(this.sgn,{bound:[725,2,20,20],hint:"Pinalti",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doPinalti"]});								
		this.e_sls = new saiLabelEdit(this.sgn,{bound:[780,1,200,20],caption:"Tot Jurnal Sisa", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});	
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.stsSimpan=1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
			this.cb_pinj.setSQL("select no_pinj, keterangan from kop_pinj_m where kode_lokasi='"+this.app._lokasi+"'",["no_pinj","keterangan"],false,["No Pinj","Deskripsi"],"and","Data Pinjaman",true);			
			this.cb_akun.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			
			this.dataPP = this.app._pp;
			var sql = new server_util_arrayList();
			sql.add("select kode_akun,nama from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'");			
			this.dbLib.getMultiDataProviderA(sql);		
						
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PJDENDA') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];					
					if (line.kode_spro == "PJDENDA") this.akunPJDenda = line.flag;											
				}
			}
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_bpr_fKbPinjLunas.extend(window.childForm);
window.app_saku3_transaksi_bpr_fKbPinjLunas.implement({
	doPinalti : function() {
		this.sg.clear();
		this.sg.appendData([this.akunPJDenda,"-","C","Pinalti Pelunasan","0",this.app._kodePP,this.app._namaPP]);
		this.doChangeCell(this.sg,0,0);
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
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("update a set a.no_bill='-' "+
								"from kop_pinj_sch a inner join kop_pinjangs_d b on a.no_pinj=b.no_pinj and a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi "+
								"where a.no_bill like '"+this.e_nb.getText()+"-%' and b.no_angs='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");
						
						sql.add("delete from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_pinjangs_d where no_angs='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from trans_m where posted='Z' and no_dokumen='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					} 
					
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','KP','PJLNS','F','0','0','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+
							"','IDR',1,"+nilaiToFloat(this.e_total.getText())+",0,0,'-','-','-','"+this.cb_akun.getText()+"','-','-','"+this.cb_pinj.getText()+"','"+this.c_jenis.getText()+"','-')");
						
					var kasIDR = nilaiToFloat(this.e_total.getText());					
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','D',"+kasIDR+","+kasIDR+",'"+this.e_ket.getText()+"','PJLNS','KB','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");
															
					for (var i=0;i < this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i) && nilaiToFloat(this.sg1.cells(6,i)) != 0){
							var nilaiPiuPokok = nilaiToFloat(this.sg1.cells(4,i));
							var nilaiPiuJasa = nilaiToFloat(this.sg1.cells(5,i));							
							var j = i+1000;
							
							sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg1.cells(0,i)+"','C',"+nilaiPiuPokok+","+nilaiPiuPokok+",'Pelunasan Pokok atas "+this.cb_pinj.getText()+"','PJLNS','POKOK','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");
							sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sg1.cells(1,i)+"','C',"+nilaiPiuJasa+","+nilaiPiuJasa+",'Pelunasan Jasa atas "+this.cb_pinj.getText()+"','PJLNS','JASA','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");
					
							if (this.sg1.cells(7,i) != "-") var noBill = this.sg1.cells(7,i);
							else {
								var noBill = this.e_nb.getText()+"-"+this.sg1.cells(3,i);	
								sql.add("update kop_pinj_sch set no_bill='"+noBill+"' where no_pinj='"+this.cb_pinj.getText()+"' and cicilan_ke="+this.sg1.cells(3,i)+" and kode_lokasi='"+this.app._lokasi+"' ");					

								//create link-inner join utk pelunasan
								sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
										"('"+noBill+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','KP','PJLNS','Z','0','0','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','"+this.e_nb.getText()+"','NON-POSTED','IDR',1,"+nilaiToFloat(this.sg1.cells(6,i))+","+nilaiToFloat(this.sg1.cells(3,i))+",0,'-','-','-','-','-','-','-','-','-')");
							}		

							sql.add("insert into kop_pinjangs_d (no_angs,no_pinj,no_bill,akun_piutang,akun_pjasa,npokok,nbunga,kode_lokasi,dc,periode,cicilan_ke,modul,no_agg) values "+
									"('"+this.e_nb.getText()+"','"+this.cb_pinj.getText()+"','"+noBill+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(1,i)+"',"+nilaiPiuPokok+","+nilaiPiuJasa+",'"+this.app._lokasi+"','D','"+this.e_periode.getText()+"',"+this.sg1.cells(3,i)+",'PJLNS','"+this.kodeAgg+"')");
						}
					}

					if (this.sg.getRowValidCount() > 0) {
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								var nilaiSlsIDR = nilaiToFloat(this.sg.cells(4,i));								
								sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i).toUpperCase()+"',"+nilaiSlsIDR+","+nilaiToFloat(this.sg.cells(4,i))+",'"+this.sg.cells(3,i)+"','PJLNS','SLS','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");
							}
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
					this.sg1.clear(1); this.sg.clear(1); 					
					setTipeButton(tbSimpan);
				break;
			case "simpan" :														
			case "ubah" :														
				this.preView = "1";				
				this.sg1.validasi();								
				
				if (nilaiToFloat(this.e_beban.getText()) != nilaiToFloat(this.e_sls.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Selisih tidak sesuai dengan Total Jurnal Selisih.");
					return false;						
				}
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai KasBank tidak boleh nol atau kurang.");
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
			case "hapus" :	
				this.preView = "0";
				if (this.standarLib.doCekPeriode(this.dbLib,"KP",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (KP - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update a set a.no_bill='-' "+
							"from kop_pinj_sch a inner join kop_pinjangs_d b on a.no_pinj=b.no_pinj and a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_bill like '"+this.e_nb.getText()+"-%' and b.no_angs='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");
						
					sql.add("delete from kop_pinjangs_d where no_angs='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from trans_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("delete from trans_m where posted='Z' and no_dokumen='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12){
			this.e_periode.setText(y+""+m);			
		}
		else {
			this.e_periode.setText(this.app._periode);					
		}	
		if (this.stsSimpan == 1) this.doClick();				
	},
	doChange:function(sender){		
		try	{
			if ((sender == this.e_periode || sender == this.c_jenis) && this.stsSimpan==1) {
				this.doClick();			
			}			
			if (sender == this.cb_pinj && this.cb_pinj.getText()!="" && this.stsSimpan==1) {							
				var strSQL = "select c.no_agg,a.no_bill,c.akun_piutang,c.akun_pjasa,a.cicilan_ke,a.periode,a.npokok - ISNULL(b.byrpokok,0) as pokok, "+
							 "case when (a.no_bill = '-' or substring(a.no_bill,4,2) = 'BM' or substring(a.no_bill,4,3) = 'KOM') then 0 else "+ //---> bill = BM sudah pelunasan
							 "a.nbunga - ISNULL(b.byrbunga,0) "+
							 "end as bunga "+
							 "from kop_pinj_sch a "+
							 "  inner join kop_pinj_m c on a.no_pinj=c.no_pinj and a.kode_lokasi=c.kode_lokasi "+
							 "  left join ( "+
	
							 "	select y.no_pinj, y.no_bill, y.kode_lokasi, "+
							 "		   sum(case dc when 'D' then npokok else -npokok end) as byrpokok, "+
							 "		   sum(case dc when 'D' then nbunga else -nbunga end) as byrbunga "+
							 "		   from kop_pinjangs_d y inner join trans_m x on y.no_angs=x.no_bukti and y.kode_lokasi=x.kode_lokasi "+ 
							 "		   where y.kode_lokasi='"+this.app._lokasi+"' and y.no_pinj='"+this.cb_pinj.getText()+"' "+
							 "	group by y.no_pinj, y.no_bill, y.kode_lokasi "+
	
							 "	) b on a.no_pinj=b.no_pinj and a.no_bill=b.no_bill "+
							 "where a.no_pinj ='"+this.cb_pinj.getText()+"' "+
							 "order by a.cicilan_ke ";

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];	
						var tagih = parseFloat(line.pokok) + parseFloat(line.bunga);										
						this.sg1.appendData([line.akun_piutang,line.akun_pjasa,line.periode,line.cicilan_ke,floatToNilai(line.pokok),floatToNilai(line.bunga),floatToNilai(tagih),line.no_bill]);
					}
					this.kodeAgg = line.no_agg;
				} else this.sg1.clear(1);
				this.sg1.validasi();
			}		
			if (sender == this.c_jenis && this.stsSimpan==1) {
				this.doClick();				
			}																								
			if ((sender == this.e_total || sender == this.e_saldo) && this.e_total.getText() != "" && this.e_saldo.getText() != "") {
				var beban = nilaiToFloat(this.e_total.getText()) - nilaiToFloat(this.e_saldo.getText());
				this.e_beban.setText(floatToNilai(Math.round(beban * 100)/100));				
			}		
		}
		catch(e) {
			alert(e);
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "" && this.c_jenis.getText()!= "") {
			if (this.stsSimpan == 0) {
				this.sg1.clear(1);
				this.sg.clear(1);
			}
			this.stsSimpan = 1;			
			this.cb_pinj.setSQL("select no_pinj, keterangan from kop_pinj_m where kode_lokasi='"+this.app._lokasi+"'",["no_pinj","keterangan"],false,["No Pinj","Deskripsi"],"and","Data Pinjaman",true);			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","0000"));									
			this.e_dok.setFocus();
			setTipeButton(tbSimpan);
		}		
	},	
	doNilaiChange1: function(){
		try{			
			var saldo = 0;			
			for (var i = 0; i < this.sg1.getRowCount();i++) {
				if (this.sg1.rowValid(i) && this.sg1.cells(6,i) != "") {
					saldo += nilaiToFloat(this.sg1.cells(6,i));
				}
			}			
			this.e_saldo.setText(floatToNilai(Math.round(saldo * 100)/100));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								//this.nama_report="server_report_saku3_kb_rptKbJurnalBukti";
								//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
								this.filter2 = "";
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
								this.pc2.hide();   
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							}
						}
						else {													
							if (result.toLowerCase().search("primary key") == -1){
								alert(error);
							}
							else this.simpan();						   						
						}
	    			break;					
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataAkun = new portalui_arrayMap();														
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataAkun.set(line.kode_akun, line.nama);										
								}								
							}							
						}else throw result;
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
				this.pc2.show();   
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
			this.sg1.clear(1); this.sg.clear(1);
			setTipeButton(tbAllFalse);					
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			this.stsSimpan = 1;
		} catch(e) {
			alert(e);
		}
	},		
	doChangeCell: function(sender, col, row){
		if ((col == 2 || col == 4) && (this.sg.cells(4,row) != "")) this.sg.validasi();
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (sender.cells(0,row) != "") {
				var akun = this.dataAkun.get(sender.cells(0,row));
				if (akun) sender.cells(1,row,akun);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}
		if (col == 5) {
			if (sender.cells(5,row) != "") {
				var pp = this.dataPP.get(sender.cells(5,row));
				if (pp) sender.cells(6,row,pp);
				else {
					if (trim(sender.cells(5,row)) != "") system.alert(this,"Kode PP "+sender.cells(6,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(5,row,"");
					sender.cells(6,row,"");
				}				
			}
		}		
		sender.onChange.set(this,"doChangeCell");		
	},
	doNilaiChange: function(){
		try{
			var totD = 0;
			for (var i = 0; i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != ""){
					if (this.sg.cells(2,i).toUpperCase() == "D") totD -= nilaiToFloat(this.sg.cells(4,i));
					if (this.sg.cells(2,i).toUpperCase() == "C") totD += nilaiToFloat(this.sg.cells(4,i));
				}
			}						
			this.e_sls.setText(floatToNilai(Math.round(totD * 100)/100));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doCellEnter: function(sender, col, row){
		switch(col){
			case 2 : 
					if (this.sg.cells(2,row) == ""){
						this.sg.setCell(2,row,"D");						
					}
				break;			
			case 6 : 
					if ((this.sg.cells(6,row) == "") && (row > 0)) {
						this.sg.setCell(6,row,this.sg.cells(6,(row-1)));
						this.sg.setCell(7,row,this.sg.cells(7,(row-1)));
					}
				break;			
		}
	},	
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
						    "select a.kode_akun,a.nama from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							"select count(a.kode_akun) from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 5){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
							"select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
							"select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
							["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doLoad3:function(sender){																
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan "+
		             "from trans_m a "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.form = 'PJLNS' and a.posted ='F'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_bukti,line.tgl,line.no_dokumen,line.keterangan]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
												
				var strSQL = "select * from trans_m "+
							 "where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.c_jenis.setText(line.jenis);					
						this.e_dok.setText(line.no_dokumen);					
						this.e_ket.setText(line.keterangan);
						this.cb_akun.setText(line.no_ref1);				
						this.e_total.setText(floatToNilai(line.nilai1));				
						this.cb_pinj.setText(line.param1);				
						this.cb_pinj.setSQL("select no_pinj, keterangan from kop_pinj_m where no_pinj='"+line.param1+"' and kode_lokasi='"+this.app._lokasi+"'",["no_pinj","keterangan"],false,["No Pinj","Deskripsi"],"and","Data Pinjaman",true);															
					}
				}
								
				var strSQL = "select c.no_agg,case when substring(a.no_bill,4,2) = 'BM' then '-' else a.no_bill end as no_bill,c.akun_piutang,c.akun_pjasa,a.cicilan_ke,a.periode,a.npokok - ISNULL(b.byrpokok,0) as pokok, "+
							 "case when (a.no_bill = '-' or substring(a.no_bill,4,2) = 'BM') then 0 else "+
							 "a.nbunga - ISNULL(b.byrbunga,0) "+
							 "end as bunga "+
							 "from kop_pinj_sch a "+
							 "  inner join kop_pinj_m c on a.no_pinj=c.no_pinj and a.kode_lokasi=c.kode_lokasi "+
							 "  left join ( "+
	
							 "	select y.no_pinj, y.no_bill, y.kode_lokasi, "+
							 "		   sum(case dc when 'D' then npokok else -npokok end) as byrpokok, "+
							 "		   sum(case dc when 'D' then nbunga else -nbunga end) as byrbunga "+
							 "		   from kop_pinjangs_d y inner join trans_m x on y.no_angs=x.no_bukti and y.kode_lokasi=x.kode_lokasi "+ 
							 "		   where y.kode_lokasi='"+this.app._lokasi+"' and y.no_pinj='"+this.cb_pinj.getText()+"' and y.no_angs<>'"+this.e_nb.getText()+"' "+
							 "	group by y.no_pinj, y.no_bill, y.kode_lokasi "+
	
							 "	) b on a.no_pinj=b.no_pinj and a.no_bill=b.no_bill "+
							 "where a.no_pinj ='"+this.cb_pinj.getText()+"' "+
							 "order by a.cicilan_ke ";

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];	
						var tagih = parseFloat(line.pokok) + parseFloat(line.bunga);										
						this.sg1.appendData([line.akun_piutang,line.akun_pjasa,line.periode,line.cicilan_ke,floatToNilai(line.pokok),floatToNilai(line.bunga),floatToNilai(tagih),line.no_bill]);
					}
					this.kodeAgg = line.no_agg;
				} else this.sg1.clear(1);
				this.sg1.validasi();
				
				
				var strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai_curr,a.kode_pp,c.nama as nama_pp "+
							 "from trans_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							 "               inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
							 "where a.jenis = 'SLS' and a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai_curr),line.kode_pp,line.nama_pp]);
					}
				}
				this.sg.validasi();								
			}						
		} catch(e) {alert(e);}
	}
});
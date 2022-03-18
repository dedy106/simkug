window.app_saku3_transaksi_bpr_fAkruBatal = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_bpr_fAkruBatal.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_bpr_fAkruBatal";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pembatalan Akru Simpanan", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",readOnly:true,tag:2,visible:false});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]});
		
		this.pc3 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Data Pembatalan","Daftar Pembatalan"]});
		this.sg3 = new saiGrid(this.pc3.childPage[1],{bound:[1,5,this.pc3.width-5,this.pc3.height-35],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Keterangan","Nilai"],
					colWidth:[[3,2,1,0],[100,300,100,100]],
					readOnly:true,colFormat:[[3],[cfNilai]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc3.childPage[1],{bound:[1,this.pc3.height-25,this.pc3.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
				
		this.e_nb = new portalui_saiLabelEdit(this.pc3.childPage[0],{bound:[20,13,202,20],caption:"No Bukti",maxLength:30,readOnly:true});		
		this.i_gen = new portalui_imageButton(this.pc3.childPage[0],{bound:[225,13,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});						
		this.e_desc = new portalui_saiLabelEdit(this.pc3.childPage[0],{bound:[20,15,503,20],caption:"Keterangan", maxLength:150});				
		this.cb_agg = new portalui_saiCBBL(this.pc3.childPage[0],{bound:[20,17,220,20],caption:"Anggota",multiSelection:false,tag:1,change:[this,"doChange"]});
		this.cb_simp = new portalui_saiCBBL(this.pc3.childPage[0],{bound:[20,18,220,20],caption:"No Kartu",multiSelection:false,tag:1,change:[this,"doChange"]});		
		this.e_tot = new portalui_saiLabelEdit(this.pc3.childPage[0],{bound:[790,18,200,20],caption:"Total Batal Akru",tipeText:ttNilai,readOnly: true, tag:1});
		
		this.pc1 = new pageControl(this.pc3.childPage[0],{bound:[1,12,995,303], childPage:["Daftar Akru"]});
		this.sg = new portalui_saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-10],colCount:10,tag:2,
				    colTitle:["Status","No Kartu","Jenis","No Bukti","Keterangan","Periode","Akun Piutang","Akun Simp.","Nilai","Angsuran"],
					colWidth:[[0,1,2,3,4,5,6,7,8,9],[60,120,60,120,180,60,80,80,80,90]],
					colFormat:[[8,9],[cfNilai,cfNilai]],buttonStyle:[[0],[bsAuto]], 
					picklist:[[0],[new portalui_arrayMap({items:["BATAL","AKRU"]})]],
					columnReadOnly:[true,[1,2,3,4,5,6,7,8,9],[0]],change:[this,"doChangeCell"],autoAppend:false,
					dblClick:[this,"doDoubleClick"],
					defaultRow:1,nilaiChange:[this,"doSgChange"]});				
		
		this.rearrangeChild(10, 22);
		this.pc3.childPage[0].rearrangeChild(10, 23);		
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
		
			this.cb_agg.setSQL("select no_agg, nama from kop_agg where kode_lokasi='"+this.app._lokasi+"'",["no_agg","nama"],false,["Kode","Nama"],"and","Data Anggota",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_bpr_fAkruBatal.extend(window.portalui_childForm);
window.app_saku3_transaksi_bpr_fAkruBatal.implement({
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
						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_simpangs_d where no_angs = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','KP','BTLBILL','F','0','0','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','-','"+this.e_desc.getText()+
							"','IDR',1,"+parseNilai(this.e_tot.getText())+",0,0,'-','-','-','-','-','-','-','-','-')");
					
					var idx = 0;
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i) && this.sg.cells(0,i) == "BATAL"){							
							//selisih antara nilai_bill - nilai_bayar, bisa dilunasi sebagai reverse jurnal (modul diisi BTLBILL--> supaya tidak dihitung sbg total angsuran)
							var nilai = nilaiToFloat(this.sg.cells(8,i)) - nilaiToFloat(this.sg.cells(9,i));
							
							sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.sg.cells(1,i)+"','"+this.dp_d1.getDateString()+"',"+idx+",'"+this.sg.cells(7,i)+"','D',"+nilai+","+nilai+",'"+this.e_desc.getText()+"','BTLBILL','APSIMP','IDR',1,'"+this.app._lokasi+"','-','-','-','-','-','-','-','-')");
							idx++;
							sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.sg.cells(1,i)+"','"+this.dp_d1.getDateString()+"',"+idx+",'"+this.sg.cells(6,i)+"','C',"+nilai+","+nilai+",'"+this.e_desc.getText()+"','BTLBILL','ARSIMP','IDR',1,'"+this.app._lokasi+"','-','-','-','-','-','-','-','-')");

							idx++;
							sql.add("insert into kop_simpangs_d (no_angs,no_simp,no_bill,akun_piutang,nilai,kode_lokasi,dc,periode,modul,no_agg) values "+
									"('"+this.e_nb.getText()+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(6,i)+"',"+nilai+",'"+this.app._lokasi+"','D','"+this.e_periode.getText()+"','BTLBILL','"+this.cb_agg.getText()+"')");							
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);		
					this.sg.clear(1); this.sg3.clear(1);					
				}
				break;
			case "simpan" :	
				this.preView = "1";
				if (nilaiToFloat(this.e_tot.getText()) <= 0){
					system.alert(this,"Transaksi tidak valid.","Nilai pembatalan akru tidak boleh kurang/sama dgn 0.");
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
					sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kop_simpangs_d where no_angs = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
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
		if (this.stsSimpan == 1) this.doClick();				
	},
	doClick:function(sender){
		if (this.stsSimpan == 0) {					
			this.sg.clear(1); this.sg3.clear(1); 			
			this.cb_agg.setSQL("select no_agg, nama from kop_agg where kode_lokasi='"+this.app._lokasi+"'",["no_agg","nama"],false,["Kode","Nama"],"and","Data Anggota",true);
		}
		this.stsSimpan = 1;		
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-RSM"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_desc.setFocus();
		setTipeButton(tbSimpan);					
	},	
	doChange:function(sender){
		if (sender == this.cb_agg && this.cb_agg.getText() != "" && this.stsSimpan == 1) {
			this.sg.clear(1);
			this.cb_simp.setSQL("select a.no_simp, b.nama from kop_simp_m a "+
			                    "inner join kop_simp_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
								"where a.kode_lokasi='"+this.app._lokasi+"' and a.no_agg='"+this.cb_agg.getText()+"'",["no_simp","nama"],false,["No Simpanan","Deskripsi"],"and","Data Kartu",true);
		}		
		if (sender == this.cb_simp && this.cb_simp.getText() != ""  && this.stsSimpan == 1) this.doTampilClick();
	},
	doTampilClick: function(sender){
		try{			
			if (this.cb_simp.getText() != ""){								
				var strSQL = "select a.no_simp,a.jenis,b.nilai,b.akun_piutang,b.akun_titip,b.periode,b.no_bill,c.keterangan as ket,isnull(d.bayar,0) as bayar "+
							 "from  kop_simp_m a inner join kop_simp_d b on a.no_simp=b.no_simp  and a.kode_lokasi=b.kode_lokasi "+
							 "                   inner join trans_m c on b.no_bill=c.no_bukti and b.kode_lokasi=c.kode_lokasi "+									                  						 							 
							 "      left outer join "+  
							 "              (select y.no_simp, y.no_bill, y.kode_lokasi, sum(case dc when 'D' then y.nilai else -y.nilai end) as bayar "+
							 "               from kop_simpangs_d y inner join trans_m x on y.no_angs=x.no_bukti and y.kode_lokasi=x.kode_lokasi "+
							 "               where y.no_simp = '"+this.cb_simp.getText()+"' and y.kode_lokasi='"+this.app._lokasi+"' "+
							 "               group by y.no_simp, y.no_bill, y.kode_lokasi) d on b.no_simp=d.no_simp and b.no_bill=d.no_bill and b.kode_lokasi=d.kode_lokasi "+							 
							 "where  a.no_simp = '"+this.cb_simp.getText()+"' and b.nilai+isnull(d.bayar,0)>0 and a.kode_lokasi= '"+this.app._lokasi+"' order by a.no_simp,b.periode"; //and d.bayar is null <--- sudah bayar pun selisihnya bisa di lunasi sbg pembatalan

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData(["AKRU",line.no_simp,line.jenis,line.no_bill,line.ket,line.periode,line.akun_piutang,line.akun_titip,floatToNilai(line.nilai),floatToNilai(line.bayar)]);
					}
				} else this.sg.clear(1);															
			}
			else {
				system.alert(this,"Kartu simpanan tidak valid.","Kartu Simpanan harus dipilih.");
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(0,row) == "AKRU") this.sg.cells(0,row,"BATAL");
		else this.sg.cells(0,row,"AKRU");		
	},
	doChangeCell: function(sender, col, row){
		if ((col == 0) && (this.sg.getCell(0,row) != "")){
			this.sg.validasi();
		}
	},
	doSgChange: function(sender, col, row){
		var tot1 = 0;			
		for (var i = 0;i < this.sg.getRowCount();i++){
			if ((this.sg.cells(0,i) == "BATAL") && (this.sg.cells(8,i) != "") && (this.sg.cells(9,i) != ""))
				tot1 += nilaiToFloat(this.sg.cells(8,i)) - nilaiToFloat(this.sg.cells(9,i));
		}
		this.e_tot.setText(floatToNilai(tot1));
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_kb_rptKbJurnalBukti";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
								this.pc3.hide();
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
				this.pc3.show();   
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
			this.sg.clear(1); this.sg3.clear(1);
			this.pc3.setActivePage(this.pc3.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbAllFalse);					
			this.stsSimpan = 1;
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																						
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai1 "+
		             "from trans_m a "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.periode='"+this.e_periode.getText()+"' and a.posted='F' and a.form='BTLBILL'";	

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
			this.sg3.appendData([line.no_bukti,line.tgl,line.keterangan,floatToNilai(line.nilai1)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc3.setActivePage(this.pc3.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
														
				var strSQL = "select a.tanggal,a.keterangan, b.no_simp,c.no_agg "+
				             "from trans_m a inner join kop_simpangs_d b on a.no_bukti=b.no_angs and a.kode_lokasi=b.kode_lokasi "+							 
							 "               inner join kop_simp_m c on b.no_simp=c.no_simp and c.kode_lokasi=b.kode_lokasi "+
							 "where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
						this.dp_d1.setText(line.tanggal);
						this.e_desc.setText(line.keterangan);
						this.cb_agg.setSQL("select no_agg, nama from kop_agg where no_agg='"+line.no_agg+"' and kode_lokasi='"+this.app._lokasi+"'",["no_agg","nama"],false,["Kode","Nama"],"and","Data Anggota",true);
						this.cb_simp.setSQL("select a.no_simp, b.nama from kop_simp_m a "+
											"inner join kop_simp_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
											"where a.kode_lokasi='"+this.app._lokasi+"' and a.no_simp='"+line.no_simp+"'",["no_simp","nama"],false,["No Simpanan","Deskripsi"],"and","Data Kartu",true);
						this.cb_agg.setText(line.no_agg);
						this.cb_simp.setText(line.no_simp);
					}
				}												
				
				var strSQL = "select a.no_simp,a.jenis,b.nilai,b.akun_piutang,b.akun_titip,b.periode,b.no_bill,c.keterangan as ket,isnull(d.bayar,0) as bayar "+
							 "from  kop_simp_m a inner join kop_simp_d b on a.no_simp=b.no_simp  and a.kode_lokasi=b.kode_lokasi "+
							 "                   inner join trans_m c on b.no_bill=c.no_bukti and b.kode_lokasi=c.kode_lokasi "+									                  						 							 
							 "                   inner join kop_simpangs_d dd on b.no_simp=dd.no_simp and b.no_bill=dd.no_bill and b.kode_lokasi=dd.kode_lokasi "+
							 "      left outer join "+  
							 "              (select y.no_simp, y.no_bill, y.kode_lokasi, sum(case dc when 'D' then y.nilai else -y.nilai end) as bayar "+
							 "               from kop_simpangs_d y inner join trans_m x on y.no_angs=x.no_bukti and y.kode_lokasi=x.kode_lokasi "+
							 "               where y.no_angs<>'"+this.e_nb.getText()+"' and y.no_simp = '"+this.cb_simp.getText()+"' and y.kode_lokasi='"+this.app._lokasi+"' "+
							 "               group by y.no_simp, y.no_bill, y.kode_lokasi) d on b.no_simp=d.no_simp and b.no_bill=d.no_bill and b.kode_lokasi=d.kode_lokasi "+							 
							 "where dd.no_angs='"+this.e_nb.getText()+"' and a.no_simp = '"+this.cb_simp.getText()+"' and a.kode_lokasi= '"+this.app._lokasi+"' order by a.no_simp,b.periode"; 
				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData(["BATAL",line.no_simp,line.jenis,line.no_bill,line.ket,line.periode,line.akun_piutang,line.akun_titip,floatToNilai(line.nilai),floatToNilai(line.bayar)]);
					}
				} else this.sg.clear(1);															
				
			}									
		} catch(e) {alert(e);}
	}
});
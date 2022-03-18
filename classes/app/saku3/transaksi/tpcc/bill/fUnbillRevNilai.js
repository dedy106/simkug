window.app_saku3_transaksi_tpcc_bill_fUnbillRevNilai = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tpcc_bill_fUnbillRevNilai.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tpcc_bill_fUnbillRevNilai";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Reverse Akru Unbill By Nilai", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 

		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai","Pilih"],
					colWidth:[[4,3,2,1,0],[70,100,300,80,150]],
					colFormat:[[3,4],[cfNilai,cfButton]],readOnly:true,
					click:[this,"doSgBtnClick3"], colAlign:[[6],[alCenter]],													 
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,300,20],caption:"No Dokumen", maxLength:50});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,15,500,20],caption:"Deskripsi", maxLength:150});				
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,15,210,20],caption:"Total Reverse", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});	

		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,10,996,328], childPage:["Data UnBill"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:7,tag:0,
					colTitle:["No Bukti","Tanggal","Kontrak","Deskripsi","Akun Piutang","Saldo UnBill","Ni. Reverse"],
					colWidth:[[6,5,4,3,2,1,0],[80,80,80,300,200,70,100]],					
					columnReadOnly:[true,[0,1,2,3,4,5],[6]],					
					colFormat:[[5,6],[cfNilai,cfNilai]],checkItem:true,
					dblClick:[this,"doDoubleClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	

		setTipeButton(tbAllFalse);
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
			this.stsSimpan = 1;			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tpcc_bill_fUnbillRevNilai.extend(window.childForm);
window.app_saku3_transaksi_tpcc_bill_fUnbillRevNilai.implement({
	loadData: function() {		
		//bill yg belm pernah direverse
		strSQL = "select a.no_bill,convert(varchar,a.tanggal,103) as tgl,a.no_kontrak,a.keterangan,a.akun_piutang,a.nilai-isnull(c.total_rev,0) as nilai "+
				 "from bill_m a "+		
				 "  left join ( "+

				 "			  select no_dokumen,kode_lokasi,sum(nilai) * -1 as total_rev from piutang_d where modul ='REVUBILL' and kode_lokasi='"+this.app._lokasi+"' group by no_dokumen,kode_lokasi "+

				 " 			  ) c on c.no_dokumen=a.no_bill and a.kode_lokasi=c.kode_lokasi "+
				 "where a.kode_lokasi='"+this.app._lokasi+"' and a.modul ='UNBILL' and a.nilai-isnull(c.total_rev,0) >0 and a.nilai_ppn=0";
				 //ada ppn tidak bisa dicicil				 				 
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line2;
			this.sg.clear();
			for (var i in data.rs.rows){
				line2 = data.rs.rows[i];							
				this.sg.appendData([line2.no_bill,line2.tgl,line2.no_kontrak,line2.keterangan,line2.akun_piutang,floatToNilai(line2.nilai),"0"]);
			}
		} else this.sg.clear(1);
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
						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from bill_m where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from piutang_d where no_piutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");                        
					}

					var vPosted = "F";
										
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
                            "('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','AR','REVUBILL','"+vPosted+"','-','-','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','IDR',1,"+
                            parseNilai(this.e_nilai.getText())+",0,0,'"+this.app._userLog+"','-','-','-','-','-','-','-','-') ");

					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(6,i) != "0") {															
								//angka diminus utk menolkan tagihan unbill sebelumnya								
								var nilai = nilaiToFloat(this.sg.cells(6,i)) * -1;
								sql.add("insert into bill_m(no_bill,no_dokumen,no_ba,no_faktur,tanggal,keterangan,kode_curr,kurs,nilai,nilai_ppn,kode_cust,no_kontrak,kode_pp,nik_buat,nik_app,jabatan,kode_lokasi,periode,nik_user,tgl_input,bank,cabang,no_rek,nama_rek,draft,nama_bill,kode_rek,no_kuitansi,no_piutang,progress,no_app,modul,akun_piutang)  "+
										"select '"+this.e_nb.getText()+"',no_bill,'-','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',kode_curr,kurs,"+nilai+",0,kode_cust,no_kontrak,kode_pp,'"+this.app._userLog+"','"+this.app._userLog+"','-',kode_lokasi,'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),bank,cabang,no_rek,nama_rek,draft,nama_bill,kode_rek,no_kuitansi,'"+this.e_nb.getText()+"',progress,no_app,'REVUBILL',akun_piutang "+
										"from bill_m where no_bill='"+this.sg.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'");		

                                sql.add("insert into piutang_d(no_piutang,kode_lokasi,no_dokumen,tanggal,keterangan,kode_project,kode_cust,kode_curr,kurs,kode_pp,nilai,periode,nik_user,tgl_input,akun_piutang,nilai_ppn,nilai_pph,no_fp,modul) "+
										"select '"+this.e_nb.getText()+"',kode_lokasi,'"+this.sg.cells(0,i)+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',kode_project,kode_cust,kode_curr,kurs,kode_pp,"+nilai+",'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),akun_piutang,0,0,'-','REVUBILL' "+
                                        "from piutang_d where no_piutang='"+this.sg.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
                                       
                                //jurnalbalik
								sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
										"select '"+this.e_nb.getText()+"',kode_lokasi,getdate(),nik_user,'"+this.e_periode.getText()+"','"+this.sg.cells(0,i)+"','"+this.dp_d1.getDateString()+"',nu,kode_akun,case dc when 'D' then 'C' else 'D' end,"+Math.abs(nilai)+","+Math.abs(nilai)+",'"+this.e_ket.getText()+"','REVUBILL',jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3 "+
										"from trans_j where no_bukti='"+this.sg.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'");											
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
					this.sg.clear(1); 						
					this.sg3.clear(1);
					setTipeButton(tbAllFalse);
					this.doClick();
				break;
			case "simpan" :																					
			case "ubah" :																						
				this.preView = "1";								
				this.sg.validasi();		
				if (this.sg.getRowValidCount() > 0){
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i) && nilaiToFloat(this.sg.cells(6,i)) > nilaiToFloat(this.sg.cells(5,i))) {															
							var j = i+1;
							system.alert(this,"Transaksi tidak valid.","Nilai Reverse melebihi Saldo Unbill (Baris : "+j+")");
							return false;
						}
					}
				}

				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;						
				}				
				if (this.standarLib.doCekPeriode(this.dbLib,"AR",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (AR - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}  
				else this.simpan();
				break;	
			case "simpancek" : this.simpan();			
				break;							
			case "hapus" :	
				this.preView = "0";				
				if (this.standarLib.doCekPeriode(this.dbLib,"AR",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (AR - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from bill_m where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from piutang_d where no_piutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");                        
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);					
		if (this.stsSimpan == 1) {
			this.doClick();						
			this.loadData();
		}
	},		
	doClick:function(sender){		
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg.clear(1); 
				this.sg3.clear(1); 				
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-RVB"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_dok.setFocus();
			setTipeButton(tbSimpan);			
		}
	},	
	doDoubleClick: function(sender, col , row) {
		sender.cells(6,row,sender.cells(5,row));
	},
	doChangeCell: function(sender, col, row){
		if (col == 6) this.sg.validasi();								
	},	
	doNilaiChange: function(){
		try{			
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(6,i) != ""){										
					tot += nilaiToFloat(this.sg.cells(6,i));					
				}
			}						
			this.e_nilai.setText(floatToNilai(tot));
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
								this.nama_report="server_report_saku3_travel_rptPiutangJurnal";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_piutang='"+this.e_nb.getText()+"' ";
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
								this.pc2.hide();
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
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
			this.sg.clear(1); this.sg3.clear(1); 												
			setTipeButton(tbAllFalse);			
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){						
		var strSQL = "select no_bukti,convert(varchar,tanggal,103) as tgl,keterangan,nilai1 from trans_m "+
					 "where posted='F' and form='REVUBILL' and kode_lokasi='"+this.app._lokasi+"' order by no_bukti";						
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
			this.sg3.appendData([line.no_bukti,line.tgl,line.keterangan,floatToNilai(line.nilai1),"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col == 4) this.doDoubleClick3(this.sg3,0,row); 				
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);				
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select * from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);					
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);							
					} 
				}
				
                strSQL = "select a.no_bill,convert(varchar,a.tanggal,103) as tgl,a.no_kontrak,a.keterangan,a.akun_piutang,a.nilai-isnull(c.total_rev,0) as saldo, abs(b.nilai) as nilai "+
						"from bill_m a "+		
						"  inner join piutang_d b on a.no_bill=b.no_dokumen and a.kode_lokasi=b.kode_lokasi and b.modul='REVUBILL' "+		 				 
						"  left join ( "+

						"			  select no_dokumen,kode_lokasi,sum(nilai) * -1 as total_rev from piutang_d "+
						"			  where no_piutang<>'"+this.e_nb.getText()+"' and modul ='REVUBILL' and kode_lokasi='"+this.app._lokasi+"' group by no_dokumen,kode_lokasi "+

				 		" 			  ) c on c.no_dokumen=a.no_bill and a.kode_lokasi=c.kode_lokasi "+
						"where a.kode_lokasi='"+this.app._lokasi+"' and a.modul ='UNBILL' and b.no_piutang='"+this.e_nb.getText()+"' ";				 				 

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line2;
					this.sg.clear();
					for (var i in data.rs.rows){
						line2 = data.rs.rows[i];							
						this.sg.appendData([line2.no_bill,line2.tgl,line2.no_kontrak,line2.keterangan,line2.akun_piutang,floatToNilai(line2.saldo),floatToNilai(line2.nilai)]);
					}
				} else this.sg.clear(1);
				
			}									
		} catch(e) {alert(e);}
	}
});
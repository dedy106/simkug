window.app_saku3_transaksi_produk_fBA = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_produk_fBA.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_produk_fBA";
		this.itemsValue = new arrayList();
		this.maximize();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Berita Acara", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"], visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,120,20],caption:"Tanggal", underline:true});	
		this.dp_d1 = new portalui_datePicker(this,{bound:[140,11,100,20],selectDate:[this,"doSelectDate"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Data Berita Acara","Daftar Berita Acara"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:4,
		            colTitle:["No. BA","Tanggal","Deskripsi","No. Closing","PIC","Nilai"],
					colWidth:[[5,4,3,2,1,0],[100,150,100,300,100,100]],
					colFormat:[[5],[cfNilai]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.bLoad1 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Closing",click:[this,"doLoad"]});

		this.e_nb = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,10,200,20],caption:"No Bukti",maxLength:10,change:[this,"doChange"],readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});										
		
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,450,20],caption:"Deskripsi", maxLength:50, tag:1});
		this.cb_penerima = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"Penerima", maxLength:50, tag:1, multiSelection:false});		
		this.cb_closing = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,220,20],caption:"No Close Shift", maxLength:50, tag:1 ,multiSelection:false,change:[this,"doChange"]});
		
		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[1,11,995,305], childPage:["Data Closing Shift","Detail Nota","Detail Total"]});						
		this.e_tgl = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"Tgl Closing", maxLength:50, tag:1,readOnly:true});
		this.e_pic = new saiCBBL(this.pc2.childPage[0],{bound:[20,16,220,20],caption:"PIC", tag:1, readOnly:true});	
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,200,20],caption:"Total", maxLength:50, tag:1,tipeText:ttNilai,text:"0",readOnly:true});

		this.sg4 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:1,
		            colTitle:["No. Nota","Tanggal Nota","Tenan","Status","Total"],
					colWidth:[[4,3,2,1,0],[100,100,300,120,100]],
					columnReadOnly:[true,[0,1,2,3,4,5]],
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					colFormat:[[4],[cfNilai]],
					autoAppend:false,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg4,pager:[this,"doPager4"]});
		this.bLoad1 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Berita Acara",click:[this,"doLoad"]});		

		this.sg3 = new saiGrid(this.pc2.childPage[2],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:3,tag:9,
		            colTitle:["Status","Total","Akun"],
					colWidth:[[2,1,0],[150,150,120]],
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					readOnly:true,
					colFormat:[[1],[cfNilai]],					
					defaultRow:1});
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[2],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg4,pager:[this,"doPager3"]});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		this.pc2.childPage[0].rearrangeChild(10, 23);	

		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);

		setTipeButton(tbAllFalse);
			
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan=1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
	
			this.cb_penerima.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' ",["nik","nama"],false,["NIK","Nama"],"and","Data Penerima",true);
			this.e_pic.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' ",["nik","nama"],false,["NIK","Nama"],"and","Data PIC",true);
			this.cb_closing.setSQL("select no_closing, ket from ktu_closing_m where no_ba ='-' and kode_lokasi='"+this.app._lokasi+"' ",["no_closing","ket"],false,["Kode","Deskripsi"],"and","Data Closing Shift",false);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_produk_fBA.extend(window.childForm);
window.app_saku3_transaksi_produk_fBA.implement({
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
			if (this.stsSimpan == 1) this.doClick(this.i_gen);						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if(this.stsSimpan == 0){
						sql.add("delete from ktu_ba where no_ba = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
						
						sql.add("update a set a.no_ba='-' from ktu_nota a "+
								"where a.no_ba='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");

						sql.add("update a set a.no_ba='-' from ktu_closing_m a "+
								"where a.no_ba='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");	
					}			
					
					sql.add("update a set a.no_ba='"+this.e_nb.getText()+"' from ktu_nota a "+
							"where a.no_closing='"+this.cb_closing.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");

					sql.add("update a set a.no_ba='"+this.e_nb.getText()+"' from ktu_closing_m a "+
							"where a.no_closing='"+this.cb_closing.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");	
					
					sql.add("insert into ktu_ba(no_ba,tanggal,keterangan,no_closing,kode_lokasi,nik_user,tgl_input,nik_app,periode,pic,total) values "+
						    "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_closing.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"',getdate(),'"+this.cb_penerima.getText()+"','"+this.e_periode.getText()+"','"+this.e_pic.getText()+"','"+nilaiToFloat(this.e_total.getText())+"')");
					
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','AP','BAST','F','-','-','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','IDR',1,"+
							parseNilai(this.e_total.getText())+",0,0,'-','-','-','-','-','-','-','-','-')");
					
					if (this.sg3.getRowValidCount() > 0){
						for (var i=0;i < this.sg3.getRowCount();i++){
							if (this.sg3.rowValid(i)){
								sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg3.cells(2,i)+"','D',"+parseNilai(this.sg3.cells(1,i))+","+
								parseNilai(this.sg3.cells(1,i))+",'"+this.e_ket.getText()+"','AP','"+this.sg3.cells(0,i)+"','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");
					
							}	
						}						
					}
					
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',999,'"+this.akun_titipan+"','C',"+parseNilai(this.e_total.getText())+","+
							parseNilai(this.e_total.getText())+",'"+this.e_ket.getText()+"','AP','HUT-A','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");
					
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
					this.standarLib.clearByTag(this, new Array("1"),undefined);

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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg1.clear(1); 
					this.sg4.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.pc2.setActivePage(this.pc2.childPage[0]);			
					setTipeButton(tbAllFalse);
					this.cb_closing.setSQL("select no_closing, ket from ktu_closing_m where no_ba ='-' and kode_lokasi='"+this.app._lokasi+"' ",["no_closing","ket"],false,["Kode","Deskripsi"],"and","Data Closing Shift",false);
					this.stsSimpan = 1;
					this.doClick(this.i_gen);
				}
				break;
			case "simpan" :	
			case "ubah" :
				this.preView = "1";
				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																	
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai nota tidak boleh 0 atau kurang.");
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
				
				else 
					
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :
				this.preView = "0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from ktu_ba where no_ba = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
					
					sql.add("update a set a.no_ba='-' from ktu_nota a "+
							"where a.no_ba='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");

					sql.add("update a set a.no_ba='-' from ktu_closing_m a "+
							"where a.no_ba='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
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
		if (this.stsSimpan == 1) {
			this.doClick(this.i_gen);
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			if(this.stsSimpan == 0){
				this.cb_closing.setSQL("select no_closing, ket from ktu_closing_m where no_ba ='-' and kode_lokasi='"+this.app._lokasi+"' ",["no_closing","ket"],false,["Kode","Deskripsi"],"and","Data Closing Shift",false);
			}
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-BA"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.stsSimpan=1;
			setTipeButton(tbSimpan);
		}
	},	
	doChange: function(sender){
		try{
			if (sender == this.cb_closing && this.cb_closing.getText() != ""){
				var strSQL = "select convert (varchar, a.tanggal,103) as tanggal,a.pic,a.kode_kantin,b.akun_piutang,b.akun_titipan "+
							 "from ktu_closing_m a "+
							 "inner join ktu_kantin b on a.kode_kantin = b.kode_kantin and a.kode_lokasi=b.kode_lokasi "+
				             "where a.no_closing ='"+this.cb_closing.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){			
						this.e_tgl.setText(line.tanggal);
						this.e_pic.setText(line.pic);
						this.akun_piutang = line.akun_piutang;
						this.akun_titipan = line.akun_titipan;
					}
				}

				var strSQL = "select a.no_bukti, a.tanggal,a.no_closing, a.kode_tenan+' | '+c.nama as tenan, a.status,a.nilai "+
							 "from ktu_nota a "+ 
							 "inner join ktu_closing_m b on a.no_closing=b.no_closing and a.kode_lokasi=b.kode_lokasi "+						
							 "inner join ktu_tenan c on a.kode_tenan=c.kode_tenan and a.kode_lokasi=c.kode_lokasi "+
							 "where a.no_closing = '"+this.cb_closing.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_tenan";		 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU4 = data;
					this.sgn4.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn4.rearrange();
					this.doTampilData4(1);

					var total = 0;
					var line;
					for (var i=0;i < this.dataJU4.rs.rows.length;i++){
						line = this.dataJU4.rs.rows[i];
						total+=parseFloat(line.nilai);
					}
					this.e_total.setText(floatToNilai(total));
				} else this.sg4.clear(1);	

				var strSQL = "select a.status,SUM(a.nilai) as nilai,c.kb "+
							 "from ktu_nota a  "+
							 "inner join ktu_jbayar c on a.status=c.kode_bayar and a.kode_lokasi=c.kode_lokasi "+
							 "inner join ktu_closing_m b on a.no_closing=b.no_closing and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_closing = '"+this.cb_closing.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' group by a.status,c.kb  ";		 							
				var data = this.dbLib.getDataProvider(strSQL,true);

				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU3 = data;
					this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn3.rearrange();
					this.doTampilData3(1);
					
				} else this.sg3.clear(1);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doTampilData4: function(page) {
		this.sg4.clear();
		var line2;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU4.rs.rows.length? this.dataJU4.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line2 = this.dataJU4.rs.rows[i];													
			this.sg4.appendData([line2.no_bukti,line2.tanggal,line2.tenan,line2.status,floatToNilai(line2.nilai)]); 
		}
		this.sg4.setNoUrut(start);
	},
	doPager4: function(sender, page) {
		this.doTampilData4(page);
	},	
	doTampilData3: function(page) {
		this.sg3.clear();
		var line3;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line3 = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line3.status,floatToNilai(line3.nilai),line3.kb]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_kantintu_rptBa";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ba='"+this.e_nb.getText()+"' ";
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
								this.pc1.hide();
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
			this.sg1.clear(1); 
			this.sg4.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			setTipeButton(tbAllFalse);
			this.cb_closing.setSQL("select no_closing, ket from ktu_closing_m where no_ba ='-' and kode_lokasi='"+this.app._lokasi+"' ",["no_closing","ket"],false,["Kode","Deskripsi"],"and","Data Closing Shift",false);
			this.stsSimpan = 1;
			this.doClick(this.i_gen);
		} catch(e) {
			alert(e);
		}
	},
	doLoad:function(sender){				 				
		var strSQL = "select a.no_ba,convert (varchar, a.tanggal,103) as tanggal,a.keterangan,a.no_closing,a.pic,a.total "+
					 "from ktu_ba a inner join trans_m b on a.no_ba = b.no_bukti and a.kode_lokasi=b.kode_lokasi "+
					 "where b.posted='F' and b.kode_lokasi='"+this.app._lokasi+"' and b.periode='"+this.e_periode.getText()+"' ";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},		
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.no_ba,line.tanggal,line.keterangan,line.no_closing,line.pic,floatToNilai(line.total)]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				this.pc1.setActivePage(this.pc1.childPage[0]);														
				this.e_nb.setText(this.sg1.cells(0,row));

				var strSQL = "select * from ktu_ba where no_ba ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.dp_d1.setText(line.tanggal);
						this.e_ket.setText(line.keterangan);
						this.cb_closing.setSQL("select no_closing, ket from ktu_closing_m where no_ba ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",["no_closing","ket"],false,["Kode","Deskripsi"],"and","Data Closing Shift",false);
						this.cb_closing.setText(line.no_closing);
						this.cb_penerima.setText(line.nik_app);
					}
				}
			}
		} catch(e) {alert(e);}
	}
});

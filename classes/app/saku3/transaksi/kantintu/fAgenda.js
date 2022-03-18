window.app_saku3_transaksi_kantintu_fAgenda = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_kantintu_fAgenda.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_kantintu_fAgenda";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Pembayaran Sharing Tenan", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,13,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,13,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,13,100,18],selectDate:[this,"doSelectDate"]});		
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Data Pembayaran","List Transaksi"]});
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Keterangan","Nilai"],
					colWidth:[[3,2,1,0],[100,300,100,100]],						
					readOnly:true,
					colFormat:[[3],[cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.bLoad1 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Closing",click:[this,"doLoad"]});

		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"No KasBank", maxLength:20, tag:1,readOnly:true, change:[this,"doChange"]});		
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,11,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});											
		this.e_ket = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,450,20],caption:"Deskripsi", maxLength:100, tag:1});	
		
		this.cb_kb = new saiCBBL(this.pc1.childPage[0],{bound:[20,15,220,20],caption:"Kas Bank", maxLength:50, tag:1, multiSelection:false});		
		this.bTampil = new button(this.pc1.childPage[0],{bound:[650,15,80,18],caption:"Tampil Data",click:[this,"doCari"]});					
		this.i_bAll = new portalui_imageButton(this.pc1.childPage[0],{bound:[740,15,20,20],hint:"App All",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_tot = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[790,15,200,20],caption:"Total", maxLength:100, tag:1, readOnly:true, tipeText:ttNilai});	
		
		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[1,30,995,327], childPage:["Detail Tenan"]});			
		this.sg4 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:7,tag:9,
		            colTitle:["Status","No. Rekon","Tanggal","Tenan","Nilai","Bank","Rekening"],
					colWidth:[[6,5,4,3,2,1,0],[200,200,100,300,80,100,80]],
					columnReadOnly:[true,[1,2,3,4,5,6]],					
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],dblClick:[this,"doDoubleClick4"],
					colFormat:[[4],[cfNilai]],
					buttonStyle:[[0],[bsAuto]],
					picklist:[[0],[new portalui_arrayMap({items:["APP","NON"]})]],
					autoAppend:false,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg4,pager:[this,"doPager4"]});

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);		
		setTipeButton(tbAllFalse);

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
			this.stsSimpan=1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
				
			this.cb_kb.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"' ",["kode_akun","nama"],false,["Kode akun","Nama"],"and","Data Akun Kas Bank",true);						
		}catch(e){
			systemAPI.alert(e);
		}
		
	}
};
window.app_saku3_transaksi_kantintu_fAgenda.extend(window.childForm);
window.app_saku3_transaksi_kantintu_fAgenda.implement({
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
						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
						sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
						sql.add("update ktu_rekon_d set no_kas='-' where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
					}					
					
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','KB','KBSHARING','F','-','-','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','IDR',1,"+
							parseNilai(this.e_tot.getText())+","+parseNilai(this.e_tot.getText())+",0,'-','-','-','-','-','"+this.cb_kb.getText()+"')");
					
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',999,'"+this.cb_kb.getText()+"','C',"+nilaiToFloat(this.e_tot.getText())+","+nilaiToFloat(this.e_tot.getText())+",'"+this.e_ket.getText()+"','KB','KB','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");

					var line;
					for (var i=0;i < this.dataJU4.rs.rows.length;i++){
						line = this.dataJU4.rs.rows[i];
						if (line.status.toUpperCase()=="APP"){
							sql.add("update ktu_rekon_d set no_kas='"+this.e_nb.getText()+"' where kode_tenan='"+line.kode_tenan+"' and no_rekon = '"+line.no_rekon+"' and kode_lokasi='"+this.app._lokasi+"' ");
							
							sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+line.akun_bymhd+"','D',"+nilaiToFloat(line.hasil_tenan)+","+
									nilaiToFloat(line.hasil_tenan)+",'Pembayaran Hutang : "+line.kode_tenan+"','KB','HUT-B','IDR',1,'"+this.app._kodePP+"','-','-','"+line.kode_tenan+"','-','"+line.no_rekon+"','-','-','-')");
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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
				setTipeButton(tbAllFalse);				
				this.pc1.setActivePage(this.pc1.childPage[0]);
				this.i_bAll.show();
				this.bTampil.show();
				this.sg1.clear(1);
				this.sg4.clear(1); 
				this.stsSimpan = 1;
				this.doClick(this.i_gen);				
				break;				
			case "simpan" :	
			case "ubah" :
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																	
				if (nilaiToFloat(this.e_tot.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai total tidak boleh 0 atau kurang.");
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
		if (this.stsSimpan == 1) this.doClick(this.i_gen);
	},		
	doClick: function(sender){
		if (sender == this.i_gen) {
			if (this.stsSimpan == 0) {
				this.i_bAll.show();
				this.bTampil.show();
				this.sg1.clear(1);
				this.sg4.clear(1); 
			}					
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-BK"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.stsSimpan = 1;
			setTipeButton(tbSimpan);	
		}
		if (sender == this.i_bAll) {
			for (var i = 0;i < this.dataJU4.rs.rows.length;i++){
				this.dataJU4.rs.rows[i].stsapp = "APP";		
				this.sg4.cells(0,i,"APP");		
			}	
		}	
	},		
	doCari:function(sender){								
		try {
			var strSQL = "select 'NON' as status, d.akun_bymhd, c.kode_tenan, a.no_rekon,convert(varchar,b.tanggal,103) as tanggal,c.kode_tenan+' | '+c.nama as tenan,a.hasil_tenan,c.bank+' | '+c.cabang as bank,c.norek+' | '+c.namarek as rek "+
						 "from ktu_rekon_d a "+
						 "inner join ktu_rekon_m b on a.no_rekon=b.no_rekon and a.kode_lokasi=b.kode_lokasi "+ 
						 "inner join ktu_tenan c on a.kode_tenan=c.kode_tenan and a.kode_lokasi=c.kode_lokasi "+	
						 "inner join ktu_kantin d on c.kode_kantin=d.kode_kantin and a.kode_lokasi=d.kode_lokasi "+						
						 "where a.no_kas = '-' and a.kode_lokasi='"+this.app._lokasi+"'";													
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU4 = data;
				this.sgn4.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn4.rearrange();
				this.doTampilData4(1);
			} else this.sg4.clear(1);
		}	 		
		catch(e) {
			alert(e);
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
			this.sg4.appendData([line2.status.toUpperCase(),line2.no_rekon,line2.tanggal,line2.tenan,floatToNilai(line2.hasil_tenan),line2.bank,line2.rek]);
		}
		this.sg4.setNoUrut(start);
	},
	doChangeCell: function(sender, col, row){		
		if (col == 0 ){
			this.dataJU4.rs.rows[((this.page-1)*20) + row].status = this.sg4.cells(0,row);
			this.sg4.validasi();			
		}
	},
	doDoubleClick4: function(sender, col , row) {
		if(this.sg4.cells(0,row) == "NON") this.sg4.cells(0,row,"APP");
		else this.sg4.cells(0,row,"NON");
	},
	doNilaiChange: function(){
		var tot = 0;		
		for (var i = 0;i < this.dataJU4.rs.rows.length;i++){
			var line = this.dataJU4.rs.rows[i];
			if (line.status.toUpperCase() == "APP"){			
				tot += parseFloat(line.hasil_tenan);	
			}
		}			
		this.e_tot.setText(floatToNilai(tot));			
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								//this.nama_report="server_report_saku2_kopeg_sju_rptJuBukti";
								//this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.e_nb.getText()+"' ";
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
			setTipeButton(tbAllFalse);				
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.i_bAll.show();
			this.bTampil.show();
			this.sg1.clear(1);
			this.sg4.clear(1); 
			this.stsSimpan = 1;
			this.doClick(this.i_gen);	
		} catch(e) {
			alert(e);
		}
	},
	doLoad:function(sender){						
			var strSQL = "select no_bukti, tanggal, keterangan, nilai1 from trans_m where form = 'KBSHARING' and kode_lokasi='"+this.app._lokasi+"' and posted='F' and periode='"+this.e_periode.getText()+"' ";			
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
		var line4;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line4 = this.dataJU.rs.rows[i];	
			this.sg1.appendData([line4.no_bukti,line4.tanggal,line4.keterangan,floatToNilai(line4.nilai1)]); 							
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
				this.pc1.setActivePage(this.pc1.childPage[0]);														
				this.e_nb.setText(this.sg1.cells(0,row));
				this.i_bAll.hide();
				this.bTampil.hide();
				this.stsSimpan=0;

				var strSQL = "select * from trans_m where no_bukti ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
						this.dp_d1.setText(line.tanggal);					
						this.e_ket.setText(line.keterangan);	
						this.cb_kb.setText(line.no_ref3);														
					}
				}

				var strSQL = "select 'APP' as status, d.akun_bymhd, c.kode_tenan, a.no_rekon,convert(varchar,b.tanggal,103) as tanggal,c.kode_tenan+' | '+c.nama as tenan,a.hasil_tenan,c.bank+' | '+c.cabang as bank,c.norek+' | '+c.namarek as rek "+
							"from ktu_rekon_d a "+
							"inner join ktu_rekon_m b on a.no_rekon=b.no_rekon and a.kode_lokasi=b.kode_lokasi "+ 
							"inner join ktu_tenan c on a.kode_tenan=c.kode_tenan and a.kode_lokasi=c.kode_lokasi "+	
							"inner join ktu_kantin d on c.kode_kantin=d.kode_kantin and a.kode_lokasi=d.kode_lokasi "+						
							"where a.no_kas = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";													
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU4 = data;
					this.sgn4.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn4.rearrange();
					this.doTampilData4(1);
				} else this.sg4.clear(1);			
			}
		} catch(e) 
			{	alert(e);
		}
	}
});

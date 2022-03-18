window.app_saku3_transaksi_yakes21_ifund_fPiuLain = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_ifund_fPiuLain.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_ifund_fPiuLain";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Reklas Piutang Lain-Lain", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;checkBox;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","No Dokumen","Deskripsi","Nilai"],
					colWidth:[[4,3,2,1,0],[100,300,150,80,100]],colFormat:[[4],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"Unit / PP",tag:2,multiSelection:false,change:[this,"doChange"]}); 		
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,22,220,20],caption:"Akun Beban", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});		
		this.e_saldo = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,22,200,20],caption:"Saldo Budget", tag:1, tipeText:ttNilai, text:"0", readOnly:true});				
		this.cb_drk = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"DRK",tag:1,multiSelection:false,change:[this,"doChange"]});         						
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,200,20],caption:"Totl Beban", readOnly:true,tipeText:ttNilai, text:"0"});		
		this.bTampil = new button(this.pc2.childPage[0],{bound:[670,17,80,18],caption:"Tampil Data",click:[this,"doLoadData"]});			
			
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,257], childPage:["Data Piutang"]});						
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:0,		            
					colTitle:["Status","Lokasi","No Bukti","Tanggal","Keterangan","Kode Akun","Kode PP","Nilai"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,80,80,310,80,120,100,70]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7],[]],
					colFormat:[[7],[cfNilai]],
					buttonStyle:[[0],[bsAuto]], 
					picklist:[[0],[new portalui_arrayMap({items:["REKLAS","INPROG"]})]],
					change:[this,"doChangeCell"],dblClick:[this,"doDoubleClick"],nilaiChange:[this,"doNilaiChange"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
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
			
			this.cb_pp.setSQL("select a.kode_pp, a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"'where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_pp","a.nama"],false,["Kode","Nama"],"and","Data PP",true);						
			this.cb_pp.setText(this.app._kodePP);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_ifund_fPiuLain.extend(window.childForm);
window.app_saku3_transaksi_yakes21_ifund_fPiuLain.implement({	
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from ju_m where no_ju = '"+this.e_nb.getText()+"'");
						sql.add("delete from ju_j where no_ju = '"+this.e_nb.getText()+"'");
						sql.add("delete from if_piutang_d where no_ju = '"+this.e_nb.getText()+"'");
						sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"'");
					}
					
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
							"('"+this.e_nb.getText()+"','JUIFPIU','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','C',"+parseNilai(this.e_saldo.getText())+","+parseNilai(this.e_nilai.getText())+")");

					sql.add("insert into ju_m (no_ju, kode_lokasi, no_dokumen, tanggal, keterangan, kode_pp, modul, jenis, periode, kode_curr, kurs, nilai, nik_buat, nik_setuju, tgl_input, nik_user, posted, ref1, atensi) values "+
							"('"+this.e_nb.getText()+"', '"+this.app._lokasi+"', '"+this.e_dok.getText()+"', '"+this.dp_d1.getDateString()+"', '"+this.e_ket.getText()+"', '"+this.cb_pp.getText()+"', 'JU', 'JUIFPIU', '"+this.e_periode.getText()+"', 'IDR', 1, "+nilaiToFloat(this.e_nilai.getText())+", '"+this.app._userLog+"', '"+this.app._userLog+"', getdate(), '"+this.app._userLog+"', 'F', '-','-')")

					sql.add("insert into ju_j (no_ju, no_dokumen, tanggal, no_urut, kode_akun, keterangan, dc, nilai, kode_pp, kode_drk, kode_lokasi, modul, jenis, periode, kode_curr, kurs, nik_user, tgl_input) values "+
							"('"+this.e_nb.getText()+"', '"+this.e_dok.getText()+"', '"+this.dp_d1.getDateString()+"', 999, '"+this.cb_akun.getText()+"', '"+this.e_ket.getText()+"', 'D', "+nilaiToFloat(this.e_nilai.getText())+", '"+this.cb_pp.getText()+"', '"+this.cb_drk.getText()+"', '"+this.app._lokasi+"', 'JU', 'BEBAN', '"+this.e_periode.getText()+"', 'IDR', 1, '"+this.app._userLog+"', getdate())");

					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(0,i) == "REKLAS"){								
								sql.add("insert into ju_j (no_ju, no_dokumen, tanggal, no_urut, kode_akun, keterangan, dc, nilai, kode_pp, kode_drk, kode_lokasi, modul, jenis, periode, kode_curr, kurs, nik_user, tgl_input) values "+
										"('"+this.e_nb.getText()+"', '"+this.e_dok.getText()+"', '"+this.dp_d1.getDateString()+"', "+i+", '"+this.sg.cells(5,i)+"', '"+this.sg.cells(4,i)+"', 'C', "+nilaiToFloat(this.sg.cells(7,i))+", '"+this.sg.cells(6,i)+"', '-', '"+this.sg.cells(6,i).substr(0,2)+"', 'JU', 'IFPIU', '"+this.e_periode.getText()+"', 'IDR', 1, '"+this.app._userLog+"', getdate())");
								sql.add("insert into if_piutang_d (no_ju, no_aju) values "+
										"('"+this.e_nb.getText()+"','"+this.sg.cells(2,i)+"')");
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
					this.sg.clear(1);  this.sg3.clear(1); 
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbAllFalse);
					this.bTampil.hide();
				break;
			case "simpan" :					
			case "ubah" :					
				this.preView = "1";				
				this.sg.validasi();
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);								
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Beban tidak boleh nol atau kurang.");
					return false;						
				}
				if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_saldo.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai transaksi melebihi Saldo Budget.");
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
					sql.add("delete from ju_m where no_ju = '"+this.e_nb.getText()+"'");
					sql.add("delete from ju_j where no_ju = '"+this.e_nb.getText()+"'");					
					sql.add("delete from if_piutang_d where no_ju = '"+this.e_nb.getText()+"'");
					sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"'");
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
		if (this.stsSimpan == 1) this.doClick(this.i_gen);				
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg.clear(1); this.sg3.clear(1); 
				this.e_nilai.setText("0");	
				this.bTampil.show();			
			}			
			if (sender == this.i_gen) {
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ju_m","no_ju",this.app._lokasi+"-JU"+this.e_periode.getText().substr(2,4)+".","0000"));
				this.stsSimpan = 1;
				this.e_dok.setFocus();
				setTipeButton(tbSimpan);			
			}			
		}
	},				
	doChange:function(sender){
		try {
			if (sender == this.cb_pp && this.cb_pp.getText()!= "") {
				this.cb_akun.setSQL(
					"select distinct a.kode_akun, a.nama from masakun a inner join angg_r b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and substring(b.periode1,1,4) = '"+this.e_periode.getText().substr(0,4)+"' and b.kode_pp='"+this.cb_pp.getText()+"' where a.block='0' and a.kode_lokasi='"+this.app._lokasi+"' "					
					,["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);	
			}

			if ((sender == this.cb_pp || sender == this.cb_akun || sender == this.e_periode) && this.cb_pp.getText()!="" && this.cb_akun.getText()!="" && this.e_periode.getText()!="" && this.stsSimpan==1) {				
				this.cb_drk.setSQL("select distinct a.kode_drk, a.nama from drk a inner join angg_r b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode1,1,4) and b.periode1 like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.cb_akun.getText()+"' and b.kode_pp = '"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and b.modul='RELEASE'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);											
			}

			if ((sender == this.cb_pp || sender == this.cb_akun || sender == this.cb_drk || sender == this.e_periode) && this.cb_pp.getText()!="" && this.cb_akun.getText()!="" && this.cb_drk.getText()!="" && this.e_periode.getText()!="") {
				var data = this.dbLib.getDataProvider("select fn_saldoRilis('"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"') as saldo ",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];					
					this.e_saldo.setText(floatToNilai(line.saldo));                       
				}
			}

		}
		catch(e) {
			alert(e);
		}
	},
	doLoadData:function(sender){				
		var strSQL = "select a.no_aju,c.nama as lokasi,convert(varchar,a.tanggal,103) as tgl, a.keterangan,a.kode_akun,a.kode_pp,a.nilai "+
					 "from if_aju_m a inner join lokasi c on a.kode_lokasi=c.kode_lokasi "+
					 "left join if_piutang_d b on a.no_aju=b.no_aju "+
					 "where a.posted='T' and b.no_aju is null and a.kode_akun = '11050502' order by a.kode_lokasi,a.no_aju";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg.appendData(["INPROG",line.lokasi,line.no_aju,line.tgl,line.keterangan,line.kode_akun,line.kode_pp,floatToNilai(line.nilai)]);
			}
		} else this.sg.clear(1);
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},
	doChangeCell: function(sender, col, row){
		if ((col == 0) && (this.sg.cells(0,row) != "")) this.sg.validasi();		
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(7,i) != "" && this.sg.cells(0,i) == "REKLAS"){
					tot += nilaiToFloat(this.sg.cells(7,i));
				}
			}
			this.e_nilai.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},			
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(0,row) == "REKLAS") this.sg.cells(0,row,"INPROG");
		else this.sg.cells(0,row,"REKLAS");
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								// this.nama_report="server_report_saku3_kb_rptKbJurnalBukti";
								// this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_terima='"+this.e_nb.getText()+"' ";
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
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbAllFalse);
			this.bTampil.show();
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																				
		var strSQL = "select a.no_ju,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.nilai "+
		             "from ju_m a "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.jenis = 'JUIFPIU' and a.posted ='F'";		
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
			this.sg3.appendData([line.no_ju,line.tgl,line.no_dokumen,line.keterangan,floatToNilai(line.nilai)]); 
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
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.bTampil.hide();
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select a.tanggal,a.no_dokumen,a.keterangan,b.kode_akun,b.kode_pp,b.kode_drk "+
							 "from ju_m a inner join ju_j b on a.no_ju=b.no_ju and b.jenis='BEBAN' "+
							 "where a.no_ju = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);																													
						this.cb_pp.setText(line.kode_pp);	
						this.cb_akun.setText(line.kode_akun);	
						this.cb_drk.setText(line.kode_drk);							
					}
				}	

				var strSQL = "select a.no_aju,c.nama as lokasi,convert(varchar,a.tanggal,103) as tgl, a.keterangan,a.kode_akun,a.kode_pp,a.nilai "+
						"from if_aju_m a inner join lokasi c on a.kode_lokasi=c.kode_lokasi "+
						"inner join if_piutang_d b on a.no_aju=b.no_aju "+
						"where b.no_ju = '"+this.e_nb.getText()+"' order by a.kode_lokasi,a.no_aju";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData(["REKLAS",line.lokasi,line.no_aju,line.tgl,line.keterangan,line.kode_akun,line.kode_pp,floatToNilai(line.nilai)]);
					}
				} else this.sg.clear(1);	
				this.sg.validasi();		

			}									
		} catch(e) {alert(e);}
	}	
});

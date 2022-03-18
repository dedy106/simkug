window.app_saku3_transaksi_tm_fAjuReimKB = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tm_fAjuReimKB.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tm_fAjuReimKB";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pengajuan Reimburse KasBank", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl");		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data Reimburse","List Reimburse"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:7,tag:9,
		            colTitle:["No Bukti","Tanggal","Kode Rek","Nama Rek","Deskripsi","Nilai","Progress"],
					colWidth:[[6,5,4,3,2,1,0],[60,100,310,280,80,80,100]],colFormat:[[5],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,18,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});		    
		this.cb_rektuj = new saiCBBL(this.pc2.childPage[0],{bound:[20,20,220,20],caption:"Rek Transfer", multiSelection:false, maxLength:10, tag:2});	
		this.cb_rek = new saiCBBL(this.pc2.childPage[0],{bound:[20,19,220,20],caption:"Rek Transaksi", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});	
		this.e_saldo = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,19,200,20],caption:"Saldo", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[20,11,100,18],caption:"Range Tanggal", underline:true});		
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,11,100,18]}); 
		this.dp_d3 = new portalui_datePicker(this.pc2.childPage[0],{bound:[240,11,100,18]}); 		
		this.bTampil = new button(this.pc2.childPage[0],{bound:[350,11,80,18],caption:"Tampil Data",click:[this,"doLoad"]});			
		this.i_appAll = new portalui_imageButton(this.pc2.childPage[0],{bound:[440,11,20,20],hint:"Approve All",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,11,200,20],caption:"Total Reimburse", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,5,995,270], childPage:["Data Bukti KasBank","Detail Transaksi"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-30],colCount:10,tag:0,
		            colTitle:["Status","No Bukti","No Dokumen","Tanggal","Keterangan","Kode Rek","Nilai","Modul","DC","Index"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[50,60,80,100,80,250,80,120,120,80]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9],[]],
					colFormat:[[6],[cfNilai]],
					buttonStyle:[[0],[bsAuto]], 
					picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
					change:[this,"doChangeCells"],dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-30],colCount:8,tag:9,
					colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Rekening"],
					colWidth:[[7,6,5,4,3,2,1,0],[200,150,80,100,200,50,150,80]],
					colFormat:[[4],[cfNilai]],readOnly:true,autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
				
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
	
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='KBAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");		
			
			this.cb_rektuj.setSQL("select kode_rek, nama from bank_rek where kode_lokasi='"+this.app._lokasi+"'",["kode_rek","nama"],false,["Kode","Nama"],"and","Data Rekening",true);
			this.cb_rek.setSQL("select kode_rek, nama from bank_rek where kode_lokasi='"+this.app._lokasi+"'",["kode_rek","nama"],false,["Kode","Nama"],"and","Data Rekening",true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);												
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tm_fAjuReimKB.extend(window.childForm);
window.app_saku3_transaksi_tm_fAjuReimKB.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					if (this.stsSimpan == 1) this.doClick(this.i_gen); 
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					if (this.stsSimpan == 0) {
						sql.add("delete from yk_kasaju_m where kode_lokasi='"+this.app._lokasi+"' and no_kasaju='"+this.e_nb.getText()+"'");
						sql.add("delete from yk_kasaju_d where kode_lokasi='"+this.app._lokasi+"' and no_kasaju='"+this.e_nb.getText()+"'");
						sql.add("update a set a.no_del='-' "+
								"from kas_m a left join yk_kasaju_d b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi "+
								"where b.no_kas is null and a.kode_lokasi='"+this.app._lokasi+"' and a.no_del='"+this.e_nb.getText()+"'");						
					}															
					var data = this.dbLib.getDataProvider("select flag from spro where kode_spro='TAKKB' and kode_lokasi = '"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){													
							var kodeAkun = line.flag;
						}
					}
					if (this.progSeb == "V") var vProg = "1"; else var vProg = "0"; 
					sql.add("insert into yk_kasaju_m(no_kasaju,no_dokumen,tanggal,tgl_awal,tgl_akhir,keterangan,nik_buat,nik_setuju,kode_lokasi,kode_pp,nilai,progress,periode,nik_user,tgl_input,kode_akun,kode_lokbayar,no_kasbayar,kode_bank,no_app,no_ver,no_spb,kode_banktuj) values "+
						    "('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._userLog+"','"+this.cb_app.getText()+"','"+this.app._lokasi+"','"+this.app._kodePP+"',"+parseNilai(this.e_total.getText())+",'"+vProg+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+kodeAkun+"','"+this.app._kodeLokasiPusat+"','-','"+this.cb_rek.getText()+"','"+this.noAppLama+"','"+this.noVerLama+"','-','"+this.cb_rektuj.getText()+"')");					
					var line;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						if (line.status.toUpperCase() == "APP"){
							sql.add("insert into yk_kasaju_d(nu,no_kasaju,no_kas,kode_akun,kode_lokasi,kode_bank,kode_banktuj) values "+
									"("+line.no_urut+",'"+this.e_nb.getText()+"','"+line.no_kas+"','-','"+this.app._lokasi+"','"+line.kode_bank+"','"+this.cb_rektuj.getText()+"')");													
							sql.add("update kas_m set no_del='"+this.e_nb.getText()+"' where no_kas='"+line.no_kas+"' and kode_lokasi='"+this.app._lokasi+"'");  //kasbank mati gak bisa dikoreksi,meski baru salah satu akun yg diajukan ..tidak perlu kas_j
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
					this.sg.setTag("0");
					this.dataJU.rs.rows = [];
					this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1);
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbAllFalse);					
				break;
			case "simpan" :					
			case "ubah" :					
				this.preView = "1";
				var isAda = false;				
				if (nilaiToFloat(this.e_saldo.getText()) < 0){
					system.alert(this,"Transaksi tidak valid.","Saldo kurang dari nol.");
					return false;
				}				
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					if (this.dataJU.rs.rows[i].status.toUpperCase() == "APP") isAda = true;
				}
				if (!isAda){
					system.alert(this,"Transaksi tidak valid.","Tidak ada transaksi dengan status APP.");
					return false;
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;					
			case "hapus" :	
				this.preView = "0";				
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from yk_kasaju_m where kode_lokasi='"+this.app._lokasi+"' and no_kasaju='"+this.e_nb.getText()+"'");
				sql.add("delete from yk_kasaju_d where kode_lokasi='"+this.app._lokasi+"' and no_kasaju='"+this.e_nb.getText()+"'");				
				sql.add("update a set a.no_del='-' "+
				        "from kas_m a left join yk_kasaju_d b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi "+
						"where b.no_kas is null and a.kode_lokasi='"+this.app._lokasi+"' and a.no_del='"+this.e_nb.getText()+"'");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
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
		if (sender == this.i_gen) {
			if (this.stsSimpan == 0) {					
				this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1);
				this.dataJU = {rs:{rows:[]}};
				this.e_total.setText("0");				
				this.bTampil.show();
				this.i_appAll.show(); 
			}			
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_kasaju_m","no_kasaju",this.app._lokasi+"-KBAJ"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);			
		}
		if (sender == this.i_appAll) {			
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				this.dataJU.rs.rows[i].status = "APP";
			}
			this.doTampilData(this.page);
			this.doNilaiChange();
		}
	},
	doChange:function(sender){
		if (sender == this.e_periode) {
			this.dataJU.rs.rows = [];
			this.sg.clear(1); this.sg2.clear(1);
			this.doNilaiChange();
		}				
		if (sender == this.cb_rek && this.cb_rek.getText() != "") {			
			this.nik_user = this.app._nikUser;
			var sql = "call sp_kas_dw_tmp ('"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.nik_user+"')";			
			this.dbLib.execQuerySync(sql);			
			
			var sql = "select so_akhir from glma_tmp where kode_bank='"+this.cb_rek.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and nik_user='"+this.nik_user+"'";
			var data = this.dbLib.getDataProvider(sql,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				var line = this.dataJU.rs.rows[0];
				this.e_saldo.setText(floatToNilai(line.so_akhir));
			}
		}

	},
	doLoad:function(sender){
		if (this.cb_rek.getText() != "" && this.stsSimpan == 1) {
			var strSQL = "select 'INPROG' as status,a.no_kas,convert(varchar,a.tanggal,103) as tanggal,a.no_dokumen,a.keterangan,a.nilai,a.modul,a.kode_bank,a.dc,a.no_urut "+
						 "from kas_j a "+
						 "             left join yk_kasaju_d b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi and a.no_urut=b.nu and a.kode_bank=b.kode_bank "+
						 "             left join ("+
						 "						select a.no_kas,a.kode_lokasi  "+
						 "						from kas_j a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001','009') "+
						 "						where a.kode_lokasi='"+this.app._lokasi+"' and a.tanggal between '"+this.dp_d2.getDateString()+"' and '"+this.dp_d3.getDateString()+"' "+
						 "						group by a.no_kas,a.kode_lokasi  having COUNT(distinct a.no_kas+a.dc) > 1 "+
						 "              ) c on a.no_kas=c.no_kas and a.kode_lokasi=c.kode_lokasi "+
						 "where a.nilai <> 0 and a.kode_bank = '"+this.cb_rek.getText()+"' and c.no_kas is null and b.no_kas is null and a.tanggal between '"+this.dp_d2.getDateString()+"' and '"+this.dp_d3.getDateString()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_kas ";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);		
		}
		else system.alert(this,"Kode Rekening harus diisi.","Pilih dari daftar yang ada.");
	},
	doTampilData: function(page) {
		this.sg.clear(); this.sg2.clear(1);
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.status.toUpperCase(),line.no_kas,line.no_dokumen,line.tanggal,line.keterangan,line.kode_bank,floatToNilai(line.nilai),line.modul,line.dc,line.no_urut]);
		}
		this.sg.setNoUrut(start);
	},
	doChangeCells: function(sender, col , row) {
		if (col == 0 ) {
			this.dataJU.rs.rows[((this.page-1)*20) + row].status = this.sg.cells(0,row);			
			this.doNilaiChange();
		}		
	},
	doNilaiChange: function(){
		try{
			var tot = 0;			
			var line;			
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];
				if (line.status.toUpperCase() == "APP" && line.nilai != ""){					
					if (line.dc == "C" ) tot += Math.round(line.nilai);
					if (line.dc == "D" ) tot -= Math.round(line.nilai);
				}						
			}
			this.e_total.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(2,row) != "") {
			this.sg2.clear();			
			var strSQL = "select a.kode_pp,b.nama as nama_pp,a.kode_akun,c.nama as nama_akun,a.nilai,a.dc,a.keterangan,a.kode_bank+' - '+isnull(x.nama,'-') as rek "+
						 "from kas_j a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "			   inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
						 "             left join bank_rek x on a.kode_bank=x.kode_rek and a.kode_lokasi=x.kode_lokasi "+
						 "where a.no_kas = '"+this.sg.cells(1,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc ";						
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.rek]);
				}
			} else this.sg2.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[1]);
		}
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
			this.sg.setTag("0");
			this.dataJU.rs.rows = [];
			this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbAllFalse);			
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																										
		var strSQL = "select a.no_kasaju,convert(varchar,a.tanggal,103) as tgl,a.kode_bank,b.nama,a.keterangan,a.nilai,a.progress "+
		             "from yk_kasaju_m a inner join bank_rek b on a.kode_bank=b.kode_rek and a.kode_lokasi=b.kode_lokasi "+					 					 
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.progress in ('0','R','V') order by a.tanggal";		
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
			this.sg3.appendData([line.no_kasaju,line.tgl,line.kode_bank,line.nama,line.keterangan,floatToNilai(line.nilai),line.progress]); 
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
				this.bTampil.hide();
				this.i_appAll.hide(); 
				this.e_nb.setText(this.sg3.cells(0,row));														
				this.progSeb = this.sg3.cells(6,row);
				
				if (this.progSeb == "V") {
					var modulApp = "REIMKB_SPB"; 
					var vRelasi = " a.no_ver=b.no_app and a.kode_lokbayar=b.kode_lokasi ";
				}
				else {
					var modulApp = "REIMKB_APP"; 
					var vRelasi = " a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi ";
				}
				
				var strSQL = "select a.tanggal,a.tgl_awal,a.tgl_akhir,a.keterangan,a.nik_setuju,a.kode_bank,a.kode_banktuj, "+
							 "a.no_ver as no_verlama,a.no_app as no_applama,isnull(b.no_app,'-') as no_app,isnull(b.catatan,'-') as catatan  "+
				             "from yk_kasaju_m a "+							 
							 "left join ("+
							 "        select a.kode_lokasi,a.no_app,a.catatan from app_d a inner join app_m b "+
							 "        on a.no_app=b.no_app and a.no_bukti='"+this.e_nb.getText()+"' and b.no_appseb='-' and b.modul='"+modulApp+"') b on "+vRelasi+" "+							 
							 "where a.no_kasaju ='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.cb_app.setText(line.nik_setuju);					
						this.dp_d1.setText(line.tanggal);	
						this.dp_d2.setText(line.tgl_awal);	
						this.dp_d3.setText(line.tgl_akhir);							
						this.e_ket.setText(line.keterangan);									
						this.cb_rektuj.setText(line.kode_banktuj);															
						this.cb_rek.setText(line.kode_bank);															
						
						this.e_noapp.setText(line.no_app);
						this.e_memo.setText(line.catatan);
						this.noAppLama = line.no_applama;
						this.noVerLama = line.no_verlama;						
					}
				}				
				var strSQL = "select 'APP' as status,a.no_kas,convert(varchar,a.tanggal,103) as tanggal,a.no_dokumen,a.keterangan,a.nilai,a.modul,a.kode_bank,a.dc,a.no_urut "+
							 "from kas_j a "+
							 "             inner join yk_kasaju_d b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi and a.no_urut=b.nu and a.kode_bank=b.kode_bank "+
							 "where  b.no_kasaju='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_kas ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);		
				this.doNilaiChange();
			}									
		} catch(e) {alert(e);}
	}	
});

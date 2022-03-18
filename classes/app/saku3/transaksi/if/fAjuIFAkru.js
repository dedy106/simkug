window.app_saku3_transaksi_if_fAjuIFAkru = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_if_fAjuIFAkru.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_if_fAjuIFAkru";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pencatatan Kuitansi: Input", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,12,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,12,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Pengajuan","Cat. Approval","List Pengajuan"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[2],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:7,tag:9,
		            colTitle:["No Aju","Tanggal","Tgl Kuitansi","Deskripsi","Progress","Nilai","No App"],
					colWidth:[[6,5,4,3,2,1,0],[100,80,60,400,80,80,100]],
					colFormat:[[5],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[2],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});		
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[20,13,100,18],caption:"Tgl Kuitansi", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,13,100,18]}); 
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,202,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:false});		
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,11,222,20],caption:"PP",tag:2,multiSelection:false,change:[this,"doChange"]}); 		
		
		this.cb_vendor = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,12,222,20],caption:"Mitra",tag:1,multiSelection:false,change:[this,"doChange"]}); 		
		this.cb_hutang = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,222,20],caption:"No Hutang",tag:1,multiSelection:false,change:[this,"doChange"]}); 		
		this.cb_akun = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,12,222,20],caption:"Akun",tag:1,readOnly:true});         				
		this.e_saldo = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,202,20],caption:"Saldo Hutang", tag:1, tipeText:ttNilai, text:"0", readOnly:true});
		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,550,20],caption:"Uraian", maxLength:150});				
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,202,20],caption:"Nilai Kuitansi", tag:1, tipeText:ttNilai, text:"0"});
		this.cb_app = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,222,20],caption:"Disetujui Oleh",tag:2,multiSelection:false});         				
		this.c_status = new saiCB(this.pc2.childPage[0],{bound:[20,20,202,20],caption:"Status Pajak",items:["NON","P21","P23"], readOnly:true,tag:2,change:[this,"doChange"]});				
		this.e_npajak = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"Nilai Pajak", tag:0, tipeText:ttNilai, text:"0",visible:false});
		
		this.e_noapp = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,15,450,20],caption:"No Approve", tag:9, readOnly:true});
		this.e_memo = new saiMemo(this.pc2.childPage[1],{bound:[20,12,450,150],caption:"Catatan",tag:9, readOnly:true});
		this.e_memo.setReadOnly(true);
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc2.childPage[1].rearrangeChild(10, 23);	
					
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
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_app.setSQL("select nik, nama from karyawan where flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_bidang='"+this.app._kodeBidang+"' and flag_aktif ='1' and tipe = 'Posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_vendor.setSQL("select kode_vendor, nama from vendor where kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Mitra",true);
			this.cb_pp.setText(this.app._kodePP);
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PPH21','PPH23') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "PPH21") this.akunPPH21 = line.flag;								
					if (line.kode_spro == "PPH23") this.akunPPH23 = line.flag;								
				}
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_if_fAjuIFAkru.extend(window.childForm);
window.app_saku3_transaksi_if_fAjuIFAkru.implement({		
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
						sql.add("delete from if_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from if_aju_j where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
						sql.add("delete from yk_pb_m where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
					}																				
					vProg = "0";					
					sql.add("insert into if_aju_m(no_aju,kode_lokasi,periode,tgl_input,user_input,tanggal,tgl_kuitansi,modul,kode_akun,kode_pp,kode_drk,keterangan,nilai,sts_pajak,npajak,no_app,no_ganti,progress,nik_app,no_reim) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','IFAJUAKRU','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','-','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.c_status.getText()+"',"+nilaiToFloat(this.e_npajak.getText())+",'"+this.noAppLama+"','-','"+vProg+"','"+this.cb_app.getText()+"','-')");					
					var nilaiGar = nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_npajak.getText());												
					sql.add("insert into if_aju_j(no_aju,no_ref,kode_lokasi,tanggal,nu,periode,kode_akun,kode_pp,kode_drk,dc,keterangan,nilai,jenis) values "+
							"('"+this.e_nb.getText()+"','-','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',0,'"+this.e_periode.getText()+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','-','D','"+this.e_ket.getText()+"',"+nilaiGar+",'BEBAN')");					
					if (this.c_status.getText() != "NON") {
						if (this.c_status.getText() == "P21") var akunPajak = this.akunPPH21; else var akunPajak = this.akunPPH23; 								
							sql.add("insert into if_aju_j(no_aju,no_ref,kode_lokasi,tanggal,nu,periode,kode_akun,kode_pp,kode_drk,dc,keterangan,nilai,jenis) values "+
									"('"+this.e_nb.getText()+"','-','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',1,'"+this.e_periode.getText()+"','"+akunPajak+"','"+this.cb_pp.getText()+"','-','C','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_npajak.getText())+",'"+this.c_status.getText()+"')");
					}													
					sql.add("insert into yk_pb_m (no_pb,no_dokumen,kode_lokasi,periode,nik_user,tgl_input,tanggal,due_date,keterangan,nilai,modul,progress,kode_pp,nik_app,nik_tahu,no_hutang,no_app,no_spb,no_ver,kode_bidang,kode_loktuj,nilai_final) values  "+
							"('"+this.e_nb.getText()+"','-','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',"+nilaiGar+",'PBAKRU','X','"+this.cb_pp.getText()+"','"+this.app._userLog+"','"+this.app._userLog+"','"+this.cb_hutang.getText()+"','"+this.e_nb.getText()+"','"+this.e_nb.getText()+"','"+this.e_nb.getText()+"','"+this.app._kodeBidang+"','"+this.app._lokasi+"',"+nilaiGar+")");					
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);										
					setTipeButton(tbAllFalse);
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.c_status.setText("NON");
					this.sg3.clear(1);
				break;
			case "simpan" :									
			case "ubah" :									
				this.preView = "1";
				var nilaiGar = nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_npajak.getText());
				if (nilaiGar > nilaiToFloat(this.e_saldo.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai transaksi melebihi saldo akru hutang.");
					return false;						
				}													
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Nilai transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
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
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from if_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				sql.add("delete from if_aju_j where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
				sql.add("delete from yk_pb_m where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
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
		if (this.stsSimpan == 1) this.doClick();		
	},
	doClick:function(sender){		
		if (this.stsSimpan == 0) {
			this.sg3.clear(1);
		}
		this.noAppLama = "-";
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"if_aju_m","no_aju",this.app._lokasi+"-IFA"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.cb_pp.setFocus();
		setTipeButton(tbSimpan);
	},	
	doChange:function(sender){
		if (sender == this.c_status){
			if (this.c_status.getText() == "NON") {
				this.e_npajak.setTag("9");				
				this.e_npajak.hide();				
			}
			else {
				this.e_npajak.setTag("0");				
				this.e_npajak.show();				
			}
		}
		if (sender == this.cb_pp || sender == this.e_periode  || sender == this.cb_vendor) {
			if (this.cb_pp.getText()!="" && this.cb_vendor.getText()!="" && this.e_periode.getText()!="") {
				this.cb_hutang.setSQL("select a.no_hutang,a.keterangan from hutang_m a "+
				"                left join (select kode_lokasi,no_hutang,sum(nilai_final) as pb "+
				"                           from yk_pb_m where kode_lokasi='"+this.app._lokasi+"' and modul='PBAKRU' "+
				"                           group by kode_lokasi,no_hutang) c on a.no_hutang=c.no_hutang and a.kode_lokasi=c.kode_lokasi "+
				"where a.modul='AKRU' and a.nilai-isnull(pb,0) > 0 and a.kode_pp='"+this.cb_pp.getText()+"' and a.kode_vendor='"+this.cb_vendor.getText()+"' and a.periode<='"+this.e_periode.getText()+"'",["no_hutang","keterangan"],false,["Kode","Nama"],"and","Data Akru Hutang",true);													
			}
		}
		if (sender == this.cb_hutang) {
			if (this.cb_hutang.getText()!="") {
				var strSQL = "select a.akun_hutang,a.nilai-isnull(pb,0) as saldo "+
							 "from hutang_m a "+
							 "     left join (select kode_lokasi,no_hutang,sum(nilai_final) as pb "+
							 "                from yk_pb_m where kode_lokasi='"+this.app._lokasi+"' and modul='PBAKRU' and no_pb <> '"+this.e_nb.getText()+"' "+
							 "                group by kode_lokasi,no_hutang) c on a.no_hutang=c.no_hutang and a.kode_lokasi=c.kode_lokasi "+
							 "where a.modul='AKRU' and a.no_hutang='"+this.cb_hutang.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.cb_akun.setSQL("select kode_akun, nama from masakun where kode_akun='"+line.akun_hutang+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
						this.cb_akun.setText(line.akun_hutang);						
						this.e_saldo.setText(floatToNilai(line.saldo));
					}
				}
			}
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							if (this.preView == "1") {
								this.nama_report="server_report_saku3_if_rptIfForm";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_aju='"+this.e_nb.getText()+"' ";
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);						
			setTipeButton(tbAllFalse);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.c_status.setText("NON");
			this.sg3.clear(1);
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																						
		var strSQL = "select a.no_aju,convert(varchar,a.tanggal,103) as tgl,modul,convert(varchar,a.tgl_kuitansi,103) as tglkui,a.keterangan,a.progress,a.nilai,a.no_app "+
		             "from if_aju_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+					 					 
					 "where a.modul='IFAJUAKRU' and b.kode_bidang='"+this.app._kodeBidang+"' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.progress in ('0','R')";		
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
			this.sg3.appendData([line.no_aju,line.tgl,line.tglkui,line.keterangan,line.progress,floatToNilai(line.nilai),line.no_app]); 
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
				this.progSeb = this.sg3.cells(4,row);
								
				var strSQL = "select a.no_app as no_applama,a.keterangan,a.tgl_kuitansi,a.tanggal,a.nik_app,isnull(b.no_app,'-') as no_app,isnull(b.catatan,'-') as catatan, "+
							 "       a.kode_pp,a.kode_drk,a.nilai,a.sts_pajak,a.npajak, "+
							 "       d.no_hutang,d.kode_vendor,d.akun_hutang "+
							 "from if_aju_m a "+
							 "inner join yk_pb_m c on a.no_aju=c.no_pb and a.kode_lokasi=c.kode_lokasi "+
							 "inner join hutang_m d on c.no_hutang=d.no_hutang and c.kode_lokasi=d.kode_lokasi "+
							 "left join ("+
							 "        select a.kode_lokasi,a.no_app,a.catatan from app_d a inner join app_m b "+
							 "        on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi and a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and b.no_appseb='-' and b.modul='IFAJU_APP') b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi "+							 
							 "where a.no_aju = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";																		
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.e_ket.setText(line.keterangan);						
						this.dp_d1.setText(line.tanggal);
						this.dp_d2.setText(line.tgl_kuitansi);
						this.cb_app.setText(line.nik_app);
						
						this.cb_pp.setText(line.kode_pp);
						this.cb_vendor.setText(line.kode_vendor);
						this.cb_hutang.setText(line.no_hutang);						
						this.cb_akun.setText(line.akun_hutang);
						
						this.c_status.setText(line.sts_pajak);
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.e_npajak.setText(floatToNilai(line.npajak));
						
						this.e_noapp.setText(line.no_app);					
						this.e_memo.setText(line.catatan);	
						this.noAppLama = line.no_applama;
						this.noVerLama = line.no_verlama;
					}
				}
			}									
		} catch(e) {alert(e);}
	}
});
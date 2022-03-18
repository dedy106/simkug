window.app_saku3_transaksi_sapyakes_fAdmDakem = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sapyakes_fAdmDakem.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sapyakes_fAdmDakem";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Administrasi DAKEM", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,12,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,12,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Pengajuan","Cat. Approval","List Pengajuan"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[2],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:7,tag:9,
		            colTitle:["No Aju","Tanggal","Tgl","Deskripsi","Progress","Nilai","No App"],
					colWidth:[[6,5,4,3,2,1,0],[100,80,60,400,80,80,100]],
					colFormat:[[5],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[2],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});		
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,202,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:false});		
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,11,222,20],caption:"PP",tag:2,multiSelection:false,change:[this,"doChange"]}); 		
		this.cb_akun = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,12,222,20],caption:"Akun",tag:1,multiSelection:false,change:[this,"doChange"]});         		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,550,20],caption:"Uraian", maxLength:150});				
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,202,20],caption:"Nilai Total", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});
		this.cb_app = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,222,20],caption:"NIK Post SAP",tag:2,multiSelection:false});         						
		
		
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
			
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a inner join sap_nik_post b on a.nik=b.nik "+
							   "where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			
			if (this.app._userStatus == "A") this.cb_pp.setSQL("select kode_pp, nama from pp where flag_aktif ='1' and tipe = 'Posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			else this.cb_pp.setSQL("select kode_pp, nama from pp where kode_bidang='"+this.app._kodeBidang+"' and flag_aktif ='1' and tipe = 'Posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			
			this.cb_pp.setText(this.app._kodePP);
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a  inner join spro b on a.kode_akun=b.flag and b.kode_spro='SAPDAKEM' "+
								"where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);	
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('SAPHDAKEM')",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "SAPHDAKEM") this.akunHutIF = line.flag;								
				}
			}	
			
			var data = this.dbLib.getDataProvider("select flag,keterangan from spro where kode_spro = 'VENDORDKM' and kode_lokasi='"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];											
				this.kodeVendor = line.flag;	
				this.rekVendor = line.keterangan;										
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sapyakes_fAdmDakem.extend(window.childForm);
window.app_saku3_transaksi_sapyakes_fAdmDakem.implement({		
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
						sql.add("delete from yk_dakemadm_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from yk_dakemadm_j where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from glsap where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					}	
					
																	
					vProg = "0";
					sql.add("insert into yk_dakemadm_m(no_aju,kode_lokasi,periode,tgl_input,user_input,tanggal,modul,kode_akun,kode_pp,keterangan,nilai,no_app,progress,nik_app,dok_sap,posted) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','"+this.dp_d1.getDateString()+"','DAKEMADM','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.noAppLama+"','"+vProg+"','"+this.cb_app.getText()+"','-','F')");
					
					var nilaiHut = nilaiToFloat(this.e_nilai.getText());
					sql.add("insert into yk_dakemadm_j(no_aju,no_ref,kode_lokasi,tanggal,nu,periode,kode_akun,kode_pp,kode_drk,dc,keterangan,nilai,jenis) values "+
							"('"+this.e_nb.getText()+"','-','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',0,'"+this.e_periode.getText()+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','-','D','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+",'BEBAN')");					
					sql.add("insert into yk_dakemadm_j(no_aju,no_ref,kode_lokasi,tanggal,nu,periode,kode_akun,kode_pp,kode_drk,dc,keterangan,nilai,jenis) values "+
							"('"+this.e_nb.getText()+"','"+this.kodeVendor+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',1,'"+this.e_periode.getText()+"','"+this.akunHutIF+"','"+this.cb_pp.getText()+"','-','C','"+this.e_ket.getText()+"',"+nilaiHut+",'HUTDKM')");
					
					sql.add("insert into glsap(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,no_doksap,kode_rek,no_payment,paymetod) "+
							"select no_aju,nu,kode_lokasi,'DAKEMADM',jenis,no_ref,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,'IDR',1,nilai,getdate(),'"+this.app._userLog+"','-','-','-',no_ref,'-','-','-','"+this.rekVendor+"','-', case when no_ref = '-' then '-' else 'T' end "+
						    "from yk_dakemadm_j "+
							"where nilai <> 0 and kode_lokasi='"+this.app._lokasi+"' and no_aju='"+this.e_nb.getText()+"'");
																							
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
					setTipeButton(tbSimpan);
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.sg3.clear(1);
					this.doClick();
				break;
			case "simpan" :									
			case "ubah" :									
				this.preView = "1";			
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
				sql.add("delete from yk_dakemadm_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				sql.add("delete from yk_dakemadm_j where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				sql.add("delete from glsap where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");							
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
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_dakemadm_m","no_aju",this.app._lokasi+"-DKA"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.cb_pp.setFocus();
		setTipeButton(tbSimpan);
		this.stsSimpan = 1;
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							if (this.preView == "1") {
								//this.nama_report="server_report_saku3_if_rptIfForm";
								//this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_aju='"+this.e_nb.getText()+"' ";
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
			setTipeButton(tbSimpan);
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.sg3.clear(1);
			this.doClick();
		} catch(e) {
			alert(e);
		}
	},	
	
	doLoad3:function(sender){																						
		var strSQL = "select a.no_aju,convert(varchar,a.tanggal,103) as tgl,modul,convert(varchar,a.tanggal,103) as tglkui,a.keterangan,a.progress,a.nilai,a.no_app "+
		             "from yk_dakemadm_m a "+		
		             "                inner join (select distinct no_bukti,kode_lokasi from glsap where no_doksap='-' and modul='DAKEMADM' and kode_lokasi='"+this.app._lokasi+"' ) c on a.no_aju=c.no_bukti and a.kode_lokasi=c.kode_lokasi "+			 					 
					 "where a.modul='DAKEMADM' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.progress in ('0','R') order by a.no_aju";		
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
								
				var strSQL = "select a.no_app as no_applama,a.keterangan,a.tanggal,a.nik_app,isnull(b.no_app,'-') as no_app,isnull(b.catatan,'-') as catatan, "+
							 "       a.kode_akun,a.kode_pp,a.nilai "+
							 "from yk_dakemadm_m a left join ("+
							 "        select a.kode_lokasi,a.no_app,a.catatan from app_d a inner join app_m b "+
							 "        on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi and a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and b.no_appseb='-' and b.modul='DAKEM_APP') b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi "+							 
							 "where a.no_aju = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";														
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.nilaiLama = line.nilai;
																	
						this.e_ket.setText(line.keterangan);						
						this.dp_d1.setText(line.tanggal);
						this.cb_app.setText(line.nik_app);
						this.cb_akun.setText(line.kode_akun);
						this.cb_pp.setText(line.kode_pp);
						this.e_nilai.setText(floatToNilai(line.nilai));
						
						this.e_noapp.setText(line.no_app);					
						this.e_memo.setText(line.catatan);	
						this.noAppLama = line.no_applama;
						this.noVerLama = line.no_verlama;
						
						this.nilaiAwal = nilaiToFloat(this.e_nilai.getText());
						
					}
				}
				
				var akun = this.cb_akun.getText();
				var pp = this.cb_pp.getText();
				var periode = this.e_periode.getText();
				var self = this;
				this.app.services.getSaldo(akun, pp, periode, function(data) {			
					var nilaiSeb = data + parseFloat(self.nilaiLama);
					self.e_saldo.setText(floatToNilai(nilaiSeb));	
				});		
					
															
			}									
		} catch(e) {alert(e);}
	}
});
window.app_saku3_transaksi_cianjur_proyek_fSpbPj = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_cianjur_proyek_fSpbPj.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_cianjur_proyek_fSpbPj";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pembuatan SPB ", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});

		this.pc2 = new pageControl(this,{bound:[10,10,1000,460], childPage:["Data SPB","List SPB"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:5,tag:9,
		            colTitle:["No SPB","Tanggal","NIK Pengaju","Deskripsi","Nilai"],
					colWidth:[[4,3,2,1,0],[100,490,180,80,100]],colFormat:[[4],[cfNilai]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data SPB",click:[this,"doLoad3"]});

		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No SPB",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"Keterangan", maxLength:150});				
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[20,15,100,18],caption:"Due Date", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,15,98,18]}); 		
		this.cb_buat = new saiCBBL(this.pc2.childPage[0],{bound:[20,16,220,20],caption:"Diajukan Oleh", multiSelection:false, maxLength:10, tag:2});				
		this.cb_tahu = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"Diketahui Oleh", multiSelection:false, maxLength:10, tag:2});				
		this.cb_fiat = new saiCBBL(this.pc2.childPage[0],{bound:[20,19,220,20],caption:"Difiat Oleh", multiSelection:false, maxLength:10, tag:2});								
		this.cb_bdh = new saiCBBL(this.pc2.childPage[0],{bound:[20,18,220,20],caption:"Bendahara", multiSelection:false, maxLength:10, tag:2});								
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[772,18,220,20],caption:"Nilai SPB", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		this.bTampil = new button(this.pc2.childPage[0],{bound:[640,18,80,18],caption:"Tampil Data",click:[this,"doLoad"]});
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,20,990,265], childPage:["Data Panjar","Detail Jurnal"]});				
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:13,tag:0,
		            colTitle:["Status","No Bukti","No Dokumen","Tanggal","Keterangan","PP","Approve","Pemegang Panjar","Bank","Cabang","No Rekening","Nama Rekening","Nilai"],
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[100,200,150,200,150,200,150,150,200,60,150,150,80]],
					colFormat:[[12],[cfNilai]],
					readOnly:true,buttonStyle:[[0],[bsAuto]], 
					picklist:[[0],[new portalui_arrayMap({items:["SPB","INPROG"]})]],
					change:[this,"doChangeCells"],dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,200,50,150,80]],
					colFormat:[[4],[cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});	
		this.cb1 = new portalui_checkBox(this.sgn2,{bound:[920,5,100,25],caption:"Preview",selected:true});
				
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);		

		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		this.dataAkun = this.app._masakun;
		this.dataPP = this.app._pp;
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan=1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");			
						
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);													
			this.cb_tahu.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);													
			this.cb_fiat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);													
			this.cb_bdh.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);													
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_cianjur_proyek_fSpbPj.extend(window.childForm);
window.app_saku3_transaksi_cianjur_proyek_fSpbPj.implement({
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
			if(this.stsSimpan==1){
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"spb_m","no_spb",this.app._lokasi+"-SPB"+this.e_periode.getText().substr(2,4)+".","000"));
			}						
			
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();	
					if(this.stsSimpan==0){
						sql.add("delete from spb_m where no_spb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("delete from spb_d where no_spb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}									
					sql.add("insert into spb_m (no_spb,kode_lokasi,periode,nik_user,tgl_input,tanggal,due_date,keterangan,nik_buat,nik_sah,nik_fiat,nik_bdh,no_kas,nilai,modul) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_tahu.getText()+"','"+this.cb_fiat.getText()+"','"+this.cb_bdh.getText()+"','-',"+nilaiToFloat(this.e_total.getText())+",'PJ')"); 
					
					var line;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						if (line.status.toUpperCase() == "SPB"){
							// if(this.stsSimpan == 0){
								// sql.add("update panjar2_m set progress='0' where no_panjar = '"+line.no_panjar+"' and kode_lokasi='"+this.app._lokasi+"'");
							// }
							sql.add("update panjar2_m set progress='1' where no_panjar = '"+line.no_panjar+"' and kode_lokasi='"+this.app._lokasi+"'");
							sql.add("insert into spb_d(no_spb,kode_lokasi,no_bukti,modul,nilai,bank,cabang,no_rek,nama_rek,akun_hutang) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.no_panjar+"','PJ2',"+line.nilai+",'"+line.bank+"','"+line.cabang+"','"+line.no_rek+"','"+line.nama_rek+"','"+line.akun_panjar+"')");							
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
					this.sg.clear(1); this.sg2.clear(1); 
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
			case "ubah"	:	
				this.preView = "1";							
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai SPB tidak boleh nol atau kurang.");
					return false;						
				}
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				/*
				if (this.standarLib.doCekPeriode(this.dbLib,"KB",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (KB - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}
				*/ 
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
				/*
				if (this.standarLib.doCekPeriode(this.dbLib,"KB",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (KB - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}
				*/
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				} 	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					var line;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						if (line.status.toUpperCase() == "SPB"){
							sql.add("update panjar2_m set progress='0' where no_panjar = '"+line.no_panjar+"' and kode_lokasi='"+this.app._lokasi+"'");
						}
					}
					sql.add("delete from spb_m where no_spb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from spb_d where no_spb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				
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
		if(this.stsSimpan==1) this.doClick();
	},				
	doClick:function(sender){
		if(this.stsSimpan==0) 
		{
			this.sg.clear(1);this.sg2.clear(1);
		}
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"spb_m","no_spb",this.app._lokasi+"-SPB"+this.e_periode.getText().substr(2,4)+".","000"));
		this.e_ket.setFocus();
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {
			this.sg.clear(1); this.sg2.clear(1);
		}
	},
	doLoad:function(sender){
		if (this.e_periode.getText()!="") {
			var strSQL = "select 'INPROG' as status,a.no_panjar,a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.kode_pp+' - '+b.nama as pp,a.nik_setuju+' - '+c.nama as approve,a.nik_buat+' - '+d.nama as pemegang,d.bank,d.cabang,d.no_rek,d.nama_rek,a.nilai,a.akun_panjar "+
						 "from panjar2_m a "+
						 "     inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "     inner join karyawan c on a.nik_setuju=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "     inner join karyawan d on a.nik_buat=d.nik and a.kode_lokasi=d.kode_lokasi "+
						 "     left join spb_d e on a.no_panjar=e.no_bukti and a.kode_lokasi=e.kode_lokasi and e.modul='PJ2' "+
						 "where a.progress ='0' and e.no_bukti is null and a.tanggal <='"+this.dp_d1.getDateString()+"' and a.kode_lokasi = '"+this.app._lokasi+"'";						
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();				
				this.doTampilData(1);
			} else this.sg.clear(1);
		}
	},
	doTampilData: function(page) {	
		if(this.dataJU.rs.rows.length > 0){
			this.sg.clear(); this.sg2.clear(1);
		}			
		var line;
		this.page = page;
		var start = (page - 1) * 20;		
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);		
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];										
			this.sg.appendData([line.status.toUpperCase(),line.no_panjar,line.no_dokumen,line.tanggal,line.keterangan,line.pp,line.approve,line.pemegang,line.bank,line.cabang,line.no_rek,line.nama_rek,floatToNilai(line.nilai)]);
		}
		this.sg.setNoUrut(start);		
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doChangeCells: function(sender, col , row) {
		if (col == 0) {
			this.dataJU.rs.rows[((this.page-1)*20) + row].status = this.sg.cells(0,row);
			var line;
			var tot = 0;
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];
				if (line.status.toUpperCase() == "SPB"){
					tot += parseFloat(line.nilai);
				}
			}
			this.e_total.setText(floatToNilai(tot));
		}
	},
	doDoubleClick: function(sender, col , row) {	
		strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
				 "from panjar2_d a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
				 "                 inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
				 "                 left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
				 "where a.no_panjar = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg2.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
			}
		} else this.sg2.clear(1);
		this.pc1.setActivePage(this.pc1.childPage[1]);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){	
							if(this.preView == "1"){
								this.nama_report="server_report_saku3_cianjur_rptPjDokSpb";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_spb='"+this.e_nb.getText()+"' ";
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
							}else{
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
			this.sg.clear(1); this.sg2.clear(1); 
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																				
		var strSQL = "select a.no_spb,a.nik_buat,b.nama,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.nilai "+
		"from spb_m a inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+
		"inner join spb_d c on a.no_spb=c.no_spb and a.kode_lokasi=c.kode_lokasi "+
		"inner join panjar2_m d on c.no_bukti=d.no_panjar and c.kode_lokasi=d.kode_lokasi "+
		"where a.periode='"+this.e_periode.getText()+"' and d.progress='1' and a.modul='PJ' and a.kode_lokasi='"+this.app._lokasi+"' "+ 
		"order by a.no_spb desc";						
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
			this.sg3.appendData([line.no_spb,line.tanggal,line.nama,line.keterangan,floatToNilai(line.nilai)]); 
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
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select a.no_spb,a.keterangan,a.tanggal,a.due_date,a.nik_buat,a.nik_sah,a.nik_fiat,a.nik_bdh,a.nilai "+						 
							 "from spb_m a "+
							 "where a.no_spb='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];						
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);	
						this.e_ket.setText(line.keterangan);
						this.dp_d2.setText(line.due_date);
						this.cb_buat.setText(line.nik_buat);
						this.cb_tahu.setText(line.nik_sah);
						this.cb_fiat.setText(line.nik_fiat);
						this.cb_bdh.setText(line.nik_bdh);
						this.e_total.setText(floatToNilai(line.nilai));
						
					} 
				}
				strSQL = "select 'SPB' as status,a.no_panjar,a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.kode_pp+' - '+b.nama as pp,a.nik_setuju+' - '+c.nama as approve,a.nik_buat+' - '+d.nama as pemegang,d.bank,d.cabang,d.no_rek,d.nama_rek,a.nilai,a.akun_panjar "+
				"from panjar2_m a "+
				"     inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
				"     inner join karyawan c on a.nik_setuju=c.nik and a.kode_lokasi=c.kode_lokasi "+
				"     inner join karyawan d on a.nik_buat=d.nik and a.kode_lokasi=d.kode_lokasi "+
				"     left join spb_d e on a.no_panjar=e.no_bukti and a.kode_lokasi=e.kode_lokasi and e.modul='PJ2' "+
				"where a.progress ='1' and e.no_spb='"+this.e_nb.getText()+"' and a.tanggal <='"+this.dp_d1.getDateString()+"' and a.kode_lokasi = '"+this.app._lokasi+"'";
				// alert(strSQL);
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line2;
					this.sg.clear();
					this.dataJU = data;	
					for (var i in data.rs.rows){
						line2 = data.rs.rows[i];							
						this.sg.appendData([line2.status.toUpperCase(),line2.no_panjar,line2.no_dokumen,line2.tanggal,line2.keterangan,line2.pp,line2.approve,line2.pemegang,line2.bank,line2.cabang,line2.no_rek,line2.nama_rek,floatToNilai(line2.nilai)]);
					}
				} else this.sg.clear(1);						
				this.sg.validasi();
			}									
		} catch(e) {alert(e);}
	}
});
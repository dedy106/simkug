window.app_saku3_transaksi_yspt_kug_fMintaApp = function(owner)
{
	if (owner)
	{		
		window.app_saku3_transaksi_yspt_kug_fMintaApp.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yspt_kug_fMintaApp";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Approval & Verifikasi Permintaan", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");				
		uses("saiCBBL",true);
		this.c_modul3 = new saiCB(this,{bound:[20,10,200,20],caption:"Modul",items:["DROPING"], readOnly:true, tag:9,change:[this,"doChange"]});
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});		
		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,400], childPage:["Daftar Bukti","Detail Bukti","Filter Data"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:13,tag:0,
		            colTitle:["Modul","No Bukti","Status","Tanggal","Due Date","PP","No Dokumen","Deskripsi","Nilai","Pembuat","No Approve","Tgl Input","Kode PP"],
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[50,110,100,150,100,300,100,150,70,70,80,100,80]],
					colHide:[[12],[true]],					
					readOnly:true,colFormat:[[8],[cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
				
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Status",items:["APPROVE","RETURN"], readOnly:true,tag:0});
		this.e_nb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"No App", readOnly:true,visible:false});						
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[20,10,550,60],caption:"Catatan",tag:9,readOnly:true});				
		
		this.e_nobukti = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"No Bukti", readOnly:true});		
		this.e_dok = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,12,450,20],caption:"No Dokumen", readOnly:true});
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[770,12,220,20],caption:"Total Pengajuan", readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_modul = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,220,20],caption:"Modul", readOnly:true,change:[this,"doChange"]});				
		this.e_nilaiApp = new saiLabelEdit(this.pc1.childPage[1],{bound:[770,13,220,20],caption:"Total Disetujui", readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.e_pp = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,13,450,20],caption:"PP/Unit", readOnly:true});				
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"Tgl Bukti", readOnly:true});
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,14,450,20],caption:"Deskripsi", readOnly:true});					
		this.e_duedate = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"Due Date", readOnly:true});				
		this.e_buat = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,15,450,20],caption:"Pembuat", readOnly:true});
		
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,16,this.pc1.width-5,182],colCount:6,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Kegiatan","Nilai Usulan","Nilai Disetujui","ID"],
					colWidth:[[5,4,3,2,1,0],[0,100,100,400,250,80]],	
					colHide:[[5],[true]],		
					columnReadOnly:[true,[0,1,2,3,5],[4]],colFormat:[[3,4],[cfNilai,cfNilai]],
					change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],
					autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager1"]});					
				
		this.c_modul2 = new saiCB(this.pc1.childPage[2],{bound:[20,11,200,20],caption:"Modul",items:["DROPING"], readOnly:true,tag:9,change:[this,"doChange"]});
		this.cb_nb = new saiCBBL(this.pc1.childPage[2],{bound:[20,12,220,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);	
				
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
			this.c_modul2.setText("");
			this.c_modul3.setText("DROPING");

		}catch(e){
			systemAPI.alert(e);
		}		
	}
};
window.app_saku3_transaksi_yspt_kug_fMintaApp.extend(window.childForm);
window.app_saku3_transaksi_yspt_kug_fMintaApp.implement({	
	doChangeCell1: function(sender, col, row){
		if ((col == 4) && (this.sg.cells(4,row) != "")) this.sg1.validasi();
	},
	doNilaiChange1: function(){
		try{
			var totaju = totapp = 0;
			for (var i = 0; i < this.sg1.rows.getLength();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(3,i) != "" && this.sg1.cells(4,i) != ""){
					totaju += nilaiToFloat(this.sg1.cells(3,i));
					totapp += nilaiToFloat(this.sg1.cells(4,i));
				}
			
			}
			this.e_nilai.setText(floatToNilai(totaju));
			this.e_nilaiApp.setText(floatToNilai(totapp));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
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
			this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();																								
					if (this.c_status.getText() == "RETURN") var vStatus = "C"; else var vStatus = "1";										
					
					sql.add("update ys_app_m set no_flag='"+this.e_nb.getText()+"' where no_bukti='"+this.e_nobukti.getText()+"' and no_flag='-' and form='APPCAB' and modul='"+this.e_modul.getText()+"'");					
					sql.add("insert into ys_app_m (no_app,kode_lokasi,tanggal,periode,tgl_input,nik_user,status,modul,form,no_bukti,catatan,no_flag,nik_bdh,nik_fiat) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','"+vStatus+"','"+this.e_modul.getText()+"','APPCAB','"+this.e_nobukti.getText()+"','"+this.e_memo.getText()+"','-','X','X')");
																				
					//---------------- flag bukti					
					if (this.e_modul.getText() == "DROPING") {
						sql.add("update ys_minta_m set no_app='"+this.e_nb.getText()+"',progress='"+vStatus+"' where no_minta='"+this.e_nobukti.getText()+"' ");
						
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){
								sql.add("update ys_minta_d set nilai_app="+parseNilai(this.sg1.cells(4,i))+" where no_minta='"+this.e_nobukti.getText()+"' and nu ="+this.sg1.cells(5,i));
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
					this.sg1.clear(1); 
					this.doClick();
					this.doLoad();					
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.e_memo.setText("");
					setTipeButton(tbAllFalse);
					this.c_modul3.setText("DROPING");
				break;
			case "simpan" :	
			case "ubah" :					
				this.preView = "1";				
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {				
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;						
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
				sql.add("delete from ys_app_m where no_app='"+this.noAppLama+"' and kode_lokasi='"+this.app._lokasi+"'");
				
				if (this.e_modul.getText() == "DROPING") {
					sql.add("update ys_minta_m set no_app='-',progress='0' where no_minta='"+this.e_nobukti.getText()+"'");
				}
				
				setTipeButton(tbAllFalse);					
				this.dbLib.execArraySQL(sql);				
				break;					
		}
	},
	doSelectDate: function(sender, y,m,d){
		try {
			if (m < 10) m = "0" + m;			
			if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
			else {
				if (m == "12") this.e_periode.setText(this.app._periode);
				else this.e_periode.setText(y+""+m);
			}
			//if (this.stsSimpan == 1) this.doClick();									
		} catch(e) {
			alert(e);
		}
	},	
	doChange:function(sender){	
		if (sender == this.c_modul3) this.doLoad();		
		
		if (sender == this.c_modul2) {
			if (this.c_modul2.getText() == "DROPING") {
				this.cb_nb.setSQL("select no_minta, keterangan from ys_minta_m where periode<='"+this.e_periode.getText()+"' and progress in ('1','C') ",["no_minta","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			}			
		}
		if (sender == this.cb_nb && this.cb_nb.getText() != "") {
			if (this.c_modul2.getText() == "DROPING") {

				var strSQL = "select a.tanggal as due_date,a.no_minta as no_bukti,case a.progress when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'DROPING' as modul,b.kode_pp+' - '+b.nama as pp,a.no_dokumen,a.keterangan,isnull(d.nilai,0) as nilai,c.nik+' - '+c.nama as pembuat,a.no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from ys_minta_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                  inner join karyawan c on a.nik_user=c.nik and a.kode_lokasi=c.kode_lokasi "+							 
							 
							 "					left join (select a.no_minta,a.kode_lokasi,sum(a.nilai_usul) as nilai "+
							 "						       from ys_minta_d a "+
							 "							   where a.kode_lokasi='"+this.app._lokasi+"' "+
							 "							   group by a.no_minta,a.kode_lokasi  ) d "+
							 "							   on a.no_minta=d.no_minta and a.kode_lokasi=d.kode_lokasi "+

							 "where a.no_minta='"+this.cb_nb.getText()+"'";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}			
			
			this.pc1.setActivePage(this.pc1.childPage[0]);				
		}
	},
	doClick:function(sender){		
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ys_app_m","no_app",this.app._lokasi+"-APC"+this.e_periode.getText().substr(2,4)+".","0000"));												
		this.e_memo.setFocus();								
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {			
				this.pc1.setActivePage(this.pc1.childPage[1]);											
				if (this.sg.cells(2,row) == "RETURN") this.c_status.setText(this.sg.cells(2,row));								
				else this.c_status.setText("APPROVE");								
				this.e_modul.setText(this.sg.cells(0,row));
				this.e_nobukti.setText(this.sg.cells(1,row));												
				this.e_tgl.setText(this.sg.cells(3,row));
				this.e_duedate.setText(this.sg.cells(4,row));
				this.e_pp.setText(this.sg.cells(5,row));
				this.e_dok.setText(this.sg.cells(6,row));
				this.e_ket.setText(this.sg.cells(7,row));
				this.e_nilai.setText(this.sg.cells(8,row));				
				this.e_buat.setText(this.sg.cells(9,row));										
				this.noAppLama = this.sg.cells(10,row);						
				this.kodePPBukti = this.sg.cells(12,row);
				this.e_memo.setText(this.sg.cells(7,row));				
				
				this.doLoadUsul();
				
				if (this.sg.cells(2,row) == "INPROG") {
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
				}
				else {
					setTipeButton(tbUbahHapus);
					this.stsSimpan = 0;
				}
				
			}
		} catch(e) {alert(e);}
	},		
	doLoadUsul:function(){
		var strSQL1 = "select a.kode_akun,b.nama,a.keterangan,a.nilai_usul,a.nilai_app,a.nu "+
					  "from ys_minta_d a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					  "where a.no_minta = '"+this.e_nobukti.getText()+"'  order by a.nu";
		var data = this.dbLib.getDataProvider(strSQL1,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg1.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];																		
				this.sg1.appendData([line.kode_akun,line.nama,line.keterangan,floatToNilai(line.nilai_usul),floatToNilai(line.nilai_app),line.nu]);
			}
		} else this.sg1.clear(1);		
		this.sg1.validasi();											
	},
	doLoad:function(sender){			
		if (this.c_modul3.getText() == "DROPING")	{
			strSQL = "select a.tanggal as due_date,a.no_minta as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'DROPING' as modul, "+
					 "b.kode_pp+' - '+b.nama as pp,a.no_dokumen,a.keterangan,isnull(d.nilai,0) as nilai,c.nik+' - '+c.nama as pembuat,a.no_app,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
					 "from ys_minta_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "                  inner join karyawan c on a.nik_user=c.nik and a.kode_lokasi=c.kode_lokasi "+
					 "left join (select a.no_minta,a.kode_lokasi,sum(a.nilai_usul) as nilai "+
							"from ys_minta_d a "+
							"group by a.no_minta,a.kode_lokasi) d on a.no_minta=d.no_minta and a.kode_lokasi=d.kode_lokasi "+
					 "where a.periode<='"+this.e_periode.getText()+"' and a.progress='0' ";
		}
		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);							
	},							
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];																			
			this.sg.appendData([line.modul.toUpperCase(),line.no_bukti,line.status.toUpperCase(),line.tgl,line.tgl2,line.pp,line.no_dokumen,line.keterangan,floatToNilai(line.nilai),line.pembuat,line.no_app,line.tglinput,line.kode_pp]); 
		}
		this.sg.setNoUrut(start);
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
								//this.nama_report="server_report_saku3_hutang_rptSpbForm";									                  
								//this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_spb='"+this.e_nb.getText()+"' ";
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
			this.sg1.clear(1); 
			this.doClick();
			this.doLoad();					
			this.pc1.setActivePage(this.pc1.childPage[0]);				
			this.e_memo.setText("");
			setTipeButton(tbAllFalse);
			this.c_modul3.setText("DROPING");
		} catch(e) {
			alert(e);
		}
	}
});


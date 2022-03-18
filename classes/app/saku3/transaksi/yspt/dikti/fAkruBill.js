window.app_saku3_transaksi_yspt_dikti_fAkruBill = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yspt_dikti_fAkruBill.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yspt_dikti_fAkruBill";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Akru Billing Mahasiswa", 0);	
		
		uses("portalui_saiMemo;portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
				
		this.cb_ta = new saiCBBL(this,{bound:[20,17,220,20],caption:"Periode Akademik", readOnly:true, tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal - Periode", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[230,11,50,20],caption:"",tag:2,readOnly:true,change:[this,"doChange"],labelWidth:0});
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,427], childPage:["Data Jurnal","List Jurnal"]});				
		this.sg4 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai"],
					colWidth:[[3,2,1,0],[100,400,100,100]],colFormat:[[3],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn4 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg4,pager:[this,"doPager4"]});		
		this.bLoad4 = new portalui_imageButton(this.sgn4,{bound:[this.sgn4.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad4"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,450,20],caption:"Deskripsi", maxLength:150});								
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,16,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.bTampil = new button(this.pc2.childPage[0],{bound:[670,16,80,18],caption:"Tampil Data",click:[this,"doTampil"]});			
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,20,995,348], childPage:["Jurnal Billing","Daftar Billing"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-33],colCount:7,tag:0,
				colTitle:["PP / Unit","Kode Param","Nama Parameter","Akun Piutang","Akun Pdpt / PYT","Nilai","DRK"],
				colWidth:[[6,5,4,3,2,1,0],[120,100,100,100,300,100,100]],
				columnReadOnly:[true,[0,1,2,3,4,5,6],[]],
				nilaiChange:[this,"doNilaiChange"],dblClick:[this,"doDblClick"],colFormat:[[5],[cfNilai]],defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});

		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-33],colCount:4,tag:9,
				colTitle:["NIM","Angkatan","Kode Param","Nilai"],
				colWidth:[[3,2,1,0],[100,100,100,100]],
				columnReadOnly:[true,[0,1,2,3],[]],
				nilaiChange:[this,"doNilaiChange"],colFormat:[[3],[cfNilai]],defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager1"]});
		
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
			
			this.cb_ta.setSQL("select distinct kode_ta, nama from dikti_ta where kode_lokasi='"+this.app._lokasi+"'",["kode_ta","nama"],false,["Kode","Deskripsi"],"and","Periode Akademik",true);			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yspt_dikti_fAkruBill.extend(window.childForm);
window.app_saku3_transaksi_yspt_dikti_fAkruBill.implement({
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
					
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,due_date,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','AR','MHSBILL','F','-','-','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"', '-','"+this.e_ket.getText()+"','IDR',1,"+
							parseNilai(this.e_nilai.getText())+",0,0,'-','-','-','-','-','-','"+this.cb_ta.getText()+"','-','-')");
					
					var j = 0;
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(5,i) != "0"){
								sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(3,i)+"','D',"+parseNilai(this.sg.cells(5,i))+","+
										parseNilai(this.sg.cells(5,i))+",'"+this.e_ket.getText()+"','MHSBILL','PIU','IDR',1,'"+this.sg.cells(0,i)+"','-','-','-','-','-','-','-','-')");											

								j = i+1000;		
								sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sg.cells(4,i)+"','C',"+parseNilai(this.sg.cells(5,i))+","+
										parseNilai(this.sg.cells(5,i))+",'"+this.e_ket.getText()+"','MHSBILL','PDPT','IDR',1,'"+this.sg.cells(0,i)+"','"+this.sg.cells(6,i)+"','-','-','-','-','-','-','-')");											
							}
						}
					}		
					
					sql.add("insert into dikti_bill_d(no_bill,kode_lokasi,kode_ta,nim,kode_param,akun_piutang,dc,nilai,periode,periode_dis,modul,kode_pp) "+							
							"select '"+this.e_nb.getText()+"',a.kode_lokasi,'"+this.cb_ta.getText()+"',a.nim,b.kode_param,c.akun_piutang,'D',b.tarif,'"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','BILL',g.kode_pp "+
							"from dikti_mhs a "+
							"inner join dikti_jur g on a.kode_jur=g.kode_jur and a.kode_lokasi=g.kode_lokasi "+							
							"inner join dikti_mhs_tarif b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi and b.kode_ta='"+this.cb_ta.getText()+"' "+
							"inner join dikti_param c on b.kode_param=c.kode_param and b.kode_lokasi=c.kode_lokasi "+
							"inner join dikti_mhs_status xx on a.kode_status=xx.kode_status and a.kode_lokasi=xx.kode_lokasi  "+
   
							"left join (select nim,kode_lokasi,kode_param,sum(case dc when 'D' then nilai else -nilai end) as nilai "+
							"           from dikti_bill_d "+
							"           where kode_lokasi='"+this.app._lokasi+"' and kode_ta='"+this.cb_ta.getText()+"' "+
							"           group by nim,kode_lokasi,kode_param "+
							"			 ) f on b.nim=f.nim and f.kode_param=b.kode_param and b.kode_lokasi=f.kode_lokasi "+						
							
							"where b.tarif<>0 and xx.flag_aktif = '1' and a.kode_lokasi='"+this.app._lokasi+"' and (f.nilai is null or f.nilai = 0) ");
					
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
					this.sg.clear(1);this.sg4.clear(1);
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbAllFalse);
					this.doClick(this.i_gen);
				break;
			case "simpan" :				
				this.preView = "1";
				this.sg.validasi();
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
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
					sql.add("delete from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from trans_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from dikti_bill_d where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);

		var data = this.dbLib.getDataProvider("select kode_ta from dikti_ta where periode = '"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data == "object"){			
			var line = data.rs.rows[0];							
			if (line != undefined){
				this.cb_ta.setText(line.kode_ta);
			}
		}

		
		if (this.stsSimpan == 1) {
			this.doClick(this.i_gen);
		}
	},
	doTampil:function(sender){		
		if (this.e_periode.getText() != "") {
			var strSQL = "select g.kode_pp,c.kode_param,c.nama,c.akun_piutang,case when c.akun_pyt ='-' then c.akun_pdpt else c.akun_pyt end as akun_lawan,SUM(b.tarif) as nilai, "+
						 "case when c.akun_pyt <>'-' then '-' else c.kode_drk end as drk "+

						 "from dikti_mhs a "+						 
						 "inner join dikti_jur g on a.kode_jur=g.kode_jur and a.kode_lokasi=g.kode_lokasi "+
						 "inner join dikti_mhs_tarif b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi and b.kode_ta='"+this.cb_ta.getText()+"' "+
						 "inner join dikti_param c on b.kode_param=c.kode_param and b.kode_lokasi=c.kode_lokasi "+
						 "inner join dikti_mhs_status xx on a.kode_status=xx.kode_status and a.kode_lokasi=xx.kode_lokasi  "+

						 "left join (select nim,kode_lokasi,kode_param,sum(case dc when 'D' then nilai else -nilai end) as nilai "+
						 "           from dikti_bill_d "+
						 "           where kode_lokasi='"+this.app._lokasi+"' and kode_ta='"+this.cb_ta.getText()+"' "+
						 "           group by nim,kode_lokasi,kode_param "+
						 "			 ) f on b.nim=f.nim and f.kode_param=b.kode_param and b.kode_lokasi=f.kode_lokasi "+						
						 
						 "where b.tarif<>0 and xx.flag_aktif = '1' and a.kode_lokasi='"+this.app._lokasi+"' and (f.nilai is null or f.nilai = 0) "+
						 "group by g.kode_pp,c.kode_param,c.nama,c.akun_piutang,"+
						 "case when c.akun_pyt ='-' then c.akun_pdpt else c.akun_pyt end,case when c.akun_pyt <>'-' then '-' else c.kode_drk end "+
						 "order by g.kode_pp,c.kode_param";

			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];		
					if (parseFloat(line.nilai) > 0) {																				
						this.sg.appendData([line.kode_pp,line.kode_param,line.nama,line.akun_piutang,line.akun_lawan,floatToNilai(line.nilai),line.drk]);
					}
				}
			} else this.sg.clear(1);
			this.sg.validasi();
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
		else system.alert(this,"Data tidak valid.","Periode harus diisi.");
	},		
	doClick:function(sender){
		if (sender == this.i_gen) {			
			if (this.stsSimpan == 0) {									
				this.sg.clear(1);this.sg4.clear(1);
				this.e_nilai.setText("0");
				this.bTampil.show();				
			}	
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-BIL"+this.e_periode.getText().substr(2,4)+".","0000"));			
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
		}		
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(5,i) != ""){
					tot += nilaiToFloat(this.sg.cells(5,i));					
				}
			}
			this.e_nilai.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doDblClick: function(sender, col, row){
		if (this.sg.cells(0,row) != "") {	
			var strSQL = "select a.nim,a.kode_akt,c.kode_param,b.tarif "+
						 "from dikti_mhs a "+
						 "inner join dikti_jur g on a.kode_jur=g.kode_jur and a.kode_lokasi=g.kode_lokasi "+
						 "inner join dikti_mhs_tarif b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi and b.kode_ta='"+this.cb_ta.getText()+"' "+
						 "inner join dikti_param c on b.kode_param=c.kode_param and b.kode_lokasi=c.kode_lokasi "+
						 "inner join dikti_mhs_status xx on a.kode_status=xx.kode_status and a.kode_lokasi=xx.kode_lokasi  "+
						 "left join (select nim,kode_lokasi,kode_param,sum(case dc when 'D' then nilai else -nilai end) as nilai "+
						 "           from dikti_bill_d "+
						 "           where kode_lokasi='"+this.app._lokasi+"' and kode_ta='"+this.cb_ta.getText()+"' and no_bill <> '"+this.e_nb.getText()+"' "+
						 "           group by nim,kode_lokasi,kode_param "+
						 "			 ) f on b.nim=f.nim and f.kode_param=b.kode_param and b.kode_lokasi=f.kode_lokasi "+												 
						 "where b.tarif<>0 and xx.flag_aktif = '1' and a.kode_lokasi='"+this.app._lokasi+"' and (f.nilai is null or f.nilai = 0) "+
						 "and c.kode_param='"+this.sg.cells(1,row)+"' and g.kode_pp='"+this.sg.cells(0,row)+"'";

			var data = this.dbLib.getDataProvider(strSQL,true);			
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[1]);
		}
	},
	doPager1: function(sender, page) {
		this.doTampilData(page);
	},
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];
			this.sg1.appendData([line.nim,line.kode_akt,line.kode_param,floatToNilai(line.tarif)]);
		}
		this.sg1.setNoUrut(start);		
	},
   	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {
								this.nama_report="server_report_saku3_siswa_rptSisJurnalPiutangYpt";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill='"+this.e_nb.getText()+"' ";
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
			this.sg.clear(1); this.sg4.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbAllFalse);
			this.doClick(this.i_gen);
		} catch(e) {
			alert(e);
		}
	},	
	doLoad4:function(sender){																				
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai1 "+
					 "from trans_m a "+
					 "   left join (select distinct no_bill,kode_lokasi from dikti_bill_rekon "+
					 "				where kode_lokasi='"+this.app._lokasi+"' "+
					 "			    ) b on a.no_bukti=b.no_bill and a.kode_lokasi=b.kode_lokasi "+
					 "where b.no_bill is null and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted='F' and a.form='MHSBILL'";						
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU4 = data;
			this.sgn4.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn4.rearrange();
			this.doTampilData4(1);
		} else this.sg4.clear(1);			
	},
	doTampilData4: function(page) {
		this.sg4.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU4.rs.rows.length? this.dataJU4.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU4.rs.rows[i];													
			this.sg4.appendData([line.no_bukti,line.tgl,line.keterangan,floatToNilai(line.nilai1)]); 
		}
		this.sg4.setNoUrut(start);
	},
	doPager4: function(sender, page) {
		this.doTampilData4(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg4.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbHapus);
				this.bTampil.hide();
				
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg4.cells(0,row));								
								
				var strSQL = "select * from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.e_ket.setText(line.keterangan);
						this.cb_ta.setText(line.param1);																								
					}					
				}				

				var strSQL = "select g.kode_pp,c.kode_param,c.nama,c.akun_piutang,case when c.akun_pyt ='-' then c.akun_pdpt else c.akun_pyt end as akun_lawan,SUM(f.nilai) as nilai, "+
							 "case when c.akun_pyt <>'-' then '-' else c.kode_drk end as drk "+
							 
							 "from dikti_mhs a "+
							 "inner join dikti_jur g on a.kode_jur=g.kode_jur and a.kode_lokasi=g.kode_lokasi "+							 
							 "inner join (select nim,kode_lokasi,kode_param,sum(case dc when 'D' then nilai else -nilai end) as nilai "+
							 "            from dikti_bill_d "+
							 "            where no_bill='"+this.e_nb.getText()+"' "+
							 "            group by nim,kode_lokasi,kode_param) f on a.nim=f.nim and f.kode_lokasi=a.kode_lokasi "+						

							 "inner join dikti_param c on f.kode_param=c.kode_param and f.kode_lokasi=c.kode_lokasi "+							 
							 "where a.kode_lokasi='"+this.app._lokasi+"' "+
							 "group by g.kode_pp,c.kode_param,c.nama,c.akun_piutang,"+
							 "case when c.akun_pyt ='-' then c.akun_pdpt else c.akun_pyt end,case when c.akun_pyt <>'-' then '-' else c.kode_drk end";	 

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg.appendData([line.kode_pp,line.kode_param,line.nama,line.akun_piutang,line.akun_lawan,floatToNilai(line.nilai),line.drk]);
					}
				} else this.sg.clear(1);				
			}									
		} catch(e) {alert(e);}
	}	
});